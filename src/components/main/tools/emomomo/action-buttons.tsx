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
			size="lg"
			className="max-md:size-10"
			onClick={async () => copy(preview)}
			disabled={preview === ""}
			asChild
		>
			<CopyButton showIsCopied={copied}>
				<span className="max-md:hidden">
					Copy
				</span>
			</CopyButton>
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
			size="lg"
			className="max-md:size-10"
			onClick={clearPreview}
			disabled={preview === ""}
			asChild
		>
			<DeleteButton>
				<span className="max-md:hidden">
					Clear
				</span>
			</DeleteButton>
		</Button>
	);
}