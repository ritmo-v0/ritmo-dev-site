// Components & UI
import { ButtonLink } from "@/components/common/typography";

// Icons & Images
import {
	BehanceLogoIcon,
	GithubLogoIcon,
	ThreadsLogoIcon,
	YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";

// Types & Interfaces
import type { Route } from "next";

// Constants & Variables
const SOCIAL_LINKS = [
	{ label: "GitHub", icon: GithubLogoIcon, url: "https://github.com/ritmoHung/ritmo-dev-site" },
	{ label: "YouTube", icon: YoutubeLogoIcon, url: "https://www.youtube.com/@ritmo_v0" },
	{ label: "Threads", icon: ThreadsLogoIcon, url: "https://www.threads.com/@ritmo_v0" },
	{ label: "Behance", icon: BehanceLogoIcon, url: "https://www.behance.net/ritmo_v0" },
];



export default function Footer() {
	return (
		<footer className="p-6 sm:px-8 text-sm text-muted-foreground bg-background border-t border-input">
			<nav className="grid justify-items-center mx-auto">
				<ul className="flex items-center">
					{SOCIAL_LINKS.map(link => (
						<li key={link.label}>
							<ButtonLink
								title={link.label}
								href={link.url as Route}
								variant="ghost"
								size="icon"
								className="pointer-coarse:size-10 not-hover:text-muted-foreground"
							>
								<link.icon />
							</ButtonLink>
						</li>
					))}
				</ul>
			</nav>
		</footer>
	);
}