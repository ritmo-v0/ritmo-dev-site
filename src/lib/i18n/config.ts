export const LOCALES = ["en", "zh-TW", "ja"] as const;
export const DEFAULT_LOCALE = LOCALES[0];

declare module "next-intl" {
	interface AppConfig {
		Locale: typeof LOCALES[number];
	}
}