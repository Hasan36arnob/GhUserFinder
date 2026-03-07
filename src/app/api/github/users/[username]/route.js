import { NextResponse } from "next/server";

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const REQUEST_TIMEOUT_MS = 9000;

function toText(value) {
	return typeof value === "string" ? value : "";
}

function toNullableText(value) {
	return typeof value === "string" && value.trim() ? value : null;
}

function toNumber(value) {
	return Number.isFinite(value) ? value : 0;
}

function normalizeUser(payload) {
	if (!payload || typeof payload !== "object") {
		return null;
	}

	return {
		login: toText(payload.login),
		id: toNumber(payload.id),
		avatar_url: toText(payload.avatar_url),
		html_url: toText(payload.html_url),
		name: toNullableText(payload.name),
		company: toNullableText(payload.company),
		blog: toNullableText(payload.blog),
		location: toNullableText(payload.location),
		email: toNullableText(payload.email),
		bio: toNullableText(payload.bio),
		public_repos: toNumber(payload.public_repos),
		public_gists: toNumber(payload.public_gists),
		followers: toNumber(payload.followers),
		following: toNumber(payload.following),
		created_at: toText(payload.created_at),
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

export async function GET(_request, { params }) {
	const username = params?.username?.trim();

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

		const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
			headers,
			signal: controller.signal,
			next: { revalidate: 120 },
		});
		const payload = await readGitHubPayload(response);

		if (!response.ok) {
			const fallbackMessage =
				response.status === 404
					? "GitHub user was not found."
					: response.status === 403
						? "GitHub API rate limit exceeded. Please try again later."
						: "Failed to fetch user from GitHub.";

			return NextResponse.json(
				{ message: payload?.message || fallbackMessage },
				{ status: response.status },
			);
		}

		const normalizedUser = normalizeUser(payload);
		if (!normalizedUser || !normalizedUser.login || !normalizedUser.html_url) {
			return NextResponse.json({ message: "Unexpected GitHub API response format." }, { status: 502 });
		}

		return NextResponse.json(normalizedUser, {
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
