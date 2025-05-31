import type { NextConfig } from "next";



export default {
	devIndicators: {
		position: "bottom-right",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "aaw2tslxqb.ufs.sh",
				pathname: "/f/**",
			},
		]
	}
} as NextConfig;