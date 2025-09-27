"use client";
import { use } from "react";

// SWR
import useSWRImmutable from "swr/immutable";
import { getArticle } from "@/lib/article/actions";

// Components & UI
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Code, H1, Link, MarkdownText, Muted } from "@/components/common/typography";
import { WrapperLayout } from "@/components/common/layouts";
import { Skeleton } from "@/components/ui/skeleton";

// Icons & Images
import { ArrowLeft, Calendar } from "lucide-react";



export default function ArticlePage(props: PageProps<"/articles/[articleId]">) {
	const articleId = use(props.params).articleId;

	const { data, error, isLoading } = useSWRImmutable(
		articleId ? ["article", articleId] : null,
		([, id]) => getArticle(id)
	);
	const { content, metadata } = data || {};

	const title = metadata?.title || "Unknown Article";
	const description = metadata?.description || "No description.";
	const image = metadata?.image || "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQRgPt9uBWlDj3kitow0r8z5VN42BInQgvEmGc";
	const updatedAt = metadata?.updatedAt
		? new Date(metadata.updatedAt).toLocaleDateString() : "…?";

	return (
		<>
			<WrapperLayout className="max-lg:pt-4 py-12">
				<Button
					variant="ghost"
					className="text-muted-foreground"
					asChild
				>
					<Link href="/articles" variant="nothing">
						<ArrowLeft />Back to Articles
					</Link>
				</Button>
				<header className="mt-4 flex max-lg:flex-col-reverse lg:items-center justify-between gap-x-12 gap-y-6 font-heading">
					<div>
						{isLoading
							? <Skeleton className="w-full h-9.5 lg:h-15" />
							: <H1 className="lg:text-5xl lg:text-balance">{title}</H1>
						}
						<div className="mt-4 lg:mt-6 space-y-2 lg:space-y-4">
							{isLoading
								? <Skeleton className="w-4/10 h-7" />
								: <Muted className="text-lg lg:text-xl">{description}</Muted>
							}
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Calendar className="size-4 text-primary" />
								<span>Last updated on {updatedAt}</span>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-md xl:w-xl aspect-video [&>*]:size-full [&>*]:rounded-xl">
						{isLoading ? <Skeleton /> : (
							<Image
								src={image}
								alt={title}
								className="shadow-lg object-cover select-none pointer-events-none"
								width={960}
								height={540}
								priority
							/>
						)}
					</div>
				</header>
			</WrapperLayout>
			<WrapperLayout width={1080}>
				<main>
					{error ? (
						<Code>{error.message}</Code>
					) : isLoading ? (
						<div className="grid gap-2">
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton key={index} className="w-full h-24" />
							))}
						</div>
					) : content && (
						<article>
							<MarkdownText renderH1={false}>
								{content}
							</MarkdownText>
						</article>
					)}
				</main>
			</WrapperLayout>
		</>
	);
}