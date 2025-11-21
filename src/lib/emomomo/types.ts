import type { EMOJI_SKIN_TONES } from "./constants";

// # Group
export type EmojiData = {
	version: string;
	groups: EmojiGroup[];
};
export type EmojiGroup = {
	title: string;
	subgroups: EmojiSubgroup[];
};
export type EmojiSubgroup = {
	title: string;
	emojis: EmojiEntry[];
};

// # Entry
export type EmojiEntry = EmojiSubEntry & {
	n: string;
};
export type EmojiSubEntry = {
	e: string;
	v?: Partial<Record<SkinToneKeyWithoutDefault, EmojiSubEntry>>;
};
export type EmojiProps = {
	codePoints: string;
	status: string;
	emoji: string;
	version: string;
	name: string;
};

// # Skin Tone
export type SkinTone = typeof EMOJI_SKIN_TONES[number];
export type SkinToneKeyWithoutDefault = "1" | "2" | "3" | "4" | "5";
export type SkinToneKey = SkinToneKeyWithoutDefault | "0";