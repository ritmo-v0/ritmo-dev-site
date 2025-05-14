"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { celebrate, formatTime, formatTimeDiff, getRandomQuote } from "@/lib/inm-clock/utils";

// Components & UI
import { WrapperLayout } from "@/components/common/layouts";
import { Muted } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

// Images & Icons
import { RefreshCw } from "lucide-react";

// Constants & Variables
import { ASCII_ART } from "@/lib/inm-clock/ascii-art";
const TARGET_TIME = new Date("2025-05-14T17:14:19.810");
const PRESICION = 19;  // ms



export default function InmPage() {
	const [mounted, setMounted] = useState(false);
	const [time, setTime] = useState("");
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
	}, []);

	return (
		<div className="relative overflow-clip isolate">
			<WrapperLayout className="grid justify-items-center items-end gap-8 py-16 h-full selection-inm">
				{mounted && (time instanceof Date) && (
					<>
						<div className="grid justify-items-center gap-4">
							<Clock time={time} />
							<TimeDiff timeDiff={diff} />
						</div>
						<InmQuote />
					</>
				)}
			</WrapperLayout>
			<div className="absolute-center size-full bg-radial from-transparent to-background xl:to-60% -z-1"></div>
			<Muted className="absolute-center w-max font-mono font-extralight text-xs text-[#114514] leading-1.5 whitespace-pre-line scale-90 xl:scale-100 opacity-30 dark:opacity-100 select-none -z-2">
				{ASCII_ART}
			</Muted>
		</div>
	);
}

function Clock({ time }) {
	return (
		<motion.span
			className="inline-flex w-max font-mono font-bold text-2xl @md:text-3xl @3xl:text-5xl @5xl:text-7xl"
			initial="hidden" animate="visible"
			variants={{ visible: { transition: { staggerChildren: 0.015 } }, hidden: {} }}
		>
			{formatTime(time).split("").map((char, index) => (
				<motion.span
					key={index}
					className="w-[1ch]"
					variants={{
						hidden: { opacity: 0, y: "1ch", filter: "blur(4px)" },
						visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 200, damping: 25 } }
					}}
				>
					{char}
				</motion.span>
			))}
		</motion.span>
	);
}

function TimeDiff({ timeDiff }) {
	return (
		<motion.span
			className="text-sm @3xl:text-lg text-muted-foreground"
			initial="hidden" animate="visible"
			variants={{
				hidden: { opacity: 0, filter: "blur(4px)" },
				visible: { opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 200, damping: 25, delay: 0.4 } }
			}}
		>
			{timeDiff}
		</motion.span>
	);
}

function InmQuote() {
	const [quote, setQuote] = useState(getRandomQuote());
	const [delay, setDelay] = useState(1.5);

	function handleClick() {
		if (delay !== 0) setDelay(0);
		setQuote(getRandomQuote());
	}

	return (
		<motion.span
			key={quote}
			className="inline-flex items-center w-max text-sm text-muted-foreground"
			initial="hidden" animate="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: { opacity: 1, transition: { type: "spring", stiffness: 500, damping: 100, delay } }
			}}
		>
			{quote}
			<Button className="size-9 ml-2" variant="ghost" onClick={handleClick}>
				<RefreshCw className="size-3.5" />
			</Button>
		</motion.span>
	);
}