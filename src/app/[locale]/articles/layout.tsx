import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const url = "/articles";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/articles">
): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	const t = await getTranslations({ locale, namespace: "articles" });

	const title = t("title");
	const description = t("description");

	return {
		title: {
			default: title,
			template: generatePageTitle(),
		},
		description,
		...generateSocialMetadata({
			title: generatePageTitle({ title }),
			description,
			url,
			locale: "zh_TW",
		}),
	};
}



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