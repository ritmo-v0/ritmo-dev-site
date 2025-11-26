"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/common/mode-toggle";
import { ThemeSelect } from "@/components/common/theme-select";
import { ButtonLink, Link, Muted } from "@/components/common/typography";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// Icons & Images
import {
	ArchiveIcon,
	CubeIcon,
	GearSixIcon,
	NotebookIcon,
} from "@phosphor-icons/react";
import { RitmoIcon } from "@/components/common/icons";

// Types & Interfaces
import type { Route } from "next";
import type { Icon } from "@phosphor-icons/react";
type BaseItem = { icon: Icon, title: string };
type LinkItem = BaseItem & { href: Route };
type MenuItem = BaseItem & {
	items: Array<Omit<LinkItem, "icon"> & { description: string }>;
};

// Constants & Variables
import { STUFF } from "@/app/stuff/stuff";
const NAV_ITEMS: Array<LinkItem | MenuItem> = [
	{
		icon: NotebookIcon,
		title: "Articles",
		href: "/articles",
	},
	{
		icon: CubeIcon,
		title: "Tools",
		href: "/tools",
	},
	{
		icon: ArchiveIcon,
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
		<div className="fixed left-0 top-0 content-center w-full h-16 px-4 py-3 z-50 pointer-events-none">
			<div className={cn(
				"max-w-max mx-auto flex items-center gap-2 pointer-events-auto",
				"*:bg-background/40 *:border *:rounded-full",
				"*:backdrop-blur-sm *:backdrop-saturate-200",
				"*:backdrop-brightness-110 *:dark:backdrop-brightness-80",
			)}>
				<div>
					<ButtonLink
						href="/"
						variant="ghost"
						size="icon"
					>
						<RitmoIcon />
					</ButtonLink>
				</div>
				<NavigationMenu>
					<NavigationMenuList className="gap-0 *:not-first:-ml-1.5">
						{NAV_ITEMS.map(item => "items" in item
							? <NavMenuItem key={item.title} {...item} />
							: <NavLinkItem key={item.title} {...item} />
						)}
					</NavigationMenuList>
				</NavigationMenu>
				<div>
					<Settings />
				</div>
			</div>
		</div>
	);
}

function NavLinkItem({ icon: Icon, title, href }: LinkItem) {
	const pathname = usePathname();
	const active = pathname.startsWith(href);

	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				active={active}
				render={(
					<ButtonLink
						href={href}
						variant="ghost"
						className="rounded-full [&>svg]:max-xs:hidden"
					>
						<Icon weight={active ? "fill" : "regular"} />
						{title}
					</ButtonLink>
				)}
			/>
		</NavigationMenuItem>
	);
}

function NavMenuItem({ icon: Icon, title, items }: MenuItem) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger className="rounded-full [&>svg]:max-xs:hidden">
				<Icon />
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

function Settings() {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger render={
				<Button
					variant="ghost"
					size="icon"
					className="data-popup-open:[&_svg]:rotate-90"
				>
					<GearSixIcon className="transition-[rotate] ease-out duration-300" />
				</Button>
			} />
			<PopoverContent className="w-60">
				<ul className="grid gap-2 p-2 pl-3">
					<li className="flex items-center gap-4 text-sm">
						Mode
						<ModeToggle className="ml-auto" />
					</li>
					<li className="flex items-center gap-4 text-sm">
						Theme
						<ThemeSelect className="ml-auto" />
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	);
}