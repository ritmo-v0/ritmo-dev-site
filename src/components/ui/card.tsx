import { cn } from "@/lib/utils";



function Card({
	className,
	size = "default",
	...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
	return (
		<div
			data-slot="card"
			className={cn(
				"group/card flex flex-col gap-6 py-6 bg-card text-sm text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-4xl shadow-md overflow-hidden",
				"data-[size=sm]:gap-4 data-[size=sm]:py-4",
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
				"@container/card-header group/card-header grid auto-rows-min items-start gap-1.5 px-6 rounded-t-4xl [.border-b]:pb-6",
				"has-data-[slot=card-description]:grid-rows-[auto_auto] has-data-[slot=card-action]:grid-cols-[1fr_auto]",
				"group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:[.border-b]:pb-4",
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
			className={cn("font-heading font-semibold text-lg/tight", className)}
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
				"col-start-2 row-start-1 row-span-2 self-start justify-self-end",
				className
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center px-6 rounded-b-4xl [.border-t]:pt-6",
				"group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:[.border-t]:pt-4",
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