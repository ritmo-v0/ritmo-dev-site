"use client";
import { useBPMStore } from "@/lib/store/bpm";
import { cn } from "@/lib/utils";

// Components & UI
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Muted } from "@/components/common/typography";

// Images & Icons
import { CircleArrowOutUpLeft, CornerDownLeft, MousePointer, Space } from "lucide-react";



export function TapArea({ className }: { className?: string }) {
	const { taps, addTap } = useBPMStore();

	return (
		<Card
			className={cn(
				"flex items-center justify-center gap-4 w-full max-h-96 p-8 bg-secondary hover:bg-secondary/80 focus-visible:bg-secondary/80",
				"font-mono border-2 border-dashed aspect-square @3xl:aspect-square cursor-pointer select-none transition-all",
				className,
			)}
			tabIndex={0}
			onClick={addTap}
		>
			<div className="space-y-1">
				<Muted className="text-center">
					{"Tap: "}
					<Badge variant="outline" className="gap-2">Space<Space /></Badge>
					{" "}<Badge variant="outline" className="gap-2">Enter<CornerDownLeft /></Badge>
					{" "}<Badge variant="outline" className="gap-2">Click<MousePointer /></Badge>
				</Muted>
				<Muted className="text-center">
					{"Reset: "}
					<Badge variant="outline" className="gap-2">Esc<CircleArrowOutUpLeft /></Badge>
					</Muted>
			</div>
			<Muted>Tap Count: {taps.length}</Muted>
		</Card>
	);
}