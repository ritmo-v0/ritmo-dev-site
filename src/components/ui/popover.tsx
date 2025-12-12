import { cn } from "@/lib/utils";

// Components & UI
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";



function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	delay = 500,
	closeDelay = 50,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return (
		<PopoverPrimitive.Trigger
			data-slot="popover-trigger"
			delay={delay}
			closeDelay={closeDelay}
			{...props}
		/>
	);
}

function PopoverContent({
	className,
	children,
	sideOffset = 8,
	collisionPadding = 16,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Positioner>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
				{...props}
			>
				<PopoverPrimitive.Popup
					data-slot="popover-popup"
					className={cn(
						"relative w-fit p-2 bg-popover text-popover-foreground border rounded-lg shadow-md",
						"transition data-instant:transition-none origin-(--transform-origin)",
						"data-starting-style:scale-90 data-starting-style:opacity-0",
						"data-ending-style:scale-90 data-ending-style:opacity-0",
						className,
					)}
				>
					{children}
				</PopoverPrimitive.Popup>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

export { Popover, PopoverTrigger, PopoverContent };