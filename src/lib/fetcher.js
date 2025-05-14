import axios from "redaxios";
import { match } from "ts-pattern";
import { ErrorMessage } from "./errors";



const fetcher = async (url, { baseUrl = "", params = {}, method = "GET", contentType = "application/json", data = {} } = {}) => {
	const options = {
		method,
		url: baseUrl + url,
		headers: {
			"Content-Type": contentType,
		},
		params,
	};

	// Only include the body if the method is not GET or HEAD
	if (method !== "GET" && method !== "HEAD") options.data = data;

	try {
		const response = await axios(options);
		const { level, message } = response.data;
		if (message) {
			match(level)
				.with("error", () => console.error(message))
				.with("warning", () => console.warn(message))
				.with("info", () => console.log(message))
				.otherwise(() => console.log(message));
		}

		return { ...response.data, status: response.status }
	} catch (error) {
		const status = error.status || 500;
		const message = error?.data?.message || ErrorMessage.InternalServer;
		throw new Error(`[${status}] ${message}`);
	}
};

export default fetcher;