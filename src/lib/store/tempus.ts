import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

// Types & Interfaces
interface BPMState {
	// States
	taps: number[];
	useAutoReset: boolean;
	hasAutoReset: boolean;
	autoResetDuration: number;
	resetTimeoutId: number | undefined;
	recentTapCount: number;

	// Actions
	addTap: () => void;
	reset: () => void;
	toggleAutoReset: () => void;
	setAutoResetDuration: (duration: number) => void;
	setResetTimeout: (callback: () => void, duration: number) => void;
	clearResetTimeout: () => void;
	setRecentTapCount: (count: number) => void;
}



export const useBPMStore = create<BPMState>()(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				// Initial states
				taps: [],
				useAutoReset: true,
				hasAutoReset: false,
				autoResetDuration: 2,
				recentTapCount: 4,
				resetTimeoutId: undefined,

				// Actions
				addTap: () => {
					const now = Date.now();
					const { useAutoReset, hasAutoReset } = get();

					// Clear any existing timeout
					get().clearResetTimeout();

					// Set a new timeout for auto-reset if enabled
					if (useAutoReset) {
						const duration = get().autoResetDuration * 1000;
						get().setResetTimeout(() => {
							if (Date.now() - now >= duration) {
								set({ hasAutoReset: true });
								// get().reset();
							}
						}, duration);
					}

					// Check if auto-reset has been triggered
					if (hasAutoReset) set({ hasAutoReset: false });
					const newTaps = hasAutoReset ? [now] : [...get().taps, now];
					set({ taps: newTaps });
				},
				reset: () => {
					set({ taps: [] });
				},
				toggleAutoReset: () => {
					set((state) => ({ useAutoReset: !state.useAutoReset }))
				},
				setAutoResetDuration: (duration: number) => {
					set({ autoResetDuration: duration })
				},
				setResetTimeout: (callback, duration) => {
					const id = window.setTimeout(callback, duration);
					set({ resetTimeoutId: id });
				},
				clearResetTimeout: () => {
					const resetTimeoutId = get().resetTimeoutId;
					if (resetTimeoutId) {
						window.clearTimeout(resetTimeoutId);
						set({ resetTimeoutId: undefined });
					}
				},
				setRecentTapCount: (count: number) => {
					set({ recentTapCount: count })
				},
			}), {
				name: "bpm-storage",
				partialize: (state) => ({
					autoResetDuration: state.autoResetDuration,
					recentTapCount: state.recentTapCount,
					useAutoReset: state.useAutoReset,
				}),
			}
		)
	)
);