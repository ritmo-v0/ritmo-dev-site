"use client";
import * as React from "react";
import { useShiki } from "@/hooks/use-shiki";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

// Shiki
import ShikiHighlighter from "react-shiki/core";
import OneLight from "@shikijs/themes/one-light"
import OneDarkPro from "@shikijs/themes/one-dark-pro";

// Components & UI
import { Button } from "@/components/ui/button";
import { Muted } from "./typography";
import { CopyButton } from "./motion-buttons";

// Types & Interfaces
export type CodeProps = {
	code: string;
	language?: string;
	showLanguage?: boolean;
};



export function MarkdownPre({
	className,
	children,
	...props
}: React.ComponentProps<"pre">) {
	const isValidCodeElement = React.isValidElement(children);
	const codeElement = isValidCodeElement
		? children.props as React.ComponentProps<"code">
		: null;

	const rawCode = codeElement?.children ?? "";
	const code = typeof rawCode === "string" ? rawCode.trim() : String(rawCode).trim();

	const codeClassName = codeElement?.className ?? "";
	const matchLang = codeClassName?.match(/language-(\w+)/);
	const language = matchLang ? matchLang[1] : "plaintext";

	if (!isValidCodeElement) return null;

	return (
		<PRE
			className={cn("my-2", className)}
			code={code}
			language={language}
			{...props}
		>
			{code}
		</PRE>
	);
}

export function PRE({
	className,
	code,
	language = "plaintext",
	showLanguage = true,
	...props
}: React.ComponentProps<"pre"> & CodeProps) {
	const { highlighter, isHighlighterReady } = useShiki();

	if (!isHighlighterReady || !highlighter) return null;

	return (
		<div className={cn("group/code relative overflow-x-auto rounded-md isolate", className)}>
			<div className={cn(
				"flex items-center gap-2",
				showLanguage
					? "justify-between pl-4 pr-2 py-2 bg-muted text-muted-foreground"
					: "absolute top-2 right-2 opacity-20 group-hover/code:opacity-100 transition-opacity z-1",
			)}>
				{showLanguage && <Muted className="font-mono text-sm">{language}</Muted>}
				<CodeCopyButton
					className=""
					code={code}
				/>
			</div>
			<ShikiHighlighter
				highlighter={highlighter}
				language={language}
				theme={{
					light: OneLight.name as string,
					dark: OneDarkPro.name as string,
				}}
				as="div"
				delay={100}
				showLanguage={false}
				showLineNumbers={language !== "plaintext"}
				tabindex={-1}
				className="text-sm [&_pre]:p-0! [&_pre]:px-5! [&_pre]:py-1.5! [&_pre]:rounded-t-none! [&_pre]:rounded-b-md!"  // [&_pre]:whitespace-pre-wrap
				{...props}
			>
				{code}
			</ShikiHighlighter>
		</div>
	);
}

function CodeCopyButton({
	className,
	code
}: React.ComponentProps<typeof Button> & Pick<CodeProps, "code">) {
	const { copied, copy } = useCopy();

	return (
		<Button
			variant="ghost"
			className={cn("size-6", className)}
			onClick={async () => copy(code)}
			asChild
		>
			<CopyButton showIsCopied={copied} />
		</Button>
	);
}