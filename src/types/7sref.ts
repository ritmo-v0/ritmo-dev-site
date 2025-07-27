export const LOCALES = ["ja", "zh-TW", "en"] as const;
export type Locale = (typeof LOCALES)[number];



// Tabs
export type SevensRefMessageTab = {
	id: string;
	name: Record<Locale, string>;
};
export const MESSAGE_TABS: SevensRefMessageTab[] = [
	{
		id: "main",
		name: {
			ja: "メイン",
			"zh-TW": "主線",
			en: "Main",
		},
	},
	{
		id: "characters",
		name: {
			ja: "キャラクター",
			"zh-TW": "角色",
			en: "Characters",
		},
	},
	{
		id: "settings",
		name: {
			ja: "設定",
			"zh-TW": "設定",
			en: "Settings",
		},
	},
] as const;

// Messages
export type SevensRefMessage = {
	role: "player" | "acid";
	content: Record<Locale, string>;
	timestamp?: string;
};