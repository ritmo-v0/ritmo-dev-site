import { getBaseUrl } from "@/lib/utils";

// Types & Interfaces
import type { MetadataRoute } from "next";



export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getBaseUrl().href;

	return [
		// # Homepage
		{
			url: `${baseUrl}/`,
			lastModified: new Date("2024-10-19"),
			changeFrequency: "monthly",
			priority: 1,
		},

		// # tools/*
		{
			url: `${baseUrl}/tools`,
			lastModified: new Date("2025-06-01"),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/tools/emomomo`,
			lastModified: new Date("2025-06-04"),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/tools/tempus`,
			lastModified: new Date("2025-06-04"),
			changeFrequency: "monthly",
			priority: 0.9,
		},

		// # (playground)/*
		{
			url: `${baseUrl}/inm-clock`,
			lastModified: new Date("2025-05-14T19:19:00.810"),
			changeFrequency: "yearly",
			priority: 0.114514,
		},
	];
}