import { NextResponse } from "next/server";
import { cronAuth } from "@/lib/cron-utils";
import { kv } from "@vercel/kv";

// Emoji Utils
import { fetchEmojiTestFile, parseEmojis } from "@/lib/emoji-utils";

// Route Segment Config
export const dynamic = "force-dynamic";



export async function GET(req) {
	try {
		if (!cronAuth(req)) {
			return NextResponse.json({ message: "Unauthorized", level: "error" }, { status: 401 });
		}

		const emojiTestFile = await fetchEmojiTestFile();
		const emojiData = parseEmojis(emojiTestFile);

		await kv.set("emoji_data", emojiData);

		return NextResponse.json({ data: emojiData, message: "Emoji data updated successfully" }, { status: 200 });
	} catch (error) {
		console.error(`ERR::EMOJI::UPDATE: ${error.message}`);
		return NextResponse.json({ message: `Failed to update emoji data.`, level: "error" }, { status: 500 });
	}
}