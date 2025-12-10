import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
interface SevensRefState {
	// States
	showTranslated: boolean;

	// Actions
	setShowTranslated: (showTranslated: boolean) => void;
}



export const use7sRefStore = create<SevensRefState>()(
	persist(
		set => ({
			// Initial states
			showTranslated: true,

			// Actions
			setShowTranslated: (showTranslated) => set({ showTranslated }),
		}),
		{ name: "7sRef-store" }
	)
);