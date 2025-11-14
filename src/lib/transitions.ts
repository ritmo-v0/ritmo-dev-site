// Types & Interfaces
import type { Transition, Variant, Variants } from "motion/react";

// Constants & Variables
export const TRANSITION_200_25: Transition = { type: "spring", stiffness: 200, damping: 25 };
export const TRANSITION_500_100: Transition = { type: "spring", stiffness: 500, damping: 100 };



export function getContainerVariants(
	staggerChildren: number,
	delayChildren = 0
): Variants {
	return {
		hidden: {},
		visible: { transition: { staggerChildren, delayChildren } },
	};
}

export function getChildVariants(
	hidden: Variant,
	visible: Variant,
): Variants {
	return {
		hidden: hidden,
		visible: visible,
	};
}