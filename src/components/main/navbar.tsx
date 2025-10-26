"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Components & UI
import { ButtonLink, Link, Muted } from "@/components/common/typography";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Icons & Images
import { ArchiveIcon, CubeIcon, NotebookIcon } from "@phosphor-icons/react/ssr";
import { RitmoIcon } from "@/components/common/icons";

// Types & Interfaces
import type { Route } from "next";
type BaseItem = { icon: React.ReactElement, title: string };
type LinkItem = BaseItem & { href: Route };
type MenuItem = BaseItem & {
	items: Array<Omit<LinkItem, "icon"> & { description: string }>;
};

// Constants & Variables
import { STUFF } from "@/app/stuff/stuff";
const NAV_ITEMS: Array<LinkItem | MenuItem> = [
	{
		icon: <NotebookIcon />,
		title: "Articles",
		href: "/articles",
	},
	{
		icon: <CubeIcon />,
		title: "Tools",
		href: "/tools",
	},
	{
		icon: <ArchiveIcon />,
		title: "Stuff",
		items: STUFF.map(stuff => ({
			title: stuff.title,
			description: stuff.description,
			href: stuff.url,
		})),
	}
];



export default function Navbar() {
	return (
		<div className="fixed top-0 w-screen px-4 py-3 z-50 pointer-events-none">
			<NavigationMenu
				className={cn(
					"mx-auto h-10 px-0.25 pointer-events-auto",
					"bg-background/40 border rounded-full backdrop-blur-sm",
				)}
			>
				<ButtonLink
					href="/"
					variant="ghost"
					className="max-xs:size-9 rounded-full"
				>
					<RitmoIcon />
					<span className="max-xs:hidden">Ritmo.</span>
				</ButtonLink>
				<NavigationMenuList className="gap-0">
					{NAV_ITEMS.map(item => "items" in item
						? <NavMenuItem key={item.title} {...item} />
						: <NavLinkItem key={item.title} {...item} />
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}

function NavLinkItem({ icon, title, href }: LinkItem) {
	const pathname = usePathname();

	return (
		<NavigationMenuItem key={title}>
			<NavigationMenuLink
				active={pathname.startsWith(href)}
				render={(
					<ButtonLink
						href={href}
						variant="ghost"
						className="rounded-full [&>svg]:max-xs:hidden"
					>
						{icon}
						{title}
					</ButtonLink>
				)}
			/>
		</NavigationMenuItem>
	);
}

function NavMenuItem({ icon, title, items }: MenuItem) {
	return (
		<NavigationMenuItem key={title}>
			<NavigationMenuTrigger className="rounded-full [&>svg]:max-xs:hidden">
				{icon}
				{title}
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-2">
					{items.map(item => (
						<li key={item.title}>
							<NavigationMenuLink
								closeOnClick={true}
								render={
									<Link
										href={item.href}
										variant="ghost"
										className="grid gap-1"
									>
										<h3 className="font-heading font-semibold">
											{item.title}
										</h3>
										<Muted>{item.description}</Muted>
									</Link>
								}
							/>
						</li>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}