import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "Project α";
const description = "Inspired by Nuanced, but a web version. Tired of finding the perfect tool, so nvm I'll build it myself.";
const url = "/tools";
// TODO: const keywords = [];
export const metadata: Metadata = {
	title: {
		default: title,
		template: `%s｜Ritmo 里莫`,
	},
	description,
	// keywords,
	...generatePreviewMetadata({
		title: getFullTitle(title),
		description,
		url,
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function ToolsLayout({
	children,
}: React.ComponentProps<"div">) {
	return children;
}