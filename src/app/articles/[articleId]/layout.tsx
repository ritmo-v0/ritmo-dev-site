import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";
import { getMetadataUrl } from "@/lib/article/utils";

// Types & Interfaces
import type { Metadata } from "next";
import { ArticleParams, NoteMetadata } from "@/lib/article/types";

// Metadata
const url = "/articles";
export async function generateMetadata({
	params
}: ArticleParams): Promise<Metadata> {
	const articleId = (await params).articleId;
	const articleMetadata: NoteMetadata = await fetch(getMetadataUrl(articleId))
		.then(res => res.json())
		.catch(() => null);

	return articleMetadata ? {
		title: articleMetadata.title,
		description: articleMetadata.description,
		...generatePreviewMetadata({
			title: getFullTitle(articleMetadata.title),
			description: articleMetadata.description,
			url,
		}),
		robots: {
			index: true,
			follow: true,
			nocache: false,
		},
	} : {};
}



export default function ArticlesLayout({ children }: React.ComponentProps<"div">) {
	return children;
}