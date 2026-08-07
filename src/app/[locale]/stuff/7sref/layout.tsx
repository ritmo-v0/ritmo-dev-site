import { getTranslations } from "next-intl/server";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";
import { cn } from "@/lib/utils";

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
import { Areas } from "@/components/main/stuff/7sref/areas";
import { Wrapper } from "@/components/common/typography";

// Types & Interfaces
import type { Metadata } from "next";

// Constants & Variables
const url = "/stuff/7sref";

// Metadata
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("stuff.7sref");
	const title = t("title");
	const description = t("description");

	return {
		title: {
			absolute: title,
			template: generatePageTitle({ suffix: title }),
		},
		description,
		...generateSocialMetadata({ title, description, url }),
	};
}



export default function SevensRefLayout(
	{ children }: LayoutProps<"/[locale]/stuff/7sref">
) {
	return (
		<>
			<Wrapper
				className={cn(
					"my-16 font-serif-7sref",
					DotoFont.variable,
					ShipporiMincho.variable,
				)}
				width={960}
			>
				{children}
			</Wrapper>
			<Areas className="fixed inset-0 opacity-10 -z-1" />
		</>
	);
}