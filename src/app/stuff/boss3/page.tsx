"use client";
import { useEffect, useState } from "react";
import { celebrate, getRandomQuote } from "@/lib/inm-clock/utils";

// Components & UI
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Muted, Wrapper } from "@/components/common/typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Images & Icons
import { RefreshCw } from "lucide-react";

// Constants & Variables
import { TRANSITION_200_25 } from "@/lib/transitions";
import { ASCII_ART } from "./ascii-art";
const QUOTES = [
	{ id: "S117002", text: "樂穎是老大，今天是她生日" },
	{ id: "S119005", text: "祝妳生日快樂\n我們來為妳慶生" },
	{ id: "S119062", text: "生日快樂，恭喜妳又老了一歲" },
	{ id: "S335017", text: "祝妳祝妳生日快樂" },
	{ id: "S408003", text: "今天是我生日" },
	{ id: "S408004", text: "祝妳生日快樂" },
	{ id: "S419004", text: "不知道" },
	{ id: "S419005", text: "我知道\n我怎麼可能會不知道呢" },
	{ id: "S419006", text: "妳今年幾歲了，23 歲" },
	{ id: "S419007", text: "這是我一生當中\n最重要的一個生日" },
	{ id: "S419044", text: "妳好，小美眉" },
	{ id: "S637008", text: "生日快樂啦" },
	{ id: "S637037", text: "這又算是哪門子的生日禮物" },
];



export default function Boss3Page() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		let count = 0;
		let timeoutId: NodeJS.Timeout;
		function celebrate3() {
			if (count < 3) {
				celebrate();
				count++;
				timeoutId = setTimeout(celebrate3, 400);
			}
		}
		celebrate3();

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<div className="relative overflow-clip isolate">
			<Wrapper className="grid justify-items-center items-end gap-8 py-16 h-full">
				<div className="grid justify-items-center gap-4">
					<Title text="陳樂穎老大三號生日快樂" />
					<Subtitle text="2025/08/07 謹製" />
				</div>
				{mounted && <Boss3Quote />}
			</Wrapper>
			<div className="absolute-center size-full bg-radial from-transparent to-background to-80% xl:to-60% -z-1"></div>
			<Muted className="absolute-center w-max font-mono font-extralight text-xs leading-1.5 whitespace-pre-line scale-90 xl:scale-100 opacity-40 select-none -z-2">
				{ASCII_ART}
			</Muted>
		</div>
	);
}

function Title({ text }: { text: string }) {
	return (
		<motion.span
			className="inline-flex w-max font-mono font-bold text-2xl @md:text-3xl @3xl:text-5xl @5xl:text-7xl"
			initial="hidden" animate="visible"
			variants={{ visible: { transition: { staggerChildren: 0.015 } }, hidden: {} }}
		>
			{text.split("").map((char, index) => (
				<motion.span
					key={index}
					className="w-[1.75ch]"
					variants={{
						hidden: { opacity: 0, y: "1ch", filter: "blur(4px)" },
						visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: TRANSITION_200_25 }
					}}
				>
					{char}
				</motion.span>
			))}
		</motion.span>
	);
}

function Subtitle({ text }: { text: string }) {
	return (
		<motion.span
			className="text-sm @3xl:text-lg text-muted-foreground"
			initial="hidden" animate="visible"
			variants={{
				hidden: { opacity: 0, filter: "blur(4px)" },
				visible: { opacity: 1, filter: "blur(0px)", transition: { ...TRANSITION_200_25, delay: 0.4 } }
			}}
		>
			{text}
		</motion.span>
	);
}

function Boss3Quote() {
	const [quote, setQuote] = useState(getRandomQuote(QUOTES));
	const [delay, setDelay] = useState(1.5);

	function handleClick() {
		if (delay !== 0) setDelay(0);
		let newQuote: { id: string, text: string } = { id: "", text: "" };
		do {
			newQuote = getRandomQuote(QUOTES)
		} while (newQuote.id === quote.id);
		setQuote(newQuote);
	}

	return (
		<Tooltip>
			<TooltipTrigger render={
				<motion.span
					key={quote.id}
					className="inline-flex items-center w-max text-sm text-muted-foreground text-center whitespace-pre-line cursor-pointer"
					initial="hidden" animate="visible"
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1, transition: { type: "spring", stiffness: 500, damping: 100, delay } }
					}}
				>
					{quote.text}
					<Button
						variant="ghost"
						size="icon"
						className="ml-2"
						onClick={handleClick}
					>
						<RefreshCw className="size-3.5" />
					</Button>
				</motion.span>
			} />
			<TooltipContent>
				<span className="font-mono">{quote.id}</span>
			</TooltipContent>
		</Tooltip>
	);
}