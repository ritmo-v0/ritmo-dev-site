import { cn } from "@/lib/utils";

// Components & UI
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

// Icons & Images
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react";



function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
	return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
	return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
	return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuContent({
	className,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	collisionPadding = 16,
	...props
}: MenuPrimitive.Popup.Props &
	Pick<
		MenuPrimitive.Positioner.Props,
		"align" | "alignOffset" | "collisionPadding" | "side" | "sideOffset"
	>) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				className="outline-none"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
			>
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={cn(
						"min-w-3xs max-h-(--available-height) w-(--anchor-width) p-2 text-popover-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 outline-none rounded-3xl shadow-lg overflow-x-hidden overflow-y-auto data-closed:overflow-hidden",
						"bg-popover/80 supports-backdrop-filter:backdrop-blur-md supports-backdrop-filter:backdrop-saturate-150",
						"transition-[transform,scale,opacity] data-instant:transition-none origin-(--transform-origin)",
						"data-starting-style:scale-90 data-starting-style:opacity-0",
						"data-ending-style:scale-90 data-ending-style:opacity-0",
						"**:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10",
						"not-data-[variant=destructive]:data-[slot$=-item]:focus:**:text-accent-foreground",
						className
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	)
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
	return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
	className,
	...props
}: MenuPrimitive.GroupLabel.Props) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot="dropdown-menu-label"
			className={cn(
				"px-3 py-2.5 text-xs text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuItem({
	className,
	variant = "default",
	...props
}: MenuPrimitive.Item.Props & { variant?: "default" | "destructive" }) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-variant={variant}
			className={cn(
				"group/dropdown-menu-item flex items-center gap-2 px-3 py-2 font-medium text-sm rounded-full outline-hidden select-none",
				"data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20",
				"disabled:opacity-50 disabled:pointer-events-none",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
	className,
	children,
	delay = 0,
	...props
}: MenuPrimitive.SubmenuTrigger.Props) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			className={cn(
				"flex items-center gap-2 px-3 py-2 font-medium text-sm rounded-full outline-hidden select-none",
				"focus:bg-foreground/10 not-focus:data-popup-open:bg-foreground/5 data-popup-open:text-accent-foreground",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			delay={delay}
			{...props}
		>
			{children}
			<CaretRightIcon className="ml-auto" />
		</MenuPrimitive.SubmenuTrigger>
	);
}

function DropdownMenuSubContent({
	className,
	align = "start",
	alignOffset = -8,
	side = "right",
	sideOffset = 0,
	...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return (
		<DropdownMenuContent
			data-slot="dropdown-menu-sub-content"
			className={cn(
				"min-w-36 w-auto p-2 bg-popover text-popover-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-3xl shadow-lg",
				"bg-popover/80 supports-backdrop-filter:backdrop-blur-md supports-backdrop-filter:backdrop-saturate-150",
				"transition-[transform,scale,opacity] data-instant:transition-none origin-(--transform-origin)",
				"data-starting-style:scale-95 data-starting-style:opacity-0",
				"data-ending-style:scale-95 data-ending-style:opacity-0",
				className,
			)}
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

function DropdownMenuCheckboxItem({
	className,
	children,
	...props
}: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				"relative flex items-center gap-2 pl-3 pr-8 py-2 font-medium text-sm rounded-full outline-hidden select-none",
				"data-disabled:opacity-50 data-disabled:pointer-events-none",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		>
			<MenuPrimitive.CheckboxItemIndicator
				data-slot="dropdown-menu-checkbox-item-indicator"
				className="absolute right-2"
			>
				<CheckIcon />
			</MenuPrimitive.CheckboxItemIndicator>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
	return (
		<MenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

function DropdownMenuRadioItem({
	className,
	children,
	...props
}: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"relative flex items-center gap-2 pl-3 pr-8 py-2 font-medium text-sm rounded-full outline-hidden select-none",
				"data-disabled:opacity-50 data-disabled:pointer-events-none",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		>
			<MenuPrimitive.RadioItemIndicator
				data-slot="dropdown-menu-radio-item-indicator"
				className="absolute right-2"
			>
				<CheckIcon />
			</MenuPrimitive.RadioItemIndicator>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function DropdownMenuSeparator({
	className,
	...props
}: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("bg-border/50 -mx-1.5 my-1.5 h-px", className)}
			{...props}
		/>
	);
}

function DropdownMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn(
				"ml-auto text-muted-foreground text-xs",
				"group-focus/dropdown-menu-item:text-accent-foreground",
				"opacity-0 group-hover/dropdown-menu-item:opacity-100",
				"group-data-highlighted/dropdown-menu-item:opacity-100",
				className,
			)}
			{...props}
		/>
	);
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
};