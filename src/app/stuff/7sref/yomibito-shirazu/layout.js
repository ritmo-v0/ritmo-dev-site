import { generatePreviewMetadata } from "@/lib/utils";

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
	...generatePreviewMetadata({ title, description, url }),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function YomibitoShirazuLayout({ children }) {
	return children;
}