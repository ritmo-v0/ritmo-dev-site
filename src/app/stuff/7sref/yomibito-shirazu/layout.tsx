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
`.trim();
const url = "/stuff/7sref/yomibito-shirazu";
export const metadata = {
	title,
	description,
	...generatePreviewMetadata({
		title: generatePageTitle({ title, suffix }),
		description,
		url,
	}),
};



export default function YomibitoShirazuLayout({
	children
}: LayoutProps<typeof url>) {
	return children;
}