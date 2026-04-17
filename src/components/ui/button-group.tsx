import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { Separator } from "@/components/ui/separator";



const buttonGroupVariants = cva(
	[
		"flex items-stretch w-fit *:focus-visible:relative *:focus-visible:z-10",
		"[&>input]:flex-1",
		"[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
		"has-[>[data-variant=outline]]:[&>input]:border-border has-[>[data-variant=outline]]:[&>input:focus-visible]:border-ring",
		"has-[>[data-variant=outline]]:*:data-[slot=input-group]:border-border has-[>[data-variant=outline]]:[&>[data-slot=input-group]:has(:focus-visible)]:border-ring",
		"has-[>[data-variant=outline]]:*:data-[slot=select-trigger]:border-border has-[>[data-variant=outline]]:[&>[data-slot=select-trigger]:focus-visible]:border-ring",
	],
	{
		variants: {
			orientation: {
				horizontal: "*:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-full! [&>[data-slot]~[data-slot]]:border-l-0",
				vertical: "flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-full! [&>[data-slot]~[data-slot]]:border-t-0",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	}
);

function ButtonGroup({
	className,
	orientation,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function ButtonGroupText({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"flex items-center justify-center gap-2 px-2.5 bg-muted font-medium text-sm border rounded-full",
					"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
					className,
				),
			},
			props
		),
		render,
		state: {
			slot: "button-group-text",
		},
	});
}

function ButtonGroupSeparator({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="button-group-separator"
			orientation={orientation}
			className={cn(
				"self-stretch relative bg-input",
				"data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto",
				"data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto",
				className,
			)}
			{...props}
		/>
	);
}

export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants,
};