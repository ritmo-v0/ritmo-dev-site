// Components & UI
import { Link } from "../common/typography";
import { ModeToggle } from "../common/mode-toggle";
import { ThemeSelect } from "../common/theme-select";
import { Button } from "@/components/ui/button";

// Images & Icons
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";



export default function Footer() {
	return (
		<footer className="p-6 sm:px-8 border-t border-input">
			<div className="grid sm:grid-cols-2 gap-8 mx-auto max-w-5xl">
				<Button
					variant="nothing"
					className="text-muted-foreground"
					asChild
				>
					<Link
						href="https://github.com/ritmoHung/ritmo-dev-site"
						variant="hover"
					>
						<GithubLogoIcon weight="bold" />GitHub
					</Link>
				</Button>
				<div className="flex items-center justify-center-safe sm:justify-end-safe gap-2">
					<ThemeSelect />
					<ModeToggle />
				</div>
			</div>
		</footer>
	);
}