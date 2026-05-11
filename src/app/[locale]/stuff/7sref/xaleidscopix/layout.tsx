import { getTranslations } from "next-intl/server";
import { generateSocialMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const title = "Xaleid◆scopiX";
const description = `
Acid saved Ris who had gone out of control, and crossed the seven doors and worlds.
Eventually, a rain of jewels began to fall, and each kaleidoscope reflected it.
Please take a look at the next world and extra track woven by them who have overcome everything.
`.trim();
const url = "/stuff/7sref/xaleidscopix";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/stuff/7sref/xaleidscopix">
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



export default function XaleidscopiXLayout({
	children
}: LayoutProps<"/[locale]/stuff/7sref/xaleidscopix">) {
	return children;
}