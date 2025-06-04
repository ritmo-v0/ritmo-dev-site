"use client";
import { useRef, useState } from "react";
import { match } from "ts-pattern";
import { cn, copyToClipboard } from "@/lib/utils";

// Components & UI
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/common/motion-buttons";

// Types & Interfaces
import type { MotionButtonProps } from "@/components/common/motion-buttons";
interface BpmButtonProps extends MotionButtonProps {
	bpm: number | string;
	shouldMute?: boolean;
};



export function BpmButton({ bpm, shouldMute = false }: BpmButtonProps) {
	const [showIsCopied, setShowIsCopied] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const isMuted = shouldMute || bpm === 0 || bpm === "-";

	async function handleCopy() {
		const copyResult = await copyToClipboard(bpm.toString());
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
		<Button
			variant="nothing"
			className={cn(
				"md:gap-3 !p-0 font-mono font-bold text-xl xs:text-2xl md:text-3xl 2xl:text-4xl transition-opacity",
				`${isMuted && "font-normal text-muted-foreground"}`
			)}
			onClick={handleCopy}
			disabled={isMuted}
			asChild
		>
			<CopyButton
				svgClassName="2xl:size-5"
				childrenBefore={<span>{bpm}</span>}
				showIsCopied={showIsCopied}
			/>
		</Button>
	);
}