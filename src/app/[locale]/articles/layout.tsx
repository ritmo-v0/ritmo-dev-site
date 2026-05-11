import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata, generatePageTitle } from "@/lib/utils";

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
	...generateSocialMetadata({
		title: generatePageTitle({ title }),
		description,
		url,
		locale: "zh_TW",
	}),
};



export default async function ArticlesLayout(
	{ children, params }: LayoutProps<"/[locale]/articles">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return (
		<div className="my-16">
			{children}
		</div>
	);
}