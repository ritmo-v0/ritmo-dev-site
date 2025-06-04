import { kv } from "@vercel/kv";
import { fetchEmojiTestFile, parseEmojis } from "@/lib/emomomo/utils";

// Route Segment Config
export const dynamic = "force-dynamic";



export async function GET(req: Request) {
	try {
		// Authorization
		const authorization = req.headers.get("authorization");
		if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Fetch file from Unicode public route,
		// then parse into JSON with compressed key names
		const emojiTestFile = await fetchEmojiTestFile();
		const emojiData = parseEmojis(emojiTestFile, { compressed: true });

		// Store in Vercel KV
		await kv.set("emoji_data", emojiData);

		return Response.json(
			{ data: emojiData, message: "Emoji data updated successfully." },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error(`ERR::EMOJI::UPDATE: ${error.message}`);
		return Response.json(
			{ message: `Failed to update emoji data: ${error.message}` },
			{ status: 500 }
		);
	}
}