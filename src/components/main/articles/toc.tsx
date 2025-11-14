import { cn } from "@/lib/utils";

// Markdown
import GithubSlugger from "github-slugger";
import remarkParse from "remark-parse";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";

// Components & UI
import { Link } from "@/components/common/typography";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons & Images
import { BookOpenTextIcon } from "@phosphor-icons/react/ssr";

// Types & Interfaces
import type { Route } from "next";
type Heading = {
	depth: number;
	text: string;
	url: string;
};



export function ArticleTOC({
	className,
	content
}: React.ComponentProps<"nav"> & { content?: string }) {
	const headings = getHeadingList(content);

	return (
		<nav className={cn("sticky top-16 h-fit p-2", className)}>
			<div className="flex items-center gap-2 pb-1 text-sm text-muted-foreground">
				<BookOpenTextIcon className="size-4" />
				On this page
			</div>
			<ScrollArea className="h-[70svh]">
				<div className="flex flex-col m-2 px-2 border-l">
					{headings.map(heading => (
						<Link
							key={heading.url}
							variant="hover"
							data-depth={heading.depth}
							className="justify-normal w-auto p-2 py-1 font-normal text-muted-foreground data-[depth=3]:ml-4"
							href={heading.url as Route}
							scroll={true}
						>
							{heading.text}
						</Link>
					))}
				</div>
			</ScrollArea>
		</nav>
	);
}

function getHeadingList(content: string | undefined): Heading[] {
	if (!content) return [];

	const slugger = new GithubSlugger();
	const headings = [{ depth: 0, text: "(Top)", url: "#header" }];
	const tree = remark().use(remarkParse).parse(content);

	visit(tree, "heading", (node) => {
		const depth = node.depth;
		const text = mdastToString(node);
		const url = `#${slugger.slug(text)}`;
		if (depth !== 1 && depth < 4) headings.push({ depth, text, url });
	});
	return headings;
}