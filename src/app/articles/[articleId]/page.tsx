import { tryCatch } from "@/lib/try-catch";
import { getArticle } from "@/lib/article/utils";

// Components & UI
import { ArticleContent, ArticleHeader } from "@/components/main/articles/article";
import { Code } from "@/components/common/typography";
import { WrapperLayout } from "@/components/common/layouts";



export default async function ArticlePage(props: PageProps<"/articles/[articleId]">) {
	const articleId = (await props.params).articleId;
	const { data: article, error } = await tryCatch(getArticle(articleId));
	const { content, metadata } = article || {};

	return (
		<>
			<WrapperLayout className="pb-12 lg:pt-6">
				<ArticleHeader metadata={metadata} />
			</WrapperLayout>
			<WrapperLayout width={760}>
				<main>
					{error
						? <Code>{error.message}</Code>
						: <ArticleContent content={content} />}
				</main>
			</WrapperLayout>
		</>
	);
}