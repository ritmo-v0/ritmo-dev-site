"use client";

// Components & UI
import Image from "next/image";
import { Markdown } from "@/components/common/markdown";
import { H1, Muted } from "@/components/common/typography";

// Icons & Images
import { Calendar } from "lucide-react";

// Types & Interfaces
import type { ArticleMetadata } from "@/lib/article/types";



export function ArticleHeader({ metadata }: { metadata?: ArticleMetadata }) {
	const title = metadata?.title || "Unknown Article";
	const description = metadata?.description || "No description.";
	const image = metadata?.image || "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQRgPt9uBWlDj3kitow0r8z5VN42BInQgvEmGc";
	const updatedAt = metadata?.updatedAt
		? new Date(metadata.updatedAt).toLocaleDateString() : "…?";

	return (
		<header className="flex max-lg:flex-col-reverse lg:items-center justify-between gap-x-12 gap-y-6 font-heading">
			<div>
				<H1 className="lg:text-5xl lg:text-balance">{title}</H1>
				<div className="mt-4 lg:mt-6 space-y-2 lg:space-y-4">
					<Muted className="text-lg lg:text-xl">{description}</Muted>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Calendar className="size-4 text-primary" />
						<span>Last updated on {updatedAt}</span>
					</div>
				</div>
			</div>
			<div className="w-full lg:w-md xl:w-xl aspect-video select-none pointer-events-none">
				<Image
					src={image}
					alt={title}
					className="size-full rounded-xl shadow-lg object-cover"
					width={960}
					height={540}
					priority
				/>
			</div>
		</header>
	);
}

export function ArticleContent({ content }: { content?: string }) {
	return (
		<article>
			<Markdown renderH1={false}>
				{content || ""}
			</Markdown>
		</article>
	);
}