"use client";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/common/motion-buttons";

// Types & Interfaces
import type { MotionButtonProps } from "@/components/common/motion-buttons";
interface BpmButtonProps extends MotionButtonProps {
	bpm: number | string;
	shouldMute?: boolean;
};



export function BpmButton({ bpm, shouldMute = false }: BpmButtonProps) {
	const { copied, copy } = useCopy();
	const isMuted = shouldMute || bpm === 0 || bpm === "-";

	function onDragStart(e: React.DragEvent<HTMLButtonElement>) {
		e.dataTransfer.setData("text/plain", bpm.toString());
	}

	return (
		<Button
			variant="nothing"
			className={cn(
				"md:gap-3 p-0! font-mono font-bold text-xl xs:text-2xl md:text-3xl 2xl:text-4xl transition-opacity",
				`${isMuted && "font-normal text-muted-foreground"}`
			)}
			onClick={async () => copy(String(bpm))}
			disabled={isMuted}
			draggable
			onDragStart={onDragStart}
			asChild
		>
			<CopyButton
				svgClassName="2xl:size-5"
				childrenBefore={<span>{bpm}</span>}
				showIsCopied={copied}
			/>
		</Button>
	);
}