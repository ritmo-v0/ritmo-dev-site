import { cn } from "@/lib/utils";

// Components & UI
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";



export function Switch({
	className,
	size = "default",
	...props
}: SwitchPrimitive.Root.Props & {
	size?: "sm" | "default";
}) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={cn(
				"shrink-0 group/switch peer relative inline-flex items-center border-2 outline-none rounded-full transition-all",
				"data-[size=default]:w-11 data-[size=default]:h-5 data-[size=sm]:w-7 data-[size=sm]:h-4",
				"data-unchecked:bg-input/90 data-unchecked:border-transparent data-checked:bg-primary data-checked:border-primary",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
				"aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				"data-disabled:opacity-50 data-disabled:cursor-not-allowed",
				"after:absolute after:-inset-x-3 after:-inset-y-2",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"block ring-0 rounded-full shadow-sm transition-transform pointer-events-none",
					"group-data-[size=default]/switch:w-6 group-data-[size=default]/switch:h-4",
					"group-data-[size=sm]/switch:w-4 group-data-[size=sm]/switch:h-3",
					"bg-background not-dark:bg-clip-padding dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground",
					"data-unchecked:translate-x-0 rtl:data-unchecked:translate-x-0 data-checked:translate-x-[calc(100%-8px)] rtl:data-checked:-translate-x-[calc(100%-8px)]",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}