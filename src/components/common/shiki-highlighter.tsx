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
	const showFigCaption = showLanguage && !isPlaintext;

	return (
		<figure className={cn(
			"group/code relative bg-muted text-sm ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-2xl overflow-hidden isolate",
			className,
		)}>
			<div className={cn(
				"relative flex items-center justify-between gap-2 h-10 px-4 z-1",
				!showFigCaption && "absolute top-0 inset-e-0",
			)}>
				{showFigCaption && (
					<Muted
						className="font-heading"
						render={<figcaption />}>
						{language}
					</Muted>
				)}
				<div className={cn(
					"flex items-center -me-2",
					!showFigCaption && "md:not-focus-within:opacity-20 md:group-hover/code:opacity-100 transition-opacity",
				)}>
					<CodeCopyButton code={code} />
				</div>
				{!showFigCaption && (
					<div className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#282C34] rounded-s-full blur-sm -z-1" />
				)}
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
				className="*:px-4! *:py-2.5! *:rounded-none! *:[scrollbar-width:thin]"
				{...props}
			>
				{code}
			</ShikiHighlighter>
		</figure>
	);
}

function CodeCopyButton({
	className,
	code,
	...props
}: React.ComponentProps<typeof Button> & Pick<CodeProps, "code">) {
	const { copied, copy } = useCopy();

	return (
		<Button
			variant="ghost"
			size="icon-xs"
			className={cn("text-muted-foreground", className)}
			onClick={async () => await copy(code)}
			render={<CopyButton showIsCopied={copied} />}
			{...props}
		/>
	);
}