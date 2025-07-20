"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// SWR
import useSWR from "swr";
import { fetcher } from "@/lib/fetch";

// Components & UI
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { H5, InlineCode, Muted } from "@/components/common/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { WrapperLayout } from "@/components/common/layouts";

// Types & Interfaces
import type { Variants } from "motion/react";
import type { NoteOverview } from "@/lib/article/types";

// Constants & Variables
const DELAY = 0.1;
const CONTAINER_VARIANTS: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.75 * DELAY, delayChildren: DELAY } },
};
const CHILDREN_VARIANTS: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
};



export default function ArticlesPage() {
	const { data, error, isLoading } = useSWR("/api/articles", fetcher);
	const articles: NoteOverview[] = data?.success ? data.data : [];

	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (!isLoading && !error) setAnimate(true);
	}, [isLoading, error]);

	return (
		<WrapperLayout width={960}>
			<motion.ul
				className="grid gap-1 lg:mt-16 py-6"
				variants={CONTAINER_VARIANTS}
				initial="hidden"
				animate={animate ? "visible" : "hidden"}
			>
				{error && (
					<InlineCode className="w-fit">
						Unable to fetch articles. Please try refreshing the page.
					</InlineCode>
				)}
				<AnimatePresence>
					{!error && isLoading ? (
						Array.from({ length: 5 }).map((_, index) => (
							<motion.li key={index} exit={{ opacity: 0, transition: { duration: DELAY } }}>
								<Skeleton className="w-full h-17" />
							</motion.li>
						))
					) : (
						articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map(article => (
							<motion.li key={article.shortId} variants={CHILDREN_VARIANTS}>
								<ArticleLink article={article} />
							</motion.li>
						))
					)}
				</AnimatePresence>
			</motion.ul>
		</WrapperLayout>
	);
}

function ArticleLink({ article }: { article: NoteOverview }) {
	const publishedAt = new Date(article.publishedAt);
	const year = publishedAt.getFullYear();
	const month = publishedAt.toLocaleString("en-US", { month: "short" }).toUpperCase();

	return (
		<Link
			href={`/articles/${article.shortId}`}
			className="flex items-center justify-between gap-4 p-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
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