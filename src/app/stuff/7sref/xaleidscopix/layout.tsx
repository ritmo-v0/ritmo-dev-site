import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Constants & Variables
import { title as suffix } from "../layout";

// Metadata
const title = "Xaleid◆scopiX";
const description = `
Acid saved Ris who had gone out of control, and crossed the seven doors and worlds.
Eventually, a rain of jewels began to fall, and each kaleidoscope reflected it.
Please take a look at the next world and extra track woven by them who have overcome everything.
`.trim();
const url = "/stuff/7sref/xaleidscopix";
export const metadata = {
	title,
	description,
	...generatePreviewMetadata({
		title: generatePageTitle({ title, suffix }),
		description,
		url,
	}),
};



export default function XaleidscopiXLayout({
	children
}: LayoutProps<typeof url>) {
	return children;
}