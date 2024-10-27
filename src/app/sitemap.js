import { getBaseUrl } from "@/lib/utils";



export default function sitemap() {
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
			lastModified: new Date("2024-10-23"),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/tools/emojis`,
			lastModified: new Date("2024-10-23"),
			changeFrequency: "monthly",
			priority: 0.9,
		},
	];
}