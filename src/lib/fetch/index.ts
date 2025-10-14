import ky, { HTTPError } from "ky";
import { ensureError } from "./response";

export async function fetcher<T>(url: string): Promise<T> {
	try {
		const data = await ky.get(url, { prefixUrl: "/api" }).json<T>();
		return data;
	} catch (err) {
		let msg: string;
		let status: number;

		if (err instanceof HTTPError) {
			const { message } = await err.response.json();
			msg = message ?? err.message;
			status = err.response.status;
		} else {
			const error = ensureError(err);
			msg = error.message;
			status = error.status;
		}

		const message = `[${status}] ${msg}`;
		console.error("ERR::FETCH:", message);
		throw new Error(message);
	}
}