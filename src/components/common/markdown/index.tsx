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
	Code,
	Blockquote, Aside,
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
	renderH1 = true,
	...props
}: React.ComponentProps<typeof ReactMarkdown> & { renderH1?: boolean }) {
	return (
		<ReactMarkdown
			remarkPlugins={[
				remarkMath,
				remarkBreaks,
				remarkDirective,
				remarkTextDirective,
				remarkLeafDirective,
				remarkContainerDirective,
				[remarkGfm, { singleTilde: false }]
			]}
			rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
			components={{
				h1: (props) => renderH1 ? <H1 {...props} /> : null,
				h2: H2,
				h3: H3,
				h4: H4,
				h5: H5,
				h6: H6,
				ul: UL,
				ol: OL,
				li: LI,
				p: P,
				hr: HR,
				pre: MarkdownPre,
				code: Code,
				blockquote: Blockquote,
				aside: Aside,
				a: ({ children, href, ...props }) => (
					href
						? <Link href={href as Route} {...props}>{children}</Link>
						: <span {...props}>{children}</span>
				),
				img: ({ src, alt, width, height, ...props }) => (
					typeof src !== "string" ? null : (
						<Image
							src={src}
							alt={alt || ""}
							width={Number(width) || 768}
							height={Number(height) || 432}
							className={cn(
								"mx-auto my-2 w-full max-w-3xl h-auto rounded-lg shadow-lg object-cover not-only:first:mt-0",
								"[&+br]:hidden [&+br+span]:block [&+br+span]:text-center [&+br+span]:text-sm [&+br+span]:text-muted-foreground",
							)}
							loading="lazy"
							{...props}
						/>
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
	const codeElement = isValidCodeElement
		? children.props as React.ComponentProps<"code">
		: null;

	const rawCode = codeElement?.children ?? "";
	const code = typeof rawCode === "string" ? rawCode.trimEnd() : String(rawCode).trimEnd();

	const codeClassName = codeElement?.className ?? "";
	const matchLang = codeClassName?.match(/language-(\w+)/);
	const language = matchLang ? matchLang[1] : "plaintext";

	if (!isValidCodeElement) return null;

	return (
		<Pre
			className={cn("my-2", className)}
			code={code}
			language={language}
			{...props}
		/>
	);
}