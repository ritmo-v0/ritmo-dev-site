import { tryCatch } from "@/lib/try-catch";
import { getArticles } from "@/lib/article/utils";
import { getBaseUrl } from "@/lib/utils";

// Components & UI
import { ArticleList } from "@/components/main/articles/list";
import { JsonLd } from "@/components/ui/json-ld";

// Types & Interfaces
import type { ItemList } from "schema-dts";



export default async function ArticlesPage() {
	const { data: articles, error } = await tryCatch(getArticles());
	if (error) throw error;

	const ARTICLES_JSONLD: ItemList = {
		"@type": "ItemList",
		name: "文章列表",  // TODO: i18n?
		numberOfItems: articles.length,
		url: `${getBaseUrl().origin}/articles`,
		itemListElement: articles.map((article, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: article.title,
			description: article.content,
			url: `${getBaseUrl().origin}/articles/${article.shortId}`,
		})),
	};

	return (
		<div className="pt-8 lg:pt-24">
			<JsonLd data={ARTICLES_JSONLD} />
			<ArticleList articles={articles} />
		</div>
	);
}