"use client";
import { useTheme } from "next-themes";

// Sonner
import { type ToasterProps, Toaster as Sonner } from "sonner";

// Icons & Images
import {
	CheckCircleIcon,
	CircleNotchIcon,
	InfoIcon,
	WarningIcon,
	XCircleIcon,
} from "@phosphor-icons/react";



export function Toaster(props: ToasterProps) {
	const { resolvedTheme } = useTheme();

	return (
		<Sonner
			offset={32}
			theme={resolvedTheme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: "bg-background! font-heading! text-sm! text-foreground! border-border! rounded-2xl! shadow-2xl!",
					description: "font-sans! text-muted-foreground!",
					actionButton: "bg-primary! text-primary-foreground!",
					cancelButton: "bg-muted! text-muted-foreground!",
					closeButton: "bg-background! text-foreground! border-border!",
				},
			}}
			icons={{
				info: <InfoIcon className="size-4" />,
				success: <CheckCircleIcon className="size-4 text-green-500" />,
				warning: <WarningIcon className="size-4 text-amber-500" />,
				error: <XCircleIcon className="size-4 text-destructive" />,
				loading: <CircleNotchIcon className="size-4 animate-spin" />,
			}}
			closeButton={true}
			{...props}
		/>
	);
};