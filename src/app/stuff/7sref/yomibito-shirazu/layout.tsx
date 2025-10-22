import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Metadata
import { meta } from "@/app/stuff/7sref/meta";
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
		title: generatePageTitle({ title, suffix: meta.title }),
		description,
		url,
	}),
};



export default function YomibitoShirazuLayout({
	children
}: LayoutProps<typeof url>) {
	return children;
}