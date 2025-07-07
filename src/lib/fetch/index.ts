import ky, { HTTPError } from "ky";
import { match } from "ts-pattern";
import { ensureError } from "./response";

// Types & Interfaces
import type { Result } from "./response";
import type { Options as KyOptions } from "ky";
export type FetcherOptions = {
	prefixUrl?: string;
	params?: Record<string, string | number | boolean>;
	method?: KyOptions["method"];
	contentType?: string;
	data?: any;
}



export async function fetcher(
	url: string,
	{
		prefixUrl = "",
		params = {},
		method = "GET",
		contentType = "application/json",
		data = {},
	}: FetcherOptions = {}
) {
	// Compose options
	const inputUrl = prefixUrl
		? url.startsWith("/")
			? url.slice(1)
			: url
		: url;
	const options: KyOptions = {
		prefixUrl,
		method,
		searchParams: params,
	};

	if (method !== "GET" && method !== "HEAD") {
		match(contentType)
			.with("application/json", () => {
				options.headers = { "Content-Type": "application/json" };
				options.json = data;
			})
			.with("text/plain", () => {
				options.headers = { "Content-Type": "text/plain" };
				options.body = String(data);
			})
			.with("application/x-www-form-urlencoded", () => {
				options.headers = { "Content-Type": "application/x-www-form-urlencoded" };
				options.body = new URLSearchParams(data);
			})
			.with("multipart/form-data", () => {
				// Not important, at least for now
			})
			.otherwise(() => {
				// Not important, at least for now
			});
	}

	try {
		// ! Handle JSON cases only for now
		const response: Result = await ky(inputUrl, options).json();
		const { message } = response;

		match(response)
			.with({ success: false }, () => console.error(message))
			.with({ success: true, level: "info" }, () => console.log(message))
			.with({ success: true, level: "warning" }, () => console.warn(message))
			.exhaustive();

		return {
			...response,
			status: 200
		};
	} catch (err) {
		let status: number;
		let msg: string;

		if (err instanceof HTTPError) {
			status = err.response.status;

			const contentType = err.response.headers.get("content-type");
			msg = await match(contentType ?? "")
				.with("application/json", async () => {
					const { message } = await err.response.json();
					return message ?? err.message;
				})
				.otherwise(() => err.message);
		} else {
			const error = ensureError(err);
			status = error.status;
			msg = error.message;
		}

		const message = `[${status}] ${msg}`;
		console.error("ERR::FETCHER:", message);
		throw new Error(message);
	}
}