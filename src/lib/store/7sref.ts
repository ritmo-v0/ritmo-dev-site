import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
interface SevensRefState {
	// States
	locale: string;

	// Actions
	setLocale: (locale: string) => void;
}



export const use7sRefStore = create<SevensRefState>()(
	persist(
		set => ({
			// Initial states
			locale: "ja",

			// Actions
			setLocale: (locale) => set({ locale }),
		}),
		{ name: "7sRef-store" }
	)
);