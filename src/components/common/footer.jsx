import Link from "next/link";

// Components & UI
import { Button } from "@/components/ui/button";

// Images & Icons
import { GitHubLogoIcon } from "@radix-ui/react-icons";



export default function Footer() {
	return (
		<footer className="p-4 sm:px-8 sm:py-6 border-t border-input">
			<div className="mx-auto max-w-5xl">
				<Button variant="link" className="text-muted-foreground" asChild>
					<Link href="https://github.com/ritmoHung/ritmo-dev-site">
						<GitHubLogoIcon />GitHub
					</Link>
				</Button>
			</div>
		</footer>
	);
}