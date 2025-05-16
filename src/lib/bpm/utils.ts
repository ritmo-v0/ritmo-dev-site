export function calculateBpm(taps: number[]): number {
	if (taps.length < 2) return 0;

	const intervals: number[] = [];
	for (let i = 1; i < taps.length; i++) {
		intervals.push(taps[i] - taps[i - 1]);
	}
	const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
	return Number.parseFloat((60000 / avgInterval).toFixed(2));
}

export function calculateRecentBpm(taps: number[], count: number): number {
	if (taps.length < 2) return 0;

	if (taps.length >= count) {
		const recentTaps = taps.slice(-count);
		return calculateBpm(recentTaps);
	} else {
		return 0;
	}
}