import { cn } from "@/lib/utils";

// Components & UI
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";



function TooltipProvider({
	delay = 500,
	closeDelay = 50,
	...props
}: TooltipPrimitive.Provider.Props) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			closeDelay={closeDelay}
			{...props}
		/>
	);
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
	return (
		<TooltipProvider>
			<TooltipPrimitive.Root data-slot="tooltip" {...props} />
		</TooltipProvider>
	);
}

function TooltipMultiple({ ...props }: TooltipPrimitive.Root.Props) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	children,
	align = "center",
	alignOffset = 0,
	side = "top",
	sideOffset = 8,
	collisionPadding = 16,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<
		TooltipPrimitive.Positioner.Props,
		"align" | "alignOffset" | "collisionPadding" | "side" | "sideOffset"
	>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"inline-flex items-center gap-1.5 w-fit px-3 py-1.5 bg-foreground text-xs text-background rounded-xl",
						"transition data-instant:transition-none origin-(--transform-origin)",
						"data-starting-style:scale-90 data-starting-style:opacity-0",
						"data-ending-style:scale-90 data-ending-style:opacity-0",
						"has-data-[slot=kbd]:pe-1.5 **:data-[slot=kbd]:rounded-lg",
						className,
					)}
					{...props}
				>
					{children}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export {
	Tooltip,
	TooltipMultiple,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
};