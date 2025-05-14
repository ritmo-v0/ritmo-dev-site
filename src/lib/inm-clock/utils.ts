import confetti from "canvas-confetti";

// Constants & Variables
export const INM_QUOTES: string[] = [
	"這麼惡臭的時鐘有存在的必要嗎（惱",
	"好時間要來臨力",
	"逸一時誤一世",
	"這不是普通的時鐘，是ホモの時計。",
	"時間停止了，但惡臭還在蔓延。",
	"いいゾ〜この時間…。",
	"すいません許してください！もう更新しませんから！",
	"この時計、なんだか臭くない？",
	"114514 年の時を超えて…やりますねぇ！",
	"ファッ！？時間止まってるやんけ！",
	"迫真時鐘部・時間停止の裏技",
	"啊啊啊啊啊！時間要來了啊！！（時間的那個意味で）",
	"時間は止まった、でもホモビは永遠に続く。",
	"這就是…時之野獸先輩嗎？",
	"オォン！時が止まる音ォン！",
	"讓時間永遠停在 114514 秒前。",
	"站在時間的盡頭，看著野獸先輩的背影漸行漸遠…。",
];



export function formatTime(date: Date): string {
	function pad(n: number, z: number = 2): string {
		return String(n).padStart(z, "0");
	}

	const year = (date.getFullYear() - 1911).toString();
	const month = date.getMonth() + 1;
	const day = pad(date.getDate());
	const hours = (date.getHours()) % 12 || 12;
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());
	const milliseconds = pad(date.getMilliseconds(), 3);
	const meridiem = hours >= 12 ? "PM" : "AM";
	const formattedTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${meridiem}`;
	return formattedTime;
}

export function formatTimeDiff(target: Date, now: Date): string {
	const diff = target.getTime() - now.getTime();  // ms
	if (diff < 0) return "好時間來臨力";

	let remaining = Math.abs(diff);
	const parts = [];
	const units = [
		{ label: "年", ms: 1000 * 60 * 60 * 24 * 365 },
		{ label: "月", ms: 1000 * 60 * 60 * 24 * 30 },
		{ label: "日", ms: 1000 * 60 * 60 * 24 },
		{ label: "小時", ms: 1000 * 60 * 60 },
		{ label: "分", ms: 1000 * 60 },
		{ label: "秒", ms: 1000 },
	];

	for (const unit of units) {
		const value = Math.floor(remaining / unit.ms);
		if (value > 0) {
			parts.push(`${value} ${unit.label}`);
			remaining -= value * unit.ms;
		}
	}

	return (parts.length === 0) ? "好時間來臨力" : `剩餘 ${parts.join(" ")}`;
}

export function getRandomQuote(): string {
	return INM_QUOTES[Math.floor(Math.random() * INM_QUOTES.length)];
}

export function celebrate() {
	fire(0.25, {
		spread: 26,
		startVelocity: 55,
	});
	fire(0.2, {
		spread: 60,
	});
	fire(0.35, {
		spread: 100,
		decay: 0.91,
		scalar: 0.8,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 45,
	});
}

function fire(particleRatio: number, options: Record<string, any>): void {
	confetti({
		origin: { y: 0.7 },
		...options,
		particleCount: Math.floor(200 * particleRatio),
	});
}