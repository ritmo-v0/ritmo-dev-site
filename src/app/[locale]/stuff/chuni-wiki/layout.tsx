import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generateSocialMetadata } from "@/lib/seo/utils";

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



export default async function ChuniWikiLayout(
	{ children, params }: LayoutProps<"/[locale]/stuff/chuni-wiki">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return (
		<Wrapper className="my-16" width={720}>
			{children}
		</Wrapper>
	);
}