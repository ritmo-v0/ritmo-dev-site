"use client";
import { useThemeStore } from "@/lib/store/theme";
import { getThemeColor } from "@/lib/theme/utils";
import { cn } from "@/lib/utils";

// Components & UI
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Types & Interfaces
import type { PresetId } from "@/lib/theme/types";

// Constants & Variables
import { PRESET_IDS } from "@/lib/theme/presets";



export function ThemeSelect({ className }: React.ComponentProps<typeof SelectTrigger>) {
	const { preset, setPreset } = useThemeStore();

	return (
		<Select<PresetId> value={preset} onValueChange={setPreset}>
			<SelectTrigger size="sm" className={cn("w-30 pl-1", className)}>
				<SelectValue>{renderSelectItem}</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{PRESET_IDS.map(id => (
					<SelectItem
						key={id}
						value={id}
						className="flex items-center gap-3 p-1.5"
					>
						{renderSelectItem(id)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

const renderSelectItem = (id: PresetId) => (
	<>
		<div className="size-6 bg-background rounded-xs border p-1">
			<div className="grid grid-rows-2 grid-cols-2 gap-0.5 size-full">
				<div className="rounded-[2px]" style={{ backgroundColor: getThemeColor(id, "primary") }} />
				<div className="rounded-[2px]" style={{ backgroundColor: getThemeColor(id, "destructive") }} />
				<div className="rounded-[2px]" style={{ backgroundColor: getThemeColor(id, "secondary") }} />
				<div className="rounded-full" style={{ backgroundColor: getThemeColor(id, "accent") }} />
			</div>
		</div>
		<span>
			{id
				.replace(/-/g, " ")
				.replace(/\b\w/g, char => char.toUpperCase())}
		</span>
	</>
);