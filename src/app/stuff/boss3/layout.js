import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
const title = "A full webpage's what I'm think'in of";
const description = "You wouldn't get this from any other guy";
const url = "/stuff/boss3";
export const metadata = {
	title: { absolute: "今天是我生日" },
	description: description,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: false,
		follow: false,
	},
};



export default function Boss3Layout({ children }) {
	return children;
}