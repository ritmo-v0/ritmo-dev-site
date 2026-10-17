"use client";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "cn";

// Components & UI
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/common/motion-buttons";

// Types & Interfaces
interface BpmButtonProps {
	label: string;
	value: number | null;
	placeholder: string;
	fractionDigits: number;
};



export function BpmStat({
	label,
	value,
	placeholder,
	fractionDigits
}: BpmButtonProps) {
	const { copied, copy } = useCopy();
	const isMuted = value === null;
	const text = isMuted ? placeholder : Number(value.toFixed(fractionDigits)).toString();

	function onDragStart(e: React.DragEvent<HTMLButtonElement>) {
		e.dataTransfer.setData("text/plain", text);
	}

	return (
		<div className="flex flex-col items-start gap-1">
			<span className="text-muted-foreground">{label}</span>
			<Button
				variant="nothing"
				className={cn(
					"gap-3 -ml-3 h-auto px-3 font-mono font-bold",
					"text-2xl xs:text-3xl lg:text-4xl",
					isMuted && "font-normal text-muted-foreground"
				)}
				onClick={async () => await copy(text)}
				onDragStart={onDragStart}
				disabled={isMuted}
				draggable
				render={
					<CopyButton
						svgClassName="2xl:size-5 text-muted-foreground"
						childrenBefore={<span>{text}</span>}
						showIsCopied={copied}
					/>
				}
			/>
		</div>
	);
}