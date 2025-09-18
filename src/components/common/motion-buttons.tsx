"use client";
import { cn } from "@/lib/utils";

// Components
import { motion } from "motion/react";

// Types & Interfaces
import type { Transition, Variants } from "motion/react";
export interface MotionButtonProps {
	childrenBefore?: React.ReactNode;
	children?: React.ReactNode;
	svgClassName?: string;
};



/*
 * These components are intended to be used with the `Button` shadcn component.
 * Use the asChild prop to pass the button props to the motion button.
 */

export function CopyButton(
	{
		childrenBefore,
		children,
		svgClassName,
		showIsCopied,
		...props
	}: MotionButtonProps & { showIsCopied?: boolean; } = { showIsCopied: false }
) {
	const checkPathVariants: Variants = {
		normal: {
			opacity: 1,
			pathLength: 1,
			scale: 1,
			transition: {
				duration: 0.3,
				opacity: { duration: 0.1 },
			}
		},
		animate: {
			opacity: [0, 1],
			pathLength: [0, 1],
			scale: [0.5, 1],
			transition: {
				duration: 0.4,
				opacity: { duration: 0.1 },
			}
		},
	};
	const inTransition: Transition = { type: "spring", stiffness: 300, damping: 20 };
	const outTransition: Transition = { type: "spring", stiffness: 400, damping: 40 };

	// Icons
	const CopyIcon = (
		<motion.svg
			key="copy"
			role="img"
			aria-label="Copy"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("size-4", svgClassName)}
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={inTransition}
		>
			<motion.rect
				width="14"
				height="14"
				x="8"
				y="8"
				rx="2"
				ry="2"
				variants={{
					normal: { translateX: 0, translateY: 0, transition: inTransition },
					animate: { translateX: -3, translateY: -3, transition: outTransition },
				}}
			/>
			<motion.path
				d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
				variants={{
					normal: { x: 0, y: 0, transition: inTransition },
					animate: { x: 3, y: 3, transition: outTransition },
				}}
			/>
		</motion.svg>
	);
	const CheckIcon = (
		<svg
			key="check"
			role="img"
			aria-label="Check"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("size-4", svgClassName)}
		>
			<motion.path
				variants={checkPathVariants}
				initial={false}
				animate="animate"
				d="M4 12 9 17L20 6"
			/>
		</svg>
	);

	return (
		<motion.button
			initial="normal"
			whileHover="animate"
			whileFocus="animate"
			{...props}
		>
			{childrenBefore}
			{showIsCopied ? CheckIcon : CopyIcon}
			{children}
		</motion.button>
	);
}

export function DeleteButton(
	{ childrenBefore, children, svgClassName, ...props }: MotionButtonProps
) {
	const inTransition: Transition = { type: "spring", stiffness: 400, damping: 40 };
	const outTransition: Transition = { type: "spring", stiffness: 500, damping: 30 };
	const fallTransition: Transition = {
		y: inTransition,
		opacity: inTransition,
		rotateZ: { type: "spring", stiffness: 400, damping: 10 },
	};

	return (
		<motion.button
			initial="normal"
			whileHover="animate"
			whileFocus="animate"
			{...props}
		>
			{childrenBefore}
			<motion.svg
				role="img"
				aria-label="Delete"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={cn("size-4 origin-bottom", svgClassName)}
				initial={{ y: -12, opacity: 0, rotateZ: -10 }}
				animate={{ y: 0, opacity: 1, rotateZ: 0 }}
				transition={fallTransition}
			>
				<motion.g
					variants={{
						normal: { y: 0, transition: inTransition },
						animate: { y: -1.1, transition: outTransition },
					}}
				>
					<path d="M3 6h18" />
					<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
				</motion.g>
				<motion.path
					d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
					variants={{
						normal: { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", transition: inTransition },
						animate: { d: "M19 9v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V9", transition: outTransition },
					}}
				/>
				<motion.line
					x1="10"
					x2="10"
					y1="11"
					y2="17"
					variants={{
						normal: { y: 0, transition: inTransition },
						animate: { y: 0.5, transition: outTransition },
					}}
				/>
				<motion.line
					x1="14"
					x2="14"
					y1="11"
					y2="17"
					variants={{
						normal: { y: 0, transition: inTransition },
						animate: { y: 0.5, transition: outTransition },
					}}
				/>
			</motion.svg>
			{children}
		</motion.button>
	);
}

export function ResetButton(
	{ childrenBefore, children, svgClassName, ...props }: MotionButtonProps
) {
	return (
		<motion.button
			initial="normal"
			whileHover="animate"
			whileFocus="animate"
			whileTap="tap"
			{...props}
		>
			{childrenBefore}
			<motion.svg
				role="img"
				aria-label="Refresh-CW"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={cn("size-4", svgClassName)}
				transition={{ type: "spring", stiffness: 250, damping: 25 }}
				variants={{
					normal: { rotate: "0deg" },
					animate: { rotate: "50deg" },
					tap: { rotate: "230deg", transition: { type: "spring", stiffness: 1200, damping: 80 } },
				}}
			>
				<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
				<path d="M21 3v5h-5" />
				<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
				<path d="M8 16H3v5" />
			</motion.svg>
			{children}
		</motion.button>
	);
}