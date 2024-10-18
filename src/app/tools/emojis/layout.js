import { generateLocalMetadata } from "@/lib/utils";

// Metadata
const title = "Emoji 選擇器";
const description = "我之後再來想想副標內容。";  // TODO: Update description
const url = "/tools/emojis";
export const metadata = generateLocalMetadata({ title, description, url });



export default function EmojiToolLayout({ children }) {
	return children;
}