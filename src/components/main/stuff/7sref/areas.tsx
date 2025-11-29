"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Components & UI
import { motion } from "motion/react";

// Constants & Variables
const ANI_DURATION = 1.6;



export function Areas({ className }: React.ComponentProps<"div">) {
	const [path, setPath] = useState("");
	useEffect(() => setPath(generatePath(window.innerHeight)), []);

	return (
		<div className={cn(
			"grid place-content-center place-items-center",
			"select-none touch-none pointer-events-none **:border-foreground",
			className,
		)}>
			<motion.div
				className="[--base-size:min(110vw,110svh)] grid grid-stack place-content-center place-items-center"
				initial={{ scale: 0.2, opacity: 0, filter: "blur(4px)" }}
				animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
				transition={{ duration: ANI_DURATION, ease: [0, 0.9, 0.2, 1] }}
				// transition={{ type: "spring", stiffness: 200, damping: 100, mass: 5 }}
			>
				<Area
					className="[--orbit-size:var(--base-size)] size-(--orbit-size) isolate"
					orbit={false}
				>
					<Area keyName="HAJIMARI" />
					<Area className="[--orbit-offset:0.5turn]" keyName="Heaven">
						<Area className="[--orbit-size:10rem] size-(--orbit-size)" orbit={false}>
							<Area className="size-9 animation-duration-[12s] z-1" />
						</Area>
					</Area>
				</Area>
				<Area
					className="[--orbit-size:clamp(95svh,70vw+40rem,165svh)] size-(--orbit-size) *:animation-duration-[120s]"
					orbit={false}
				>
					<Area className="[--orbit-offset:0.02turn] size-14" />
					<Area className="[--orbit-offset:0.27turn]" />
					<Area className="[--orbit-offset:0.52turn] size-9" keyName="World Tree" />
					<Area className="[--orbit-offset:0.56turn]" keyName="The End" />
					<Area className="[--orbit-offset:0.77turn]" />
				</Area>
				{path && (
					<>
						<DoorLeaf path={path} side="left" />
						<DoorLeaf path={path} />
					</>
				)}
			</motion.div>
		</div>
	);
}

function Area({
	className,
	children,
	keyName,
	orbit = true,
	...props
}: React.ComponentProps<"div"> & { keyName?: string, orbit?: boolean }) {
	return (
		<div
			className={cn(
				"relative grid grid-stack place-content-center place-items-center",
				"size-24 border-[1.5] rounded-full",
				orbit && "bg-background [--orbit-radius:calc(var(--orbit-size)/2)] animate-orbit",
				className,
			)}
			{...props}
		>
			{children}
			{keyName && (
				<div
					className={cn(
						"absolute top-1/2 right-0 translate-x-full -translate-y-1/2",
						"w-[max(100%,4.5rem)] h-[1.5px] bg-foreground origin-left scale-75",
					)}
				>
					<div className="absolute right-0 grid w-max p-2 font-semibold text-xs translate-x-full -translate-y-3.75">
						<span>AREA</span>
						<span>[{keyName}]</span>
					</div>
				</div>
			)}
		</div>
	);
}

function DoorLeaf({
	className,
	path,
	side = "right",
	...props
}: { path: string, side?: "left" | "right" } & React.ComponentProps<typeof motion.svg>) {
	const k = side === "right" ? 1 : -1;

	return (
		<motion.svg
			role="img"
			aria-label={`Door (${side})`}
			className={cn("w-16 h-[120svh]", className)}
			animate={{
				translateX: [0, 40 * k, 1200 * k],
				opacity: [1, 1, 0],
			}}
			transition={{
				delay: ANI_DURATION,
				duration: ANI_DURATION,
				times: [0, 0.4, 1],
				ease: ["backOut", "circIn"],
			}}
			{...props}
		>
			<path
				d={path}
				fill="none"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="square"
				strokeLinejoin="miter"
			/>
		</motion.svg>
	);
}

const generatePath = (height: number) => {
	const MIN_X_OFFSET = 5;   // Minimum horizontal deviation from previous point
	const MAX_X_OFFSET = 30;  // Maximum horizontal deviation in pixels
	const MIN_Y_STEP = 20;    // Minimum vertical step between points
	const MAX_Y_STEP = 100;   // Maximum vertical step between points

	const startY = -height * 0.1;  // -10vh
	const endY = height * 1.1;     // +10vh
	const baseX = MAX_X_OFFSET;    // Center of screen

	const points: { x: number, y: number }[] = [];
	let currentY = startY;

	// Generate points
	points.push({ x: baseX, y: currentY });
	while (currentY < endY) {
		const prevX = points[points.length - 1].x;

		// Random x offset, ensuring minimum distance from previous point
		let xOffset: number;
		do {
			xOffset = (2 * Math.random() - 1) * MAX_X_OFFSET;
		} while (Math.abs((baseX + xOffset) - prevX) < MIN_X_OFFSET);

		// Random y step
		const yStep = MIN_Y_STEP + Math.random() * (MAX_Y_STEP - MIN_Y_STEP);
		currentY += yStep;

		if (currentY < endY) {
			points.push({ x: baseX + xOffset, y: currentY });
		}
	}
	points.push({ x: baseX, y: endY });

	// Generate path data
	let pathData = `M ${points[0].x} ${points[0].y}`;
	for (let i = 1; i < points.length; i++) {
		const prev = points[i - 1];
		const curr = points[i];
		pathData += ` L ${curr.x} ${prev.y}`;
		pathData += ` L ${curr.x} ${curr.y}`;
	}

	return pathData;
};