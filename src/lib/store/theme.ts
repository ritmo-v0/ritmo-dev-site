// Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
import type { PresetName } from "@/lib/theme/types";
interface ThemeStoreProps {
	preset: PresetName;
	setPreset: (preset: PresetName) => void;
}



export const useThemeStore = create<ThemeStoreProps>()(
	persist(
		(set) => ({
			preset: "default",
			setPreset: (preset) => set({ preset }),
		}),
		{ name: "rds-theme" }
	)
);