import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "新分頁";
const description = "It's MyGO!!!!!";
const url = "/mygo";
export const metadata: Metadata = {
	title: { absolute: title },
	description,
	...generateSocialMetadata({
		title,
		description,
		url,
		images: [`${url}/image.jpg`],
	}),
	robots: {
		index: false,
		follow: false,
	},
};



export default async function MyGOLayout(
	{ children, params }: LayoutProps<"/[locale]/mygo">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return children;
}