// Types & Interfaces
import type { Transition, Variants } from "motion/react";

// Constants & Variables
export const TRANSITION_200_25: Transition = { type: "spring", stiffness: 200, damping: 25 };



export function getContainerVariants(
	staggerChildren: number,
	delayChildren = 0
): Variants {
	return {
		hidden: {},
		visible: { transition: { staggerChildren, delayChildren } },
	};
}