import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generatePreviewMetadata } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "A full webpage's what I'm think'in of";
const description = "You wouldn't get this from any other guy";
const url = "/stuff/boss3";
export const metadata: Metadata = {
	title: { absolute: "今天是我生日" },
	description: description,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: false,
		follow: false,
	},
};



export default async function Boss3Layout(
	{ children, params }: LayoutProps<"/[locale]/stuff/boss3">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return children;
}