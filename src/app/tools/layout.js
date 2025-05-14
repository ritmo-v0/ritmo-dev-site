import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
const title = "小工具";
const description = "我之後再來想想副標內容。";  // TODO: Update description
const url = "/tools";
export const metadata = {
	title: {
		default: title,
		template: `%s｜Ritmo 里莫`,
	},
	description,

	...generatePreviewMetadata({ title: `${title}｜Ritmo 里莫`, description, url }),
};



export default function ToolsLayout({ children }) {
	return children;
}