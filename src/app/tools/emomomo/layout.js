import { meta } from "./meta";
import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";

// Metadata
export const metadata = {
	title: meta.title,
	description: meta.description,
	keywords: meta.keywords,
	...generatePreviewMetadata({
		title: getFullTitle(meta.title),
		description: meta.description,
		url: meta.url,
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function EmomomoLayout({ children }) {
	return children;
}