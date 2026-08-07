import { getTranslations } from "next-intl/server";
import { generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const url = "/stuff/inm-clock";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("stuff.inm-clock");
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



export default function InmClockLayout(
	{ children }: LayoutProps<"/[locale]/stuff/inm-clock">
) {
	return children;
}