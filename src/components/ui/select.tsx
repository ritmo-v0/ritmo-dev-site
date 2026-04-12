import { cn } from "@/lib/utils";

// Components & UI
import { Select as SelectPrimitive } from "@base-ui/react/select";

// Icons & Images
import {
	CaretDownIcon,
	CaretUpIcon,
	CheckIcon,
} from "@phosphor-icons/react";



function Select<TValue>({ ...props }: SelectPrimitive.Root.Props<TValue>) {
	return <SelectPrimitive.Root<TValue> data-slot="select" {...props} />;
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={cn("flex-1 flex items-center gap-1.5 text-left", className)}
			{...props}
		/>
	);
}

function SelectTrigger({
	className,
	children,
	size = "default",
	...props
}: SelectPrimitive.Trigger.Props & { size?: "sm" | "default" }) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"flex items-center justify-between gap-1.5 px-3 py-2 w-fit text-sm bg-input/50 rounded-full border border-transparent outline-none shadow-xs transition-[color,box-shadow,background-color] whitespace-nowrap select-none",
				"data-[size=default]:h-9 data-[size=sm]:h-8 data-placeholder:text-muted-foreground",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
				"aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon>
				<CaretDownIcon
					className="text-muted-foreground"
					aria-hidden="true"
				/>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	collisionPadding = 16,
	alignItemWithTrigger = true,
	...props
}: SelectPrimitive.Popup.Props &
	Pick<
		SelectPrimitive.Positioner.Props,
		"align" | "alignOffset" | "collisionPadding" | "side" | "sideOffset" | "alignItemWithTrigger"
	>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				className="outline-none select-none"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
				alignItemWithTrigger={alignItemWithTrigger}
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					className={cn(
						"group relative w-[calc(var(--anchor-width)+3*var(--spacing))] max-h-(--available-height) text-popover-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-3xl shadow-lg overflow-x-hidden overflow-y-auto",
						"bg-popover/80 supports-backdrop-filter:backdrop-blur-md supports-backdrop-filter:backdrop-saturate-150",
						"transition-[transform,scale,opacity] data-[side=none]:transition-none origin-(--transform-origin)",
						"data-starting-style:scale-90 data-starting-style:opacity-0",
						"data-ending-style:scale-90 data-ending-style:opacity-0",
						className,
					)}
					{...props}
				>
					<SelectScrollUpArrow />
					<SelectPrimitive.List>
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
}: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"relative flex items-center gap-2.5 w-full ps-3 pe-8 py-2 font-medium text-sm rounded-full outline-hidden select-none",
				"focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground",
				"data-disabled:opacity-50 data-disabled:pointer-events-none",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText className="flex-1 shrink-0 flex items-center gap-1.5 whitespace-nowrap">
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className="absolute inset-e-2">
				<CheckIcon />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn("scroll-my-1.5 p-1.5", className)}
			{...props}
		/>
	);
}

function SelectGroupLabel({
	className,
	...props
}: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-group-label"
			className={cn("px-3 py-2.5 text-xs text-muted-foreground", className)}
			{...props}
		/>
	);
}

function SelectScrollUpArrow({
	className,
	...props
}: SelectPrimitive.ScrollUpArrow.Props) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-arrow"
			className={cn(
				"flex items-center justify-center w-full py-1 cursor-default z-1 top-0",
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
}: SelectPrimitive.ScrollDownArrow.Props) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-arrow"
			className={cn(
				"flex items-center justify-center w-full py-1 cursor-default z-1 bottom-0",
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
}: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn(
				"-mx-1.5 my-1.5 h-px bg-border pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectGroupLabel,
	SelectItem,
	SelectScrollDownArrow,
	SelectScrollUpArrow,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};