import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const url = "/tools/tempus";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("tools.tempus");
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
	};
}



export default async function TempusLayout(
	{ children }: LayoutProps<"/[locale]/tools/tempus">
) {
	const t = await getTranslations("tools.tempus");

	return (
		<>
			<h1 className="sr-only">{t("title")}</h1>
			{children}
		</>
	);
}