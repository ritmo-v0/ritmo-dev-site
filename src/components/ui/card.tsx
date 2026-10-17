import { cn } from "cn";



function Card({
	className,
	size = "default",
	...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" | "lg" }) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				"@container/card group/card flex flex-col gap-(--card-spacing) py-(--card-spacing) bg-card text-sm text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-4xl overflow-hidden",
				"[--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)] data-[size=lg]:[--card-spacing:--spacing(8)]",
				"has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header group/card-header grid auto-rows-min items-start gap-1.5 px-(--card-spacing) rounded-t-4xl [.border-b]:pb-(--card-spacing)",
				"has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("font-heading font-semibold text-base", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"row-start-1 row-span-2 col-start-2 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-(--card-spacing)", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center rounded-b-4xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};