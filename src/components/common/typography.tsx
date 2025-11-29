import { memo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import NextLink from "next/link";
import { Twemoji } from "./twemoji";
import { Slot as SlotPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";

// Types & Interfaces
import type { LinkProps } from "next/link";
import type { VariantProps } from "class-variance-authority";
import type { AsChild } from "./types";



function Wrapper({
	className,
	width = 1400,
	boxSizing = "content",
	asChild = false,
	...props
}: React.ComponentProps<"div">
	& AsChild
	& { boxSizing?: "border" | "content"; width?: number }) {
	const Comp = asChild ? SlotPrimitive.Slot : "div";

	return (
		<Comp
			style={{ "--max-width": `${width}px` } as React.CSSProperties}
			className={cn(
				"@container [max-inline-size:var(--max-width)] mx-auto px-4 md:px-8",
				boxSizing === "content" && "box-content",
				className,
			)}
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
	asChild = false,
	...props
}: React.ComponentProps<"h1"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h1";

	return (
		<Comp
			className={cn("mt-12 scroll-m-20 font-heading text-3xl font-bold leading-tight tracking-tight first:mt-0", className)}
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
			className={cn("mt-12 scroll-m-20 font-heading text-2xl font-semibold leading-tight tracking-tight first:mt-0 [&+p]:mt-4!", className)}
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
			className={cn("mt-8 scroll-m-20 font-heading text-xl font-semibold leading-tight tracking-tight first:mt-0 [&+p]:mt-4!", className)}
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
			className={cn("mt-8 scroll-m-20 font-heading text-lg font-semibold leading-tight tracking-tight first:mt-0 [&+p]:mt-2!", className)}
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
			className={cn("mt-8 scroll-m-20 font-heading text-base font-medium leading-tight tracking-tight first:mt-0 [&+p]:mt-2!", className)}
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
			className={cn("mt-8 scroll-m-20 font-heading font-medium leading-tight tracking-tight first:mt-0 [&+p]:mt-2!", className)}
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

	return <Comp className={cn("list-disc list-outside not-first:mt-2 pl-6 marker:text-[color-mix(in_oklch,var(--primary),white_20%)]", className)} {...props} />;
}

function OL({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"ol"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "ol";

	return <Comp className={cn("list-decimal list-outside not-first:mt-2 pl-6 marker:text-[color-mix(in_oklch,var(--primary),white_20%)]", className)} {...props} />;
}

const LI = memo(function LI({
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

const P = memo(function P({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"p"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "p";

	return (
		<Comp
			className={cn("leading-relaxed not-first:mt-8 wrap-break-word [&+p]:mt-4!", className)}
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

const Code = memo(function Code({
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

const Blockquote = memo(function Blockquote({
	className,
	children,
	asChild = false,
	...props
}: React.ComponentProps<"blockquote"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "blockquote";

	return (
		<Comp
			className={cn("border-[color-mix(in_oklch,var(--primary),white_10%)] border-l-3 pl-6 font-serif font-medium italic not-first:mt-8", className)}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}, (prev, next) => prev.children === next.children);

const asideVariants = cva(
	"px-6 py-4 rounded-lg not-first:mt-8",
	{
		variants: {
			variant: {
				default: "bg-card border",
				info: "bg-card border",
				warning: "bg-amber-500/10 border-amber-500",
				danger: "bg-destructive/10 border-destructive",
				spoiler: "bg-card border transition-opacity opacity-10 hover:opacity-100",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

const Aside = memo(function Aside({
	className,
	children,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"aside"> &
	VariantProps<typeof asideVariants> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "aside";

	return (
		<Comp
			className={cn(asideVariants({ variant, className }))}
			{...props}
		>
			{asChild ? children : <Twemoji>{children}</Twemoji>}
		</Comp>
	);
}, (prev, next) => prev.children === next.children);

const linkVariants = cva(
	"rounded-xs transition-colors",
	{
		variants: {
			variant: {
				default: "font-medium text-primary underline-offset-4 underline hover:text-primary/60 outline-offset-4",
				hover: "inline-flex items-center justify-center gap-2 w-max font-medium text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 [&_svg]:shrink-0 outline-offset-4",
				ghost: "rounded-lg hover:bg-accent dark:hover:bg-accent/50 hover:text-accent-foreground focus-visible:bg-accent dark:focus-visible:bg-accent/50 focus-visible:text-accent-foreground data-[active]:bg-accent dark:data-[active]:bg-accent data-[active]:text-accent-foreground",
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
	const s = href.toString();
	const isExternal = !(s.startsWith("/") || s.startsWith("#"));

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

function ButtonLink<R extends string>({
	className,
	children,
	variant,
	size,
	...props
}: Pick<React.ComponentProps<typeof Button>, "variant" | "size"> & LinkProps<R>) {
	return (
		<Button
			variant={variant}
			size={size}
			className={cn(className)}
			asChild
		>
			<Link variant="nothing" {...props}>
				{children}
			</Link>
		</Button>
	);
}

function IFrame({
	className,
	...props
}: React.ComponentProps<"iframe">) {
	return (
		<iframe
			{...props}
			className={cn("w-full aspect-video rounded-xl", className)}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
		/>
	);
}

export {
	Wrapper, Section,
	H1, H2, H3, H4, H5, H6,
	UL, OL, LI, P, HR,
	Muted,
	Code,
	Blockquote, Aside,
	Link, ButtonLink,
	IFrame,
};