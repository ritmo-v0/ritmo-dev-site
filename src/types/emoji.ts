import { EmojiSkinTone } from "@/lib/emomomo/constants";



// # Emoji Skin Tone Types
export type SkinToneKey = "1" | "2" | "3" | "4" | "5";
export type SkinToneName = typeof EmojiSkinTone[keyof typeof EmojiSkinTone];

// # Emoji Entry Types
export interface EmojiProps {
	codePoints: string;
	status: string;
	emoji: string;
	version: string;
	name: string;
}

export interface CompEmojiSubEntry {
	e: string;
	v?: Partial<Record<SkinToneKey, CompEmojiSubEntry>>;
}
export interface CompEmojiEntry extends CompEmojiSubEntry {
	n: string;
}

export interface FullEmojiSubEntry {
	emoji: string;
	variants?: Partial<Record<SkinToneKey, FullEmojiSubEntry>>;
}
export interface FullEmojiEntry extends FullEmojiSubEntry {
	name: string;
}

export type EmojiEntry = CompEmojiEntry | FullEmojiEntry;
export type EmojiSubEntry = CompEmojiSubEntry | FullEmojiSubEntry;
export type EmojiEntryByComp<C extends boolean> = C extends true
	? CompEmojiEntry
	: FullEmojiEntry;
export type SubEmojiEntryByComp<C extends boolean> = C extends true
	? CompEmojiSubEntry
	: FullEmojiSubEntry;

// # Emoji Group Types
export interface EmojiSubgroup<T extends EmojiEntry> {
	id?: string;
	title: string;
	emojis: T[];
}

export interface EmojiGroup<T extends EmojiEntry> {
	id?: string;
	title: string;
	emojis?: T[];
	subgroups: EmojiSubgroup<T>[];
}
export interface EmojiData<T extends EmojiEntry> {
	version: string;
	groups: EmojiGroup<T>[];
}

// # Parse Options
export interface ParseOptions {
	compressed?: boolean;
}