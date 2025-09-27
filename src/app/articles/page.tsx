import { tryCatch } from "@/lib/try-catch";
import { getArticles } from "@/lib/article/utils";

// Components & UI
import { Code } from "@/components/common/typography";
import { WrapperLayout } from "@/components/common/layouts";
import { ArticleList } from "@/components/main/articles/article-list";



export default async function ArticlesPage() {
	const { data, error } = await tryCatch(getArticles());
	const articles = data || [];

	return (
		<WrapperLayout className="mt-12 lg:mt-24" width={1080}>
			{error
				? <Code>{error.message}</Code>
				: <ArticleList articles={articles} />}
		</WrapperLayout>
	);
}