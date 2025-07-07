import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "Articles";
const description = "Yes, articles. Ritmo's articles.";
const url = "/articles";
export const metadata: Metadata = {
	title: {
		default: title,
		template: `%s｜Ritmo 里莫`,
	},
	description: description,
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



export default function ArticlesLayout({ children }: React.ComponentProps<"div">) {
	return children;
}