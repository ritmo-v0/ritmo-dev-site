import { generateLocalMetadata } from "@/lib/utils";

// Fonts
import { Noto_Serif_TC } from "next/font/google";
const notoSerifTC = Noto_Serif_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-serif-tc",
});

// Metadata
const title = "TXT 閱讀器";
const description = "";  // TODO: Update description
const url = "/tools/reader";
const keywords = [
	// Main Keywords
	"emoji選擇器",
	"emoji小工具",
	"emoji工具",
	"表情符號 工具",
	"emoji大全",
	"表情符號大全",
	"emoji組合",
	"表情符號組合",
	"表符組合",
	"emoji列表",
	"emoji tool",
	"emoji picker",
	"emoji list",

	// Behavior Keywords
	"emoji複製",
	"表情符號複製",
	"表符複製",
	"emoji copy paste",
	"emoji copy and paste",

	// Synonyms
	"表符",
	"表情符號",
	"twemoji",

	// Additional
	"小工具",
];
export const metadata = generateLocalMetadata({ title, description, url, keywords });



export default function TxtReaderLayout({ children }) {
	return (
		<main className={`${notoSerifTC.variable}`}>
			{children}
		</main>
	);
}