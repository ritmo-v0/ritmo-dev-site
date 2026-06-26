import "@/app/globals.css";
import "katex/dist/katex.min.css";
import { cn, getBaseUrl } from "@/lib/utils";
import {
	PAGE_TITLE_SUFFIX,
	generatePageTitle,
	generateSocialMetadata,
} from "@/lib/seo/utils";

// next-intl
// import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { routing } from "@/lib/i18n/routing";

// Components & UI
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/main/providers";
import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/main/footer";
import { JsonLd } from "@/components/json-ld";

// Fonts
import {
	JetBrains_Mono,
	Noto_Sans_JP,
	Noto_Sans_TC,
	Noto_Serif_TC,
	Plus_Jakarta_Sans,
	Rethink_Sans,
} from "next/font/google";
const JetBrainsMono = JetBrains_Mono({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
});
const NotoSansJP = Noto_Sans_JP({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-jp",
});
const NotoSansTC = Noto_Sans_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-tc",
});
const NotoSerifTC = Noto_Serif_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-serif-tc",
});
const PlusJakartaSans = Plus_Jakarta_Sans({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-plus-jakarta-sans",
});
const RethinkSans = Rethink_Sans({
	weight: "variable",
	style: ["normal", "italic"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-rethink-sans",
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



export default async function RootLayout(
	{ children, params }: LayoutProps<"/[locale]">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return (
		<html
			lang={locale}
			data-scroll-behavior="smooth"
			className={cn(
				JetBrainsMono.variable,
				NotoSansJP.variable,
				NotoSansTC.variable,
				NotoSerifTC.variable,
				PlusJakartaSans.variable,
				RethinkSans.variable,
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
				<SpeedInsights />
			</body>
		</html>
	);
}