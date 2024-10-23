import Link from "next/link";

// Components & UI
import { ThemeToggle } from "./theme-toggle";



export default function Navbar() {
	return (
		<nav className="sticky top-0 px-4 sm:px-8 bg-background z-50">
			<div className="flex items-center justify-between mx-auto max-w-[1400px] h-14">
				<Link href="/" className="font-bold">Ritmo.</Link>
				<ThemeToggle />
			</div>
		</nav>
	);
}