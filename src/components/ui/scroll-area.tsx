import { cn } from "@/lib/utils";

// Components & UI
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area";



function ScrollArea({
	className,
	children,
	...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn("relative rounded-md", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className={cn(
					"h-full rounded-[inherit] overscroll-contain outline-none transition-[color,box-shadow]",
					"focus-visible:outline-1 focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"before:select-none after:select-none before:pointer-events-none after:pointer-events-none",
					"before:block before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-12 before:bg-linear-to-b before:from-background before:to-transparent before:transition-opacity before:duration-75 before:opacity-0 data-overflow-y-start:before:opacity-100",
					"after:block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-12 after:bg-linear-to-t after:from-background after:to-transparent after:transition-opacity after:duration-75 after:opacity-0 data-overflow-y-end:after:opacity-100",
				)}
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			className={cn(
				"flex transition-opacity delay-300 pointer-events-none select-none touch-none opacity-0",
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