"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Components & UI
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/common/mode-toggle";
import { ThemeSelect } from "@/components/common/theme-select";
import { LocaleSelect } from "@/components/common/locale-select";
import { ButtonLink, H3, Muted } from "@/components/common/typography";
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
import type { Icon } from "@phosphor-icons/react";
type NavItem = {
	id: string;
	icon: Icon;
	items?: string[];
};

// Constants & Variables
const NAV_ITEMS: NavItem[] = [
	{
		id: "articles",
		icon: NotebookIcon,
	},
	{
		id: "tools",
		icon: CubeIcon,
	},
	{
		id: "stuff",
		icon: ArchiveIcon,
		items: ["7sref", "iroduku-pgm", "inm-clock"],
	},
];



export function Navbar() {
	return (
		<div className={cn(
			"fixed left-0 top-0 content-center",
			"w-full h-16 px-4 py-3 z-50 pointer-events-none",
		)}>
			<div className={cn(
				"flex items-center gap-2 mx-auto max-w-max pointer-events-auto",
				"*:bg-background/40 *:border *:rounded-full",
				"*:backdrop-blur-md *:backdrop-saturate-200",
				"*:backdrop-brightness-120 *:dark:backdrop-brightness-80",
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
						{NAV_ITEMS.map(item => item.items
							? <NavMenuItem key={item.id} {...item} items={item.items} />
							: <NavLinkItem key={item.id} {...item} />
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

function NavLinkItem({ id, icon: Icon }: NavItem) {
	const t = useTranslations(id);
	const pathname = usePathname();

	const url = `/${id}`;
	const active = pathname.startsWith(url);

	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				active={active}
				render={
					<ButtonLink
						href={url}
						variant="ghost"
						className="xs:ps-2.5"
					/>
				}
			>
				<Icon
					className="max-xs:hidden"
					weight={active ? "fill" : "regular"}
				/>
				{t("label")}
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
}

function NavMenuItem({ id, icon: Icon, items }: Required<NavItem>) {
	const t = useTranslations(id);

	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger className="xs:ps-2.5">
				<Icon className="max-xs:hidden" />
				{t("label")}
			</NavigationMenuTrigger>
			<NavigationMenuContent className="max-w-74" keepMounted>
				<ul className="grid gap-1">
					{items.map(itemId => (
						<li key={itemId}>
							<NavigationMenuLink
								className="grid gap-1.5"
								closeOnClick={true}
								render={<Link href={`/${id}/${itemId}`} />}
							>
								<H3 className="text-base/tight [&+p]:mt-0!">
									{t(`${itemId}.title`)}
								</H3>
								<Muted>
									{t(`${itemId}.description`)}
								</Muted>
							</NavigationMenuLink>
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