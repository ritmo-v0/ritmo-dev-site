import { getBaseUrl } from "@/lib/utils";
import { getArticles } from "@/lib/article/utils";

// Types & Interfaces
import type { MetadataRoute } from "next";



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl().origin;

	const articles = await getArticles();
	const articleUrls = articles.map(article => ({
		url: `${baseUrl}/articles/${article.shortId}`,
		lastModified: new Date(article.lastchangeAt),
		changeFrequency: "yearly" as const,
		priority: 0.9,
	}));

	return [
		// # Homepage
		{
			url: baseUrl,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "yearly",
			priority: 1,
		},

		// # articles/*
		{
			url: `${baseUrl}/articles`,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		...articleUrls,

		// # tools/*
		{
			url: `${baseUrl}/tools`,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/tools/emomomo`,
			lastModified: new Date("2026-04-24"),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/tools/tempus`,
			lastModified: new Date("2026-05-08"),
			changeFrequency: "monthly",
			priority: 0.6,
		},

		// # stuff/*
		// Iroduku Pilgrimage
		{
			url: `${baseUrl}/stuff/iroduku-pgm`,
			lastModified: new Date("2026-04-17"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		// 7sRef
		{
			url: `${baseUrl}/stuff/7sref`,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/stuff/7sref/arg`,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/stuff/7sref/yomibito-shirazu`,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/stuff/7sref/xaleidscopix`,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/stuff/7sref/refrain`,
			lastModified: new Date("2026-04-10"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		// Other
		{
			url: `${baseUrl}/stuff/inm-clock`,
			lastModified: new Date("2025-05-14T19:19:00.810"),
			changeFrequency: "yearly",
			priority: 0.114514,
		},
	];
}