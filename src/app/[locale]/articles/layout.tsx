import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Components & UI
import { Wrapper } from "@/components/common/typography";

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
		<Wrapper className="my-16" width={720}>
			{children}
		</Wrapper>
	);
}