import { tryCatch } from "@/lib/try-catch";
import { getArticle } from "@/lib/article/utils";

// Components & UI
import { ArticleContent, ArticleHeader } from "@/components/main/articles";
import { ArticleTOC } from "@/components/main/articles/toc";
import { Code, Wrapper } from "@/components/common/typography";



export default async function ArticlePage(props: PageProps<"/articles/[articleId]">) {
	const articleId = (await props.params).articleId;
	const { data: article, error } = await tryCatch(getArticle(articleId));

	return (
		<Wrapper
			className="grid grid-cols-4 gap-12 max-lg:[--max-width:720px]!"
			width={976}
		>
			<div className="col-span-full lg:col-span-3">
				<ArticleHeader metadata={article?.metadata} />
				<main className="mt-12">
					{error
						? <Code>{error.message}</Code>
						: <ArticleContent content={article.content} />}
				</main>
			</div>
			<ArticleTOC
				className="max-lg:hidden"
				content={article?.content}
			/>
		</Wrapper>
	);
}