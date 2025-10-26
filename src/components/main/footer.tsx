// Components & UI
import { Link } from "@/components/common/typography";
import { ModeToggle } from "@/components/common/mode-toggle";
import { ThemeSelect } from "@/components/common/theme-select";

// Icons & Images
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";



export default function Footer() {
	return (
		<footer className="p-6 sm:px-8 border-t border-input">
			<div className="grid sm:grid-cols-2 gap-8 mx-auto max-w-5xl">
				<Link
					variant="hover"
					href="https://github.com/ritmoHung/ritmo-dev-site"
				>
					<GithubLogoIcon weight="bold" />GitHub
				</Link>
				<div className="flex items-center justify-center-safe sm:justify-end-safe gap-2">
					<ThemeSelect />
					<ModeToggle />
				</div>
			</div>
		</footer>
	);
}