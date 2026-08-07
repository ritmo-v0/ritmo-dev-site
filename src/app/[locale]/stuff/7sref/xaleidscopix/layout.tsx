import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const title = "Xaleid◆scopiX";
const description = `
Acid saved Ris who had gone out of control, and crossed the seven doors and worlds.
Eventually, a rain of jewels began to fall, and each kaleidoscope reflected it.
Please take a look at the next world and extra track woven by them who have overcome everything.
`.trim();
const url = "/stuff/7sref/xaleidscopix";

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



export default function XaleidscopiXLayout(
	{ children }: LayoutProps<"/[locale]/stuff/7sref/xaleidscopix">
) {
	return (
		<>
			<h1 className="sr-only">{title}</h1>
			{children}
		</>
	);
}