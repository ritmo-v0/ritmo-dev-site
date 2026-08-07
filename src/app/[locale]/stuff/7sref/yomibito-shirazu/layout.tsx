import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

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
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("stuff.7sref");
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



export default function YomibitoShirazuLayout(
	{ children }: LayoutProps<"/[locale]/stuff/7sref/yomibito-shirazu">
) {
	return (
		<>
			<h1 className="sr-only">{title}</h1>
			{children}
		</>
	);
}