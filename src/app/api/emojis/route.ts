import { kv } from "@vercel/kv";

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 604800;  // 1 week (60 * 60 * 24 * 7)



export async function GET() {
	let data: any = {};
	let message = "", status = 200;

	try {
		const emojis = await kv.get("emoji_data");
		data = emojis;
		message = "Emoji data fetched successfully.";
	} catch (error: any) {
		console.error(`ERR::EMOJI::GET: ${error.message}`);
		message = `Failed to fetch emoji data: ${error.message}`;
		status = 500;
	} finally {
		return Response.json({ data, message }, { status });
	}
}