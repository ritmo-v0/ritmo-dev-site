import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const url = "/tools/emomomo";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("tools.emomomo");
	const title = t("title");
	const description = t("description");

	return {
		title,
		description,
		...generateSocialMetadata({
			title: generatePageTitle({ title }),
			description,
			url,
			images: [`${url}/image.png`],
		}),
		icons: {
			icon: [{ url: `${url}/icon.svg` }],
			apple: [{ url: `${url}/apple-icon.png` }],
		},
	};
}



export default async function EmomomoLayout(
	{ children }: LayoutProps<"/[locale]/tools/emomomo">
) {
	const t = await getTranslations("tools.emomomo");

	return (
		<>
			<h1 className="sr-only">{t("title")}</h1>
			{children}
		</>
	);
}