import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { generatePageTitle, generateSocialMetadata } from "@/lib/seo/utils";

// Components & UI
import { H1 } from "@/components/common/typography";

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const url = "/tools/tempus";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]/tools/tempus">
): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	const t = await getTranslations({ locale, namespace: "tools.tempus" });

	const title = t("title");
	const description = t("description");

	return {
		title,
		description,
		...generateSocialMetadata({
			title: generatePageTitle({ title }),
			description,
			url,
			images: [`${url}/image.png`],
		}),
	};
}



export default async function TempusLayout(
	{ children, params }: LayoutProps<"/[locale]/tools/tempus">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	const t = await getTranslations("tools.tempus");

	return (
		<>
			<H1 className="sr-only">{t("title")}</H1>
			{children}
		</>
	);
}