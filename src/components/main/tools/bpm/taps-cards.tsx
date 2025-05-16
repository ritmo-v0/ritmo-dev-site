"use client";
import { useState, useEffect } from "react";
import { useBPMStore } from "@/lib/store/bpm";
import { calculateBpm, calculateRecentBpm } from "@/lib/bpm/utils";
import { cn } from "@/lib/utils";

// Components & UI
import { BpmButton } from "./bpm-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Images & Icons
import { Info } from "lucide-react";
import { Muted } from "@/components/common/typography";

// Types & Interfaces
interface TapsCardProps {
	className?: string;
	bpm: number;
	wholeBpm: number;
	isFirstTap?: boolean;
}

interface TapsCardContentProps {
	bpm: number | string;
	wholeBpm: number | string;
	shouldMute?: boolean;
}



export function TapsCards({ className }: { className?: string }) {
	const taps = useBPMStore(state => state.taps);
	const recentTapCount = useBPMStore(state => state.recentTapCount);
	const isFirstTap = useBPMStore(state => state.taps.length === 1);

	const [avgBpm, setAvgBpm] = useState(0);
	const [wholeBpm, setWholeBpm] = useState(0);
	const [recentBpm, setRecentBpm] = useState(0);
	const [recentWholeBpm, setRecentWholeBpm] = useState(0);

	useEffect(() => {
		const bpm = calculateBpm(taps);
		setAvgBpm(bpm);
		setWholeBpm(Math.round(bpm));

		const recentBpm = calculateRecentBpm(taps, recentTapCount);
		setRecentBpm(recentBpm);
		setRecentWholeBpm(Math.round(recentBpm));
	}, [taps, recentTapCount]);

	return (
		<>
			<AllTapsCard
				className={className}
				bpm={avgBpm}
				wholeBpm={wholeBpm}
				isFirstTap={isFirstTap}
			/>
			<RecentTapsCard
				className={className}
				bpm={recentBpm}
				wholeBpm={recentWholeBpm}
			/>
		</>
	);
}

export function AllTapsCard({ className, bpm, wholeBpm, isFirstTap }: TapsCardProps) {
	return (
		<Card className={cn("gap-4", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-x-1">
					All Taps
					<Tooltip>
						<TooltipTrigger className="p-1">
							<Info className="size-4 text-primary" />
						</TooltipTrigger>
						<TooltipContent>
							<span className="text-sm">
								BPM is calculated from all taps
							</span>
						</TooltipContent>
					</Tooltip>
				</CardTitle>
			</CardHeader>
			<TapCardContent
				bpm={isFirstTap ? "-" : bpm}
				wholeBpm={isFirstTap ? "-" : wholeBpm}
				shouldMute={isFirstTap}
			/>
		</Card>
	);
}

export function RecentTapsCard({ className, bpm, wholeBpm }: TapsCardProps) {
	const tapCount = useBPMStore(state => state.taps.length);
	const recentTapCount = useBPMStore(state => state.recentTapCount);

	return (
		<Card className={cn("gap-4", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-x-1">
					Recent Taps
					<Tooltip>
						<TooltipTrigger className="p-1">
							<Info className="size-4 text-primary" />
						</TooltipTrigger>
						<TooltipContent>
							<span className="text-sm">
								BPM is calculated from the last {recentTapCount} taps
							</span>
						</TooltipContent>
					</Tooltip>
				</CardTitle>
			</CardHeader>
			<TapCardContent
				bpm={(tapCount !== 0 && tapCount < recentTapCount) ? "-" : bpm}
				wholeBpm={(tapCount !== 0 && tapCount < recentTapCount) ? "-" : wholeBpm}
				shouldMute={tapCount < recentTapCount}
			/>
		</Card>
	);
}

function TapCardContent({ bpm, wholeBpm, shouldMute }: TapsCardContentProps) {
	return (
		<CardContent>
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
				<div className="md:space-y-1">
					<Muted>Avg. BPM</Muted>
					<BpmButton bpm={bpm} shouldMute={shouldMute} />
				</div>
				<div className="md:space-y-1">
					<Muted>Nearest Whole</Muted>
					<BpmButton bpm={wholeBpm} shouldMute={shouldMute} />
				</div>
			</div>
		</CardContent>
	);
}