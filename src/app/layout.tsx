import "@/app/globals.css";
import "katex/dist/katex.min.css";
import {
	PAGE_TITLE_SUFFIX,
	getBaseUrl,
	generatePageTitle,
	generatePreviewMetadata,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

// Components & UI
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Providers } from "@/lib/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Fonts
import { GeistSans } from "geist/font/sans";
import {
	JetBrains_Mono,
	Noto_Sans_JP,
	Noto_Sans_TC,
	Noto_Serif_TC,
	Plus_Jakarta_Sans,
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

// Metadata
const title = PAGE_TITLE_SUFFIX;
const description = "<PersonalWebsite />";
const url = "/";
const author = "ritmo_v0";
export const metadata = {
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



export default function RootLayout({
	children
}: LayoutProps<typeof url>) {
	return (
		<html
			lang="en-US"
			className={cn(
				GeistSans.variable,
				JetBrainsMono.variable,
				NotoSansJP.variable,
				NotoSansTC.variable,
				NotoSerifTC.variable,
				PlusJakartaSans.variable,
			)}
			suppressHydrationWarning
		>
			{/* <head>
				<script
					crossOrigin="anonymous"
					src="https://unpkg.com/react-scan/dist/auto.global.js"
				/>
			</head> */}
			<body>
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
				<SpeedInsights />
			</body>
		</html>
	);
}