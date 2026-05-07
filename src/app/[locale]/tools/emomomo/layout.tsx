import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
import { meta } from "./meta";
export const metadata: Metadata = {
	title: meta.title,
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



export default async function EmomomoLayout(
	{ children, params }: LayoutProps<"/[locale]/tools/emomomo">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return children;
}