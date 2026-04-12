import { cn } from "@/lib/utils";



export function Textarea({
	className,
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"flex min-h-16 w-full p-3 resize-none bg-input/50 text-base md:text-sm border border-transparent outline-none rounded-2xl transition-[color,box-shadow,background-color]",
				"field-sizing-content placeholder:text-muted-foreground",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
				"aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
}