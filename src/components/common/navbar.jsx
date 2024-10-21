// Components & UI
import { ThemeToggle } from "./theme-toggle";



export default function Navbar() {
	return (
		<nav className="sticky top-0 px-4 sm:px-8 bg-background z-50">
			<div className="flex items-center justify-between mx-auto max-w-[1400px] h-14">
				<span className="font-bold">Ritmo.</span>
				<ThemeToggle />
			</div>
		</nav>
	);
}