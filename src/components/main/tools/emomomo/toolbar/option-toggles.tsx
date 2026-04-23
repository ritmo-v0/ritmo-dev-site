"use client";
import { useEmomomoStore } from "@/lib/store/emomomo";

// Components & UI
import { Toggle } from "@/components/ui/toggle";

// Icons & Images
import { ClipboardIcon, TreeViewIcon } from "@phosphor-icons/react";



export function UseSubgroupToggle() {
	const useSubgroup = useEmomomoStore(state => state.useSubgroup);
	const setUseSubgroup = useEmomomoStore(state => state.setUseSubgroup);

	return (
		<Toggle
			className="sm:ps-2.5"
			pressed={useSubgroup}
			onPressedChange={() => setUseSubgroup(!useSubgroup)}
			aria-label={`Toggle use ${useSubgroup ? "supergroup" : "subgroup"}`}
		>
			<TreeViewIcon />
			<span className="max-sm:hidden">
				Subgroup
			</span>
		</Toggle>
	);
}

export function UseCOCToggle() {
	const useCOC = useEmomomoStore(state => state.useCOC);
	const setUseCOC = useEmomomoStore(state => state.setUseCOC);

	return (
		<Toggle
			className="sm:ps-2.5"
			pressed={useCOC}
			onPressedChange={() => setUseCOC(!useCOC)}
			aria-label={`Toggle ${useCOC ? "disable" : "enable"} copy on click`}
		>
			<ClipboardIcon />
			<span className="max-sm:hidden">
				Copy on click
			</span>
		</Toggle>
	);
}