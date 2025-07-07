// Constants & Variables
export const ARTICLES_API_URL = "https://hackmd.io/api/@Ritmo/overview";



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