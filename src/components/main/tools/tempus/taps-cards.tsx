"use client";
import { useTranslations } from "next-intl";
import { useTempusStore } from "@/lib/tempus/store";
import { readBpm } from "@/lib/tempus/utils";
import { cn } from "cn";

// Components & UI
import { BpmStat } from "./bpm-stat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Types & Interfaces
import type { BpmReading } from "@/lib/tempus/types";



export function AllTapsCard({ className }: React.ComponentProps<typeof Card>) {
	const t = useTranslations("tools.tempus.taps");
	const taps = useTempusStore(state => state.taps);

	return (
		<Card className={cn(className)}>
			<CardHeader>
				<CardTitle className="tabular-nums break-keep">
					{t.rich("all", {
						count: taps.length,
						wbr: () => <wbr />,
					})}
				</CardTitle>
			</CardHeader>
			<TapsCardContent reading={readBpm(taps)} />
		</Card>
	);
}

export function LastTapsCard({ className }: React.ComponentProps<typeof Card>) {
	const t = useTranslations("tools.tempus.taps");

	return (
		<Card className={cn(className)}>
			<CardHeader>
				<CardTitle className="break-keep">
					{t.rich("last", {
						select: () => <LastTapsSelect className="font-sans mx-1" />,
						wbr: () => <wbr />,
					})}
				</CardTitle>
			</CardHeader>
			<LastTapsCardContent />
		</Card>
	);
}

function LastTapsCardContent() {
	const taps = useTempusStore(state => state.taps);
	const lastTapCount = useTempusStore(state => state.lastTapCount);

	return <TapsCardContent reading={readBpm(taps, lastTapCount)} />;
}

function TapsCardContent({ reading }: { reading: BpmReading }) {
	const t = useTranslations("tools.tempus.taps");

	const isReady = reading.status === "ready";
	const placeholder = reading.status === "empty" ? "0" : "-";

	return (
		<CardContent className="grid xl:grid-cols-2 gap-x-6 gap-y-4 max-xs:mt-auto">
			<BpmStat
				label={t("avg_bpm")}
				value={isReady ? reading.bpm : null}
				placeholder={placeholder}
				fractionDigits={2}
			/>
			<BpmStat
				label={t("nearest_whole")}
				value={isReady ? reading.whole : null}
				placeholder={placeholder}
				fractionDigits={0}
			/>
		</CardContent>
	);
}

function LastTapsSelect({ className }: { className?: string }) {
	const lastTapCount = useTempusStore(state => state.lastTapCount);
	const setLastTapCount = useTempusStore(state => state.setLastTapCount);

	const LAST_TAP_OPTIONS = [2, 4, 8, 16, 24, 32];

	return (
		<Select
			value={lastTapCount}
			onValueChange={setLastTapCount}
		>
			<SelectTrigger
				className={cn(
					"[--height:--spacing(7)] inline-flex px-2.5",
					"my-[calc((1lh-var(--height))/2)] h-(--height)! text-[length:inherit]",
					className,
				)}
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{LAST_TAP_OPTIONS.map(option => (
						<SelectItem
							key={option}
							value={option}
						>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}