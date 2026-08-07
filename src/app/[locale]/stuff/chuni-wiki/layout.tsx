import { generateSocialMetadata } from "@/lib/seo/utils";

// Components & UI
import { Wrapper } from "@/components/common/typography";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const title = "CHUNITHM【チュウニズム】攻略 Wiki";
const description = "SEGAのアーケード音楽ゲーム「CHUNITHM」のファンサイトです。";
const url = "/stuff/chuni-wiki";

// Metadata
export const metadata: Metadata = {
	title: { absolute: title },
	description: description,
	...generateSocialMetadata({
		title,
		description,
		url,
		images: [`${url}/image.png`],
	}),
	icons: {
		icon: [{ url: `${url}/icon.svg` }],
		apple: [{ url: `${url}/apple-icon.png` }],
	},
	robots: {
		index: false,
		follow: false,
	},
};



export default function ChuniWikiLayout(
	{ children }: LayoutProps<"/[locale]/stuff/chuni-wiki">
) {
	return (
		<Wrapper className="my-16" width={720}>
			{children}
		</Wrapper>
	);
}