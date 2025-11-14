"use client";
import { isBadgeVariant } from "@/lib/article/utils";

// Components & UI
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { H5, Link, Muted } from "@/components/common/typography";

// Types & Interfaces
import type { NoteOverview } from "@/lib/article/types";

// Constants & Variables
import {
	TRANSITION_200_25,
	getContainerVariants,
	getChildVariants,
} from "@/lib/transitions";
const CONTAINER_VARIANTS = getContainerVariants(0.04);
const CHILDREN_VARIANTS = getChildVariants(
	{ opacity: 0, x: -40 },
	{ opacity: 1, x: 0, transition: TRANSITION_200_25 }
);



export function ArticleList({ articles }: { articles: NoteOverview[] }) {
	return (
		<motion.ul
			className="grid gap-1"
			variants={CONTAINER_VARIANTS}
			initial="hidden"
			animate="visible"
		>
			{articles.map(article => (
				<motion.li
					key={article.shortId}
					variants={CHILDREN_VARIANTS}
				>
					<ArticleLink article={article} />
				</motion.li>
			))}
		</motion.ul>
	);
}

function ArticleLink({ article }: { article: NoteOverview }) {
	const tag = article.tags[0];
	const variant = isBadgeVariant(tag) ? tag : "outline";
	const createdAt = new Date(article.createdAt).toLocaleString("en-US", {
		month: "short",
		year: "numeric",
	}).replace(" ", ". ");

	return (
		<Link
			variant="ghost"
			href={`/articles/${article.shortId}`}
			className="flex max-sm:flex-col sm:items-center justify-between gap-2 p-4 transition-none"
		>
			<H5 className="text-balance" asChild>
				<h2>{article.title}</h2>
			</H5>
			<div className="grow w-max flex max-sm:flex-row-reverse items-center gap-2">
				{tag && <Badge variant={variant}>{tag}</Badge>}
				<div className="grow max-sm:hidden h-px mx-2 bg-border" />
				<Muted className="w-max font-light tabular-nums" asChild>
					<span>{createdAt}</span>
				</Muted>
			</div>
		</Link>
	);
}