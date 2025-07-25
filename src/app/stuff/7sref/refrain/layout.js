import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
const title = "Ref:rain (for 7th Heaven)";
const description = `
******************************
** Welcome to KALEIDX_SCOPE **
** Thank you, and good bye. **
******************************
`;
const url = "/stuff/7sref/refrain";
const keywords = [
	"maimai",
	"7sRef",
];
export const metadata = {
	title,
	description: description,
	keywords: keywords,
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function RefrainLayout({ children }) {
	return children;
}