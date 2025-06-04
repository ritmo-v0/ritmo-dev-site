"use client";
import { useBPMStore } from "@/lib/store/tempus";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";



export function ControlsCard({ className }: { className?: string }) {
	return (
		<Card className={cn("@container/card", className)}>
			<CardHeader>
				<CardTitle>Controls</CardTitle>
			</CardHeader>
			<CardContent className="grid auto-rows-min grid-cols-1 @xs/card:grid-cols-2 gap-8">
				<AutoResetControls />
				<OtherControls />
			</CardContent>
		</Card>
	);
}

function AutoResetControls() {
	const autoResetDuration = useBPMStore(state => state.autoResetDuration);
	const useAutoReset = useBPMStore(state => state.useAutoReset);
	const toggleAutoReset = useBPMStore(state => state.toggleAutoReset);
	const setAutoResetDuration = useBPMStore(state => state.setAutoResetDuration);

	return (
		<div className="space-y-4">
			{/* Auto Reset */}
			<div className="flex items-center justify-between space-x-2">
				<Label htmlFor="bpm-ar">Auto Reset</Label>
				<Switch
					id="bpm-ar"
					checked={useAutoReset}
					onCheckedChange={toggleAutoReset}
				/>
			</div>

			{/* Auto Reset Duration */}
			<div className="space-y-2">
				<Label htmlFor="bpm-ard">Auto Reset Duration</Label>
				<div className="flex items-center justify-between gap-4">
					<Slider
						value={[autoResetDuration]}
						min={1}
						max={5}
						step={1}
						onValueChange={(value) => setAutoResetDuration(value[0])}
						disabled={!useAutoReset}
					/>
					<span className={cn("font-mono text-sm transition-opacity", !useAutoReset && "opacity-50")}>
						{autoResetDuration}s
					</span>
				</div>
			</div>
		</div>
	);
}

function OtherControls() {
	const recentTapCount = useBPMStore(state => state.recentTapCount);
	const reset = useBPMStore(state => state.reset);
	const setRecentTapCount = useBPMStore(state => state.setRecentTapCount);

	const RECENT_TAP_OPTIONS = [2, 4, 8, 16, 24, 32];

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.currentTarget.blur();
		reset();
	}

	return (
		<div className="grid grid-rows-[auto_1fr] gap-4">
			{/* Recent Tap Count */}
			<div className="flex items-center justify-between gap-4">
				<Label htmlFor="bpm-rtc">Recent Taps</Label>
				<Select
					value={recentTapCount.toString()}
					onValueChange={(value) => setRecentTapCount(Number.parseInt(value))}
				>
					<SelectTrigger className="w-18 !h-7">
						<SelectValue placeholder="Count" />
					</SelectTrigger>
					<SelectContent>
						{RECENT_TAP_OPTIONS.map((option) => (
							<SelectItem
								key={option}
								value={option.toString()}
							>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Reset Button */}
			<Button
				variant="destructive"
				className="size-full"
				onClick={(e) => handleClick(e)}
				asChild
			>
				<motion.button
					initial="normal"
					whileHover="hover"
					whileFocus="hover"
					whileTap="tap"
				>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						transition={{ type: "spring", stiffness: 250, damping: 25 }}
						variants={{
							normal: { rotate: "0deg" },
							hover: { rotate: "50deg" },
							tap: { rotate: "230deg", transition: { type: "spring", stiffness: 1200, damping: 80 } },
						}}
						// variants={{
						// 	normal: { rotate: "-40deg" },
						// 	hover: { rotate: "0deg" },
						// 	tap: { rotate: "140deg", transition: { type: "spring", stiffness: 1200, damping: 80 } },
						// }}
					>
						<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
						<path d="M21 3v5h-5" />
						<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
						<path d="M8 16H3v5" />
						{/* <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
						<path d="M21 3v5h-5" /> */}
					</motion.svg>
					Reset Taps
				</motion.button>
			</Button>
		</div>
	);
}