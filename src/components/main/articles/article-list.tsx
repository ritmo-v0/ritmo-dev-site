"use client";

// Components & UI
import Link from "next/link";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { H5, Muted } from "@/components/common/typography";

// Types & Interfaces
import type { Variants } from "motion/react";
import type { NoteOverview } from "@/lib/article/types";

// Constants & Variables
import { TRANSITION_200_25, getContainerVariants } from "@/lib/transitions";
const CONTAINER_VARIANTS = getContainerVariants(0.05);
const CHILDREN_VARIANTS: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0, transition: TRANSITION_200_25 },
};



export function ArticleList({ articles }: { articles: NoteOverview[] }) {
	return (
		<motion.ul
			className="grid gap-1"
			variants={CONTAINER_VARIANTS}
			initial="hidden"
			animate={"visible"}
		>
			{articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map(article => (
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
	const publishedAt = new Date(article.publishedAt);
	const year = publishedAt.getFullYear();
	const month = publishedAt.toLocaleString("en-US", { month: "short" }).toUpperCase();

	return (
		<Link
			href={`/articles/${article.shortId}`}
			className="flex items-center justify-between gap-4 p-4 rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
		>
			<div className="max-md:grow-1 flex items-center justify-between gap-2">
				<H5 className="text-balance" asChild><h2>{article.title}</h2></H5>
				{article.tags[0] && <Badge className="rounded-full">{article.tags[0]}</Badge>}
			</div>
			<div className="grow-1 max-md:hidden h-[1px] bg-border"></div>
			<Muted className="font-mono text-xs text-center">
				<span className="text-sm">{month}</span>
				<br />{year}
			</Muted>
		</Link>
	);
}