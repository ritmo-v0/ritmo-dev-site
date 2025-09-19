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
import { WrapperLayout } from "@/components/common/layouts";

// Metadata
export const title = "7sRef.exe";
const description = "Sevens Refraction";
const url = "/stuff/7sref";
const keywords = [
	"maimai",
	"7sRef",
	"7sRef 4",
];
export const metadata = {
	title: {
		absolute: title,
		template: generatePageTitle({ suffix: title }),
	},
	description: description,
	keywords: keywords,
	...generatePreviewMetadata({ title, description, url }),
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
		<WrapperLayout
			className={cn(
				"mb-16 font-serif-7sref",
				DotoFont.variable,
				ShipporiMincho.variable,
			)}
			width={1080}
		>
			{children}
		</WrapperLayout>
	);
}