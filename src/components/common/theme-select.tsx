"use client";
import { useThemeStore } from "@/lib/store/theme";
import { cn } from "@/lib/utils";

// Shadcn Theme
import { getThemeColor } from "@/lib/theme/utils";
import { PRESET_NAMES } from "@/lib/theme/presets";

// Components & UI
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";



export function ThemeSelect({ className }: React.ComponentProps<typeof SelectTrigger>) {
	const { preset, setPreset } = useThemeStore();

	return (
		<Select value={preset} onValueChange={setPreset}>
			<SelectTrigger size="sm" className={cn("w-34", className)}>
				<SelectValue placeholder="Select a theme..." />
			</SelectTrigger>
			<SelectContent>
				{PRESET_NAMES.map((name) => (
					<SelectItem key={name} value={name} className="flex items-center gap-3">
						<div className="size-6 bg-background rounded border p-1">
							<div className="grid grid-rows-2 grid-cols-2 gap-0.5 size-full">
								<div className="rounded-0.5" style={{ backgroundColor: getThemeColor(name, "primary") }} />
								<div className="rounded-0.5" style={{ backgroundColor: getThemeColor(name, "destructive") }} />
								<div className="rounded-0.5" style={{ backgroundColor: getThemeColor(name, "secondary") }} />
								<div className="rounded-full" style={{ backgroundColor: getThemeColor(name, "accent") }} />
							</div>
						</div>
						<span>{name.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase())}</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}