// Components & UI
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { ThemeSelect } from "./theme-select";
import { WrapperLayout } from "@/components/common/layouts";



export default function Navbar() {
	return (
		<nav className="sticky top-0 h-14 bg-background z-50 isolate">
			{/* <div className={cn(
				"absolute inset-0 w-full h-[200%] backdrop-blur-xs -z-1",
				"bg-linear-to-t from-transparent to-background/80",
				"mask-linear-to-t mask-linear-from-transparent mask-linear-to-80% mask-linear-to-background",
			)} /> */}
			<WrapperLayout className="flex items-center justify-between gap-4 h-full">
				<Link href="/" className="font-bold">Ritmo.</Link>
				<div className="flex items-center gap-2">
					<ThemeSelect className="w-42 !h-8" />
					<ModeToggle />
				</div>
			</WrapperLayout>
		</nav>
	);
}