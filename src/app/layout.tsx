import "@/app/globals.css";
import "katex/dist/katex.min.css";
import { getLocale } from "next-intl/server";
import {
	PAGE_TITLE_SUFFIX,
	getBaseUrl,
	generatePageTitle,
	generatePreviewMetadata,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

// Components & UI
import Navbar from "@/components/main/navbar";
import Footer from "@/components/main/footer";
import { Providers } from "@/lib/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

// Metadata
const title = PAGE_TITLE_SUFFIX;
const description = "<PersonalWebsite />";
const url = "/";
const author = "ritmo_v0";
export const metadata: Metadata = {
	metadataBase: getBaseUrl(),
	title: {
		default: title,
		template: generatePageTitle(),
	},
	description,
	applicationName: title,
	category: "Web Development",
	keywords: ["Next.js", "React", "Tailwind CSS", "Geist UI"],  // TODO: Update keywords
	authors: [{ name: author }],
	creator: author,
	publisher: author,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default async function RootLayout({
	children
}: LayoutProps<typeof url>) {
	const locale = await getLocale() as string;

	return (
		<html
			lang={locale}
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
			{/* <head>
				<script
					src="//unpkg.com/react-scan/dist/auto.global.js"
					crossOrigin="anonymous" async
				/>
			</head> */}
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