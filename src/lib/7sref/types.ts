import type { Locale } from "next-intl";

export type SevensRefMessage = {
	role: "acid" | "maimai" | "player" | "separator";
	content: Record<Locale, string>;
	timestamp?: string;
};

export type LyricLine = {
	role?: "リズ" | "アシッド" | (string & {});
	isRoleSpoiler?: boolean;
	content: Record<Extract<Locale, "ja">, string> & Partial<Record<Exclude<Locale, "ja">, string>>;
};