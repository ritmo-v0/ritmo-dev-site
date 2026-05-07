import { generatePreviewMetadata } from "@/lib/utils";

// Metadata
const title = "アシッド";
const description = "8 億年ぶりに女の子とライン交換出来て泣いてる";
const url = "/stuff/7sref/arg";
export const metadata = {
	title: { absolute: title },
	description,
	...generatePreviewMetadata({ title, description, url }),
	icons: {
		icon: [{ url: `${url}/icon.png` }],
		apple: [{ url: `${url}/apple-icon.png` }],
	},
};



export default function SevensRefArgLayout({
	children
}: LayoutProps<"/[locale]/stuff/7sref/arg">) {
	return children;
}