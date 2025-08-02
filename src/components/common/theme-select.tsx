"use client";
import { useThemeStore } from "@/lib/store/theme";

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
			<SelectTrigger className={className}>
				<SelectValue placeholder="Select a theme..." />
			</SelectTrigger>
			<SelectContent>
				{PRESET_NAMES.map((name) => (
					<SelectItem key={name} value={name} className="flex items-center gap-3">
						<div className="size-6 bg-background rounded border p-1">
							<div className="grid grid-rows-2 grid-cols-2 gap-[2px] size-full">
								<div className="rounded-[2px]" style={{ backgroundColor: getThemeColor(name, "primary") }}></div>
								<div className="rounded-[2px]" style={{ backgroundColor: getThemeColor(name, "destructive") }}></div>
								<div className="rounded-[2px]" style={{ backgroundColor: getThemeColor(name, "secondary") }}></div>
								<div className="rounded-full" style={{ backgroundColor: getThemeColor(name, "accent") }}></div>
							</div>
						</div>
						<span>{name.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase())}</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}