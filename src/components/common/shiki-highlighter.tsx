"use client";
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
	const isFixedToolbar = showLanguage && !isPlaintext;

	return (
		<div className={cn(
			"group/code relative border rounded-lg text-sm overflow-hidden isolate",
			className,
		)}>
			<div className={cn(
				"flex items-center justify-between gap-2",
				isFixedToolbar
					? "pl-4 pr-2 py-1.5 bg-muted"
					: "absolute top-2 right-2 not-focus-within:opacity-20 group-hover/code:opacity-100 transition-opacity z-1",
			)}>
				{isFixedToolbar && <Muted className="font-mono text-sm">{language}</Muted>}
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
				className="*:px-5! *:py-3! *:rounded-t-none! *:rounded-b-lg!"
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
			className={cn("size-7 text-muted-foreground rounded-full [&_svg]:size-3.5", className)}
			onClick={async () => copy(code)}
			asChild
		>
			<CopyButton showIsCopied={copied} />
		</Button>
	);
}