import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "噢不。出事了阿伺";
const NO_RESPONSE_MESSAGE = "噢不。阿伺你怎麼沒感覺";



const fetcher = async (
	url,
	{
		baseUrl = "",
		params = {},
		method = "GET",
		contentType = "application/json",
		responseType = "json",
		data = {}
	} = {}
) => {
	const options = {
		method,
		url: baseUrl + url,
		headers: {
			"Content-Type": contentType,
		},
		params,
		data,
		responseType,
	};

	try {
		const response = await axios(options);
		const { level, message } = response.data;
		if (message) {
			switch (level) {
				case "error":
					console.error(message);
					break;
				case "warning":
					console.warn(message);
					break;
				case "info":
				default:
					console.log(message);
					break;
			}
		}

		return { ...response.data, status: response.status }
	} catch (error) {
		if (error.response) {
			// Handle errors from the server
			const status = error.response.status;
			const message = error.response?.data?.message || DEFAULT_ERROR_MESSAGE;
			throw new Error(`[${status}] ${message}`);
		} else if (error.request) {
			// Handle errors due to no response received
			const status = 500;
			throw new Error(`[${status}] ${NO_RESPONSE_MESSAGE}`);
		} else {
			// Handle other errors
			const status = 0;
			throw new Error(`[${status}] ${DEFAULT_ERROR_MESSAGE}`);
		}
	}
};

export default fetcher;