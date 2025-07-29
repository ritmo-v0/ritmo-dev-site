import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Constants & Variables
import { title as suffix } from "../layout";

// Metadata
const title = "ヨミビトシラズ";
const description = `
**********************************
** Welcome to METAVERSE v3.0+1.0
** Presented by Limonène
**********************************
`;
const url = "/stuff/7sref/yomibito-shirazu";
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



export default function YomibitoShirazuLayout({ children }) {
	return children;
}