import { cn } from "cn";

// Components & UI
import { MarkdownAsync } from "@/components/ui/markdown-async";



export function ArticleContent({ content }: { content: string }) {
	return (
		<article className={cn(
			"*:[h2]:mb-4 *:[h2]:pb-2 *:[h2]:border-b",
			"[&>section[data-footnotes]]:mt-10",
			"[&>section[data-footnotes]]:pt-8",
			"[&>section[data-footnotes]]:border-t",
		)}>
			<MarkdownAsync renderH1={false}>
				{content}
			</MarkdownAsync>
		</article>
	);
}