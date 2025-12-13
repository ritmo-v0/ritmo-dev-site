import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Slot as SlotPrimitive } from "radix-ui";



const buttonVariants = cva(
	[
		"not-disabled:cursor-pointer select-none inline-flex shrink-0 items-center justify-center gap-2 font-medium text-sm rounded-md outline-none transition-all whitespace-nowrap",
		"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
		"disabled:pointer-events-none disabled:opacity-50",
		"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	],
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:scale-[0.975]",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 active:scale-[0.975] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 active:scale-[0.975]",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:scale-[0.975]",
				ghost:
					"hover:bg-accent dark:hover:bg-accent/50 hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-active:bg-accent dark:data-active:bg-accent data-active:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				nothing: "",
				"7sref": "bg-linear-to-b from-[#F9FAFE] to-[#D5E5FC] font-bold xs:text-base text-[#446EBA] rounded-3xl inset-shadow-[0_-2px_2px_#7893C8] active:scale-[0.975]",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9 rounded-full",
				"icon-sm": "size-8 rounded-full",
				"icon-lg": "size-10 rounded-full",
				emoji: "size-10 xs:size-12 not-focus-visible:focus:border-primary not-focus-visible:focus:border-[3px] will-change-transform",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
	const Comp = asChild ? SlotPrimitive.Slot : "button";

	return (
		<Comp
			type="button"
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };