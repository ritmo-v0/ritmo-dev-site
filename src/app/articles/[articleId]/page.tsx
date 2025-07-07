"use client";
import { use } from "react";

// SWR
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/lib/fetch";

// Components & UI
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { H1, MarkdownText, Muted } from "@/components/common/typography";
import { SectionLayout, WrapperLayout } from "@/components/common/layouts";
import { Skeleton } from "@/components/ui/skeleton";

// Icons & Images
import { ArrowLeft } from "lucide-react";

// Types & Interfaces
import { Article } from "@/lib/article/types";



export default function ArticlesPage(props: { params: Promise<{ articleId: string }> }) {
	const params = use(props.params);
	const articleId = params.articleId;

	const { data, error, isLoading } = useSWRImmutable(`/api/articles/${articleId}`, fetcher);
	const articleData: Article = data?.success ? data.data : {};

	const title = articleData?.metadata?.title || "未知的文章";
	const description = articleData?.metadata?.description || "這是一個未知的文章。";
	const imageUrl = articleData?.metadata?.image || "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQRgPt9uBWlDj3kitow0r8z5VN42BInQgvEmGc";

	return (
		<div className="py-8">
			<WrapperLayout width={960}>
				<header className="self-center h-min">
					<div className="space-y-2">
						<Button variant="ghost" asChild>
							<Link href="/articles">
								<ArrowLeft />Back to Articles
							</Link>
						</Button>
						{isLoading ? <Skeleton className="mb-6 w-full rounded-xl aspect-video" /> : (
							<Image
								src={imageUrl}
								alt={`OG image of ${title}`}
								className="mb-6 rounded-xl aspect-video object-cover"
								width={960}
								height={540}
								priority
							/>
						)}
						{isLoading ? <Skeleton className="w-full h-9 lg:h-10" /> : <H1>{title}</H1>}
						{isLoading ? <Skeleton className="w-4/10 h-6" /> : (
							<Muted className="text-base">{description}</Muted>
						)}
					</div>
				</header>
				<main className="py-4">
					<SectionLayout>
						{error ? (
							<span>{error.message}</span>
						) : isLoading ? (
							<div className="grid gap-2">
								{Array.from({ length: 3 }).map((_, index) => (
									<Skeleton key={index} className="w-full h-24" />
								))}
							</div>
						) : articleData && (
							<MarkdownText renderH1={false}>
								{articleData.content}
							</MarkdownText>
						)}
					</SectionLayout>
				</main>
			</WrapperLayout>
		</div>
	);
}