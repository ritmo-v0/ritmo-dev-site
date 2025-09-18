// Components & UI
import { Link } from "./typography";
import { ModeToggle } from "./mode-toggle";
import { ThemeSelect } from "./theme-select";
import { WrapperLayout } from "@/components/common/layouts";



export default function Navbar() {
	return (
		<nav className="sticky top-0 h-14 bg-background z-50 isolate">
			<WrapperLayout className="flex items-center justify-between gap-4 h-full">
				<Link
					href="/"
					variant="nothing"
					className="font-bold"
				>
					Ritmo.
				</Link>
				<div className="flex items-center gap-2">
					<ThemeSelect />
					<ModeToggle />
				</div>
			</WrapperLayout>
		</nav>
	);
}