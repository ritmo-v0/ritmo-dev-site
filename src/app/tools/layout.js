import { meta } from "./meta";
import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";

// Metadata
export const metadata = {
	title: {
		default: meta.title,
		template: `%s｜Ritmo 里莫`,
	},
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



export default function ToolsLayout({ children }) {
	return children;
}