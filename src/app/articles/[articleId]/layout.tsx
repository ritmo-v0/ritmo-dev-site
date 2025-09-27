import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";
import { getArticles, getArticleMetadata } from "@/lib/article/utils";

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
export const revalidate = 900;  // 15 min (60 * 15)
export const dynamicParams = false;
export async function generateStaticParams() {
	const articles = await getArticles();
	return articles.map(article => ({ articleId: article.shortId }));
}



export default function ArticleLayout({
	children
}: LayoutProps<typeof url>) {
	return children;
}