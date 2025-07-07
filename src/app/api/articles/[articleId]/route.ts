import ky from "ky";
import { type Result, ensureError } from "@/lib/fetch/response";
import {
	getInfoUrl,
	getTagsUrl,
	getMetadataUrl,
	getDownloadUrl,
} from "@/lib/article/utils";

// Types & Interfaces
import {
	Article,
	NoteInfo,
	NoteMetadata,
	NoteTag,
} from "@/lib/article/types";



export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ articleId: string }> }
): Promise<Response> {
	const { articleId } = await params;

	try {
		const [info, tags, metadata, content] = await Promise.all([
			ky(getInfoUrl(articleId)).json<NoteInfo>(),
			ky(getTagsUrl(articleId)).json<NoteTag[]>(),
			ky(getMetadataUrl(articleId)).json<NoteMetadata>(),
			ky(getDownloadUrl(articleId)).text(),
		]);
		const { viewcount, brief, ...restInfo } = info;
		const { image } = metadata;

		return Response.json(
			{
				success: true,
				data: { metadata: { ...restInfo, tags, image }, content } satisfies Article,
				level: "info",
				message: `Article with ID \`${articleId}\` fetched successfully.`,
			} satisfies Result,
			{ status: 200 }
		);
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLE::GET: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to fetch article with ID \`${articleId}\`.`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}