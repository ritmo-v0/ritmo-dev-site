import { getTranslations } from "next-intl/server";

// Components & UI
import { ToolList } from "@/components/main/tools/list";
import { H1, Link, Muted, Wrapper } from "@/components/common/typography";

// Constants & Variables
const NUANCED_HREF = "https://github.com/nuance-dev#-im-building-26-native-macos-apps-one-for-each-letter-of-the-alphabet" as const;



export default async function ToolsPage() {
	const t = await getTranslations("tools");

	return (
		<Wrapper className="grid gap-8">
			<header>
				<div>
					<H1 className="[&+p]:mt-2!">
						{t("title")}
					</H1>
					<Muted className="text-base">
						{t.rich("description", {
							a: (chunks) => (
								<Link href={NUANCED_HREF}>
									{chunks}
								</Link>
							),
						})}
					</Muted>
				</div>
			</header>
			<main>
				<ToolList />
			</main>
		</Wrapper>
	);
}