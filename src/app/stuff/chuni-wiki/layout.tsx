import { generatePreviewMetadata } from "@/lib/utils";

// Components & UI
import { Wrapper } from "@/components/common/typography";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "CHUNITHM【チュウニズム】攻略 Wiki";
const description = "SEGAのアーケード音楽ゲーム「CHUNITHM」のファンサイトです。";
const url = "/stuff/chuni-wiki";
export const metadata: Metadata = {
	title: { absolute: title },
	description: description,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: false,
		follow: false,
	},
};



export default function ChuniWikiLayout({
	children
}: LayoutProps<typeof url>) {
	return (
		<Wrapper className="my-16" width={720}>
			{children}
		</Wrapper>
	);
}