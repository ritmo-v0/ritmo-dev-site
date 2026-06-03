import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata, generatePageTitle } from "@/lib/utils";
import { getArticle, getArticles } from "@/lib/article/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/articles/[articleId]">
): Promise<Metadata> {
	try {
		const articleId = (await params).articleId;
		const article = await getArticle(articleId);
		const title = article.metadata.title;
		const description = article.metadata.description;

		return {
			title,
			description,
			keywords: article.metadata.tags,
			...generateSocialMetadata({
				type: "article",
				title: generatePageTitle({ title }),
				description,
				url: `/articles/${articleId}`,
				locale: "zh_TW",
				images: article.metadata.image
			}),
		};
	} catch {
		return {};
	}
}

// Static Params
export async function generateStaticParams() {
	const articles = await getArticles();
	return articles.map(article => ({ articleId: article.shortId }));
}

// Route Segment Config
export const revalidate = 900;  // 15m



export default async function ArticleLayout(
	{ children, params }: LayoutProps<"/[locale]/articles/[articleId]">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return children;
}