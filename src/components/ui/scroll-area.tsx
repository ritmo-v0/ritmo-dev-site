import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";



const scrollAreaVariants = cva(
	[
		"[--fade-size:48px] size-full rounded-xs overscroll-contain outline-none transition-[color,box-shadow]",
		"focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
		"before:block before:content-[''] before:absolute before:-top-px before:left-0 before:from-background before:to-transparent before:z-1 before:select-none before:pointer-events-none",
		"after:block after:content-[''] after:absolute after:-bottom-px after:right-0 after:from-background after:to-transparent after:z-1 after:select-none after:pointer-events-none",
	],
	{
		variants: {
			orientation: {
				vertical: [
					"before:[--scroll-area-overflow-y-start:inherit] before:[--scroll-area-overflow-y-end:inherit]",
					"after:[--scroll-area-overflow-y-start:inherit] after:[--scroll-area-overflow-y-end:inherit]",
					"before:w-full before:h-[min(var(--fade-size),var(--scroll-area-overflow-y-start))] before:bg-linear-to-b",
					"after:w-full after:h-[min(var(--fade-size),var(--scroll-area-overflow-y-end,var(--fade-size)))] after:bg-linear-to-t",
				],
				horizontal: [
					"before:[--scroll-area-overflow-x-start:inherit] before:[--scroll-area-overflow-x-end:inherit]",
					"after:[--scroll-area-overflow-x-start:inherit] after:[--scroll-area-overflow-x-end:inherit]",
					"before:h-full before:w-[min(var(--fade-size),var(--scroll-area-overflow-x-start))] before:bg-linear-to-r",
					"after:h-full after:w-[min(var(--fade-size),var(--scroll-area-overflow-x-end,var(--fade-size)))] after:bg-linear-to-l",
				],
				both: "",
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	}
);

function ScrollArea({
	className,
	orientation,
	...props
}: ScrollAreaPrimitive.Root.Props &
	VariantProps<typeof scrollAreaVariants>) {
	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn("relative", className)}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				data-orientation={orientation}
				className={cn(scrollAreaVariants({ orientation, className }))}
				{...props}
			/>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			data-slot="scroll-area-scrollbar"
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				"flex transition-opacity delay-300 pointer-events-none select-none touch-none opacity-0 z-2",
				"data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-75 data-hovering:pointer-events-auto",
				"data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-75 data-scrolling:pointer-events-auto",
				"data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className="flex-1 bg-border hover:bg-primary/40 rounded-full"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };