"use client";
import { cn } from "@/lib/utils";

// Components & UI
import { Select as SelectPrimitive } from "@base-ui-components/react/select";

// Icons & Images
import {
	CaretDownIcon,
	CaretUpIcon,
	CaretUpDownIcon,
	CheckIcon,
} from "@phosphor-icons/react";



function Select<TValue>({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root<TValue>>) {
	return <SelectPrimitive.Root<TValue> data-slot="select" {...props} />;
}

function SelectTrigger({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: "sm" | "default"
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"not-disabled:cursor-pointer select-none flex items-center justify-between gap-2 w-fit px-3 pr-2 py-2 text-sm bg-transparent dark:bg-input/30 dark:hover:bg-input/50 rounded-md border border-input outline-none shadow-xs transition-[color,box-shadow] whitespace-nowrap",
				"data-[size=default]:h-9 data-[size=sm]:h-8 data-placeholder:text-muted-foreground",
				"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
				"disabled:pointer-events-none disabled:opacity-50",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				"*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon>
				<CaretUpDownIcon className="size-3.5 opacity-50" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectContent({
	className,
	children,
	sideOffset = 8,
	collisionPadding = 16,
	alignItemWithTrigger = false,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Positioner>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				className="outline-none select-none"
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
				alignItemWithTrigger={alignItemWithTrigger}
				{...props}
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					className={cn(
						"group relative min-w-30 bg-popover text-popover-foreground border rounded-md shadow-md overflow-clip",
						"transition data-[side=none]:transition-none origin-(--transform-origin)",
						"data-starting-style:scale-90 data-starting-style:opacity-0",
						"data-ending-style:scale-90 data-ending-style:opacity-0",
						className,
					)}
				>
					<SelectScrollUpArrow />
					<SelectPrimitive.List className="relative max-h-(--available-height) p-1 overflow-y-auto">
						{children}
					</SelectPrimitive.List>
					<SelectScrollDownArrow />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"not-disabled:cursor-pointer relative flex items-center gap-2 w-full pl-2 pr-8 py-1.5 text-sm focus:bg-accent focus:text-accent-foreground rounded-xs outline-hidden select-none",
				"min-w-(--anchor-width) group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)]",
				"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
				"data-disabled:pointer-events-none data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText className="flex items-center gap-2">
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className="absolute right-2">
				<CheckIcon className="size-4" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectGroupLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
			{...props}
		/>
	);
}

function SelectScrollUpArrow({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-arrow"
			className={cn(
				"flex items-center justify-center w-full py-1 rounded-xl cursor-pointer z-1 top-0",
				"bg-linear-to-b from-popover to-transparent",
				className,
			)}
			{...props}
		>
			<CaretUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpArrow>
	);
}

function SelectScrollDownArrow({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-arrow"
			className={cn(
				"flex items-center justify-center w-full py-1 rounded-xl cursor-pointer z-1 bottom-0",
				"bg-linear-to-t from-popover to-transparent",
				className,
			)}
			{...props}
		>
			<CaretDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownArrow>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("h-px -mx-1 my-1 bg-border pointer-events-none", className)}
			{...props}
		/>
	);
}

export {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
	SelectGroupLabel,
	SelectScrollUpArrow,
	SelectScrollDownArrow,
	SelectSeparator,
};