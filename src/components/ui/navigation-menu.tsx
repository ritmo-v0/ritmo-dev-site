import { cn } from "@/lib/utils";

// Components & UI
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { buttonVariants } from "./button";

// Icons & Images
import { CaretDownIcon } from "@phosphor-icons/react";

// Types & Interfaces
import type { VariantProps } from "class-variance-authority";



function NavigationMenu({
	className,
	children,
	delay = 50,
	closeDelay = 50,
	align = "center",
	...props
}: NavigationMenuPrimitive.Root.Props &
	Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			delay={delay}
			closeDelay={closeDelay}
			className={cn(
				"group/navigation-menu flex-1 flex items-center justify-center-safe max-w-max",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuPositioner align={align} />
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: NavigationMenuPrimitive.List.Props) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex-1 flex items-center justify-center gap-0 list-none",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn(className)}
			{...props}
		/>
	);
}

function NavigationMenuTrigger({
	className,
	children,
	size = "default",
	...props
}: NavigationMenuPrimitive.Trigger.Props &
	Pick<VariantProps<typeof buttonVariants>, "size">) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(
				buttonVariants({ variant: "ghost", size }),
				"group/navigation-menu-trigger data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuPrimitive.Icon className="transition duration-300 ease-out data-popup-open:rotate-180">
				<CaretDownIcon aria-hidden="true" />
			</NavigationMenuPrimitive.Icon>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: NavigationMenuPrimitive.Content.Props) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"h-full p-2 transition data-instant:transition-none duration-300 ease-out",
				"data-starting-style:opacity-0 data-ending-style:opacity-0",
				"data-starting-style:data-[activation-direction=left]:-translate-x-3/4 rtl:data-starting-style:data-[activation-direction=right]:translate-x-3/4",
				"data-starting-style:data-[activation-direction=right]:translate-x-3/4 rtl:data-starting-style:data-[activation-direction=left]:-translate-x-3/4",
				"data-ending-style:data-[activation-direction=left]:translate-x-3/4 rtl:data-ending-style:data-[activation-direction=left]:-translate-x-3/4",
				"data-ending-style:data-[activation-direction=right]:-translate-x-3/4 rtl:data-ending-style:data-[activation-direction=right]:translate-x-3/4",
				"",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuLink({
	className,
	...props
}: NavigationMenuPrimitive.Link.Props) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"focus:bg-muted rounded-l-full rounded-r-full",
				"hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 data-active:bg-muted data-active:text-accent-foreground",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
				"in-data-[slot=navigation-menu-content]:px-3 in-data-[slot=navigation-menu-content]:py-2 in-data-[slot=navigation-menu-content]:rounded-xl",
				"in-data-[slot=navigation-menu-content]:focus:ring-0 in-data-[slot=navigation-menu-content]:focus:outline-none",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuPositioner({
	className,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	collisionPadding = 16,
	...props
}: NavigationMenuPrimitive.Positioner.Props) {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
				className={cn(
					"w-(--positioner-width) h-(--positioner-height) max-w-(--available-width)",
					"transition-[top,left,right,bottom] data-instant:transition-none duration-300 ease-out",
					"data-[side=bottom]:before:-top-2.5 data-[side=bottom]:before:inset-s-0 data-[side=bottom]:before:inset-e-0",
					className,
				)}
				{...props}
			>
				<NavigationMenuPopup>
					<NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
				</NavigationMenuPopup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	);
}

function NavigationMenuPopup({
	className,
	...props
}: NavigationMenuPrimitive.Popup.Props) {
	return (
		<NavigationMenuPrimitive.Popup
			data-slot="navigation-menu-popup"
			className={cn(
				"relative w-(--popup-width) h-(--popup-height) text-popover-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 outline-none rounded-3xl shadow-lg",
				"bg-popover/80 supports-backdrop-filter:backdrop-blur-md supports-backdrop-filter:backdrop-saturate-150",
				"transition-all data-instant:transition-none origin-(--transform-origin) duration-300 ease-out",
				"data-starting-style:scale-90 data-starting-style:opacity-0",
				"data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-in",
				className,
			)}
			{...props}
		/>
	);
}

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuPositioner,
};