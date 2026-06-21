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
		keywords: [
			// Main Keywords
			"inm clock",
			"時鐘工具",
			"web clock widget",
			"網頁時鐘元件",
			"2025 時鐘",
			"114 時鐘",
			"114年 時鐘",

			// Kuso Keywords
			"inm",
			"114514",
			"淫夢",
			"野獸先輩",
			"野獣先輩",
			"仲夏夜之淫夢",
			"真夏の夜の淫夢",
			"田所浩二",
			"こ↑こ↓",
			"homo",
			"ホモ",
		],
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