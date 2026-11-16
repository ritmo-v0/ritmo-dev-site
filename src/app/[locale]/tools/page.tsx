"use client";
import { useTranslations } from "next-intl";

// Components & UI
import { ToolList } from "@/components/main/tools/list";
import { Container } from "@/components/ui/container";
import { H1, Link, Muted } from "@/components/common/typography";

// Constants & Variables
const NUANCED_HREF = "https://github.com/nuance-dev#-im-building-26-native-macos-apps-one-for-each-letter-of-the-alphabet" as const;



export default function ToolsPage() {
	const t = useTranslations("tools");

	return (
		<Container className="grid gap-8">
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
		</Container>
	);
}