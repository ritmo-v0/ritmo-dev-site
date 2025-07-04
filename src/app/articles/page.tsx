"use client";
import { AnimatePresence, motion } from "motion/react"

// SWR
import useSWR from "swr";
import { fetcher } from "@/lib/fetch";

// Components & UI
import Link from "next/link";
import { WrapperLayout } from "@/components/common/layouts";
import { Skeleton } from "@/components/ui/skeleton";

// Constants & Variables
const DELAY = 0.1;
const CONTAINER_VARIANTS = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.75 * DELAY, delayChildren: DELAY + 0.1 } },
};
const ARTICLE_LINK_VARIANTS = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
};

// Types & Interfaces
import { NoteOverview } from "@/types/article";
import { H5, Muted } from "@/components/common/typography";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";



export default function ArticlesPage() {
	const { data, error, isLoading } = useSWR("/api/articles", fetcher);
	const articles: NoteOverview[] = data?.data || [];

	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (!isLoading && !error && articles.length > 0) setAnimate(true);
	}, [isLoading, error, articles]);

	return (
		<WrapperLayout width={720}>
			<motion.section
				className="grid gap-1 lg:mt-16 py-6"
				variants={CONTAINER_VARIANTS}
				initial="hidden"
				animate={animate ? "visible" : "hidden"}
			>
				{/* // TODO: Layout shifts */}
				<AnimatePresence>
					{error ? (
						<span>{error.message}</span>
					) : isLoading ? (
						Array.from({ length: 5 }).map((_, index) => (
							<motion.div key={index} exit={{ opacity: 0, transition: { duration: DELAY } }}>
								<Skeleton className="w-full h-14" />
							</motion.div>
						))
					) : (
						articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map(article => (
							<motion.div key={article.shortId} variants={ARTICLE_LINK_VARIANTS}>
								<ArticleLink article={article} />
							</motion.div>
						))
					)}
				</AnimatePresence>
			</motion.section>
		</WrapperLayout>
	);
}

function ArticleLink({ article }: { article: NoteOverview }) {
	return (
		<Link
			href={`/articles/${article.shortId}`}
			className="flex items-center gap-2 p-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
		>
			<H5 className="text-balance" asChild><h2>{article.title}</h2></H5>
			{/* <Muted className="max-md:hidden">{article.shortId}</Muted> */}
			{article.tags[0] && <Badge className="rounded-full">{article.tags[0]}</Badge>}
			<div className="grow-1 h-[1px] bg-border"></div>
			<Muted className="font-mono">
				{new Date(article.publishedAt).toLocaleDateString("zh-TW", {
					year: "numeric", month: "numeric", day: "2-digit"
				})}
			</Muted>
		</Link>
	);
}