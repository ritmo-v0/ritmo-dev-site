import createNextIntlPlugin from "next-intl/plugin";

// Types & Interfaces
import type { NextConfig } from "next";

// Config
const config: NextConfig = {
	headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload"
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
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
			new URL("https://img.ritmo.dev/**"),
			new URL("https://hackmd.io/_uploads/**"),
		],
	},
	typedRoutes: true,
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
export default withNextIntl(config);