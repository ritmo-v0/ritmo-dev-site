"use client";
import { useEffect } from "react";
import { useTempusStore } from "@/lib/store/tempus";
import { match } from "ts-pattern";

// Components & UI
import { ControlsCard } from "@/components/main/tools/tempus/controls-card";
import { MetronomeCard } from "@/components/main/tools/tempus/metronome-card";
import { TapArea } from "@/components/main/tools/tempus/tap-area";
import { AllTapsCard, RecentTapsCard } from "@/components/main/tools/tempus/taps-cards";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WrapperLayout } from "@/components/common/layouts";



export default function TempusPage() {
	const addTap = useTempusStore(state => state.addTap);
	const reset = useTempusStore(state => state.reset);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
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
		<WrapperLayout className="grid gap-4 h-min mb-4">
			<TapArea className="max-md:order-1" />
			<TooltipProvider>
				<div className="grid grid-cols-2 gap-4">
					<AllTapsCard className="max-md:order-1" />
					<RecentTapsCard className="max-md:order-1" />
					<ControlsCard className="col-span-2 md:col-span-1" />
					<MetronomeCard className="hidden md:flex" />
				</div>
			</TooltipProvider>
		</WrapperLayout>
	);
}