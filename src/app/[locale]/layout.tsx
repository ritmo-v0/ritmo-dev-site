import "@/app/globals.css";
import "katex/dist/katex-swap.min.css";
import { cn } from "cn";
import { getBaseUrl } from "@/lib/utils";
import {
	PAGE_TITLE_SUFFIX,
	generatePageTitle,
	generateSocialMetadata,
} from "@/lib/seo/utils";

// next-intl
// import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";

// Components & UI
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/main/providers";
import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/main/footer";
import { JsonLd } from "@/components/json-ld";

// Fonts
import localFont from "next/font/local";
import {
	JetBrains_Mono,
	Noto_Sans_JP,
	Noto_Sans_TC,
	Noto_Serif_TC,
} from "next/font/google";
const UncutSans = localFont({
	src: "../fonts/UncutSans.woff2",
	weight: "300 700",
	display: "swap",
	variable: "--font-uncut-sans",
});
const Inter = localFont({
	src: [
		{
			path: "../fonts/Inter.woff2",
			style: "normal",
		},
		{
			path: "../fonts/Inter-Italic.woff2",
			style: "italic",
		},
	],
	weight: "100 900",
	display: "swap",
	variable: "--font-inter",
});
const JetBrainsMono = JetBrains_Mono({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
});
const IbarraRealNova = localFont({
	src: [
		{
			path: "../fonts/IbarraRealNova.woff2",
			style: "normal",
		},
		{
			path: "../fonts/IbarraRealNova-Italic.woff2",
			style: "italic",
		},
	],
	weight: "400 700",
	display: "swap",
	variable: "--font-ibarra-real-nova",
	preload: false,
	adjustFontFallback: false,
	declarations: [
		{ prop: "size-adjust", value: "114.5%" },
		{ prop: "ascent-override", value: "100.52%" },  // 115.1 ÷ 1.145
		{ prop: "descent-override", value: "24.98%" },  //  28.6 ÷ 1.145
		{ prop: "line-gap-override", value: "0%" },
	],
});
const NotoSansJP = Noto_Sans_JP({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-jp",
	preload: false,
});
const NotoSansTC = Noto_Sans_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-tc",
	preload: false,
});
const NotoSerifTC = Noto_Serif_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-serif-tc",
	preload: false,
});

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
import { PERSON_JSON_LD } from "@/lib/seo/constants";
const title = PAGE_TITLE_SUFFIX;
const description = "<PersonalWebsite />";
const url = "/";

// Metadata
export const metadata: Metadata = {
	metadataBase: getBaseUrl(),
	title: {
		default: title,
		template: generatePageTitle(),
	},
	description,
	...generateSocialMetadata({ title, description, url }),
	icons: {
		icon: [{ url: "/icon.svg" }],
		apple: [{ url: "/apple-icon.png" }],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

// Static Params
export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }));
}



export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
	const locale = await getLocale();

	return (
		<html
			lang={locale}
			data-scroll-behavior="smooth"
			className={cn(
				UncutSans.variable,
				Inter.variable,
				JetBrainsMono.variable,
				IbarraRealNova.variable,
				NotoSansJP.variable,
				NotoSansTC.variable,
				NotoSerifTC.variable,
			)}
			suppressHydrationWarning
		>
			<head>
				{/* <script
					src="//unpkg.com/react-scan/dist/auto.global.js"
					crossOrigin="anonymous" async
				/> */}
				<JsonLd data={PERSON_JSON_LD} />
			</head>
			<body>
				<Providers>
					<div className="grid grid-rows-[1fr_auto] min-h-svh isolate">
						<Navbar />
						<div>{children}</div>
						<Footer />
					</div>
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}