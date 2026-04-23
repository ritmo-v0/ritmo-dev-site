"use client";
import { useEffect, useRef } from "react";
import { useEmomomoStore } from "@/lib/store/emomomo";

// Components & UI
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SkinToneSelect } from "./skin-tone-select";
import { UseCOCToggle, UseSubgroupToggle } from "./option-toggles";
import { PreviewClearButton, PreviewCopyButton } from "./action-buttons";



export function EmomomoToolbar() {
	return (
		<div className="grid gap-3">
			<PreviewTextarea />
			<div className="flex items-center justify-between gap-3">
				{/* Options */}
				<div className="flex items-center gap-3">
					<UseSubgroupToggle />
					<UseCOCToggle />
					<SkinToneSelect />
				</div>

				{/* Actions */}
				<div className="flex items-center gap-3">
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
				name="emoji-preview"
				className="h-24.25"
				value={preview}
				placeholder="Click any button to add an emoji..."
				onChange={(e) => setPreview(e.target.value)}
			/>
		</div>
	);
}