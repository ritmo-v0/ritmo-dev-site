import { notFound } from "next/navigation";
import { tryCatch } from "@/lib/try-catch";
import { getArticle } from "@/lib/article/utils";
import { getBaseUrl } from "@/lib/utils";

// Components & UI
import { ArticleHeader } from "@/components/main/articles/header";
import { ArticleContent } from "@/components/main/articles/content";
import { Wrapper } from "@/components/common/typography";
import { JsonLd } from "@/components/common/json-ld";

// Types & Interfaces
import type { BlogPosting } from "schema-dts";

// Constants & Variables
import { PERSON_ID } from "@/lib/constants/socials";



export default async function ArticlePage(
	props: PageProps<"/[locale]/articles/[articleId]">
) {
	const articleId = (await props.params).articleId;
	const { data: article, error } = await tryCatch(getArticle(articleId));

	if (error) notFound();

	const ARTICLE_JSONLD: BlogPosting = {
		"@type": "BlogPosting",
		headline: article.metadata.title,
		description: article.metadata.description,
		image: article.metadata.image,
		datePublished: article.metadata.createdAt,
		dateModified: article.metadata.updatedAt,
		url: `${getBaseUrl().origin}/articles/${articleId}`,
		inLanguage: "zh-TW",
		author: { "@id": PERSON_ID },
		publisher: { "@id": PERSON_ID },
		keywords: article.metadata.tags.join(","),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${getBaseUrl().origin}/articles/${articleId}`,
		},
	};

	return (
		<Wrapper
			className="grid gap-12"
			width={720}
		>
			<JsonLd data={ARTICLE_JSONLD} />
			<ArticleHeader metadata={article.metadata} />
			<main>
				<ArticleContent content={article.content} />
			</main>
		</Wrapper>
	);
}