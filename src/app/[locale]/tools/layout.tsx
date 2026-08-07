import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const url = "/tools";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("tools");
	const title = t("title");
	const description = t.raw("description").replace(/<[^>]*>/g, "");

	return {
		title: {
			default: title,
			template: generatePageTitle(),
		},
		description,
		...generateSocialMetadata({
			title: generatePageTitle({ title }),
			description,
			url,
		}),
	};
}



export default function ToolsLayout(
	{ children }: LayoutProps<"/[locale]/tools">
) {
	return (
		<div className="my-16">
			{children}
		</div>
	);
}