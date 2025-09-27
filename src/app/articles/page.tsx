"use client";
import { useEffect, useState } from "react";

// SWR
import useSWR from "swr";
import { getArticles } from "@/lib/article/actions";

// Components & UI
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Code, H5, Muted } from "@/components/common/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { WrapperLayout } from "@/components/common/layouts";

// Types & Interfaces
import type { Variants } from "motion/react";

// Constants & Variables
import { TRANSITION_200_25, getContainerVariants } from "@/lib/transitions";
const DELAY = 0.1;
const CONTAINER_VARIANTS = getContainerVariants(0.05, DELAY);
const CHILDREN_VARIANTS: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0, transition: TRANSITION_200_25 },
};



export default function ArticlesPage() {
	const { data, error, isLoading } = useSWR("articles", () => getArticles());
	const articles = data || [];

	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setAnimate(!error && !isLoading);
	}, [error, isLoading]);

	return (
		<WrapperLayout className="mt-12 lg:mt-24" width={1080}>
			{error && <Code>{error.message}</Code>}
			<motion.ul
				className="grid gap-1"
				variants={CONTAINER_VARIANTS}
				initial="hidden"
				animate={animate ? "visible" : "hidden"}
			>
				<AnimatePresence>
					{!error && (
						isLoading ? (
							Array.from({ length: 5 }).map((_, index) => (
								<motion.li
									key={index}
									exit={{ opacity: 0, transition: { duration: DELAY } }}
								>
									<Skeleton className="w-full h-17" />
								</motion.li>
							))
						) : (
							articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map(article => (
								<motion.li
									key={article.shortId}
									variants={CHILDREN_VARIANTS}
								>
									<ArticleLink article={article} />
								</motion.li>
							))
						)
					)}
				</AnimatePresence>
			</motion.ul>
		</WrapperLayout>
	);
}

function ArticleLink({
	article
}: { article: Awaited<ReturnType<typeof getArticles>>[number] }) {
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