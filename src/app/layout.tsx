import Providers from "@/lib/providers";
import { getBaseUrl, generatePreviewMetadata } from "@/lib/utils";

// Styles
import "@/app/globals.css";

// Components & UI
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

// Fonts
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono, Noto_Sans_TC, Plus_Jakarta_Sans } from "next/font/google";
const JetBrainsMono = JetBrains_Mono({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
});
const NotoSansTC = Noto_Sans_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-tc",
});
const PlusJakartaSans = Plus_Jakarta_Sans({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-plus-jakarta-sans",
});

// Metadata
const title = "Ritmo 里莫";
const description = "我之後再來想想副標內容。";  // TODO: Update description
const url = "/";
const author = "Ritmo Hung";
export const metadata = {
    metadataBase: getBaseUrl(),
    title: {
        default: title,
        template: `%s｜${title}`,
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
	children,
}: React.ComponentProps<"div">) {
	return (
		<html
			lang="zh-Hant-TW"
			className={`${GeistSans.variable} ${JetBrainsMono.variable} ${NotoSansTC.variable} ${PlusJakartaSans.variable}`}
			suppressHydrationWarning
		>
			<head>
				{/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css"
				/>
			</head>
			<body>
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}