import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";



const toggleVariants = cva(
	[
		"shrink-0 group/toggle inline-flex items-center justify-center gap-1.5 font-medium text-sm text-muted-foreground outline-none rounded-full transition-colors whitespace-nowrap",
		"hover:bg-muted hover:text-foreground data-pressed:bg-muted data-pressed:text-foreground",
		"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
		"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
		"disabled:opacity-50 disabled:pointer-events-none",
		"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
	],
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "bg-transparent border border-input",
			},
			size: {
				default: "min-w-9 h-9 px-3 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5",
				sm: "min-w-8 h-8 px-3 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
				lg: "min-w-10 h-10 px-4 has-data-[icon=inline-start]:ps-3 has-data-[icon=inline-end]:pe-3",
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
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };