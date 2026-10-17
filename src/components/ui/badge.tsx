import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";

// Components & UI
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";



const badgeVariants = cva(
	[
		"group/badge inline-flex shrink-0 items-center justify-center gap-1 w-fit py-0.5 font-medium text-xs border border-transparent rounded-full outline-none transition-colors overflow-hidden whitespace-nowrap",
		"has-data-[icon=inline-start]:pl-1.5 has-data-[icon=inline-end]:pr-1.5",
		"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
		"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
		"in-data-[slot=tooltip-content]:bg-background/20 dark:in-data-[slot=tooltip-content]:bg-background/10 in-data-[slot=tooltip-content]:text-background",
		"[&>svg]:shrink-0 [&>svg]:size-3! [&>svg]:pointer-events-none",
	],
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				secondary: "bg-secondary text-secondary-foreground",
				outline: "border-border bg-input/30 text-foreground",
				destructive: "bg-destructive/10 dark:bg-destructive/20 text-destructive",
				Arcaea: "bg-[#64486B] text-white",
				替代役: "bg-[#49A038] dark:bg-[#E07800] text-white",
			},
			size: {
				default: "h-5 px-2",
				sm: "h-4 px-1.25",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Badge({
	className,
	variant = "default",
	size = "default",
	render,
	...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ variant, size }), className),
			},
			props
		),
		render,
		state: {
			slot: "badge",
			variant,
		},
	});
}

export { Badge, badgeVariants };