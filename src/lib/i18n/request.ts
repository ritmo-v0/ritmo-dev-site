import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./utils";
import { FORMATS } from "./config";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		formats: FORMATS,
		messages: (await import(`./locales/${locale}.json`)).default,
	};
});