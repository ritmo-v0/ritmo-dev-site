export function getBaseUrl() {
	const PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
	const baseUrl = PRODUCTION_URL
		? `https://${PRODUCTION_URL}`
		: `https://localhost:${process.env.PORT || 3000}`;

	return new URL(baseUrl);
}