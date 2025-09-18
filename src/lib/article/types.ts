export type ArticleParams = {
	params: Promise<{ articleId: string }>;
};

export interface OverviewResponse {
	user: Record<string, unknown>;
	notes: NoteOverview[];
};

export interface NoteOverview {
	id: string;
	title: string;
	content: string;
	tags: string[];
	lastchangeAt: string;
	createdAt: string;
	publishedAt: string;
	shortId: string;
};

export interface Article {
	metadata: ArticleMetadata;
	content: string;
};

export type ArticleMetadata =
	Omit<NoteInfo, "viewcount" | "brief"> &
	{ tags: NoteTag[]; image?: string; };

export interface NoteInfo {
	title: string;
	description: string;
	viewcount: number;
	createtime: string;
	updatetime: string;
	brief: string;
};

export interface NoteTag {
	name: string;
	createdAt: number;
	lastUsedAt: number;
};

export interface NoteMetadata {
	title: string;
	lang?: string;
	description: string;
	contributors: string;
	image?: string;
	breaks: string;
};