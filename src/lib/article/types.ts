export interface NotesResponse {
	notes: NoteOverview[];
};

export interface NoteOverview {
	id: string;
	title: string;
	content: string;  // description
	image?: string;
	tags: string[];
	lastchangeAt: string;
	createdAt: string;
	publishedAt: string;
	shortId: string;
};

export interface Note {
	id: string;
	title: string;
	tags: string[];
	description: string;
	createdAt: string;
	publishedAt: string;
	lastChangedAt: string;
	shortId: string;
	content: string;
};

export interface NoteMetadata {
	title: string;
	description: string;
	image?: string;
	lang?: string;
	contributors: string;
	breaks: string;
};

export interface Article {
	content: string;
	metadata: ArticleMetadata;
};

export type ArticleMetadata = {
	title: string;
	description: string;
	tags: string[];
	image?: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};