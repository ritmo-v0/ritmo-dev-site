import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";



const toggleVariants = cva(
	[
		"not-disabled:cursor-pointer select-none inline-flex shrink-0 items-center justify-center gap-2 font-medium text-sm rounded-md outline-none transition-[color,box-shadow] whitespace-nowrap",
		"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
		"hover:bg-muted hover:text-muted-foreground data-pressed:bg-accent data-pressed:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
		"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	],
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "bg-transparent border border-input shadow-xs hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 px-2 min-w-9",
				sm: "h-8 px-1.5 min-w-8",
				lg: "h-10 px-2.5 min-w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Toggle({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TogglePrimitive> &
	VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };