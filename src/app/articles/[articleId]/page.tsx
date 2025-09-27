import { tryCatch } from "@/lib/try-catch";
import { getArticle } from "@/lib/article/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { ArticleContent, ArticleHeader } from "@/components/main/articles/article";
import { Code, Link } from "@/components/common/typography";
import { WrapperLayout } from "@/components/common/layouts";

// Icons & Images
import { ArrowLeft } from "lucide-react";



export default async function ArticlePage(props: PageProps<"/articles/[articleId]">) {
	const articleId = (await props.params).articleId;
	const { data: article, error } = await tryCatch(getArticle(articleId));
	const { content, metadata } = article || {};

	return (
		<>
			<WrapperLayout className="max-lg:pt-4 py-12">
				<Button
					variant="ghost"
					className="text-muted-foreground"
					asChild
				>
					<Link href="/articles" variant="nothing">
						<ArrowLeft />Back to Articles
					</Link>
				</Button>
				<ArticleHeader metadata={metadata} />
			</WrapperLayout>
			<WrapperLayout width={1080}>
				<main>
					{error
						? <Code>{error.message}</Code>
						: <ArticleContent content={content} />}
				</main>
			</WrapperLayout>
		</>
	);
}