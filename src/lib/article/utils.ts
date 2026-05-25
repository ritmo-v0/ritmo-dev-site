import wretch from "wretch";
import { ensureError } from "@/lib/fetch/response";

// Types & Interfaces
import type {
	Article,
	Note,
	NoteMetadata,
	NoteOverview,
	NotesResponse,
} from "./types";

// Constants & Variables
import { ARTICLE_TAGS } from "./constants";
const HACKMD_API_TOKEN = process.env.HACKMD_API_TOKEN as string;

const HackMDInternalAPI = wretch("https://hackmd.io/api");
const HackMDPublicAPI = wretch("https://api.hackmd.io/v1");



export async function getArticles(): Promise<NoteOverview[]> {
	try {
		const articles = await HackMDInternalAPI
			.get("/@Ritmo/notes")
			.json<NotesResponse>();

		return articles.notes.sort((a, b) =>
			b.publishedAt.localeCompare(a.publishedAt)
		) ?? [];
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLES: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch articles`;
		throw error;
	}
}

export async function getArticle(articleId: string): Promise<Article> {
	try {
		const [note, image] = await Promise.all([
			getNote(articleId),
			getNoteImage(articleId),
		]);

		return {
			content: note.content,
			metadata: {
				title: note.title,
				tags: note.tags,
				description: note.description,
				createdAt: note.createdAt,
				updatedAt: note.lastChangedAt,
				publishedAt: note.publishedAt,
				image,
			},
		};
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLE: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch article \`${articleId}\``;
		throw error;
	}
}

async function getNote(shortId: string): Promise<Note> {
	try {
		const note = await HackMDPublicAPI
			.auth(`Bearer ${HACKMD_API_TOKEN}`)
			.get(`/notes/${shortId}`)
			.json<Note>();

		return note;
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::NOTE: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch note \`${shortId}\``;
		throw error;
	}
}

async function getNoteImage(shortId: string): Promise<string | undefined> {
	try {
		const metadata = await HackMDInternalAPI
			.get(`/_/noteMetadata/${shortId}`)
			.json<NoteMetadata>();

		return metadata.image;
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::NOTE::IMAGE: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch image of note \`${shortId}\``;
		throw error;
	}
}

export function isBadgeVariant(tag: string): tag is typeof ARTICLE_TAGS[number] {
	// biome-ignore lint/suspicious/noExplicitAny: Type guard requires casting to satisfy .includes()
	return ARTICLE_TAGS.includes(tag as any);
}