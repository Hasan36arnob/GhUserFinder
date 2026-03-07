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
	description: "GitHub Lens Decision Passport gives recruiters and founders a proprietary developer trust score, risk flags, and hiring-fit verdict from GitHub data.",
	applicationName: "GitHub Lens",
	keywords: [
		"GitHub profile analysis",
		"developer portfolio checker",
		"GitHub repository insights",
		"hire developers",
		"tech recruiting tool",
		"freelancer GitHub audit",
		"developer trust score",
		"hiring risk analysis",
		"github decision passport",
	],
	alternates: {
		canonical: "/",
	},
	category: "technology",
	creator: "GitHub Lens",
	openGraph: {
		title: "GitHub Lens",
		description: "Get a proprietary trust score and hiring decision passport from public GitHub signals.",
		type: "website",
		siteName: "GitHub Lens",
		url: siteUrl,
	},
	twitter: {
		card: "summary_large_image",
		title: "GitHub Lens",
		description: "Unique GitHub Decision Passport for hiring confidence and risk filtering.",
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
