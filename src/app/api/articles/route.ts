import ky from "ky";
import { type Result, ensureError } from "@/lib/fetch/response";

// Types & Interfaces
import { NoteOverview, OverviewResponse } from "@/types/article";

// Constants & Variables
const API_URL = "https://hackmd.io/api/@Ritmo/overview";



export async function GET(): Promise<Response> {
	try {
		const articles = await ky(API_URL).json<OverviewResponse>();

		return Response.json(
			{
				success: true,
				data: articles?.notes ?? [] satisfies NoteOverview[],
				level: "info",
				message: "Public articles fetched successfully.",
			} satisfies Result,
			{ status: 200 }
		);
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLES::GET: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: "Failed to fetch public articles.",
			} satisfies Result,
			{ status: error.status }
		);
	}
}