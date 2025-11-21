"use client";
import { useState, useEffect } from "react";
import { useTempusStore } from "@/lib/store/tempus";
import { calculateBpm, calculateRecentBpm } from "@/lib/tempus/utils";
import { cn } from "@/lib/utils";

// Components & UI
import { BpmButton } from "./bpm-button";
import { Button } from "@/components/ui/button";
import { Muted } from "@/components/common/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Icons & Images
import { Info } from "lucide-react";

// Types & Interfaces
interface TapsCardProps {
	title: string;
	infotip: string;
}

interface TapsCardContentProps {
	bpm: number | string;
	wholeBpm: number | string;
	shouldMute?: boolean;
}



export function AllTapsCard({ className }: React.ComponentProps<typeof Card>) {
	return (
		<TapsCard
			className={className}
			title="All Taps"
			infotip="BPM is calculated from all taps"
		>
			<AllTapsCardContent />
		</TapsCard>
	);
}

function AllTapsCardContent() {
	const taps = useTempusStore(state => state.taps);
	const isFirstTap = useTempusStore(state => state.taps.length === 1);

	const [avgBpm, setAvgBpm] = useState(0);
	const [wholeBpm, setWholeBpm] = useState(0);

	useEffect(() => {
		const bpm = calculateBpm(taps);
		setAvgBpm(bpm);
		setWholeBpm(Math.round(bpm));
	}, [taps]);

	return (
		<TapsCardContent
			bpm={isFirstTap ? "-" : avgBpm}
			wholeBpm={isFirstTap ? "-" : wholeBpm}
			shouldMute={isFirstTap}
		/>
	);
}

export function RecentTapsCard({ className }: React.ComponentProps<typeof Card>) {
	const recentTapCount = useTempusStore(state => state.recentTapCount);

	return (
		<TapsCard
			className={className}
			title="Recent Taps"
			infotip={`BPM is calculated from the last ${recentTapCount} taps`}
		>
			<RecentTapsCardContent />
		</TapsCard>
	);
}

function RecentTapsCardContent() {
	const taps = useTempusStore(state => state.taps);
	const tapCount = taps.length;
	const recentTapCount = useTempusStore(state => state.recentTapCount);

	const [recentBpm, setRecentBpm] = useState(0);
	const [recentWholeBpm, setRecentWholeBpm] = useState(0);

	useEffect(() => {
		const recentBpm = calculateRecentBpm(taps, recentTapCount);
		setRecentBpm(recentBpm);
		setRecentWholeBpm(Math.round(recentBpm));
	}, [taps, recentTapCount]);

	return (
		<TapsCardContent
			bpm={(tapCount !== 0 && tapCount < recentTapCount) ? "-" : recentBpm}
			wholeBpm={(tapCount !== 0 && tapCount < recentTapCount) ? "-" : recentWholeBpm}
			shouldMute={tapCount < recentTapCount}
		/>
	);
}

function TapsCard({
	children,
	className,
	title,
	infotip,
}: React.ComponentProps<typeof Card> & TapsCardProps) {
	return (
		<Card className={cn("gap-4", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-x-1">
					{title}
					<Popover openOnHover>
						<PopoverTrigger render={
							<Button variant="ghost" size="icon-sm">
								<Info />
							</Button>
						}>
						</PopoverTrigger>
						<PopoverContent side="top" className="px-4 py-3">
							{infotip}
						</PopoverContent>
					</Popover>
				</CardTitle>
			</CardHeader>
			{children}
		</Card>
	);
}

function TapsCardContent({ bpm, wholeBpm, shouldMute }: TapsCardContentProps) {
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