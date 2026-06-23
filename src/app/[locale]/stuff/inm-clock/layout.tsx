import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const url = "/stuff/inm-clock";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/stuff/inm-clock">
): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	const t = await getTranslations({ locale, namespace: "stuff.inm-clock" });

	const title = t("title");
	const description = t("description");

	return {
		title: { absolute: title },
		description,
		...generateSocialMetadata({
			title,
			description,
			url,
			images: [`${url}/image.png`],
		}),
		icons: {
			icon: [{ url: `${url}/icon.png` }],
			apple: [{ url: `${url}/apple-icon.png` }],
		},
	};
}



export default async function InmClockLayout(
	{ children, params }: LayoutProps<"/[locale]/stuff/inm-clock">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return children;
}