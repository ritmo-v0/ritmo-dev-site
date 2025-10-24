import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Tooltip as TooltipPrimitive } from "@base-ui-components/react/tooltip";



function TooltipProvider({
	delay = 500,
	closeDelay = 50,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			closeDelay={closeDelay}
			{...props}
		/>
	);
}

function Tooltip({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

const tooltipContentVariants = cva(
	"w-fit rounded-md shadow-xs transition-all data-[instant]:transition-none origin-(--transform-origin) data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				outline: "bg-card text-card-foreground border",
			},
			size: {
				default: "px-3 py-1.5 text-sm text-balance",
				lg: "p-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function TooltipContent({
	className,
	children,
	variant,
	size,
	sideOffset = 8,
	collisionPadding = 16,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Positioner>
	& VariantProps<typeof tooltipContentVariants>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
				{...props}
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-popup"
					className={cn(tooltipContentVariants({ variant, size, className }))}
				>
					{children}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };