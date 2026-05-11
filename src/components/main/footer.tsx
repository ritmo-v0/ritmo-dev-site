// Components & UI
import { ButtonLink } from "@/components/common/typography";

// Types & Interfaces
import type { Route } from "next";

// Constants & Variables
import { SOCIAL_LINKS } from "@/lib/constants/socials";



export function Footer() {
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