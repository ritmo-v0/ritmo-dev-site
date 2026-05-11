import { getTranslations } from "next-intl/server";
import { generateSocialMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const title = "ヨミビトシラズ";
const description = `
**********************************
** Welcome to METAVERSE v3.0+1.0
** Presented by Limonène
**********************************
`.trim();
const url = "/stuff/7sref/yomibito-shirazu";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/stuff/7sref/yomibito-shirazu">
): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	const t = await getTranslations({ locale, namespace: "stuff.7sref" });

	const parentTitle = t("title");

	return {
		title,
		description,
		...generateSocialMetadata({
			title: generatePageTitle({ title, suffix: parentTitle }),
			description,
			url,
			images: [`${url}/image.jpg`],
		}),
	};
}



export default function YomibitoShirazuLayout({
	children
}: LayoutProps<"/[locale]/stuff/7sref/yomibito-shirazu">) {
	return children;
}