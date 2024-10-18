// Components & UI
import { WrapperLayout, SectionLayout } from "@/components/common/layouts";
import { H1, P } from "@/components/common/typography";



export default function HomePage() {
	return (
		<div className="py-8">
			<WrapperLayout>
				<header className="self-center h-min">
					<div className="space-y-2">
						<H1>Next.js Website Template</H1>
						<span className="inline-block text-muted-foreground">
							This is a Next.js website template.
						</span>
					</div>
				</header>
				<main className="py-4">
					<SectionLayout title="Get Started">
						<P>Delete this at <code>src/app/page.js</code> and create your own content!</P>
						<P>在 <code>src/app/page.js</code> 刪除這段內容並開始建立你自己的內容！</P>
					</SectionLayout>
				</main>
			</WrapperLayout>
		</div>
	);
}