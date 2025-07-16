import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
const title = "アシッド";
const description = "8 億年ぶりに女の子とライン交換出来て泣いてる";
const url = "/stuff/7sref4";
const keywords = [
	"maimai",
	"7sRef",
	"7sRef 4",
];
export const metadata = {
	title: { absolute: title },
	description: description,
	keywords: keywords,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function SevensRef4Layout({ children }) {
	return children;
}