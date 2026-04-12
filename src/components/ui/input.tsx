import { cn } from "@/lib/utils";

// Components & UI
import { Input as InputPrimitive } from "@base-ui/react/input";



export function Input({ className, type, ...props }: InputPrimitive.Props) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"flex px-3 py-1 bg-input/50 min-w-0 w-full h-9 text-base md:text-sm rounded-full border border-transparent transition-[color,box-shadow,background-color] outline-none",
				"file:inline-flex file:h-7 file:font-medium file:bg-transparent file:text-sm file:text-foreground file:border-0",
				"placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
				"aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				"disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
}