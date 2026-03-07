import { NextResponse } from "next/server";

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const REQUEST_TIMEOUT_MS = 9000;

function toNumber(value) {
	return Number.isFinite(value) ? value : 0;
}

function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}

function ratio(part, total) {
	return total > 0 ? part / total : 0;
}

async function readPayload(response) {
	const contentType = response.headers.get("content-type") || "";
	if (!contentType.includes("application/json")) return null;
	try {
		return await response.json();
	} catch {
		return null;
	}
}

function computeReport(user, repos) {
	const now = Date.now();
	const activeWindowMs = 180 * 24 * 60 * 60 * 1000;
	const validRepos = Array.isArray(repos) ? repos : [];

	const activeRepos = validRepos.filter((repo) => {
		const pushed = new Date(repo.pushed_at || repo.updated_at).getTime();
		return Number.isFinite(pushed) && now - pushed <= activeWindowMs;
	}).length;
	const originalRepos = validRepos.filter((repo) => !repo.fork && !repo.archived && !repo.disabled).length;
	const documentedRepos = validRepos.filter((repo) => repo.description || repo.homepage).length;
	const maintainedRepos = validRepos.filter(
		(repo) => !repo.archived && !repo.disabled && toNumber(repo.open_issues_count) <= 25,
	).length;

	const stars = validRepos.reduce((sum, repo) => sum + toNumber(repo.stargazers_count), 0);
	const forks = validRepos.reduce((sum, repo) => sum + toNumber(repo.forks_count), 0);

	const activity = ratio(activeRepos, validRepos.length);
	const originality = ratio(originalRepos, validRepos.length);
	const documentation = ratio(documentedRepos, validRepos.length);
	const maintainability = ratio(maintainedRepos, validRepos.length);
	const socialProof = clamp(toNumber(user.followers) / 1000, 0, 1);
	const starPower = clamp(stars / 800, 0, 1);

	const score = Math.round(
		activity * 25 +
			originality * 20 +
			documentation * 12 +
			maintainability * 18 +
			starPower * 15 +
			socialProof * 10,
	);

	let decision = "Consider with caution";
	let tier = "Starter";
	if (score >= 80) {
		decision = "Strong yes";
		tier = "Elite";
	} else if (score >= 65) {
		decision = "Good fit";
		tier = "Growth";
	} else if (score >= 50) {
		decision = "Potential fit";
		tier = "Builder";
	}

	const strengths = [];
	const risks = [];

	if (activity >= 0.5) strengths.push("Active coding in the last 6 months.");
	if (originality >= 0.6) strengths.push("Most repositories are original work.");
	if (documentation >= 0.5) strengths.push("Many repositories have clear descriptions or links.");
	if (stars >= 50) strengths.push("Community interest is visible from stars.");
	if (toNumber(user.followers) >= 100) strengths.push("Healthy follower base.");

	if (activity < 0.35) risks.push("Low recent activity across repositories.");
	if (documentation < 0.35) risks.push("Limited documentation on many repositories.");
	if (maintainability < 0.4) risks.push("Several repositories may need maintenance review.");
	if (toNumber(user.public_repos) < 5) risks.push("Small public sample size.");
	if (stars < 10) risks.push("Low social proof from stars.");

	if (!strengths.length) strengths.push("Basic public profile presence.");
	if (!risks.length) risks.push("No major public red flags detected from available data.");

	return {
		username: user.login,
		score,
		tier,
		decision,
		summary: `${user.login} is rated ${score}/100 (${tier}). Decision: ${decision}.`,
		metrics: {
			repos: toNumber(user.public_repos),
			followers: toNumber(user.followers),
			stars,
			forks,
			activeRepos,
		},
		strengths,
		risks,
		nextSteps: [
			"Review top 3 repositories for code quality and commit history.",
			"Run a short live task aligned with your real project needs.",
			"Confirm communication and delivery expectations before final hiring.",
		],
	};
}

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const username = searchParams.get("username")?.trim();

	if (!username || !USERNAME_REGEX.test(username)) {
		return NextResponse.json({ message: "Invalid GitHub username format." }, { status: 400 });
	}

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const headers = { Accept: "application/vnd.github+json" };
		if (process.env.GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
		}

		const userUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;
		const reposUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;

		const [userRes, reposRes] = await Promise.all([
			fetch(userUrl, { headers, signal: controller.signal, next: { revalidate: 120 } }),
			fetch(reposUrl, { headers, signal: controller.signal, next: { revalidate: 120 } }),
		]);

		const [userPayload, reposPayload] = await Promise.all([readPayload(userRes), readPayload(reposRes)]);

		if (!userRes.ok) {
			return NextResponse.json(
				{ message: userPayload?.message || "Failed to fetch user profile." },
				{ status: userRes.status },
			);
		}
		if (!reposRes.ok) {
			return NextResponse.json(
				{ message: reposPayload?.message || "Failed to fetch repositories." },
				{ status: reposRes.status },
			);
		}

		const report = computeReport(userPayload || {}, reposPayload || []);
		return NextResponse.json(report, {
			status: 200,
			headers: {
				"Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
			},
		});
	} catch (error) {
		if (error?.name === "AbortError") {
			return NextResponse.json({ message: "Report request timed out. Please try again." }, { status: 504 });
		}
		return NextResponse.json({ message: "Network error while generating premium report." }, { status: 502 });
	} finally {
		clearTimeout(timeoutId);
	}
}

