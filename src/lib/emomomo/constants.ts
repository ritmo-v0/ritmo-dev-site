// Types & Interfaces
import type { SkinToneName } from "@/types/emoji";



export const VERSION_PREFIX = "# Version:";
export const GROUP_PREFIX = "# group:";
export const SUBGROUP_PREFIX = "# subgroup:";

export const PEOPLE_AND_BODY = "People & Body";

export const EmojiStatus = Object.freeze({
	Component: "component",                     // An Emoji_Component, excluding Regional_Indicators, ASCII, and non-Emoji.
	FullyQualified: "fully-qualified",          // A fully-qualified emoji (see ED-18 in UTS #51), excluding Emoji_Component
	MinimallyQualified: "minimally-qualified",  // A minimally-qualified emoji (see ED-18a in UTS #51)
	Unqualified: "unqualified",                 // An unqualified emoji (See ED-19 in UTS #51)
} as const);

export const DEFAULT_SKIN_TONE = "default skin tone";
export const EmojiSkinTone = Object.freeze({
	Default: DEFAULT_SKIN_TONE,
	Light: "light skin tone",
	MediumLight: "medium-light skin tone",
	Medium: "medium skin tone",
	MediumDark: "medium-dark skin tone",
	Dark: "dark skin tone",
} as const);
export const EmojiSkinToneOrder: readonly SkinToneName[] = [
	EmojiSkinTone.Default,
	EmojiSkinTone.Light,
	EmojiSkinTone.MediumLight,
	EmojiSkinTone.Medium,
	EmojiSkinTone.MediumDark,
	EmojiSkinTone.Dark,
] as const;