export function cronAuth(req) {
	const authorization = req.headers.get("authorization");
	if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
		return false;
	}

	return true;
}