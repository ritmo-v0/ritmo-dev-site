import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Constants & Variables
import { title as suffix } from "../layout";

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
	...generatePreviewMetadata({
		title: generatePageTitle({ title, suffix }),
		description,
		url,
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function RefrainLayout({ children }) {
	return children;
}