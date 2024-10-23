import { generateLocalMetadata } from "@/lib/utils";

// Metadata
const title = "Emoji 選擇器";
const description = "輕鬆複製、編輯、預覽 emoji，支援 Twemoji 字體和膚色篩選。";
const url = "/tools/emojis";
export const metadata = generateLocalMetadata({ title, description, url });



export default function EmojiToolLayout({ children }) {
	return children;
}