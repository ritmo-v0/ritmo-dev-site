import type { NextConfig } from "next";



const nextConfig: NextConfig = {
	devIndicators: {
		buildActivityPosition: "top-right",
	},
	images: {
		remotePatterns: [
			// {
			// 	protocol: "https",
			// 	hostname: "",
			// 	port: "",
			// 	pathname: "/**",
			// },
		]
	}
};

export default nextConfig;