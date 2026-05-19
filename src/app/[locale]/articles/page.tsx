import { tryCatch } from "@/lib/try-catch";
import { getArticles } from "@/lib/article/utils";
import { getBaseUrl } from "@/lib/utils";

// Components & UI
import { ArticleList } from "@/components/main/articles/list";
import { Code, Wrapper } from "@/components/common/typography";
import { JsonLd } from "@/components/common/json-ld";

// Types & Interfaces
import type { ItemList } from "schema-dts";



export default async function ArticlesPage() {
	const { data, error } = await tryCatch(getArticles());
	const articles = data || [];

	const ARTICLES_JSONLD: ItemList = {
		"@type": "ItemList",
		name: "文章列表",  // TODO: i18n?
		url: `${getBaseUrl().origin}/articles`,
		itemListElement: articles.map((article, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: article.title,
			url: `${getBaseUrl().origin}/articles/${article.shortId}`,
		})),
	};

	return (
		<Wrapper className="pt-8 lg:pt-24" width={720}>
			<JsonLd data={ARTICLES_JSONLD} />
			{error
				? <Code>{error.message}</Code>
				: <ArticleList articles={articles} />}
		</Wrapper>
	);
}