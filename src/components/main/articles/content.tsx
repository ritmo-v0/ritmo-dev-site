import { cn } from "@/lib/utils";

// Components & UI
import { Markdown } from "@/components/common/markdown";



export function ArticleContent({ content }: { content: string }) {
	return (
		<article className={cn(
			"*:[h2]:pb-2 *:[h2]:border-b",
			"[&>section[data-footnotes]]:mt-8",
			"[&>section[data-footnotes]]:pt-8",
			"[&>section[data-footnotes]]:border-t",
		)}>
			<Markdown renderH1={false}>
				{content}
			</Markdown>
		</article>
	);
}