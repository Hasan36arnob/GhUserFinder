"use client";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles: {
		global: {
			"html, body": {
				background: "transparent",
				color: "#111827",
			},
		},
	},
	colors: {
		brand: {
			50: "#f3fbf8",
			100: "#d9f5ea",
			200: "#b3e8d6",
			300: "#84d7bb",
			400: "#53c39d",
			500: "#2ca57f",
			600: "#1f7f61",
			700: "#176349",
			800: "#114c38",
			900: "#0f3f2f",
		},
		ink: {
			50: "#f8f7f4",
			100: "#ece8de",
			200: "#d6cebb",
			300: "#c0b394",
			400: "#ab9b71",
			500: "#8d7e59",
			600: "#716447",
			700: "#574d37",
			800: "#3e382a",
			900: "#2b271f",
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
