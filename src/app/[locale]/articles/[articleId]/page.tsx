import { tryCatch } from "@/lib/try-catch";
import { getArticle } from "@/lib/article/utils";
import { getBaseUrl } from "@/lib/utils";

// Components & UI
import { ArticleHeader } from "@/components/main/articles/header";
import { ArticleContent } from "@/components/main/articles/content";
import { JsonLd } from "@/components/ui/json-ld";

// Types & Interfaces
import type { BlogPosting, WebPage } from "schema-dts";

// Constants & Variables
import { PERSON_ID } from "@/lib/seo/constants";



export default async function ArticlePage(
	{ params }: PageProps<"/[locale]/articles/[articleId]">
) {
	const { locale, articleId } = await params;

	const { data: article, error } = await tryCatch(getArticle(articleId));
	if (error) throw error;

	const url = `${getBaseUrl().origin}/articles/${articleId}`;
	const WEBPAGE_JSONLD: WebPage = {
		"@type": "WebPage",
		"@id": url,
		url,
		inLanguage: locale,
	};
	const ARTICLE_JSONLD: BlogPosting = {
		"@type": "BlogPosting",
		headline: article.metadata.title,
		description: article.metadata.description,
		image: article.metadata.image,
		author: { "@id": PERSON_ID },
		publisher: { "@id": PERSON_ID },
		dateCreated: article.metadata.createdAt,
		datePublished: article.metadata.publishedAt,
		dateModified: article.metadata.updatedAt,
		keywords: article.metadata.tags.join(","),
		url,
		inLanguage: "zh-TW",
		mainEntityOfPage: { "@id": url },
		speakable: {
			"@type": "SpeakableSpecification",
			cssSelector: ["h1", "#article-description"],
		},
	};

	return (
		<main className="grid grid-cols-1 gap-12">
			<JsonLd data={[WEBPAGE_JSONLD, ARTICLE_JSONLD]} />
			<ArticleHeader metadata={article.metadata} />
			<main>
				<ArticleContent content={article.content} />
			</main>
		</main>
	);
}