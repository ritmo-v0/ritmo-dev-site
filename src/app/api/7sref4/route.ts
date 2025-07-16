import { kv } from "@vercel/kv";
import { type Result, ensureError } from "@/lib/fetch/response";

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 2592000;  // 1 month (60 * 60 * 24 * 30)



export async function GET(): Promise<Response> {
	try {
		const emojis = await kv.get("7sref_4");
		return Response.json(
			{
				success: true,
				data: emojis,
				level: "info",
				message: "7sRef-4 messages fetched successfully.",
			} satisfies Result,
			{ status: 200 }
		);
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::7SREF4::GET: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to fetch 7sRef-4 messages, please try again later.`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}