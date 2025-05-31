import { meta } from "./meta";
import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
export const metadata = {
	title: { absolute: meta.title },
	description: meta.description,
	keywords: meta.keywords,
	...generatePreviewMetadata({
		title: meta.title,
		description: meta.description,
		url: meta.url,
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function InmClockLayout({ children }) {
	return children;
}