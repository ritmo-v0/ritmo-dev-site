"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Components & UI
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Images & Icons
import { ArchiveIcon, CubeIcon, NotebookIcon } from "@phosphor-icons/react/ssr";

// Types & Interfaces
import type { Route } from "next";
type BaseItem = { icon: React.ReactElement, title: string };
type LinkItem = BaseItem & { href: Route };
type MenuItem = BaseItem & {
	items: { icon?: React.ReactElement; title: string; href: Route; }[];
};

// Constants & Variables
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
		items: [
			{
				title: "7sRef.exe",
				href: "/stuff/7sref",
			}, {
				title: "INM Clock",
				href: "/stuff/inm-clock",
			}
		],
	}
];



export default function Navbar() {
	return (
		<div className="fixed top-0 w-screen px-4 py-3 z-50 pointer-events-none">
			<NavigationMenu
				className={cn(
					"gap-4 xs:gap-8 mx-auto py-2 h-9 pointer-events-auto",
					"bg-background/50 border rounded-full backdrop-blur-sm",
				)}
			>
				<Button
					variant="ghost"
					className="max-xs:size-9 rounded-full"
					asChild
				>
					<Link href="/">
						<svg
							key="Ritmo."
							role="img"
							aria-label="Ritmo."
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="square"
							strokeLinejoin="miter"
							className="size-[1em]"
						>

							<line x1="1" y1="23" x2="1" y2="1" />
							<path d="m1,1h15c3.87,0,7,3.13,7,7c0,3.87-3.13,7-7,7H8c-3.87,0-7-3.13-7-7V1Z" />
							<polygon
								fill="currentColor"
								stroke="none"
								points="0 0 2.75 0 24 24 21.25 24 0 0"
							/>
						</svg>
						<span className="max-xs:hidden">Ritmo.</span>
					</Link>
				</Button>
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
				href={href}
				active={pathname.startsWith(href)}
				render={(
					<Button
						variant="ghost"
						className="rounded-full [&>svg]:max-xs:hidden"
						asChild
					>
						<Link href={href}>
							{icon}
							{title}
						</Link>
					</Button>
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
							<Link href={item.href}>
								{item.icon && item.icon}
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}