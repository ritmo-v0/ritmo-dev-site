// shadcn
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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



// # Metadata Functions
export function getBaseUrl() {
	const PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
	const baseUrl = PRODUCTION_URL
		? `https://${PRODUCTION_URL}`
		: `https://localhost:${process.env.PORT || 3000}`;

	return new URL(baseUrl);
}

export function generatePageTitle({
	title = "%s",
	suffix = PAGE_TITLE_SUFFIX
}: Partial<PageTitleProps> = {}): string {
	return `${title}｜${suffix}`;
}

export function generatePreviewMetadata({
	type = "website",
	title,
	description,
	url,
	images,
	locale = "en_US",
}: Partial<OpenGraph & { type: OpenGraphType }>): Partial<Metadata> {
	return {
		openGraph: {
			type,
			title,
			description,
			url,
			images: images,
			siteName: PAGE_TITLE_SUFFIX,
			locale,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: images,
			site: "@ritmo_v0",
			siteId: "904003428262723584",
			creator: "@ritmo_v0",
			creatorId: "904003428262723584",
		},
	};
}

// # Utility Functions
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}