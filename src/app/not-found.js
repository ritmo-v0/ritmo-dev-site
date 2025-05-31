import Link from "next/link";

// Components & UI
import { WrapperLayout } from "@/components/common/layouts";
import { Button } from "@/components/ui/button";



export default function NotFound() {
	return (
		<WrapperLayout className="justify-items-center content-center gap-8 h-[calc(100svh_-_3.5rem)]">
			<p className="font-bold text-5xl">畫一隻雞不存在</p>
			<Button asChild>
				<Link href="/">回到首頁</Link>
			</Button>
		</WrapperLayout>
	);
}