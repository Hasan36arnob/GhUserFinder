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

export const metadata = {
	title: "Github User Finder",
	description: "Search and explore GitHub users with style.",
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
