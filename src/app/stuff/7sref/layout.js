import { generatePreviewMetadata, generatePageTitle } from "@/lib/utils";

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
	weight: "400",
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



export default function SevensRefLayout({ children }) {
	return (
		<WrapperLayout
			className={`${DotoFont.variable} ${ShipporiMincho.variable} font-serif-7sref`}
			width={960}
		>
			{children}
		</WrapperLayout>
	);
}