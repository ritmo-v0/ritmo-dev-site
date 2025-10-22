import * as React from "react";
import { cn } from "@/lib/utils"

// Components & UI
import { NavigationMenu as NavigationMenuBase } from "@base-ui-components/react/navigation-menu";
import { buttonVariants } from "./button";

// Icons & Images
import { CaretDownIcon } from "@phosphor-icons/react";

// Types & Interfaces
import type { VariantProps } from "class-variance-authority";



function NavigationMenu({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Root>) {
	return (
		<NavigationMenuBase.Root
			data-slot="navigation-menu"
			className={cn(
				"group/navigation-menu flex flex-1 items-center justify-center-safe max-w-max",
				className
			)}
			{...props}
		>
			{children}
			<NavigationMenuBase.Portal>
				<NavigationMenuPositioner sideOffset={8} collisionPadding={8}>
					<NavigationMenuPopup className="z-50">
						<NavigationMenuViewport />
					</NavigationMenuPopup>
				</NavigationMenuPositioner>
			</NavigationMenuBase.Portal>
		</NavigationMenuBase.Root>
	)
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.List>) {
	return (
		<NavigationMenuBase.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-1",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Item>) {
	return (
		<NavigationMenuBase.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
			{...props}
		/>
	)
}

function NavigationMenuTrigger({
	className,
	children,
	variant = "ghost",
	size,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Trigger> &
	VariantProps<typeof buttonVariants>) {
	return (
		<NavigationMenuBase.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(
				buttonVariants({ variant, size, className }),
				"data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground dark:data-[popup-open]:bg-accent/50",
			)}
			{...props}
		>
			{children}
			<NavigationMenuIcon>
				<CaretDownIcon aria-hidden="true" />
			</NavigationMenuIcon>
		</NavigationMenuBase.Trigger>
	)
}

function NavigationMenuIcon({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Icon>) {
	return (
		<NavigationMenuBase.Icon
			data-slot="navigation-menu-icon"
			className={cn("transition duration-300 ease-in-out data-[popup-open]:rotate-180", className)}
			{...props}
		>
			{children}
		</NavigationMenuBase.Icon>
	)
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Content>) {
	return (
		<NavigationMenuBase.Content
			data-slot="navigation-menu-content"
			className={cn(
				"h-full p-2 transition duration-300 ease-out",
				"data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
				"data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%]",
				"data-[starting-style]:data-[activation-direction=right]:translate-x-[50%]",
				"data-[ending-style]:data-[activation-direction=left]:translate-x-[50%]",
				"data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%]",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Link>) {
	return (
		<NavigationMenuBase.Link
			data-slot="navigation-menu-link"
			className={cn(className)}
			{...props}
		/>
	)
}

function NavigationMenuPositioner({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Positioner>) {
	return (
		<NavigationMenuBase.Positioner
			data-slot="navigation-menu-positioner"
			className={cn(
				"w-[var(--positioner-width)] h-[var(--positioner-height)] max-w-[var(--available-width)]",
				"transition-[top,left,right,bottom] data-[instant]:transition-none origin-(--transform-origin) duration-300 ease-out",
				"before:absolute before:content-[''] data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuPopup({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Popup>) {
	return (
		<NavigationMenuBase.Popup
			data-slot="navigation-menu-popup"
			className={cn(
				"relative w-(--popup-width) h-(--popup-height) bg-popover text-popover-foreground border rounded-lg shadow",
				"transition-all origin-top duration-300 ease-in-out",
				"data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:ease-out data-[ending-style]:duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
				// "transition-[opacity,transform,width,height,scale,translate]",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuBase.Viewport>) {
	return (
		<NavigationMenuBase.Viewport
			data-slot="navigation-menu-viewport"
			className={cn("relative size-full overflow-hidden")}
			{...props}
		/>
	)
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuIcon,
	NavigationMenuContent,
	NavigationMenuLink,
	NavigationMenuPositioner,
	NavigationMenuPopup,
	NavigationMenuViewport,
}