"use client";
import { useEffect, useRef } from "react";
import { useEmomomoStore } from "@/lib/store/emomomo";

// Components & UI
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { SkinToneSelect } from "./skin-tone-select";
import { PreviewClearButton, PreviewCopyButton } from "./action-buttons";

// Icons & Images
import { ListTree, SquareDashedMousePointer } from "lucide-react";



export function EmomomoToolbar() {
	return (
		<div className="grid gap-2">
			<PreviewTextarea />
			<div className="flex items-center justify-between gap-4">
				{/* Options */}
				<div className="flex items-center gap-2">
					<UseSubgroupToggle />
					<UseCOCToggle />
					<SkinToneSelect />
				</div>

				{/* Textarea */}
				<div className="flex items-center gap-2">
					<PreviewCopyButton />
					<PreviewClearButton />
				</div>
			</div>
		</div>
	);
}

function PreviewTextarea() {
	const preview = useEmomomoStore(state => state.preview);
	const setPreview = useEmomomoStore(state => state.setPreview);
	const setTextareaRef = useEmomomoStore(state => state.setTextareaRef);

	const ref = useRef<HTMLTextAreaElement | null>(null);
	useEffect(() => {
		const current = ref.current;
		setTextareaRef(current);

		return () => setTextareaRef(null);
	}, [setTextareaRef]);

	return (
		<div className="grid gap-2">
			<Label htmlFor="emoji-preview" className="sr-only">
				Preview
			</Label>
			<Textarea
				ref={ref}
				id="emoji-preview"
				value={preview}
				className="min-h-20 max-h-[40svh]"
				placeholder="Click any button to add an emoji..."
				onChange={(e) => setPreview(e.target.value)}
			/>
		</div>
	);
}

function UseSubgroupToggle() {
	const useSubgroup = useEmomomoStore(state => state.useSubgroup);
	const setUseSubgroup = useEmomomoStore(state => state.setUseSubgroup);

	return (
		<Toggle
			pressed={useSubgroup}
			onPressedChange={() => setUseSubgroup(!useSubgroup)}
			aria-label={`Toggle use ${useSubgroup ? "supergroup" : "subgroup"}`}
		>
			<ListTree />
			<span className="max-sm:hidden">
				Subgroup
			</span>
		</Toggle>
	);
}

function UseCOCToggle() {
	const useCOC = useEmomomoStore(state => state.useCOC);
	const setUseCOC = useEmomomoStore(state => state.setUseCOC);

	return (
		<Toggle
			pressed={useCOC}
			onPressedChange={() => setUseCOC(!useCOC)}
			aria-label={`Toggle ${useCOC ? "disable" : "enable"} copy on click`}
		>
			<SquareDashedMousePointer />
			<span className="max-sm:hidden">
				Copy on click
			</span>
		</Toggle>
	);
}