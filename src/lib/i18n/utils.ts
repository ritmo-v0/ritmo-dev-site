"use server";
import { cookies } from "next/headers";

// Types & Interfaces
import type { Locale } from "next-intl";

// Constants & Variables
import { DEFAULT_LOCALE } from "./config";
const LOCALE_COOKIE = "NEXT_LOCALE";



export async function getUserLocale(): Promise<Locale> {
	const cookieStore = await cookies();
	const userLocale = cookieStore.get(LOCALE_COOKIE)?.value;

	return userLocale as Locale || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: Locale | null) {
	const cookieStore = await cookies();
	cookieStore.set(LOCALE_COOKIE, locale || DEFAULT_LOCALE);
}