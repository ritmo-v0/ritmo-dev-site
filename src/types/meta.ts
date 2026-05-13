// import type { Route } from "next";

// TODO: Wait for `next-intl` to support Next.js typed routes
export type Meta = {
	title: string;
	description: string;
	url: string;
	keywords?: string[];
};

export type ToolMeta = Meta & {
	id: string;
	color?: `#${string}`;
	imageUrl?: string;
};