import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
interface TempusState {
	// States
	taps: number[];
	hasAutoReset: boolean;
	resetTimeoutId: number | undefined;

	useAutoReset: boolean;
	autoResetDuration: number;
	recentTapCount: number;

	// Actions
	reset: () => void;
	addTap: () => void;
	setResetTimeout: (callback: () => void, duration: number) => void;
	clearResetTimeout: () => void;

	toggleAutoReset: () => void;
	setAutoResetDuration: (autoResetDuration: number) => void;
	setRecentTapCount: (recentTapCount: number | null) => void;
}



export const useTempusStore = create<TempusState>()(
	persist(
		(set, get) => ({
			// Initial states
			taps: [],
			hasAutoReset: false,
			resetTimeoutId: undefined,

			useAutoReset: true,
			autoResetDuration: 2,
			recentTapCount: 4,

			// Actions
			reset: () => set({ taps: [] }),
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

			toggleAutoReset: () => set((state) => ({ useAutoReset: !state.useAutoReset })),
			setAutoResetDuration: (autoResetDuration) => set({ autoResetDuration }),
			setRecentTapCount: (recentTapCount) => set({ recentTapCount: recentTapCount || 4 }),
		}), {
			name: "tempus-store",
			partialize: (state) => ({
				autoResetDuration: state.autoResetDuration,
				recentTapCount: state.recentTapCount,
				useAutoReset: state.useAutoReset,
			}),
		}
	)
);