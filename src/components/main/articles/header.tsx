"use client";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useCopy } from "@/hooks/use-copy";
import { isBadgeVariant } from "@/lib/article/utils";
import { cn } from "@/lib/utils";

// Components & UI
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/common/markdown";
import { H1, Link, Muted } from "@/components/common/typography";
import { AnimatedIcon } from "@/components/common/motion-buttons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/ui/tooltip";

// Icons & Images
import {
	ArrowUUpLeftIcon,
	CheckIcon,
	ExportIcon,
	LinkSimpleIcon,
} from "@phosphor-icons/react";

// Types & Interfaces
import type { ArticleMetadata } from "@/lib/article/types";



export function ArticleHeader({ metadata }: { metadata: ArticleMetadata }) {
	const locale = useLocale();
	const format = useFormatter();
	const t = useTranslations("articles");

	const { tags, title, description } = metadata;
	const image = metadata.image || "https://img.ritmo.dev/placeholder.webp";
	const publishedAt = format.dateTime(
		new Date(metadata.publishedAt),
		locale === "en" ? "short" : "numeric"
	);

	return (
		<header id="header" className="grid gap-6">
			{/* Actions */}
			<div className="flex items-center justify-between gap-4">
				<Link
					href="/articles"
					className="-ml-2.5 h-full pl-2.5 pr-3"
					variant="hover"
				>
					<ArrowUUpLeftIcon />
					{t("back")}
				</Link>
				<ArticleActions />
			</div>

			{/* OG Image */}
			<Image
				src={image}
				alt={title}
				className={cn(
					"aspect-video rounded-2xl shadow-lg object-cover",
					"select-none pointer-events-none",
				)}
				sizes="(max-width: 64rem) 100vw, 720px"
				width={720}
				height={405}
				loading="eager"
			/>

			{/* Metadata */}
			<div className="flex items-center gap-4">
				<div className="flex gap-2">
					{tags.map(tag => (
						<Badge
							key={tag}
							variant={isBadgeVariant(tag) ? tag : "outline"}
						>
							{tag}
						</Badge>
					))}
				</div>
				<Muted className="text-xs">{publishedAt}</Muted>
			</div>
			<div className="grid gap-3">
				<H1 className="lg:text-4xl text-balance">{title}</H1>
				<div className="text-muted-foreground">
					<Markdown>{description}</Markdown>
				</div>
			</div>
		</header>
	);
}

function ArticleActions() {
	const { copy, copied } = useCopy();
	const t = useTranslations("articles");

	async function handleShare() {
		const url = location.href;

		try {
			if (navigator.share) {
				await navigator.share({
					title: document.title,
					url,
				});
			} else await copy(url);
		} catch { }
	}

	return (
		<div className="flex items-center text-muted-foreground">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger render={
						<Button
							variant="ghost"
							size="icon"
							onClick={async () => await copy(location.href)}
						/>
					}>
						<AnimatePresence mode="popLayout" initial={false}>
							{copied
								? <AnimatedIcon key="check"><CheckIcon /></AnimatedIcon>
								: <AnimatedIcon key="link"><LinkSimpleIcon /></AnimatedIcon>}
						</AnimatePresence>
					</TooltipTrigger>
					<TooltipContent>
						{t("copy_link")}
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger render={
						<Button
							variant="ghost"
							size="icon"
							onClick={handleShare}
						/>
					}>
						<ExportIcon />
					</TooltipTrigger>
					<TooltipContent>
						{t("share")}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}