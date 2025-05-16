import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";

// Metadata
const title = "BPM 計算器";
const description = "跟著音樂點擊節奏，立即取得並複製精準 BPM，輕鬆對拍。節拍器功能即將登場。";
const url = "/tools/bpm";
const keywords = [
	// Main Keywords
	"bpm",
];
export const metadata = {
	title,
	description,
	keywords,
	...generatePreviewMetadata({ title: getFullTitle(title), description, url }),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function BpmLayout({ children }) {
	return children;
}