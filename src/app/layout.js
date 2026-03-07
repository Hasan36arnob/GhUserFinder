import "./globals.css";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "GitHub Lens",
		template: "%s | GitHub Lens",
	},
	description: "GitHub Lens helps recruiters, founders, and agencies analyze developer profiles fast with premium UI and actionable repository insights.",
	applicationName: "GitHub Lens",
	keywords: [
		"GitHub profile analysis",
		"developer portfolio checker",
		"GitHub repository insights",
		"hire developers",
		"tech recruiting tool",
		"freelancer GitHub audit",
	],
	alternates: {
		canonical: "/",
	},
	category: "technology",
	creator: "GitHub Lens",
	openGraph: {
		title: "GitHub Lens",
		description: "Analyze GitHub developers in seconds and turn profile data into hiring or outreach decisions.",
		type: "website",
		siteName: "GitHub Lens",
		url: siteUrl,
	},
	twitter: {
		card: "summary_large_image",
		title: "GitHub Lens",
		description: "Fast GitHub profile analysis for hiring and business decisions.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
