import { generateLocalMetadata } from "@/lib/utils";

// Metadata
const title = {
	default: "小工具",
	template: `%s｜小工具`,
};
const description = "我之後再來想想副標內容。";  // TODO: Update description
const url = "/tools";
export const metadata = generateLocalMetadata({ title, description, url });



export default function ToolsLayout({ children }) {
	return children;
}