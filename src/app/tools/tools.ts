// Types & Interfaces
import type { ToolMeta } from "@/types/meta";
export type UppercaseAlphabet =
	| "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
	| "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

// Constants & Variables
import { meta as emomomoMeta } from "@/app/tools/emomomo/meta";
import { meta as tempusMeta } from "@/app/tools/tempus/meta";
export const TOOLS = {
	E: {
		id: emomomoMeta.title.toLowerCase(),
		color: "#FFCC4D",
		imageUrl: "https://img.ritmo.dev/tools/emomomo/og_image.webp",
		...emomomoMeta,
	},
	T: {
		id: tempusMeta.title.toLowerCase(),
		color: "#D6D6D6",
		...tempusMeta,
	},
} satisfies Partial<Record<UppercaseAlphabet, ToolMeta>>;