import { notFound } from "next/navigation";
import { tryCatch } from "@/lib/try-catch";
import { getArticle } from "@/lib/article/utils";
import { getBaseUrl } from "@/lib/utils";

// Components & UI
import { ArticleTOC } from "@/components/main/articles/toc";
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
			className="grid grid-cols-4 gap-12 max-lg:[--max-width:720px]!"
			width={976}
		>
			<JsonLd data={ARTICLE_JSONLD} />
			<div className="col-span-full lg:col-span-3">
				<ArticleHeader metadata={article.metadata} />
				<main className="mt-12">
					<ArticleContent content={article.content} />
				</main>
			</div>
			<ArticleTOC
				className="max-lg:hidden"
				content={article.content}
			/>
		</Wrapper>
	);
}