import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const url = "/stuff/iroduku-pgm";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("stuff.iroduku-pgm");
	const title = t("title");
	const description = t("description");

	return {
		title,
		description,
		...generateSocialMetadata({
			title: generatePageTitle({ title }),
			description,
			url,
		}),
	};
}



export default async function IrodukuPilgrimageLayout(
	{ children }: LayoutProps<"/[locale]/stuff/iroduku-pgm">
) {
	const t = await getTranslations("stuff.iroduku-pgm");

	return (
		<div className="my-16">
			<h1 className="sr-only">{t("title")}</h1>
			{children}
		</div>
	);
}