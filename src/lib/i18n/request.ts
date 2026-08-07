import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

// Constants & Variables
import { routing } from "./routing";
import { FORMATS } from "./constants";



export default getRequestConfig(async ({ locale }) => {
	if (!locale) {
		const paramValue = await rootParams.locale();
		if (hasLocale(routing.locales, paramValue)) locale = paramValue;
		else notFound();
	}

	return {
		locale,
		formats: FORMATS,
		messages: (await import(`./locales/${locale}.json`)).default,
	};
});