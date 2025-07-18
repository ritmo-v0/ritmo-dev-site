import type { NextConfig } from "next";



export default {
	devIndicators: {
		position: "bottom-right",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "3b4o9rg98c.ufs.sh",  // UploadThing (Images)
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "ywu5w3rxj7.ufs.sh",  // UploadThing (MyGO)
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "hackmd.io",
				pathname: "/_uploads/**",
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