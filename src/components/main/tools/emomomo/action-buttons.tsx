"use client";
import { useEmomomoStore } from "@/lib/store/emomomo";
import { useCopy } from "@/hooks/use-copy";

// Components & UI
import { Button } from "@/components/ui/button";
import { CopyButton, DeleteButton } from "@/components/common/motion-buttons";



export function PreviewCopyButton() {
	const { copied, copy } = useCopy();
	const preview = useEmomomoStore(state => state.preview);

	return (
		<Button
			title="Copy preview text to clipboard"
			variant="ghost"
			className="max-md:size-9 md:ps-2.5"
			onClick={async () => copy(preview)}
			disabled={preview === ""}
			render={<CopyButton showIsCopied={copied} />}
		>
			<span className="max-md:hidden">
				Copy
			</span>
		</Button>
	);
}

export function PreviewClearButton() {
	const preview = useEmomomoStore(state => state.preview);
	const clearPreview = useEmomomoStore(state => state.clearPreview);

	return (
		<Button
			title="Clear preview text"
			variant="destructive"
			className="max-md:size-9 md:ps-2.5"
			onClick={clearPreview}
			disabled={preview === ""}
			render={<DeleteButton />}
		>
			<span className="max-md:hidden">
				Clear
			</span>
		</Button>
	);
}