"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Types & Interfaces
interface SquircleProps {
	children?: React.ReactNode;
	className?: string;
	radius?: number;
	n?: number;
}

interface SquirclePathProps {
	width: number;
	height: number;
	radius: number;
	n?: number;
}



export default function Squircle({ children, className, radius = 60, n = 1 }: SquircleProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		if (!ref.current) return;
		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setSize({ width, height });
		});

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const { width, height } = size;
	const path = width && height
		? getRadiusBasedSquirclePath({ width, height, radius, n })
		: "";

	return (
		<div ref={ref} className={cn("relative isolate", className)}>
			<div className="relative size-full z-1">
				{children}
			</div>
			<svg
				width={width}
				height={height}
				preserveAspectRatio="none"
				className="absolute top-0 left-0 size-full overflow-visible pointer-events-none"
			>
				<path
					d={path}
					className="fill-card stroke-border stroke-1"
					strokeWidth={0}
				/>
			</svg>
		</div>
	);
}

function getRadiusBasedSquirclePath({ width, height, radius, n = 1 }: SquirclePathProps): string {
	const r = Math.min(1.8 * radius, width / 2, height / 2);  // Clamp radius
	const hs = r * n;

	const w = width;
	const h = height;

	return `
	M ${r},0
	H ${w - r}
	C ${w - r + hs},0 ${w},${r - hs} ${w},${r}
	V ${h - r}
	C ${w},${h - r + hs} ${w - r + hs},${h} ${w - r},${h}
	H ${r}
	C ${r - hs},${h} 0,${h - r + hs} 0,${h - r}
	V ${r}
	C 0,${r - hs} ${r - hs},0 ${r},0
	Z
	`;
}