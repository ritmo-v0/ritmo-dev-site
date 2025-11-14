import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "Articles";
const description = "Yes, articles. Ritmo's articles.";
const url = "/articles";
export const metadata: Metadata = {
	title: {
		default: title,
		template: generatePageTitle(),
	},
	description: description,
	...generatePreviewMetadata({
		title: generatePageTitle({ title }),
		description,
		url,
		locale: "zh_TW",
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function ArticlesLayout({
	children
}: LayoutProps<typeof url>) {
	return (
		<div className="my-16">
			{children}
		</div>
	);
}