import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const url = "/stuff/iroduku-pgm";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/stuff/iroduku-pgm">
): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	const t = await getTranslations({ locale, namespace: "stuff.iroduku-pgm" });

	const title = t("title");
	const description = t("description");

	return {
		title: { absolute: title },
		description,
		keywords: [
			"色づく世界の明日から",
			"來自繽紛世界的明日",
			"Iroduku: The World in Colors",
			"アニメ 聖地巡礼",
			"動畫 聖地巡禮",
			"anime pilgrimage",
		],
		...generateSocialMetadata({
			title: generatePageTitle({ title }),
			description,
			url,
		}),
	};
}



export default async function IrodukuPilgrimageLayout(
	{ children, params }: LayoutProps<"/[locale]/stuff/iroduku-pgm">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return (
		<div className="my-16">
			{children}
		</div>
	);
}