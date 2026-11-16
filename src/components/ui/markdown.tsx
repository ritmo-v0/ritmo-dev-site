import { isValidElement } from "react";
import { cn } from "cn";

// Components & UI
import Image from "next/image";
import { Markdown as BaseMarkdown } from "@ritmo-v0/markdown";
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
import type { Components } from "@ritmo-v0/markdown";

// Constants & Variables
export const MARKDOWN_COMPONENTS: Components = {
	h1: H1,
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
	strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
	code: Code,
	pre: MarkdownPre,
	blockquote: Blockquote,
	aside: Aside,
	a: ({ href, ...props }) => <Link href={href as Route || "#"} {...props} />,
	img: MarkdownImage,
	iframe: (props) => <IFrame className="my-4 first:mt-0 last:mb-0" {...props} />,
	table: (props) => <Table className="my-4 first:mt-0 last:mb-0" {...props} />,
	thead: TableHeader,
	tbody: TableBody,
	tr: TableRow,
	th: TableHead,
	td: TableCell,
};



export function Markdown({
	components,
	...props
}: React.ComponentProps<typeof BaseMarkdown>) {
	return (
		<BaseMarkdown
			components={components
				? { ...MARKDOWN_COMPONENTS, ...components }
				: MARKDOWN_COMPONENTS}
			{...props}
		/>
	);
}

function MarkdownImage({
	src,
	alt,
	width,
	height,
	...props
}: React.ComponentProps<"img">) {
	if (typeof src !== "string") return null;

	const w = Number(width);
	const h = Number(height);
	const size = w > 0 && h > 0 ? { width: w, height: h } : { fill: true };

	return (
		<span className={cn(
			"relative block [&+br]:hidden [&+br+span]:block [&+br+span]:-mt-4 [&+br+span]:mb-8",
			"[&+br+span]:text-center [&+br+span]:text-sm [&+br+span]:text-muted-foreground [&+br+span]:leading-normal",
		)}>
			<Image
				src={src}
				alt={alt || ""}
				className={cn(
					"mx-auto my-8 max-w-3xl rounded-2xl shadow-lg object-cover not-only:first:mt-0",
					"ring-1 ring-foreground/5 dark:ring-foreground/10",
					"fill" in size ? "relative!" : "h-auto w-full",
				)}
				sizes="(max-width: 64rem) 100vw, 768px"
				loading="lazy"
				{...size}
				{...props}
			/>
		</span>
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