import Providers from "@/lib/providers";
import { getBaseUrl } from "@/lib/utils";

// CSS
import "styles/globals.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

// Components & UI

// Fonts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Sans_TC } from "next/font/google";
const notoSansTC = Noto_Sans_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-tc",
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
	keywords: ["Next.js", "React", "Tailwind CSS", "Geist UI"],
	authors: [author],
	creator: author,
	publisher: author,
    openGraph: {
        title,
        description,
        url,
		siteName: title,
        type: "website",
        locale: "zh_TW",
		// publishedTime: "2021-10-20T00:00:00Z",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        site: "@ritmo_v0",
        siteId: "904003428262723584",
        creator: "@ritmo_v0",
        creatorId: "904003428262723584",
    },
	robots: {
		index: true,
		follow: true,
		nocache: true,
	},
	other: {
		// "": "",
	}
};



export default function RootLayout({ children }) {
	return (
		<html lang="zh-Hant-TW" suppressHydrationWarning>
			<body className={`${GeistSans.variable} ${GeistMono.variable} ${notoSansTC.variable}`}>
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}