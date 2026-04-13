import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Button as ButtonPrimitive } from "@base-ui/react/button";



const buttonVariants = cva(
	[
		"group/button shrink-0 inline-flex items-center justify-center bg-clip-padding font-medium text-sm border border-transparent outline-none rounded-full transition select-none whitespace-nowrap",
		"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
		"aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
		"disabled:opacity-50 disabled:pointer-events-none",
		"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
	],
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/80 inset-shadow-xs inset-shadow-white/40 will-change-transform active:scale-[0.975]",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground will-change-transform active:scale-[0.975]",
				destructive: "bg-destructive/10 dark:bg-destructive/20 text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/30 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 will-change-transform active:scale-[0.975]",
				outline: "bg-background dark:bg-transparent border-border dark:border-input dark:backdrop-blur-md hover:bg-muted dark:hover:bg-input/30 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground will-change-transform active:scale-[0.975]",
				ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 data-active:bg-muted data-active:text-accent-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				nothing: "",
			},
			size: {
				default: "gap-1.5 h-9 px-3 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5",
				xs: "gap-1 h-6 px-2.5 text-xs has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "gap-1 h-8 px-3 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
				lg: "gap-1.5 h-10 px-4 has-data-[icon=inline-start]:ps-3 has-data-[icon=inline-end]:pe-3",
				icon: "size-9",
				"icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
				emoji: "size-12 [&_img]:size-7 rounded-xl not-focus-visible:focus:border-primary not-focus-visible:focus:border-3",
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
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Button, buttonVariants };