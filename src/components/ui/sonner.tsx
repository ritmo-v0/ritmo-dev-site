"use client";
import { useTheme } from "next-themes";

// Components & UI
import { type ToasterProps, Toaster as Sonner } from "sonner";

// Icons & Images
import {
	CheckCircleIcon,
	InfoIcon,
	SpinnerIcon,
	WarningIcon,
	XCircleIcon,
} from "@phosphor-icons/react";



export function Toaster(props: ToasterProps) {
	const { resolvedTheme } = useTheme();

	return (
		<Sonner
			theme={resolvedTheme as ToasterProps["theme"]}
			className="toaster group"
			style={{
				"--normal-bg": "var(--popover)",
				"--normal-text": "var(--popover-foreground)",
				"--normal-border": "var(--border)",
			} as React.CSSProperties}
			toastOptions={{
				classNames: {
					toast: "font-sans text-sm! rounded-3xl! shadow-lg!",
					content: "flex-1",
					title: "font-heading tracking-tight",
					description: "text-muted-foreground! text-balance",
					closeButton: "border-(--normal-border)!",
				},
			}}
			icons={{
				info: <InfoIcon className="size-4" />,
				success: <CheckCircleIcon className="size-4 text-green-500" />,
				warning: <WarningIcon className="size-4 text-amber-500" />,
				error: <XCircleIcon className="size-4 text-destructive" />,
				loading: <SpinnerIcon className="size-4 animate-spin" />,
			}}
			closeButton={true}
			offset={32}
			{...props}
		/>
	);
};