import createNextIntlPlugin from "next-intl/plugin";

// Types & Interfaces
import type { NextConfig } from "next";

const config: NextConfig = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/sw.js",
				headers: [
					{
						key: "Content-Type",
						value: "application/javascript; charset=utf-8",
					},
					{
						key: "Cache-Control",
						value: "no-cache, no-store, must-revalidate",
					},
					{
						key: "Content-Security-Policy",
						value: "default-src 'self'; script-src 'self'",
					},
				],
			},
		]
	},
	async redirects() {
		return [
			{
				source: "/tools/emojis",
				destination: "/tools/emomomo",
				permanent: true,
			},
			{
				source: "/tools/inm-clock",
				destination: "/stuff/inm-clock",
				permanent: true,
			},
			{
				source: "/stuff/7sref4",
				destination: "/stuff/7sref",
				permanent: true,
			},
		];
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production"
			? { exclude: ["error"] }
			: false,
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
	typedRoutes: true,
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
export default withNextIntl(config);