import { RedisRW } from "@/lib/db/redis";
import { parseEmojis } from "@/lib/emomomo/parse";
import { UnauthorizedError, ensureError } from "@/lib/fetch/response";

// Constants & Variables
import { EMOJI_DATA_REDIS_KEY } from "@/lib/emomomo/constants";
const EMOJI_TEST_DATA_URL = process.env.EMOJI_TEST_DATA_URL as string;



export async function GET(req: Request): Promise<Response> {
	try {
		// Authorization
		const authorization = req.headers.get("authorization");
		if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
			throw new UnauthorizedError();
		}

		const emojiTestData = await fetch(EMOJI_TEST_DATA_URL).then(res => res.text());
		const emojiData = parseEmojis(emojiTestData);

		await RedisRW.set(EMOJI_DATA_REDIS_KEY, emojiData);

		return Response.json(emojiData, { status: 200 });
	} catch (err) {
		const error = ensureError(err);
		const message = `ERR::EMOJIS::UPDATE: ${error.message}`;
		console.error(message);

		return Response.json({ message }, { status: 500 });
	}
}