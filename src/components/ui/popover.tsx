import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";



function Popover({ ...props }: PopoverPrimitive.Root.Props) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	delay = 0,
	closeDelay = 50,
	...props
}: PopoverPrimitive.Trigger.Props) {
	return (
		<PopoverPrimitive.Trigger
			data-slot="popover-trigger"
			delay={delay}
			closeDelay={closeDelay}
			{...props}
		/>
	);
}

const popoverContentVariants = cva(
	[
		"relative flex flex-col gap-4 w-fit text-sm ring-1 ring-foreground/5 dark:ring-foreground/10 outline-hidden rounded-3xl shadow-lg",
		"transition-[transform,scale,opacity] data-instant:transition-none origin-(--transform-origin)",
		"data-starting-style:scale-90 data-starting-style:opacity-0",
		"data-ending-style:scale-90 data-ending-style:opacity-0",
	],
	{
		variants: {
			variant: {
				default: "min-w-3xs p-4 bg-popover/80 text-popover-foreground supports-backdrop-filter:backdrop-blur-md supports-backdrop-filter:backdrop-saturate-150",
				tooltip: "px-3.5 py-2 bg-foreground text-background",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function PopoverContent({
	className,
	variant = "default",
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	collisionPadding = 16,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<
		PopoverPrimitive.Positioner.Props,
		"align" | "alignOffset" | "collisionPadding" | "side" | "sideOffset"
	> & VariantProps<typeof popoverContentVariants>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={variant === "tooltip" ? "top" : side}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
			>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					data-variant={variant}
					className={cn(popoverContentVariants({ variant, className }))}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="popover-header"
			className={cn("flex flex-col gap-1 text-sm", className)}
			{...props}
		/>
	);
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn("font-heading font-semibold text-base/tight", className)}
			{...props}
		/>
	);
}

function PopoverDescription({
	className,
	...props
}: PopoverPrimitive.Description.Props) {
	return (
		<PopoverPrimitive.Description
			data-slot="popover-description"
			className={cn("text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
};