"use client";
import { useEffect } from "react";
import { useBPMStore } from "@/lib/store/tempus";
import { match } from "ts-pattern";

// Components & UI
import { TooltipProvider } from "@/components/ui/tooltip";
import { WrapperLayout } from "@/components/common/layouts";
import { TapArea } from "@/components/main/tools/tempus/tap-area";
import { ControlsCard } from "@/components/main/tools/tempus/controls-card";
import { MetronomeCard } from "@/components/main/tools/tempus/metronome-card";
import { TapsCards } from "@/components/main/tools/tempus/taps-cards";
// import { H2 } from "@/components/common/typography";



export default function TempusPage() {
	const { addTap, reset } = useBPMStore();

	useEffect(() => {
		function handleKeyDown(e) {
			if (e.repeat) return;
			match(e.code)
				.with("Space", "Enter", () => addTap())
				.with("Escape", () => reset())
				.otherwise(() => {});
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [addTap, reset]);

	return (
		<TooltipProvider>
			<WrapperLayout className="grid gap-4 h-min mb-4">
				{/* <H2>BPM Calculator</H2> */}
				<TapArea className="max-md:order-1" />
				<div className="grid grid-cols-2 gap-4">
					<TapsCards className="max-md:order-1" />
					<ControlsCard className="col-span-2 md:col-span-1" />
					<MetronomeCard className="hidden md:flex" />
				</div>
			</WrapperLayout>
		</TooltipProvider>
	);
}