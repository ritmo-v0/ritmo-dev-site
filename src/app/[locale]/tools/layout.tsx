import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata, generatePageTitle } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "Project α";
const description = "Inspired by Nuanced, but a web version. Tired of finding the perfect tool, so nvm I'll build it myself.";
const url = "/tools";
// TODO: const keywords = [];
export const metadata: Metadata = {
	title: {
		default: title,
		template: generatePageTitle(),
	},
	description,
	// keywords,
	...generateSocialMetadata({
		title: generatePageTitle({ title }),
		description,
		url,
	}),
};



export default async function ToolsLayout(
	{ children, params }: LayoutProps<"/[locale]/tools">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return (
		<div className="my-16">
			{children}
		</div>
	);
}