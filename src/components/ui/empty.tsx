import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";



function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"flex-1 flex flex-col items-center justify-center gap-4 min-w-0 w-full p-12 text-center text-balance border-dashed rounded-2xl",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-header"
			className={cn(
				"flex flex-col items-center gap-2 max-w-sm",
				className,
			)}
			{...props}
		/>
	);
}

const emptyMediaVariants = cva(
	[
		"shrink-0 flex items-center justify-center mb-2",
		"[&_svg]:shrink-0 [&_svg]:pointer-events-none",
	],
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-10 bg-muted text-foreground rounded-xl [&_svg:not([class*='size-'])]:size-5",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function EmptyMedia({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
	return (
		<div
			data-slot="empty-icon"
			data-variant={variant}
			className={cn(emptyMediaVariants({ variant }), className)}
			{...props}
		/>
	);
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-title"
			className={cn("font-heading font-medium text-lg", className)}
			{...props}
		/>
	);
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="empty-description"
			className={cn("text-sm/relaxed text-muted-foreground", className)}
			{...props}
		/>
	);
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-content"
			className={cn(
				"flex flex-col items-center gap-4 min-w-0 max-w-sm w-full text-sm text-balance",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
	EmptyContent,
	EmptyMedia,
};