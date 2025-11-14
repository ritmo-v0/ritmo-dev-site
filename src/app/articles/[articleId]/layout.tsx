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
				locale: "zh_TW",
				image: articleMetadata.image
			}),
		};
	} catch {
		return {};
	}
}

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 900;       // 15 min
export const dynamicParams = false;  // 404
export async function generateStaticParams() {
	const articles = await getArticles();
	return articles.map(article => ({ articleId: article.shortId }));
}



export default function ArticleLayout({
	children
}: LayoutProps<typeof url>) {
	return children;
}