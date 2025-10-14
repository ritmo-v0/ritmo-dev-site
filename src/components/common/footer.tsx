// Components & UI
import { Link } from "./typography";
import { Button } from "@/components/ui/button";

// Images & Icons
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";



export default function Footer() {
	return (
		<footer className="p-4 sm:px-8 sm:py-6 border-t border-input">
			<div className="mx-auto max-w-5xl">
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
			</div>
		</footer>
	);
}