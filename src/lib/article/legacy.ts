import wretch from "wretch";
import { ensureError } from "@/lib/fetch/response";

// Types & Interfaces
import type { Article, NoteOverview, NotesResponse } from "./types";

// Constants & Variables
const HackMDInternalAPI = wretch("https://hackmd.io");



export async function getArticleLegacy(articleId: string): Promise<Article> {
	try {
		const [overview, content] = await Promise.all([
			getNoteOverviewLegacy(articleId),
			getNoteContentLegacy(articleId),
		]);

		return {
			content,
			metadata: {
				title: overview.title,
				description: overview.content,
				tags: overview.tags,
				createdAt: new Date(overview.createdAt).toISOString(),
				updatedAt: new Date(overview.lastchangeAt).toISOString(),
				publishedAt: new Date(overview.publishedAt).toISOString(),
				image: overview.image,
			},
		};
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLE::LEGACY: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch legacy article \`${articleId}\``;
		throw error;
	}
}

export async function getNoteOverviewLegacy(shortId: string): Promise<NoteOverview> {
	try {
		const { notes } = await HackMDInternalAPI
			.get("/api/@Ritmo/overview")
			.json<NotesResponse>();

		return notes.find(note => note.shortId === shortId) as NoteOverview;
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::NOTE::OVERVIEW: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch overview of note \`${shortId}\``;
		throw error;
	}
}

async function getNoteContentLegacy(articleId: string): Promise<string> {
	try {
		return await HackMDInternalAPI
			.get(`/${articleId}/download`)
			.text();
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::NOTE::CONTENT: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch content of note \`${articleId}\``;
		throw error;
	}
}