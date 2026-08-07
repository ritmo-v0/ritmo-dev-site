import * as rootParams from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

// Constants & Variables
import { routing } from "./routing";
import { FORMATS } from "./constants";



export default getRequestConfig(async ({ locale }) => {
	if (!locale) {
		const paramValue = await rootParams.locale();
		locale = hasLocale(routing.locales, paramValue)
			? paramValue
			: routing.defaultLocale;
	}

	return {
		locale,
		formats: FORMATS,
		messages: (await import(`./locales/${locale}.json`)).default,
	};
});