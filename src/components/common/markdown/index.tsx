import { isValidElement } from "react";
import { cn } from "@/lib/utils";

// Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
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



export function Markdown({
	components,
	remarkPlugins,
	rehypePlugins,
	renderH1 = true,
	...props
}: React.ComponentProps<typeof ReactMarkdown> & { renderH1?: boolean }) {
	return (
		<ReactMarkdown
			remarkPlugins={[
				[remarkMath, { singleDollarTextMath: false }],
				remarkBreaks,
				remarkDirective,
				remarkTextDirective,
				remarkLeafDirective,
				remarkContainerDirective,
				[remarkGfm, { singleTilde: false }],
				...(remarkPlugins ?? []),
			]}
			rehypePlugins={[
				rehypeRaw,
				rehypeSlug,
				rehypeKatex,
				...(rehypePlugins ?? []),
			]}
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
							"relative",
							"[&+br]:hidden [&+br+span]:block [&+br+span]:text-center [&+br+span]:text-sm [&+br+span]:text-muted-foreground",
						)}>
							<Image
								src={src}
								alt={alt || ""}
								className="relative! mx-auto my-3 max-w-3xl rounded-2xl shadow-lg object-cover not-only:first:mt-0"
								sizes="(max-width: 64rem) 100vw, 768px"
								loading="lazy"
								fill
								{...props}
							/>
						</span>
					)
				),
				iframe: IFrame,
				table: (props) => <Table className="mt-2" {...props} />,
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
			className={cn("my-2 first:mt-0 last:mb-0", className)}
			code={code}
			language={language}
			{...props}
		/>
	);
}