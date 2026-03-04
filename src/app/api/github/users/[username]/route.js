import { NextResponse } from "next/server";

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const REQUEST_TIMEOUT_MS = 9000;

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
		const payload = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ message: payload?.message || "Failed to fetch user from GitHub." },
				{ status: response.status },
			);
		}

		return NextResponse.json(payload, {
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
