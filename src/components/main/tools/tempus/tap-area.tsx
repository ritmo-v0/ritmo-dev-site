"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useTempusStore } from "@/lib/tempus/store";
import { cn } from "cn";

// Components & UI
import { ResetTapsButton } from "./reset-taps-button";
import { Badge } from "@/components/ui/badge";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
} from "@/components/ui/empty";

// Icons & Images
import {
	IconClickFilled,
	IconCornerDownLeft,
	IconSpace,
} from "@tabler/icons-react";

// Constants & Variables
const SHORTCUT_KEYS = [
	{
		key: "click",
		icon: IconClickFilled,
		keyboardOnly: false,
	},
	{
		key: "space",
		icon: IconSpace,
		keyboardOnly: true,
	},
	{
		key: "enter",
		icon: IconCornerDownLeft,
		keyboardOnly: true,
	},
] as const;



export function TapArea({ className, ...props }: React.ComponentProps<typeof Empty>) {
	const tapRef = useRef<HTMLDivElement>(null);
	const t = useTranslations("tools.tempus.tap_area");

	const addTap = useTempusStore(state => state.addTap);
	const reset = useTempusStore(state => state.reset);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.isComposing) return;

			// Escape first
			if (e.key === "Escape" && !e.repeat) return reset();

			// Skip modifier keys
			if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

			// Focus guard
			const active = document.activeElement;
			if (active && active !== document.body && active !== tapRef.current) return;

			// Prevent scrolling
			if (e.key === " ") e.preventDefault();

			// Repeat guard
			if (e.repeat) return;
			if (e.key === " " || e.key === "Enter") return addTap();
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [addTap, reset]);

	return (
		<Empty
			className={cn(
				"relative max-h-100 bg-muted/50 rounded-4xl transition-colors aspect-2/1 select-none",
				"border-2 outline-transparent outline-offset-2 has-[[data-tap]:hover]:bg-muted",
				"has-[[data-tap]:focus-visible]:outline-2 has-[[data-tap]:focus-visible]:outline-primary",
				className,
			)}
			{...props}
		>
			{/* biome-ignore lint/a11y/useSemanticElements: handleKeyDown */}
			<div
				ref={tapRef}
				role="button"
				data-tap
				className="absolute inset-0 cursor-pointer rounded-[inherit] outline-none"
				onPointerDown={addTap}
				aria-label={t("aria_label_tap")}
				aria-keyshortcuts="Space Enter"
				tabIndex={0}
			/>
			<EmptyHeader>
				<EmptyDescription className="text-pretty">
					<span className="flex flex-wrap items-center justify-center gap-1.5">
						{SHORTCUT_KEYS.map(({ key, icon: Icon, keyboardOnly }) => (
							<Badge
								key={key}
								variant="outline"
								className={cn(keyboardOnly && "pointer-coarse:hidden")}
							>
								<Icon data-icon="inline-start" aria-hidden />
								<span>{t(`keys.${key}`)}</span>
							</Badge>
						))}
						<span>{t("to_start")}</span>
					</span>
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="z-1">
				<ResetTapsButton tapRef={tapRef} />
			</EmptyContent>
		</Empty>
	);
}