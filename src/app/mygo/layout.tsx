import { generatePreviewMetadata } from "@/lib/utils";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
const title = "新分頁";
const description = "It's MyGO!!!!!";
const url = "/mygo";
export const metadata: Metadata = {
	title: { absolute: title },
	description,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: false,
		follow: false,
	},
};



export default function MyGOLayout({
	children,
}: { children: React.ReactNode }) {
	return children;
}