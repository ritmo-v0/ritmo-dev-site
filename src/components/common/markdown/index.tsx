import { isValidElement } from "react";
import { cn } from "cn";

// Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import remarkCjk from "remark-cjk-friendly";
import remarkCjkGfmStrikethrough from "remark-cjk-friendly-gfm-strikethrough";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import {
	remarkTextDirective,
	remarkLeafDirective,
	remarkContainerDirective,
} from "./plugins";

// Components & UI
import Image from "next/image";
import { Pre } from "@/components/common/shiki-highlighter";
import {
	H1, H2, H3, H4, H5, H6,
	UL, OL, LI, P, HR,
	Code, Blockquote, Aside,
	Link, IFrame,
} from "@/components/common/typography";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Types & Interfaces
import type { Route } from "next";
import type { PluggableList } from "unified";

// Constants & Variables
const REMARK_PLUGINS: PluggableList = [
	remarkBreaks,
	[remarkGfm, { singleTilde: false }],
	[remarkMath, { singleDollarTextMath: false }],
	remarkCjk,
	remarkCjkGfmStrikethrough,
	remarkDirective,
	remarkTextDirective,
	remarkLeafDirective,
	remarkContainerDirective,
];
const REHYPE_PLUGINS: PluggableList = [
	rehypeRaw,
	rehypeSlug,
	rehypeKatex,
];



export function Markdown({
	components,
	remarkPlugins,
	rehypePlugins,
	renderH1 = true,
	...props
}: React.ComponentProps<typeof ReactMarkdown> & { renderH1?: boolean }) {
	return (
		<ReactMarkdown
			remarkPlugins={[...REMARK_PLUGINS, ...(remarkPlugins ?? [])]}
			rehypePlugins={[...REHYPE_PLUGINS, ...(rehypePlugins ?? [])]}
			components={{
				...components,
				h1: (props) => renderH1 ? <H1 {...props} /> : null,
				h2: H2,
				h3: H3,
				h4: H4,
				h5: H5,
				h6: H6,
				p: P,
				hr: HR,
				ul: UL,
				ol: OL,
				li: LI,
				code: Code,
				pre: MarkdownPre,
				blockquote: Blockquote,
				aside: Aside,
				a: ({ href, ...props }) => <Link href={href as Route || "#"} {...props} />,
				img: ({ src, alt, width, height, ...props }) => (
					typeof src !== "string" ? null : (
						<span className={cn(
							"relative block [&+br]:hidden [&+br+span]:block [&+br+span]:-mt-4 [&+br+span]:mb-8",
							"[&+br+span]:text-center [&+br+span]:text-sm [&+br+span]:text-muted-foreground [&+br+span]:leading-normal",
						)}>
							<Image
								src={src}
								alt={alt || ""}
								className={cn(
									"relative! mx-auto my-8 max-w-3xl rounded-2xl shadow-lg object-cover not-only:first:mt-0",
									"ring-1 ring-foreground/5 dark:ring-foreground/10",
								)}
								sizes="(max-width: 64rem) 100vw, 768px"
								loading="lazy"
								fill
								{...props}
							/>
						</span>
					)
				),
				iframe: (props) => <IFrame className="my-4 first:mt-0 last:mb-0" {...props} />,
				table: (props) => <Table className="my-4 first:mt-0 last:mb-0" {...props} />,
				thead: TableHeader,
				tbody: TableBody,
				tr: TableRow,
				th: TableHead,
				td: TableCell,
			}}
			{...props}
		/>
	);
}

function MarkdownPre({
	className,
	children,
	...props
}: React.ComponentProps<"pre">) {
	const isValidCodeElement = isValidElement(children);
	if (!isValidCodeElement) return null;

	const codeElement = children.props as React.ComponentProps<"code">;

	const rawCode = codeElement?.children ?? "";
	const code = typeof rawCode === "string"
		? rawCode.trimEnd()
		: String(rawCode).trimEnd();

	const codeClassName = codeElement?.className ?? "";
	const matchLang = codeClassName?.match(/language-(\w+)/);
	const language = matchLang ? matchLang[1] : "plaintext";

	return (
		<Pre
			className={cn("my-4 first:mt-0 last:mb-0", className)}
			code={code}
			language={language}
			{...props}
		/>
	);
}