"use client";
import { memo } from "react";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { match } from "ts-pattern";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import NextLink from "next/link";
import NextImage from "next/image";
import { motion } from "motion/react";
import { Twemoji } from "./twemoji";
import { buttonVariants } from "@/components/ui/button";

// Icons & Images
import {
	CheckCircleIcon,
	DetectiveIcon,
	InfoIcon,
	WarningIcon,
	XCircleIcon,
} from "@phosphor-icons/react";

// Types & Interfaces
import type { LinkProps } from "next/link";
import type { Icon } from "@phosphor-icons/react";
import type { VariantProps } from "class-variance-authority";



function Wrapper({
	className,
	width = 1400,
	boxSizing = "content",
	render,
	...props
}: useRender.ComponentProps<"div"> & {
	boxSizing?: "border" | "content";
	width?: number;
}) {
	return useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(
			{
				style: { "--max-width": `${width}px` } as React.CSSProperties,
				className: cn(
					"@container mx-auto max-inline-(--max-width) px-4 md:px-8",
					"data-[box-sizing=border]:box-border data-[box-sizing=content]:box-content",
					className,
				),
			},
			props
		),
		state: {
			"box-sizing": boxSizing,
		},
	});
}

function Section({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			className={cn(
				"py-6",
				"has-[>:first-child:is(h1)]:py-8",
				"has-[>:first-child:is(h2)]:py-6",
				"has-[>:first-child:is(h3)]:py-3",
				"has-[>:first-child:is(h4)]:py-2",
				"has-[>:first-child:is(h5,h6)]:py-1",
				className,
			)}
			{...props}
		/>
	);
}

