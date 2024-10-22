import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 604800;  // 1 week (60 * 60 * 24 * 7)



export async function GET() {
	let data = {};
	let message = "", level = "info", status = 200;

	try {
		const emojis = await kv.get("emoji_data");

		data = emojis;
		message = "Emoji data fetched successfully.";
	} catch (error) {
		console.error(`ERR::EMOJI::GET: ${error.message}`);
		message = "Failed to fetch emoji data.";
		level = "error";
		status = 500;
	} finally {
		return NextResponse.json({ data, message, level }, { status });
	}
}