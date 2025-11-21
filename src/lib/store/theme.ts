// Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
import type { PresetId } from "@/lib/theme/types";
interface ThemeStoreProps {
	preset: PresetId;
	setPreset: (preset: PresetId) => void;
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