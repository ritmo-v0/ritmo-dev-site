import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
const title = "迫真時鐘部．時停の裏技";
const description = "這麼惡臭的時鐘有存在的必要嗎（惱";
const url = "/tools/inm-clock";
const keywords = [
	// Main Keywords
	"inm clock",
	"時鐘工具",
	"web clock widget",
	"網頁時鐘元件",
	"2025 時鐘",
	"114 時鐘",
	"114年 時鐘",

	// Kuso Keywords
	"inm",
	"114514",
	"淫夢",
	"野獸先輩",
	"野獣先輩",
	"仲夏夜之淫夢",
	"真夏の夜の淫夢",
	"田所浩二",
	"こ↑こ↓",
	"homo",
	"ホモ",
];
export const metadata = {
	title: { absolute: title },
	description,
	keywords,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function InmClockLayout({ children }) {
	return children;
}