import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const title = "Ref:rain (for 7th Heaven)";
const description = `
******************************
** Welcome to KALEIDX_SCOPE **
** Thank you, and good bye. **
******************************
`.trim();
const url = "/stuff/7sref/refrain";

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



export default function RefrainLayout(
	{ children }: LayoutProps<"/[locale]/stuff/7sref/refrain">
) {
	return (
		<>
			<h1 className="sr-only">{title}</h1>
			{children}
		</>
	);
}