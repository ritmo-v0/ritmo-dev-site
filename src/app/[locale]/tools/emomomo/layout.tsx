import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
import { meta } from "./meta";
export const metadata: Metadata = {
	title: meta.title,
	description: meta.description,
	keywords: meta.keywords,
	...generateSocialMetadata({
		title: generatePageTitle({ title: meta.title }),
		description: meta.description,
		url: meta.url,
		images: [`${meta.url}/image.png`],
	}),
	icons: {
		icon: [{ url: `${meta.url}/icon.svg` }],
		apple: [{ url: `${meta.url}/apple-icon.png` }],
	},
};



export default async function EmomomoLayout(
	{ children, params }: LayoutProps<"/[locale]/tools/emomomo">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return children;
}