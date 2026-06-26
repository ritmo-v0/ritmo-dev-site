import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { getBaseUrl } from "@/lib/utils";

// Articles
import { tryCatch } from "@/lib/try-catch";
import { getArticles } from "@/lib/article/utils";

// Components & UI
import { ArticleList } from "@/components/main/articles/list";
import { JsonLd } from "@/components/json-ld";

// Types & Interfaces
import type { ItemList } from "schema-dts";



export default async function ArticlesPage(
	{ params }: PageProps<"/[locale]/articles">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	const t = await getTranslations("articles");

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
		<main className="pt-8 lg:pt-24">
			<JsonLd data={ARTICLES_JSONLD} />
			<h1 className="sr-only">{t("title")}</h1>
			<ArticleList articles={articles} />
		</main>
	);
}