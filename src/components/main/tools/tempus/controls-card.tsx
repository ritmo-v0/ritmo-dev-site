"use client";
import { useTempusStore } from "@/lib/store/tempus";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ResetButton } from "@/components/common/motion-buttons";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";



export function ControlsCard({ className }: React.ComponentProps<typeof Card>) {
	return (
		<Card className={cn("@container/card", className)}>
			<CardHeader>
				<CardTitle>Controls</CardTitle>
			</CardHeader>
			<CardContent className="grid auto-rows-min grid-cols-1 @xs/card:grid-cols-2 gap-8">
				<div className="space-y-4">
					<AutoResetControl />
					<AutoResetDurationControl />
				</div>
				<OtherControls />
			</CardContent>
		</Card>
	);
}

function AutoResetControl() {
	const useAutoReset = useTempusStore(state => state.useAutoReset);
	const toggleAutoReset = useTempusStore(state => state.toggleAutoReset);

	return (
		<div className="flex items-center justify-between space-x-2">
			<Label htmlFor="tempus-ar">Auto Reset</Label>
			<Switch
				id="tempus-ar"
				checked={useAutoReset}
				onCheckedChange={toggleAutoReset}
			/>
		</div>
	);
}

function AutoResetDurationControl() {
	const useAutoReset = useTempusStore(state => state.useAutoReset);
	const autoResetDuration = useTempusStore(state => state.autoResetDuration);
	const setAutoResetDuration = useTempusStore(state => state.setAutoResetDuration);

	return (
		<div className="space-y-2">
			<Label htmlFor="tempus-ard">Auto Reset Duration</Label>
			<div className="flex items-center justify-between gap-4">
				<Slider
					id="tempus-ard"
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
	);
}

function OtherControls() {
	const recentTapCount = useTempusStore(state => state.recentTapCount);
	const setRecentTapCount = useTempusStore(state => state.setRecentTapCount);
	const reset = useTempusStore(state => state.reset);

	const RECENT_TAP_OPTIONS = [2, 4, 8, 16, 24, 32];

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.currentTarget.blur();
		reset();
	}

	return (
		<div className="grid grid-rows-[auto_1fr] gap-4">
			{/* Recent Tap Count */}
			<div className="flex items-center justify-between gap-4">
				<Label>Recent Taps</Label>
				<Select
					value={recentTapCount.toString()}
					onValueChange={(value) => setRecentTapCount(Number.parseInt(value, 10))}
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
				onClick={handleClick}
				asChild
			>
				<ResetButton>
					Reset Taps
				</ResetButton>
			</Button>
		</div>
	);
}