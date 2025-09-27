import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";
import { getArticleMetadata } from "@/lib/article/actions";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const url = "/articles/[articleId]";
export async function generateMetadata({
	params
}: LayoutProps<typeof url>): Promise<Metadata> {
	try {
		const articleId = (await params).articleId;
		const articleMetadata = await getArticleMetadata(articleId);
		const title = articleMetadata.title;
		const description = articleMetadata.description;

		return {
			title,
			description,
			keywords: articleMetadata.tags,
			...generatePreviewMetadata({
				type: "article",
				title: generatePageTitle({ title }),
				description,
				url: `/articles/${articleId}`,
				image: articleMetadata.image
			}),
		};
	} catch {
		return {};
	}
}

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 3600;  // 1 hour (60 * 60)



export default function ArticleLayout({
	children
}: LayoutProps<typeof url>) {
	return children;
}