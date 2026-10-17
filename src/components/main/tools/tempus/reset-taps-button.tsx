"use client";
import { useTranslations } from "next-intl";
import { useTempusStore } from "@/lib/tempus/store";

// Components & UI
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

// Icons & Images
import { IconRefresh } from "@tabler/icons-react";

// Types & Interfaces
import type { RefObject } from "react";



export function ResetTapsButton({ tapRef }: { tapRef: RefObject<HTMLDivElement | null> }) {
	const t = useTranslations("tools.tempus");
	const reset = useTempusStore(state => state.reset);

	function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
		reset();
		if (e.detail === 0) tapRef.current?.focus();
		else e.currentTarget.blur();
	}

	return (
		<Button
			variant="destructive"
			className="pointer-fine:pr-2.5"
			onClick={handleReset}
			aria-keyshortcuts="Escape"
			render={
				<motion.button
					initial="normal"
					whileHover="animate"
					whileFocus="animate"
					whileTap="tap"
				/>
			}
		>
			<motion.span
				data-icon="inline-start"
				className="inline-flex"
				transition={{ type: "spring", stiffness: 250, damping: 25 }}
				variants={{
					normal: { rotate: "0deg" },
					animate: { rotate: "50deg" },
					tap: {
						rotate: "230deg",
						transition: { type: "spring", stiffness: 1200, damping: 80 },
					},
				}}
				aria-hidden
			>
				<IconRefresh className="size-4 -scale-x-100" />
			</motion.span>
			{t("reset")}
			<Kbd
				className="translate-x-0.5 pointer-coarse:hidden"
				aria-hidden
			>
				Esc
			</Kbd>
		</Button>
	);
}