function H1({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h1">) {
	return useRender({
		defaultTagName: "h1",
		render,
		props: mergeProps<"h1">(
			{
				className: cn(
					"font-heading font-bold text-3xl/tight tracking-tight scroll-m-20",
					"mt-12 first:mt-0 [&>strong]:font-bold [&+p]:mt-4!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H2({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h2">) {
	return useRender({
		defaultTagName: "h2",
		render,
		props: mergeProps<"h2">(
			{
				className: cn(
					"font-heading font-semibold text-2xl/tight tracking-tight scroll-m-20",
					"mt-8 first:mt-0 [&>strong]:font-semibold [&+p]:mt-4!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H3({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h3">) {
	return useRender({
		defaultTagName: "h3",
		render,
		props: mergeProps<"h3">(
			{
				className: cn(
					"font-heading font-semibold text-xl/tight tracking-tight scroll-m-20",
					"mt-6 first:mt-0 [&>strong]:font-semibold [&+p]:mt-4!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H4({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h4">) {
	return useRender({
		defaultTagName: "h4",
		render,
		props: mergeProps<"h4">(
			{
				className: cn(
					"font-heading font-semibold text-lg/tight tracking-tight scroll-m-20",
					"mt-4 first:mt-0 [&>strong]:font-semibold [&+p]:mt-2!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H5({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h5">) {
	return useRender({
		defaultTagName: "h5",
		render,
		props: mergeProps<"h5">(
			{
				className: cn(
					"font-heading font-medium text-base/tight tracking-tight scroll-m-20",
					"mt-4 first:mt-0 [&>strong]:font-medium [&+p]:mt-2!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H6({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h6">) {
	return useRender({
		defaultTagName: "h6",
		render,
		props: mergeProps<"h6">(
			{
				className: cn(
					"font-heading font-medium text-base/tight tracking-tight scroll-m-20",
					"mt-4 first:mt-0 [&>strong]:font-medium [&+p]:mt-2!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

const P = memo(function P({
	className,
	children,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"leading-relaxed wrap-break-word not-first:mt-8 [&+p]:mt-4!",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</p>
	);
}, (prev, next) => prev.children === next.children);

function Muted({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"p">) {
	return useRender({
		defaultTagName: "p",
		render,
		props: mergeProps<"p">(
			{
				className: cn("text-muted-foreground text-sm", className),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function HR({ className, ...props }: React.ComponentProps<"hr">) {
	return (
		<hr
			className={cn("my-8 border-t has-[+h1]:mt-12", className)}
			{...props}
		/>
	);
}

function UL({ className, children, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			className={cn(
				"list-disc list-outside not-first:mt-2 pl-6 marker:text-primary",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</ul>
	);
}

function OL({ className, children, ...props }: React.ComponentProps<"ol">) {
	return (
		<ol
			className={cn(
				"list-decimal list-outside not-first:mt-2 pl-6 marker:text-primary",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</ol>
	);
}

const LI = memo(function LI({
	className,
	children,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			className={cn(
				"my-1.5 pl-1 leading-relaxed [&_ul]:mt-0! [&_ol]:mt-0!",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</li>
	);
}, (prev, next) => prev.children === next.children);

const Code = memo(function Code({
	className,
	children,
	...props
}: React.ComponentProps<"code">) {
	return (
		<code
			className={cn(
				"px-1.5 py-0.75 bg-muted font-mono text-[0.875em] text-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-md",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</code>
	);
}, (prev, next) => prev.children === next.children);

const Blockquote = memo(function Blockquote({
	className,
	children,
	...props
}: React.ComponentProps<"blockquote">) {
	return (
		<blockquote
			className={cn(
				"flex gap-6 my-12 first:mt-0 last:mb-0 font-serif italic",
				className,
			)}
			{...props}
		>
			<div
				data-slot="blockquote-handle"
				className="shrink-0 my-0.75 w-0.75 bg-primary rounded-full"
			/>
			<div
				data-slot="blockquote-content"
				className="min-w-0 w-full"
			>
				<Twemoji>{children}</Twemoji>
			</div>
		</blockquote>
	);
}, (prev, next) => prev.children === next.children);

const asideVariants = cva(
	[
		"flex gap-3 my-4 first:mt-0 last:mb-0 p-3 pl-2 bg-card text-card-foreground border rounded-2xl shadow-lg",
		"[&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-5 [&>svg]:pointer-events-none",
		"[--aside-color:var(--card-foreground)] *:data-[slot=aside-handle]:bg-(--aside-color) [&>svg]:text-(--aside-color)",
	],
	{
		variants: {
			variant: {
				info: "[--aside-color:var(--card-foreground)]",
				success: "[--aside-color:var(--color-green-500)]",
				warning: "[--aside-color:var(--color-amber-500)]",
				danger: "[--aside-color:var(--color-destructive)]",
				spoiler: "[--aside-color:var(--color-muted-foreground)]",
			},
		},
		defaultVariants: {
			variant: "info",
		},
	}
);

function Aside({
	className,
	children,
	variant = "info",
	icon,
	...props
}: React.ComponentProps<"aside"> & { icon?: Icon } &
	VariantProps<typeof asideVariants>) {
	const AsideIcon: Icon = icon ?? match(variant)
		.with("info", () => InfoIcon)
		.with("success", () => CheckCircleIcon)
		.with("warning", () => WarningIcon)
		.with("danger", () => XCircleIcon)
		.with("spoiler", () => DetectiveIcon)
		.otherwise(() => InfoIcon);

	return (
		<aside
			className={cn(asideVariants({ variant, className }))}
			{...props}
		>
			<div
				data-slot="aside-handle"
				className="shrink-0 my-1.5 w-0.5 rounded-full"
			/>
			<AsideIcon
				data-slot="aside-icon"
				weight="fill"
				className="my-1"
			/>
			<div
				data-slot="aside-content"
				className={cn(
					"min-w-0 w-full",
					variant === "spoiler" && "transition-[filter] ease-in-out duration-300",
					variant === "spoiler" && "will-change-[filter] blur-sm hover:blur-none",
				)}
			>
				<Twemoji>{children}</Twemoji>
			</div>
		</aside>
	);
};

const linkVariants = cva(
	[
		"outline-none rounded-md transition-colors",
		"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30",
	],
	{
		variants: {
			variant: {
				default: "font-medium text-primary underline-offset-4 underline hover:text-primary/60",
				hover: [
					"shrink-0 inline-flex items-center justify-center gap-2 w-max font-medium text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground",
					"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				],
				ghost: "rounded-2xl hover:bg-muted dark:hover:bg-muted/50 hover:text-foreground",
				nothing: "rounded-2xl",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Link<T extends string>({
	className,
	variant = "default",
	href,
	...props
}: LinkProps<T> & VariantProps<typeof linkVariants>) {
	const s = href.toString();
	const isExternal = !(s.startsWith("/") || s.startsWith("#"));

	return (
		<NextLink
			href={href}
			className={cn(linkVariants({ variant }), className)}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			{...props}
		/>
	);
}

function ButtonLink<T extends string>({
	className,
	variant = "default",
	size = "default",
	href,
	...props
}: LinkProps<T> & VariantProps<typeof buttonVariants>) {
	const s = href.toString();
	const isExternal = !(s.startsWith("/") || s.startsWith("#"));

	return (
		<NextLink
			href={href}
			className={cn(buttonVariants({ variant, size }), className)}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			{...props}
		/>
	);
}

function IFrame({
	className,
	...props
}: React.ComponentProps<"iframe">) {
	return (
		<iframe
			className={cn("w-full aspect-video rounded-2xl", className)}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
			{...props}
		/>
	);
}

const MotionImage = motion.create(NextImage);

export {
	Wrapper, Section,
	H1, H2, H3, H4, H5, H6,
	P, Muted, HR, UL, OL, LI,
	Code, Blockquote, Aside,
	Link, ButtonLink, IFrame, MotionImage,
};