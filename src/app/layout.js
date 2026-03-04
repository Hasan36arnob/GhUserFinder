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
	description: "Production-grade GitHub profile explorer with repository insights and history.",
	applicationName: "GitHub Lens",
	keywords: ["GitHub", "profile finder", "repositories", "developer portfolio"],
	openGraph: {
		title: "GitHub Lens",
		description: "Explore GitHub users, profiles, and top repositories in a premium interface.",
		type: "website",
		siteName: "GitHub Lens",
	},
	twitter: {
		card: "summary_large_image",
		title: "GitHub Lens",
		description: "Find GitHub developers and analyze their repositories quickly.",
	},
	robots: {
		index: true,
		follow: true,
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
