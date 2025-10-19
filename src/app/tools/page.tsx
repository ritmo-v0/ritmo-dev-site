// Components & UI
import { ToolListSection } from "@/components/main/tools/sections";
import { WrapperLayout } from "@/components/common/layouts";
import { H1, Link } from "@/components/common/typography";

// Constants & Variables
const NUANCED_HREF = "https://github.com/nuance-dev#-im-building-26-native-macos-apps-one-for-each-letter-of-the-alphabet" as const;



export default function ToolsPage() {
	return (
		<WrapperLayout>
			<header className="self-center h-min">
				<div className="space-y-2">
					<H1 className="whitespace-pre-wrap">Project α</H1>
					<p className="text-muted-foreground">
						Inspired by <Link href={NUANCED_HREF}>Nuanced</Link>
						, but a web version. Tired of finding the perfect tool, so nvm I’ll build it myself.
					</p>
				</div>
			</header>
			<main className="py-4">
				<ToolListSection />
			</main>
		</WrapperLayout>
	);
}