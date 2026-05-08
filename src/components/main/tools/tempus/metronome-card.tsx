"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMetronome } from "@/hooks/use-metronome";
import { cn } from "@/lib/utils";

// Components & UI
import NumberFlow from "@number-flow/react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

// Icons & Images
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

// Constants & Variables
const BPM_MIN = 40;
const BPM_MAX = 400;
const BPM_DEFAULT = 100;



export function MetronomeCard({ className }: React.ComponentProps<typeof Card>) {
	const t = useTranslations("tools.tempus.metronome");
	const [bpm, setBpm] = useState(BPM_DEFAULT);
	const [step, setStep] = useState(1);

	const { isPlaying, toggle, sliderPointerHandlers } = useMetronome({ bpm });

	// Drag and Drop
	function onDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	}

	function onDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const val = parseFloat(e.dataTransfer.getData("text/plain"));
		if (!Number.isNaN(val)) setBpm(val);
	}

	return (
		<Card
			className={cn("gap-0", className)}
			onDragOver={onDragOver}
			onDrop={onDrop}
		>
			<CardHeader>
				<CardTitle>{t("title")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid auto-rows-min justify-items-center gap-2">
					<NumberFlow
						className="font-bold text-5xl tabular-nums pointer-events-none"
						value={bpm}
						locales="en-US"
						format={{ useGrouping: false }}
						aria-hidden="true"
						animated
						willChange
					/>
					<Slider
						value={bpm}
						min={BPM_MIN}
						max={BPM_MAX}
						step={step}
						onValueChange={setBpm}
						onKeyDown={(e) => { if (e.key === "Shift" && !e.repeat) setStep(0.01); }}
						onKeyUp={(e) => { if (e.key === "Shift") setStep(1); }}
						{...sliderPointerHandlers}
					/>
				</div>
				<div className="w-max mx-auto mt-4">
					<Button variant="ghost" size="icon" onClick={toggle}>
						{isPlaying ? <PauseIcon /> : <PlayIcon />}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}