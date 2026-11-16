import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { cn } from "cn";



export function Container({
	className,
	width = 1400,
	render,
	...props
}: useRender.ComponentProps<"div"> & { width?: number }) {
	return useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(
			{
				style: { "--max-width": `${width}px` } as React.CSSProperties,
				className: cn(
					"@container mx-auto max-inline-[calc(var(--max-width)+var(--padding)*2)]",
					"[--padding:--spacing(4)] sm:[--padding:--spacing(8)] px-(--padding)",
					className,
				),
			},
			props
		),
	});
}