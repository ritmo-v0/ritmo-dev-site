"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Components & UI
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/common/mode-toggle";
import { ThemeSelect } from "@/components/common/theme-select";
import { LocaleSelect } from "@/components/common/locale-select";
import { ButtonLink, Muted } from "@/components/common/typography";
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
type BaseItem = { icon: Icon, label: string };
type LinkItem = BaseItem & { href: Route };
type MenuItem = BaseItem & {
	items: Array<Omit<LinkItem, "icon"> & { description: string }>;
};

// Constants & Variables
import { STUFF } from "@/app/stuff/stuff";
const NAV_ITEMS: Array<LinkItem | MenuItem> = [
	{
		icon: NotebookIcon,
		label: "Articles",
		href: "/articles",
	},
	{
		icon: CubeIcon,
		label: "Tools",
		href: "/tools",
	},
	{
		icon: ArchiveIcon,
		label: "Stuff",
		items: STUFF.map(stuff => ({
			label: stuff.title,
			description: stuff.description,
			href: stuff.url,
		})),
	},
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
						<RitmoIcon viewBox="3 3 18 18" className="p-0.5" />
					</ButtonLink>
				</div>
				<NavigationMenu>
					<NavigationMenuList className="-space-x-0.5">
						{NAV_ITEMS.map(item => "items" in item
							? <NavMenuItem key={item.label} {...item} />
							: <NavLinkItem key={item.label} {...item} />
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

function NavLinkItem({ icon: Icon, label, href }: LinkItem) {
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
						className="[&>svg]:max-xs:hidden"
					>
						<Icon
							data-icon="inline-start"
							weight={active ? "fill" : "regular"}
						/>
						{label}
					</ButtonLink>
				)}
			/>
		</NavigationMenuItem>
	);
}

function NavMenuItem({ icon: Icon, label, items }: MenuItem) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger className="[&>svg]:max-xs:hidden">
				<Icon data-icon="inline-start" />
				{label}
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-2">
					{items.map(item => (
						<li key={item.label}>
							<NavigationMenuLink
								closeOnClick={true}
								render={
									<NextLink
										href={item.href}
										className="grid gap-1"
									>
										<h3 className="font-heading font-semibold">
											{item.label}
										</h3>
										<Muted>{item.description}</Muted>
									</NextLink>
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
			<PopoverContent>
				<ul className="grid gap-2 pl-2">
					<li className="flex items-center gap-4 text-sm">
						Mode
						<ModeToggle className="ml-auto" />
					</li>
					<li className="flex items-center gap-4 text-sm">
						Theme
						<ThemeSelect className="ml-auto w-34" />
					</li>
					<li className="flex items-center gap-4 text-sm">
						Language
						<LocaleSelect className="ml-auto w-34" />
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	);
}