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
import { CopyButton } from "./motion-buttons";
import { Muted } from "./typography";

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
		>
			{code}
		</Pre>
	);
}

export function Pre({
	className,
	code,
	language = "plaintext",
	showLanguage = true,
	...props
}: React.ComponentProps<"pre"> & CodeProps) {
	const { highlighter, isHighlighterReady } = useShiki();
	if (!isHighlighterReady || !highlighter) return null;

	const isPlaintext = language === "plaintext";

	return (
		<div className={cn("group/code relative rounded-lg overflow-hidden isolate", className)}>
			<div className={cn(
				"flex items-center gap-2",
				(showLanguage && !isPlaintext)
					? "justify-between pl-4 pr-2 py-2 bg-muted"
					: "absolute top-2 right-2 opacity-20 group-hover/code:opacity-100 transition-opacity z-1",
			)}>
				{(showLanguage && !isPlaintext) && <Muted className="font-mono text-sm">{language}</Muted>}
				<CodeCopyButton code={code} />
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
				showLineNumbers={!isPlaintext}
				tabindex={-1}
				className="text-sm [&_pre]:px-5! [&_pre]:py-3! [&_pre]:rounded-t-none! [&_pre]:rounded-b-md!"
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
			className={cn("size-6 text-muted-foreground", className)}
			onClick={async () => copy(code)}
			asChild
		>
			<CopyButton showIsCopied={copied} />
		</Button>
	);
}