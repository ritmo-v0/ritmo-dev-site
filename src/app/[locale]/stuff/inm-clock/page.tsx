"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
	celebrate,
	formatTime,
	formatTimeDiff,
	getRandomQuote,
} from "@/lib/inm-clock/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { Muted, Wrapper } from "@/components/common/typography";

// Icons & Images
import { RefreshCw } from "lucide-react";

// Constants & Variables
import { ASCII_ART } from "@/lib/inm-clock/ascii-art";
import {
	TRANSITION_200_25,
	TRANSITION_500_100,
	getContainerVariants,
	getChildVariants,
} from "@/lib/transitions";
const TARGET_TIME = new Date("2025-05-14T19:19:00.810");
const PRESICION = 19;  // ms
const QUOTES = [
	"這麼惡臭的時鐘有存在的必要嗎（惱",
	"數倒呦（便乗）",
	"人人皆是 homo（暴論）",
	"倒數不可避",
	"有什麼倒數的必要嗎",
	"Homo 特有的前端技術",
	"24 歲，是替代役",
	"壓力 MAX 餒",
	"好時間，就要來臨力",
	"這是什麼梗啊（求雷普",
	"逸一時誤一世",
	"いいよ！こいよ！",
	"クロッ↑ク↓",
	"這不是普通的時鐘，是ホモの時計。",
	"時間停止了，但惡臭還在蔓延",
	"已經等不及了，快端上來罷",
	"すいません許してください！\n時間はもう進まないから！",
	"この時計、なんだか臭くない？",
	"迫真時鐘部．時停の裏技",
	"這就是…時之野獸先輩嗎？",
];



export default function InmPage() {
	const [mounted, setMounted] = useState(false);
	const [time, setTime] = useState<Date | null>(null);
	const [diff, setDiff] = useState("");
	const [hasCelebrated, setHasCelebrated] = useState(false);

	useEffect(() => setMounted(true), []);
	useEffect(() => {
		setDiff(formatTimeDiff(TARGET_TIME, new Date()));

		const clockInterval = setInterval(() => {
			const now = new Date();
			if (now > TARGET_TIME) {
				setTime(TARGET_TIME);
				clearInterval(clockInterval);

				if (!hasCelebrated) {
					setHasCelebrated(true);
					celebrate();
				}
			} else setTime(now);
		}, PRESICION);

		const diffInterval = setInterval(() => {
			const now = new Date();
			if (now < TARGET_TIME) setDiff(formatTimeDiff(TARGET_TIME, now));
			else setDiff("好時間，來臨力");
		}, 1000);

		return () => {
			clearInterval(clockInterval);
			clearInterval(diffInterval);
		};
	}, [hasCelebrated]);

	return (
		<div className="relative h-full overflow-clip selection:bg-[#114514] selection:text-background dark:selection:text-foreground isolate">
			<Wrapper boxSizing="border" className="grid justify-items-center items-end gap-8 py-16 h-full">
				{mounted && time && (
					<>
						<div className="grid justify-items-center gap-4">
							<Clock time={time} />
							<TimeDiff timeDiff={diff} />
						</div>
						<InmQuote />
					</>
				)}
			</Wrapper>
			<div className="absolute-center size-full bg-radial from-transparent to-background xl:to-60% -z-1"></div>
			<Muted className="absolute-center w-max font-mono font-extralight text-xs text-[#114514] leading-1.5 whitespace-pre-line scale-90 xl:scale-100 opacity-30 dark:opacity-100 select-none -z-2">
				{ASCII_ART}
			</Muted>
		</div>
	);
}

function Clock({ time }: { time: Date }) {
	return (
		<motion.span
			className="inline-flex w-max font-mono font-bold text-2xl @md:text-3xl @3xl:text-5xl @5xl:text-7xl"
			initial="hidden" animate="visible"
			variants={getContainerVariants(0.015)}
		>
			{formatTime(time).split("").map((char, index) => (
				<motion.span
					key={index}
					className="w-[1ch]"
					variants={getChildVariants(
						{ opacity: 0, y: "1ch", filter: "blur(4px)" },
						{ opacity: 1, y: 0, filter: "blur(0px)", transition: TRANSITION_200_25 }
					)}
				>
					{char}
				</motion.span>
			))}
		</motion.span>
	);
}

function TimeDiff({ timeDiff }: { timeDiff: string }) {
	return (
		<motion.span
			className="text-sm @3xl:text-lg text-muted-foreground"
			initial="hidden" animate="visible"
			variants={getChildVariants(
				{ opacity: 0, filter: "blur(4px)" },
				{ opacity: 1, filter: "blur(0px)", transition: { ...TRANSITION_200_25, delay: 0.4 } }
			)}
		>
			{timeDiff}
		</motion.span>
	);
}

function InmQuote() {
	const [quote, setQuote] = useState(getRandomQuote(QUOTES));
	const [delay, setDelay] = useState(1.5);

	function handleClick() {
		if (delay !== 0) setDelay(0);
		let newQuote: string;
		do {
			newQuote = getRandomQuote(QUOTES);
		} while (newQuote === quote);
		setQuote(newQuote);
	}

	return (
		<motion.span
			key={quote}
			className="inline-flex items-center w-max text-sm text-muted-foreground text-center whitespace-pre-line"
			initial="hidden" animate="visible"
			variants={getChildVariants(
				{ opacity: 0 },
				{ opacity: 1, transition: { ...TRANSITION_500_100, delay } }
			)}
		>
			{quote}
			<Button className="size-9 ml-2" variant="ghost" onClick={handleClick}>
				<RefreshCw className="size-3.5" />
			</Button>
		</motion.span>
	);
}