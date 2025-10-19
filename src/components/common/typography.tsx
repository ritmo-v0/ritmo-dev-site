import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import Image from "next/image";
import NextLink from "next/link";
import { Twemoji } from "./twemoji";
import { MarkdownPre } from "./shiki-highlighter";
import { Slot as SlotPrimitive } from "radix-ui";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Markdown
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

// Types & Interfaces
import type { Route } from "next";
import type { LinkProps } from "next/link";
import type { VariantProps } from "class-variance-authority";
import type { AsChild } from "./types";



function Wrapper({
	className,
	width = 1440,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & AsChild & { width?: number }) {
	const Comp = asChild ? SlotPrimitive.Slot : "div";

	return (
		<Comp
			style={{ maxInlineSize: `${width}px` }}
			className={cn("@container w-full mx-auto px-4 md:px-8", className)}
			{...props}
		/>
	);
}

function Section({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			className={cn(
				"py-6",
				"has-[:first-child:is(h1)]:py-8",
				"has-[:first-child:is(h2)]:py-6",
				"has-[:first-child:is(h3)]:py-3",
				"has-[:first-child:is(h4)]:py-2",
				"has-[:first-child:is(h5,h6)]:py-1",
				className,
			)}
			{...props}
		/>
	);
}

function MarkdownText({
	renderH1 = true,
	...props
}: React.ComponentProps<typeof Markdown> & { renderH1?: boolean }) {
	return (
		<Markdown
			remarkPlugins={[remarkMath, remarkBreaks, [remarkGfm, { singleTilde: false }]]}
			rehypePlugins={[rehypeKatex, rehypeRaw]}
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
								"mx-auto my-2 w-full max-w-3xl h-auto rounded-lg shadow-lg object-cover first:mt-0",
								"[&+br]:hidden [&+br+span]:block [&+br+span]:text-center [&+br+span]:text-sm [&+br+span]:text-muted-foreground",
							)}
							loading="lazy"
							{...props}
						/>
					)
				),
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

function extractId(children: React.ReactNode): string | undefined {
	return typeof children === "string"
		? children.toString().trim().toLowerCase().replace(/\s+/g, "-")
		: undefined;
}

function H1({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"h1"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h1";

	return (
		<Comp
			id={extractId(children)}
			className={cn("mt-12 scroll-m-20 font-heading text-3xl font-bold !leading-tight tracking-tight first:mt-0", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}

function H2({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"h2"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h2";

	return (
		<Comp
			id={extractId(children)}
			className={cn("mt-12 scroll-m-20 font-heading text-2xl font-semibold leading-tight tracking-tight first:mt-0 [&+p]:!mt-4", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}

function H3({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"h3"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h3";

	return (
		<Comp
			id={extractId(children)}
			className={cn("mt-8 scroll-m-20 font-heading text-xl font-semibold leading-tight tracking-tight first:mt-0 [&+p]:!mt-4", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}

function H4({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"h4"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h4";

	return (
		<Comp
			id={extractId(children)}
			className={cn("mt-8 scroll-m-20 font-heading text-lg font-semibold leading-tight tracking-tight first:mt-0 [&+p]:!mt-2", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}

function H5({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"h5"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h5";

	return (
		<Comp
			id={extractId(children)}
			className={cn("mt-8 scroll-m-20 font-heading text-base font-medium leading-tight tracking-tight first:mt-0 [&+p]:!mt-2", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}

function H6({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"h6"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h6";

	return (
		<Comp
			id={extractId(children)}
			className={cn("mt-8 scroll-m-20 font-heading font-medium leading-tight tracking-tight first:mt-0 [&+p]:!mt-2", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}

function UL({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"ul"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "ul";

	return <Comp className={cn("list-disc list-outside [&:not(:first-child)]:mt-2 pl-6 marker:text-[color-mix(in_oklch,_var(--primary),_white_20%)]", className)} {...props} />;
}

function OL({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"ol"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "ol";

	return <Comp className={cn("list-decimal list-outside [&:not(:first-child)]:mt-2 pl-6 marker:text-[color-mix(in_oklch,_var(--primary),_white_20%)]", className)} {...props} />;
}

const LI = React.memo(function LI({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"li"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "li";

	return (
		<Comp
			className={cn("leading-relaxed my-1 pl-1", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}, (prev, next) => prev.children === next.children);

const P = React.memo(function P({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"p"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "p";

	return (
		<Comp
			className={cn("leading-relaxed [&:not(:first-child)]:mt-8 wrap-break-word [&+p]:!mt-4", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}, (prev, next) => prev.children === next.children);

function HR({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"hr"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "hr";

	return <Comp className={cn("mt-8 border-t has-[+h1]:mt-12 has-[+h2]:mt-12 has-[+h3]:mt-8", className)} {...props} />;
}

function Muted({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"p"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "p";

	return (
		<Comp
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}

const Code = React.memo(function Code({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"code"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "code";

	return (
		<Comp
			className={cn("bg-muted px-[0.3rem] py-[0.15rem] font-mono text-[0.875em] rounded", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}, (prev, next) => prev.children === next.children);

const Blockquote = React.memo(function Blockquote({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"blockquote"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "blockquote";

	return (
		<Comp
			className={cn("border-[color-mix(in_oklch,_var(--primary),_white_10%)] border-l-3 pl-6 font-serif font-medium italic not-first:mt-8", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}, (prev, next) => prev.children === next.children);

const linkVariants = cva(
	"rounded-md transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
	{
		variants: {
			variant: {
				default: "w-max font-medium text-primary underline-offset-4 underline",
				hover: "w-max font-medium text-primary underline-offset-4 hover:underline",
				nothing: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Link<R extends string>({
	className,
	variant,
	href,
	...props
}: LinkProps<R> & VariantProps<typeof linkVariants>) {
	const isExternal = !(/^\/(?!\/)/.test(href.toString()));

	return (
		<NextLink
			href={href}
			className={cn(linkVariants({ variant, className }))}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			{...props}
		/>
	);
}

export {
	Wrapper, Section,
	MarkdownText,
	H1, H2, H3, H4, H5, H6,
	UL, OL, LI, P, HR,
	Muted,
	Code,
	Blockquote,
	Link,
};