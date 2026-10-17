import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appendTap } from "@/lib/tempus/utils";

// Types & Interfaces
interface TempusState {
	// States
	taps: number[];

	useAutoReset: boolean;
	autoResetDuration: number;
	lastTapCount: number;

	// Actions
	reset: () => void;
	addTap: () => void;

	toggleAutoReset: () => void;
	setAutoResetDuration: (autoResetDuration: number) => void;
	setLastTapCount: (lastTapCount: number | null) => void;
}

// Constants & Variables
const DEFAULT_LAST_TAP_COUNT = 16;



export const useTempusStore = create<TempusState>()(
	persist(
		(set, get) => ({
			// Initial states
			taps: [],

			useAutoReset: true,
			autoResetDuration: 5,
			lastTapCount: DEFAULT_LAST_TAP_COUNT,

			// Actions
			reset: () => set({ taps: [] }),
			addTap: () => {
				const { taps, useAutoReset, autoResetDuration } = get();
				const autoResetMs = useAutoReset ? autoResetDuration * 1000 : undefined;
				set({ taps: appendTap(taps, Date.now(), autoResetMs) });
			},

			toggleAutoReset: () => set(state => ({ useAutoReset: !state.useAutoReset })),
			setAutoResetDuration: (autoResetDuration) => set({ autoResetDuration }),
			setLastTapCount: (lastTapCount) => set({ lastTapCount: lastTapCount || DEFAULT_LAST_TAP_COUNT }),
		}),
		{
			name: "tempus-store",
			partialize: (state) => ({
				useAutoReset: state.useAutoReset,
				autoResetDuration: state.autoResetDuration,
				lastTapCount: state.lastTapCount,
			}),
		}
	)
);