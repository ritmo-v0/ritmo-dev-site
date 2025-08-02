// Types & Interfaces
import type { PresetName, ThemeStyles, ThemeStyleProps } from "./types";

// Constants & Variables
import { COMMON_STYLES, PRESETS } from "./presets";



export function getPresetThemeStyles(name: PresetName): ThemeStyles {
	if (name === "default") return PRESETS.default;

	const preset = PRESETS[name];
	if (!preset) return PRESETS.default;

	return {
		light: {
			...PRESETS.default.light,
			...(preset.light || {}),
		},
		dark: {
			...PRESETS.default.dark,
			...(preset.dark || {}),
		},
	};
}

export function getThemeColor(preset: PresetName, color: keyof ThemeStyleProps) {
	const theme = getPresetThemeStyles(preset);
	return theme?.light?.[color] || theme?.dark?.[color] || "#000000";
}

export function applyCommonStyles(root: HTMLElement, themeStyles: ThemeStyles) {
	Object.entries(themeStyles)
		.filter(([key]) => COMMON_STYLES.includes(key as (typeof COMMON_STYLES)[number]))
		.forEach(([key, value]) => {
			if (typeof value === "string") {
				root.style.setProperty(`--${key}`, value);
			}
		});
}

export function applyThemeColors(root: HTMLElement, themeStyles: ThemeStyles, mode: keyof ThemeStyles) {
	Object.entries(themeStyles[mode]).forEach(([key, value]) => {
		if (typeof value === "string" && !COMMON_STYLES.includes(key as (typeof COMMON_STYLES)[number])) {
			root.style.setProperty(`--${key}`, value);
		}
	});
}