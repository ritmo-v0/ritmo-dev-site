"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Components & UI
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Types & Interfaces
interface BpmButtonProps {
	bpm: number | string;
	shouldMute?: boolean;
}



export function BpmButton({ bpm, shouldMute = false }: BpmButtonProps) {
	const inTransition = { type: "spring", stiffness: 300, damping: 20 };
	const outTransition = { type: "spring", stiffness: 400, damping: 40 };
	const isMuted = shouldMute || bpm === 0 || bpm === "-";

	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("已複製到剪貼簿。");
		} catch (error: any) {
			toast.error("發生了一點🤏🌌小問題", {
				description: error.message
			});
		}
	}

	return (
		<Button
			variant="nothing"
			className={cn(
				"md:gap-3 !p-0 font-mono font-bold text-xl xs:text-2xl md:text-3xl 2xl:text-4xl",
				`${isMuted && "font-normal text-muted-foreground"}`
			)}
			onClick={() => copyToClipboard(bpm.toString())}
			disabled={isMuted}
			asChild
		>
			<motion.button initial="normal" whileHover="animate" whileFocus="animate">
				{bpm}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="size-4 2xl:size-5"
				>
					<motion.rect
						width="14"
						height="14"
						x="8"
						y="8"
						rx="2"
						ry="2"
						variants={{
							normal: { translateY: 0, translateX: 0, transition: inTransition },
							animate: { translateY: -3, translateX: -3, transition: outTransition },
						}}
					/>
					<motion.path
						d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
						variants={{
							normal: { x: 0, y: 0, transition: inTransition },
							animate: { x: 3, y: 3, transition: outTransition },
						}}
					/>
				</svg>
			</motion.button>
		</Button>
	);
}