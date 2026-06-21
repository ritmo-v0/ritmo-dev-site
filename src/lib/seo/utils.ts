// Types & Interfaces
import type { Metadata } from "next";
import type {
	OpenGraph,
	OpenGraphType,
} from "next/dist/lib/metadata/types/opengraph-types";

type PageTitleProps = {
	title?: string;
	suffix?: string;
};

// Constants & Variables
export const PAGE_TITLE_SUFFIX = "Ritmo 里莫";



export function generatePageTitle({
	title = "%s",
	suffix = PAGE_TITLE_SUFFIX
}: Partial<PageTitleProps> = {}): string {
	return `${title} - ${suffix}`;
}

export function generateSocialMetadata({
	type = "website",
	title,
	description,
	url,
	images,
	locale = "en_US"
}: Partial<OpenGraph & { type: OpenGraphType }>): Partial<Metadata> {
	const ogLocale = locale.replace("-", "_");

	return {
		alternates: {
			canonical: url,
			languages: {
				// TODO: Add locales when migrating to localPrefix: "asNeeded"
				"x-default": url,
			},
		},
		openGraph: {
			type,
			title,
			description,
			url,
			images,
			siteName: PAGE_TITLE_SUFFIX,
			locale: ogLocale,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images,
			site: "@ritmo_v0",
			siteId: "904003428262723584",
			creator: "@ritmo_v0",
			creatorId: "904003428262723584",
		},
	};
}