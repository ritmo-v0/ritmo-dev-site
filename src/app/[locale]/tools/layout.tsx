import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const url = "/tools";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/tools">
): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	const t = await getTranslations({ locale, namespace: "tools" });

	const title = t("title");
	const description = t.raw("description").replace(/<[^>]*>/g, "");

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
		}),
	};
}



export default async function ToolsLayout(
	{ children, params }: LayoutProps<"/[locale]/tools">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return (
		<div className="my-16">
			{children}
		</div>
	);
}