import { notFound } from "next/navigation";
import { tryCatch } from "@/lib/try-catch";
import { getArticle, getArticles } from "@/lib/article/utils";

// Types & Interfaces
import type { ArticleMetadata } from "@/lib/article/types";

// Static Params
export async function generateStaticParams() {
	const articles = await getArticles();
	return articles.map(article => ({ articleId: article.shortId }));
}

// Route Segment Config
export const revalidate = false;



export async function GET(
	_req: Request,
	{ params }: RouteContext<"/llms.md/articles/[articleId]">
) {
	const { articleId } = await params;
	const { data: article, error } = await tryCatch(getArticle(articleId));
	if (error) notFound();

	const markdown = `${toFrontmatter(article.metadata)}\n\n${article.content}`;
	return new Response(markdown, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}

function toFrontmatter(metadata: ArticleMetadata) {
	const lines = Object.entries(metadata)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${key}: ${JSON.stringify(value)}`);

	return ["---", ...lines, "---"].join("\n");
}
