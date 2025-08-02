"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useThemeStore } from "@/lib/store/theme";
import {
	getPresetThemeStyles,
	applyCommonStyles,
	applyThemeColors,
} from "@/lib/theme/utils";



export function ShadcnProvider({ children }: { children: React.ReactNode }) {
	const { preset } = useThemeStore();
	const { resolvedTheme: mode } = useTheme();

	useEffect(() => {
		const root = document.documentElement;
		const theme = getPresetThemeStyles(preset);

		if (mode === "light" || mode === "dark") {
			applyThemeColors(root, theme, mode);
			applyCommonStyles(root, theme);
		}
	}, [preset, mode]);

	return children;
}