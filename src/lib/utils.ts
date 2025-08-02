// shadcn
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Types & Interfaces
import type { Metadata } from "next";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
type PageTitleProps = {
	title?: string;
	suffix?: string;
};
type PreviewMetadataProps = {
	type?: OpenGraphType;
	title: string;
	description?: string;
	url: string;
};

// Constants & Variables
export const PAGE_TITLE_SUFFIX = "Ritmo 里莫";



// # Metadata Functions
export function getBaseUrl() {
	const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
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
	description = "",
	url
}: PreviewMetadataProps): Partial<Metadata> {
	return {
		openGraph: {
			type,
			title,
			description,
			url,
			siteName: PAGE_TITLE_SUFFIX,
			locale: "en_US",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			site: "@ritmo_v0",
			siteId: "904003428262723584",
			creator: "@ritmo_v0",
			creatorId: "904003428262723584",
		},
	};
}

// # Utility Functions
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}