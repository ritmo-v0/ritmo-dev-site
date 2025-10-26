// # Redis
export const EMOJI_DATA_REDIS_KEY = "emomomo";

// # Prefix
export const VERSION_PREFIX = "# Version:";
export const GROUP_PREFIX = "# group:";
export const SUBGROUP_PREFIX = "# subgroup:";

// # Category
export const PEOPLE_AND_BODY = "People & Body";

// # Info & Variant
export const EmojiStatus = Object.freeze({
	Component: "component",                     // An Emoji_Component, excluding Regional_Indicators, ASCII, and non-Emoji.
	FullyQualified: "fully-qualified",          // A fully-qualified emoji (see ED-18 in UTS #51), excluding Emoji_Component
	MinimallyQualified: "minimally-qualified",  // A minimally-qualified emoji (see ED-18a in UTS #51)
	Unqualified: "unqualified",                 // An unqualified emoji (See ED-19 in UTS #51)
} as const);

export const DEFAULT_SKIN_TONE = "default skin tone";
export const EMOJI_SKIN_TONES = [
	DEFAULT_SKIN_TONE,
	"light skin tone",
	"medium-light skin tone",
	"medium skin tone",
	"medium-dark skin tone",
	"dark skin tone",
] as const;