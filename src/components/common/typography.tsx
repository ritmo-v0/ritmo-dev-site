import * as React from "react";
import { cn } from "@/lib/utils";

// Components & UI
import Link from "next/link";
// import Image from "next/image";
import { Slot as SlotPrimitive } from "radix-ui";

// Markdown

// Types & Interfaces
import type { AsChild } from "@/types";



function H1({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"h1"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h1";

	return <Comp className={cn("scroll-m-20 font-heading text-3xl font-bold tracking-tight", className)} {...props} />;
}

function H2({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"h2"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h2";

	return <Comp className={cn("mt-12 scroll-m-20 font-heading text-2xl font-semibold tracking-tight first:mt-0 [&+p]:!mt-4", className)} {...props} />;
}

function H3({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"h3"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h3";

	return <Comp className={cn("mt-8 scroll-m-20 font-heading text-xl font-semibold tracking-tight first:mt-0 [&+p]:!mt-2", className)} {...props} />;
}

function H4({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"h4"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h4";

	return <Comp className={cn("scroll-m-20 font-heading text-lg font-semibold tracking-tight", className)} {...props} />;
}

function H5({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"h5"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h5";

	return <Comp className={cn("scroll-m-20 font-heading text-base font-medium tracking-tight", className)} {...props} />;
}

function H6({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"h6"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "h6";

	return <Comp className={cn("scroll-m-20 font-heading text-sm font-medium tracking-tight", className)} {...props} />;
}

function P({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"p"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "p";

	return <Comp className={cn("leading-relaxed [&:not(:first-child)]:mt-4 [word-break:break-word]", className)} {...props} />;
}

function Muted({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"p"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "p";

	return <Comp className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function InlineCode({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"code"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "code";

	return <Comp className={cn("bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm", className)} {...props} />;
}

function Blockquote({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"blockquote"> & AsChild) {
	const Comp = asChild ? SlotPrimitive.Slot : "blockquote";

	return <Comp className={cn("border-[color-mix(in_oklch,_var(--primary),_white_10%)] border-l-3 pl-6 font-serif italic [&:not(:first-child)]:mt-4", className)} {...props} />;
}

function Anchor({
	className,
	href,
	...props
}: React.ComponentProps<"a"> & { href: string }) {
	return (
		<Link
			href={href}
			className={cn("font-medium text-primary hover:text- underline underline-offset-4", className)}
			target={href.startsWith("https") ? "_blank" : undefined}
			rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
			{...props}
		/>
	);
}

export {
	H1, H2, H3, H4, H5, H6,
	P,
	Muted,
	InlineCode,
	Blockquote,
	Anchor,
};