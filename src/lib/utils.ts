// shadcn
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Types & Interfaces
import type { Metadata } from "next";
export type CopyResult =
	| { success: true }
	| { success: false; message: string };



export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getBaseUrl() {
	const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: `https://localhost:${process.env.PORT || 3000}`;
	return new URL(baseUrl);
}

export function getFullTitle(title: string): string {
	return `${title}｜Ritmo 里莫`;
}

export function generatePreviewMetadata(
	{ title, description = "", url }: { title: string; description?: string; url: string }
): Partial<Metadata> {
	return {
		openGraph: {
			title,
			description,
			url,
			siteName: title,
			type: "website",
			locale: "zh_TW",
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

export async function copyToClipboard(text: string): Promise<CopyResult> {
	try {
		await navigator.clipboard.writeText(text);
		return { success: true };
	} catch (error: any) {
		return { success: false, message: error.message };
	}
}