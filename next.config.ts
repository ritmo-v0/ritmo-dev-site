import type { NextConfig } from "next";

export default {
	async redirects() {
		return [
			{
				source: "/stuff/7sref4",
				destination: "/stuff/7sref",
				permanent: true,
			},
		];
	},
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ywu5w3rxj7.ufs.sh",  // UploadThing (MyGO)
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "y79ckzbnk6.ufs.sh",  // UploadThing (Articles)
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "3b4o9rg98c.ufs.sh",  // UploadThing (Tools & Stuff)
				pathname: "/f/**",
			},
			// Additional article image sources
			{
				protocol: "https",
				hostname: "hackmd.io",
				pathname: "/_uploads/**",       // HackMD (OG images only)
			},
		]
	},
	turbopack: {
		resolveAlias: {
			"micromark-extension-math": "micromark-extension-llm-math",
		},
	},
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"micromark-extension-math": "micromark-extension-llm-math",
		};
		return config;
	},
} satisfies NextConfig;