import { cn } from "@/lib/utils";



export function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="label"
			className={cn(
				"flex items-center gap-2 font-medium text-sm leading-none select-none",
				"peer-data-disabled:opacity-50 peer-data-disabled:cursor-not-allowed",
				"group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}