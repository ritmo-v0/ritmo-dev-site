import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
interface SevensRefState {
	// States
	locale: string;

	// Actions
	setLocale: (locale: string) => void;
}



export const use7sRef4Store = create<SevensRefState>()(
	persist(
		set => ({
			// Initial states
			locale: "",

			// Actions
			setLocale: (locale) => set({ locale }),
		}),
		{ name: "7sRef4-store" }
	)
);