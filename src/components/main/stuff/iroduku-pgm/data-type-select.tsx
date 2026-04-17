"use client";

// Components & UI
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons & Images
import {
	FireIcon,
	FunnelIcon,
	FootprintsIcon,
	StepsIcon,
} from "@phosphor-icons/react";

// Types & Interfaces
import type { Icon } from "@phosphor-icons/react";
import type { DataType } from "@/lib/iroduku-pgm/types";
interface DataTypeSelectProps {
	types: DataType[];
	onChange: (types: DataType[]) => void;
};

// Constants & Variables
const OPTIONS: Array<{ value: DataType, icon: Icon }> = [
	{ value: "steps", icon: StepsIcon },
	{ value: "floors", icon: FootprintsIcon },
	{ value: "calories", icon: FireIcon },
];



export function DataTypeSelect({ types, onChange }: DataTypeSelectProps) {
	function toggle(value: DataType) {
		// Prevent deselecting the last active type
		if (types.includes(value) && types.length === 1) return;

		const next = types.includes(value)
			? types.filter((t) => t !== value)
			: [...types, value];
		onChange(next);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={
				<Button variant="outline" size="sm" />
			}>
				<FunnelIcon
					data-icon="inline-start"
					className="text-muted-foreground"
				/>
				Filter
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuGroup>
					{OPTIONS.map(({ value: type, icon: Icon }) => (
						<DropdownMenuCheckboxItem
							key={type}
							checked={types.includes(type)}
							onCheckedChange={() => toggle(type)}
						>
							<Icon />
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}