import type { NextConfig } from "next";



export default {
	devIndicators: {
		position: "bottom-right",
	},
	images: {
		remotePatterns: [
			// {
			// 	protocol: "https",
			// 	hostname: "",
			// 	pathname: "/**",
			// },
		]
	}
} as NextConfig;