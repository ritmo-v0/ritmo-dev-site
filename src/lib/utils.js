import { nanoid } from "nanoid";

// shadcn
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";



export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function generateNanoId(length = 7, condition) {
	let id;
	do {
		id = nanoid(length);
	} while (condition && condition(id));

	return id;
}

export function getBaseUrl() {
	const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: `https://localhost:${process.env.PORT || 3000}`;
	return new URL(baseUrl);
}

export function generateLocalMetadata({
	title,
	description,
	url,
	robots = { index: true, follow: true, nocache: true },
	...props
}) {
	return {
		...(title && { title }),
		...(description && { description }),
		openGraph: {
			...(title && { title }),
			...(description && { description }),
			url,
			siteName: title,
			type: "website",
			locale: "zh_TW",
		},
		twitter: {
			card: "summary_large_image",
			...(title && { title }),
			...(description && { description }),
			site: "@ritmo_v0",
			siteId: "904003428262723584",
			creator: "@ritmo_v0",
			creatorId: "904003428262723584",
		},
		robots,
		...props,
	};
}