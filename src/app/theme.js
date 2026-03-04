"use client";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles: {
		global: {
			"html, body": {
				background: "transparent",
				color: "#f6f1e9",
			},
		},
	},
	colors: {
		accent: {
			50: "#fff4e7",
			100: "#ffd5ab",
			200: "#ffbe80",
			300: "#ffa44f",
			400: "#ff912d",
			500: "#ff7a00",
			600: "#d66500",
			700: "#ad5000",
			800: "#853d00",
			900: "#5c2a00",
		},
		surface: {
			50: "#d6dbec",
			100: "#b4bdd6",
			200: "#8d9bb9",
			300: "#66799c",
			400: "#475980",
			500: "#2f3d65",
			600: "#242f4e",
			700: "#1a2238",
			800: "#121728",
			900: "#0b0f1c",
		},
	},
	fonts: {
		heading: "var(--font-space-grotesk)",
		body: "var(--font-manrope)",
	},
	radii: {
		xl: "1rem",
		"2xl": "1.5rem",
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: "700",
				borderRadius: "999px",
			},
		},
	},
});

export default theme;
