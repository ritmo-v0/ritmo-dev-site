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
`.trim();
const url = "/stuff/7sref/refrain";
export const metadata = {
	title,
	description,
	...generatePreviewMetadata({
		title: generatePageTitle({ title, suffix }),
		description,
		url,
	}),
};



export default function RefrainLayout({
	children
}: LayoutProps<typeof url>) {
	return children;
}