import { tryCatch } from "@/lib/try-catch";
import { getArticles } from "@/lib/article/utils";

// Components & UI
import { ArticleList } from "@/components/main/articles/article-list";
import { Code, Wrapper } from "@/components/common/typography";



export default async function ArticlesPage() {
	const { data, error } = await tryCatch(getArticles());
	const articles = data || [];

	return (
		<Wrapper className="mt-12 lg:mt-24" width={760}>
			{error
				? <Code>{error.message}</Code>
				: <ArticleList articles={articles} />}
		</Wrapper>
	);
}