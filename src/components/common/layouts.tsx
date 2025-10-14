"use client";

// Types & Interfaces
import type { AsChild } from "./types";

// Imports
import { cn } from "@/lib/utils"

// Components & UI
import { Slot as SlotPrimitive } from "radix-ui";



export function WrapperLayout({
	className,
	width = 1440,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & AsChild & { width?: number }) {
	const Comp = asChild ? SlotPrimitive.Slot : "div";

	return (
		<Comp
			style={{ maxInlineSize: `${width}px` }}
			className={cn("@container w-full mx-auto px-4 md:px-8", className)}
			{...props}
		/>
	);
}