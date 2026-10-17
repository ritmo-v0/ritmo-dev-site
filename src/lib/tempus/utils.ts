// Types & Interfaces
import type { BpmReading } from "./types";



export function appendTap(taps: number[], now: number, autoResetMs?: number): number[] {
	const lastTap = taps.at(-1);
	const isNewSession = autoResetMs !== undefined
		&& lastTap !== undefined
		&& now - lastTap >= autoResetMs;

	return isNewSession ? [now] : [...taps, now];
}

export function readBpm(taps: number[], lastN?: number): BpmReading {
	if (taps.length === 0) return { status: "empty" };
	if (taps.length < Math.max(2, lastN ?? 2)) return { status: "insufficient" };

	const counted = lastN ? taps.slice(-lastN) : taps;
	const avgInterval = (counted[counted.length - 1] - counted[0]) / (counted.length - 1);
	const bpm = 60000 / avgInterval;

	return { status: "ready", bpm, whole: Math.round(bpm) };
}