import type { Route } from "next";

export type Meta = {
	title: string;
	description: string;
	url: Route;
	keywords: string[];
};

export type ToolMeta = Meta & {
	id: string;
	color?: `#${string}`;
	imageUrl?: string;
};