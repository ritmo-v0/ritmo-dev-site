import type * as React from "react";
import { cn } from "@/lib/utils";



export function RitmoIcon({
	className,
	...props
}: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			key="Ritmo."
			role="img"
			aria-label="Ritmo."
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="square"
			strokeLinejoin="miter"
			className={cn("size-4", className)}
			{...props}
		>

			<line x1="1" y1="23" x2="1" y2="1" />
			<path d="m1,1h15c3.87,0,7,3.13,7,7c0,3.87-3.13,7-7,7H8c-3.87,0-7-3.13-7-7V1Z" />
			<polygon
				fill="currentColor"
				stroke="none"
				points="0 0 2.75 0 24 24 21.25 24 0 0"
			/>
		</svg>
	);
}