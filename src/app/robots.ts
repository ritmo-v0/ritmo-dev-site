import { getBaseUrl } from "@/lib/utils";

// Types & Interfaces
import type { MetadataRoute } from "next";



export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/mygo/",
				"/stuff/boss3/",
				"/stuff/chuni-wiki/",
			],
		},
		sitemap: `${getBaseUrl().origin}/sitemap.xml`,
	};
}