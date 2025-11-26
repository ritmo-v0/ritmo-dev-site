import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
import type { Locale } from "@/lib/7sref/types";
interface SevensRefState {
	// States
	locale: Locale;

	// Actions
	setLocale: (locale: Locale | null) => void;
}



export const use7sRefStore = create<SevensRefState>()(
	persist(
		set => ({
			// Initial states
			locale: "ja",

			// Actions
			setLocale: (locale) => set({ locale: locale || "ja" }),
		}),
		{ name: "7sRef-store" }
	)
);