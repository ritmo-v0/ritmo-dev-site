"use client";
import { useRef, useState } from "react";
import {
	useCOCStore,
	usePreviewStore,
	useSkinToneStore,
	useSubgroupStore,
} from "@/lib/store/emomomo";
import { match } from "ts-pattern";
import { motion } from "motion/react";
import { copyToClipboard } from "@/lib/utils";

// Components & UI
import Twemoji from "react-twemoji";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CopyButton, DeleteButton } from "@/components/common/motion-buttons";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";

// Constants & Variables
import { EmojiSkinToneOrder } from "@/lib/emomomo/constants";

// Images & Icons
import { ListTree } from "lucide-react";



export function EmojiPickerToolbar() {
	return (
		<div className="space-y-3">
			<PreviewTextarea />
			<div className="flex flex-wrap items-center justify-between gap-2">
				{/* Options */}
				<div className="flex items-center gap-2">
					<UseSubgroupToggle />
					<UseCOCToggle />
					<SkinToneSelect />
				</div>

				{/* Textarea */}
				<div className="flex items-center gap-2">
					<PreviewActionButtons />
				</div>
			</div>
		</div>
	);
}

function PreviewTextarea() {
	const { preview, setPreview } = usePreviewStore();

	return (
		<div className="grid gap-2">
			<Label htmlFor="emoji-preview">Preview</Label>
			<Textarea
				id="emoji-preview"
				value={preview}
				rows={3}
				className="field-sizing-fixed"
				placeholder="Click any button to add an emoji..."
				onChange={(e) => setPreview(e.target.value)}
			/>
		</div>
	);
}

function UseSubgroupToggle() {
	const { useSubgroup, setUseSubgroup } = useSubgroupStore();

	return (
		<Toggle
			pressed={useSubgroup}
			onPressedChange={() => setUseSubgroup(!useSubgroup)}
			aria-label={`Toggle use ${useSubgroup ? "supergroup" : "subgroup"}`}
		>
			<ListTree />
			<span className="hidden sm:block">Subgroup</span>
		</Toggle>
	);
}

function UseCOCToggle() {
	const { useCOC, setUseCOC } = useCOCStore();

	const transition = { type: "spring", stiffness: 400, damping: 40 };
	const CLICK_BLINKS = [
		{ d: "m6 12-1.9 2" },
		{ d: "m5.1 8-2.9-.8" },
		{ d: "M8 5.1 7.2 2.2" },  // "M7.2 2.2 8 5.1"
		{ d: "M12 6 14 4.1" },    // "M14 4.1 12 6"
	];
	const MousePointerClickIcon = ({ pressed = false }: { pressed: boolean }) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{CLICK_BLINKS.map((blink, index) => (
				<motion.path
					key={index}
					d={blink.d}
					initial={{ pathLength: 0 }}
					animate={{ pathLength: pressed ? 1 : 0 }}
					transition={{ delay: 0.05 * (index + 1) }}
				/>
			))}
			<motion.path
				d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
				initial={{ x: 1.5, y: 1.5 }}
				animate={{ x: pressed ? 0 : 1.5, y: pressed ? 0 : 1.5 }}
				transition={transition}
			/>
		</svg>
	);

	return (
		<Toggle
			pressed={useCOC}
			onPressedChange={() => setUseCOC(!useCOC)}
			aria-label={`Toggle ${useCOC ? "disable" : "enable"} copy on click`}
		>
			<MousePointerClickIcon pressed={useCOC} />
			<span className="hidden sm:block">Copy on click</span>
		</Toggle>
	);
}

function SkinToneSelect() {
	const { skinTone, setSkinTone } = useSkinToneStore();

	return (
		<Select value={skinTone} onValueChange={(value) => setSkinTone(value)}>
			<SelectTrigger title="Select a skin tone" className="w-36">
				<SelectValue placeholder="Skin tone" />
			</SelectTrigger>
			<SelectContent>
				{EmojiSkinToneOrder.map((value, index) => (
					<SelectItem key={index} value={index.toString()} className="flex items-center gap-3">
						<Twemoji options={{ className: "size-4" }}>
							{index !== 0
								? String.fromCodePoint(0x1F3FA + index)
								: String.fromCodePoint(0x1F9B2)
							}
						</Twemoji>
						<span>
							{value
								.replace("skin tone", "").replace("-", " ")
								.replace(/\b\w/g, char => char.toUpperCase())
							}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

function PreviewActionButtons() {
	const { preview, clearPreview } = usePreviewStore();
	const [showIsCopied, setShowIsCopied] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	async function handleCopy() {
		const copyResult = await copyToClipboard(preview);
		match(copyResult)
			.with({ success: true }, () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				setShowIsCopied(true);
				timeoutRef.current = setTimeout(() => {
					setShowIsCopied(false);
					timeoutRef.current = null;
				}, 3000);
			})
			.with({ success: false }, ({ message }) => {
				toast.error(
					"A small 🤏🌌 issue occurred...",
					{ description: message }
				);
			})
			.exhaustive();
	}

	return (
		<>
			<Button
				title="Copy preview text to clipboard"
				variant="ghost"
				size="lg"
				className="max-sm:size-10"
				onClick={handleCopy}
				disabled={preview === ""}
				asChild
			>
				<CopyButton showIsCopied={showIsCopied}>
					<span className="hidden sm:inline">Copy</span>
				</CopyButton>
			</Button>
			<Button
				title="Clear preview text"
				variant="destructive"
				size="lg"
				className="max-sm:size-10"
				onClick={clearPreview}
				disabled={preview === ""}
				asChild
			>
				<DeleteButton>
					<span className="hidden sm:inline">Clear</span>
				</DeleteButton>
			</Button>
		</>
	);
}