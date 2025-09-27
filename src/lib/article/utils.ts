import ky from "ky";
import { ensureError } from "@/lib/fetch/response";

// Types & Interfaces
import type {
	Article,
	ArticleMetadata,
	NoteInfo,
	NoteMetadata,
	NoteOverview,
	NoteTag,
	OverviewResponse,
} from "@/lib/article/types";

// Constants & Variables
const ARTICLES_API_URL = "https://hackmd.io/api/@Ritmo/overview";



/**
 * Fetches the list of articles.
 *
 * @returns An array of article overview objects
 */
export async function getArticles(): Promise<NoteOverview[]> {
	try {
		const articles = await ky(ARTICLES_API_URL).json<OverviewResponse>();
		return articles?.notes ?? [];
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLES: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch articles`;
		throw error;
	}
}

/**
 * Fetches a full article by ID, including its Markdown content and metadata.
 *
 * @param articleId - The unique ID of the article
 * @returns An article object containing Markdown content and metadata
 */
export async function getArticle(articleId: string): Promise<Article> {
	try {
		const [content, metadata] = await Promise.all([
			ky(getDownloadUrl(articleId)).text(),
			getArticleMetadata(articleId),
		]);

		return { content, metadata };
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLE: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch article \`${articleId}\``;
		throw error;
	}
}

/**
 * Fetches the metadata of an article by ID.
 *
 * @param articleId - The unique ID of the article
 * @returns A metadata object of the article
 */
export async function getArticleMetadata(articleId: string): Promise<ArticleMetadata> {
	try {
		const [info, tags, metadata] = await Promise.all([
			ky(getInfoUrl(articleId)).json<NoteInfo>(),
			ky(getTagsUrl(articleId)).json<NoteTag[]>(),
			ky(getMetadataUrl(articleId)).json<NoteMetadata>(),
		]);

		return {
			title: info.title,
			description: info.description,
			tags: tags?.map(tag => tag.name) ?? [],
			image: metadata.image,
			createdAt: info.createtime,
			updatedAt: info.updatetime,
		};
	} catch (err) {
		const error = ensureError(err);
		console.error(`ERR::ARTICLE::METADATA: ${error.message}`);

		const status = error.status;
		error.message = `[${status}] Failed to fetch metadata of article \`${articleId}\``;
		throw error;
	}
}

export function getInfoUrl(articleId: string) {
	return `https://hackmd.io/${articleId}/info`;
}

export function getTagsUrl(articleId: string) {
	return `https://hackmd.io/api/_/noteMetadata/tags/${articleId}`;
}

export function getMetadataUrl(articleId: string) {
	return `https://hackmd.io/api/_/noteMetadata/${articleId}`;
}

export function getDownloadUrl(articleId: string) {
	return `https://hackmd.io/${articleId}/download`;
}