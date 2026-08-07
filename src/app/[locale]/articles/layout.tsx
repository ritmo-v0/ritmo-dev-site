import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Components & UI
import { Wrapper } from "@/components/common/typography";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const url = "/articles";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("articles");
	const title = t("title");
	const description = t("description");

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
			locale: "zh_TW",
		}),
	};
}



export default function ArticlesLayout(
	{ children }: LayoutProps<"/[locale]/articles">
) {
	return (
		<Wrapper className="my-16" width={720}>
			{children}
		</Wrapper>
	);
}