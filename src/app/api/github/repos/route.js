import { NextResponse } from "next/server";

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const REQUEST_TIMEOUT_MS = 9000;
const MAX_REPOS = 100;

function toText(value) {
	return typeof value === "string" ? value : "";
}

function toNullableText(value) {
	return typeof value === "string" && value.trim() ? value : null;
}

function toNumber(value) {
	return Number.isFinite(value) ? value : 0;
}

function normalizeRepo(repo) {
	if (!repo || typeof repo !== "object") {
		return null;
	}

	const id = Number(repo.id);
	if (!Number.isFinite(id)) {
		return null;
	}

	return {
		id,
		name: toText(repo.name),
		html_url: toText(repo.html_url),
		description: toNullableText(repo.description),
		language: toNullableText(repo.language),
		stargazers_count: toNumber(repo.stargazers_count),
		forks_count: toNumber(repo.forks_count),
		watchers_count: toNumber(repo.watchers_count),
		updated_at: toText(repo.updated_at),
	};
}

async function readGitHubPayload(response) {
	const contentType = response.headers.get("content-type") || "";

	if (contentType.includes("application/json")) {
		try {
			return await response.json();
		} catch {
			return null;
		}
	}

	return null;
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
		const headers = {
			Accept: "application/vnd.github+json",
		};

		if (process.env.GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
		}

		const response = await fetch(
			`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
			{
				headers,
				signal: controller.signal,
				next: { revalidate: 120 },
			},
		);
		const payload = await readGitHubPayload(response);

		if (!response.ok) {
			const fallbackMessage =
				response.status === 404
					? "GitHub user was not found."
					: response.status === 403
						? "GitHub API rate limit exceeded. Please try again later."
						: "Failed to fetch repositories from GitHub.";

			return NextResponse.json(
				{ message: payload?.message || fallbackMessage },
				{ status: response.status },
			);
		}

		if (!Array.isArray(payload)) {
			return NextResponse.json({ message: "Unexpected GitHub API response format." }, { status: 502 });
		}

		const normalizedRepos = payload
			.slice(0, MAX_REPOS)
			.map(normalizeRepo)
			.filter((repo) => repo && repo.name && repo.html_url);

		return NextResponse.json(normalizedRepos, {
			status: 200,
			headers: {
				"Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
			},
		});
	} catch (error) {
		if (error.name === "AbortError") {
			return NextResponse.json({ message: "GitHub request timed out. Please try again." }, { status: 504 });
		}

		return NextResponse.json({ message: "Network error while contacting GitHub." }, { status: 502 });
	} finally {
		clearTimeout(timeoutId);
	}
}
