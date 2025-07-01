import { kv } from "@vercel/kv";
import { type Result, ensureError } from "@/lib/fetch/response";

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 604800;  // 1 week (60 * 60 * 24 * 7)



export async function GET(): Promise<Response> {
	try {
		const emojis = await kv.get("emoji_data");
		return Response.json(
			{
				success: true,
				data: emojis,
				level: "info",
				message: "Emoji data fetched successfully.",
			} satisfies Result,
			{ status: 200 }
		);
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::EMOJI::GET: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to fetch emoji data, please try again later.`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}