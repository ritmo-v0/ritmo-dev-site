import { RedisRW } from "@/lib/db/redis";
import { type Result, UnauthorizedError, ensureError } from "@/lib/fetch/response";
import { fetchEmojiTestFile, parseEmojis } from "@/lib/emomomo/utils";

// Constants & Variables
import { EMOJI_DATA_REDIS_KEY } from "@/lib/emomomo/constants";

// Route Segment Config
export const dynamic = "force-dynamic";



export async function GET(req: Request): Promise<Response> {
	try {
		// Authorization
		const authorization = req.headers.get("authorization");
		if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
			throw new UnauthorizedError();
		}

		// Fetch file from Unicode public route,
		// then parse into JSON with compressed key names
		const emojiTestFile = await fetchEmojiTestFile();
		const emojiData = parseEmojis(emojiTestFile, { compressed: true });

		await RedisRW.set(EMOJI_DATA_REDIS_KEY, emojiData);

		return Response.json(
			{
				success: true,
				data: emojiData,
				level: "info",
				message: "Emoji data updated successfully."
			} satisfies Result,
			{ status: 200 }
		);
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::EMOJI::UPDATE: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to update emoji data: ${error.message}`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}