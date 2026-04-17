import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
import { meta } from "./meta";
export const metadata: Metadata = {
	title: { absolute: meta.title },
	description: meta.description,
	keywords: meta.keywords,
	...generatePreviewMetadata({
		title: generatePageTitle({ title: meta.title }),
		description: meta.description,
		url: meta.url,
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function IrodukuPilgrimageLayout({
	children
}: LayoutProps<"/stuff/iroduku-pgm">) {
	return (
		<div className="my-16">
			{children}
		</div>
	);
}