import { meta as emojiMeta } from "@/app/tools/emojis/meta";
import { meta as tempusMeta } from "@/app/tools/tempus/meta";

// Types & Interfaces
import type { ToolMeta } from "@/types/meta";
export type UppercaseAlphabet =
	| "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
	| "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";



export const TOOLS = {
	E: {
		id: emojiMeta.title.toLowerCase(),
		color: "#FFCC4D",
		imageUrl: "https://aaw2tslxqb.ufs.sh/f/vQ66ADGRMise93dXMwzakeIbqDAPdLJ4rMG5g3oWuBfjRZ0O",
		...emojiMeta,
	},
	T: {
		id: tempusMeta.title.toLowerCase(),
		color: "#D6D6D6",
		...tempusMeta,
	},
} satisfies Partial<Record<UppercaseAlphabet, ToolMeta>>;