import { tryCatch } from "@/lib/try-catch";
import { getArticles } from "@/lib/article/utils";

// Components & UI
import { ArticleList } from "@/components/main/articles/list";
import { Code, Wrapper } from "@/components/common/typography";



export default async function ArticlesPage() {
	const { data, error } = await tryCatch(getArticles());
	const articles = data || [];

	return (
		<Wrapper className="pt-8 lg:pt-24" width={720}>
			{error
				? <Code>{error.message}</Code>
				: <ArticleList articles={articles} />}
		</Wrapper>
	);
}