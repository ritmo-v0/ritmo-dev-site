import type { NextConfig } from "next";



export default {
	devIndicators: {
		position: "bottom-right",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "3b4o9rg98c.ufs.sh",
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "hackmd.io",
				pathname: "/_uploads/**",
			},
		]
	}
} as NextConfig;