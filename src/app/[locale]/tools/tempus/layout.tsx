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
	}),
};



export default async function TempusLayout(
	{ children, params }: LayoutProps<"/[locale]/tools/tempus">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return children;
}