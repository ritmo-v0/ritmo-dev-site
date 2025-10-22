import { cn, generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

// Fonts
import { Doto, Shippori_Mincho } from "next/font/google";
const DotoFont = Doto({
	weight: "variable",
	style: ["normal"],
	axes: ["ROND"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-doto",
});
const ShipporiMincho = Shippori_Mincho({
	weight: ["400", "600"],
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-shippori-mincho",
});

// Components & UI
import { Wrapper } from "@/components/common/typography";

// Metadata
import { meta } from "./meta";
export const metadata = {
	title: {
		absolute: meta.title,
		template: generatePageTitle({ suffix: meta.title }),
	},
	description: meta.description,
	keywords: meta.keywords,
	...generatePreviewMetadata({
		title: meta.title,
		description: meta.description,
		url: meta.url,
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function SevensRefLayout({
	children
}: LayoutProps<"/stuff/7sref">) {
	return (
		<Wrapper
			className={cn(
				"my-16 font-serif-7sref",
				DotoFont.variable,
				ShipporiMincho.variable,
			)}
			width={1000}
		>
			{children}
		</Wrapper>
	);
}