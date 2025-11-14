"use client";
import { cn } from "@/lib/utils";

// Components & UI
import Image from "next/image";
import { H1 } from "@/components/common/typography";
import { Markdown } from "@/components/common/markdown";

// Icons & Images
import { CalendarBlankIcon } from "@phosphor-icons/react";

// Types & Interfaces
import type { ArticleMetadata } from "@/lib/article/types";



export function ArticleHeader({ metadata }: { metadata?: ArticleMetadata }) {
	const title = metadata?.title || "Unknown Article";
	const description = metadata?.description || "No description.";
	const image = metadata?.image || "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQRgPt9uBWlDj3kitow0r8z5VN42BInQgvEmGc";
	const updatedAt = metadata?.updatedAt
		? new Date(metadata.updatedAt).toLocaleDateString() : "…?";

	return (
		<header id="header" className="grid gap-y-3 lg:gap-y-4">
			<Image
				src={image}
				alt={title}
				className={cn(
					"aspect-video rounded-xl shadow-lg object-cover",
					"select-none pointer-events-none",
				)}
				sizes="(max-width: 64rem) 100vw, 720px"
				width={720}
				height={405}
				priority
			/>
			<H1 className="mt-1 lg:text-4xl text-balance">{title}</H1>
			<div className="grid gap-1.5">
				<div className="text-lg text-muted-foreground">
					<Markdown>{description}</Markdown>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<CalendarBlankIcon className="size-4 text-primary" />
					<span className="font-light text-muted-foreground">
						Last updated on {updatedAt}
					</span>
				</div>
			</div>
		</header>
	);
}

export function ArticleContent({ content }: { content: string }) {
	return (
		<article>
			<Markdown renderH1={false}>
				{content || ""}
			</Markdown>
		</article>
	);
}