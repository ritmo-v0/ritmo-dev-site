import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
const title = "Emoji 選擇器";
const description = "輕鬆複製、編輯、預覽 emoji，支援 Twemoji 字體和膚色篩選。";
const url = "/tools/emojis";
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
export const metadata = {
	title,
	description,
	keywords,
	...generatePreviewMetadata({ title: `${title}｜Ritmo 里莫`, description, url }),
};



export default function EmojiToolLayout({ children }) {
	return children;
}