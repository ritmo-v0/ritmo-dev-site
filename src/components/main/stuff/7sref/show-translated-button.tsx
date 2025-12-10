"use client";
import { useLocale, useTranslations } from "next-intl";
import { use7sRefStore } from "@/lib/store/7sref";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons & Images
import { TranslateIcon } from "@phosphor-icons/react";



export function ShowTranslatedButton({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	const locale = useLocale();
	const t = useTranslations("stuff.7sref.controls");

	const showTranslated = use7sRefStore(state => state.showTranslated);
	const setShowTranslated = use7sRefStore(state => state.setShowTranslated);

	const label = showTranslated
		? t("aria_label_show_original")
		: t("aria_label_show_translated");

	return (
		<Tooltip>
			<TooltipTrigger render={
				<Button
					variant="nothing"
					size="icon"
					className={cn(
						"relative text-muted-foreground hover:text-foreground",
						"aria-pressed:text-primary",
						className,
					)}
					onClick={() => setShowTranslated(!showTranslated)}
					disabled={locale === "ja"}
					aria-label={label}
					aria-pressed={showTranslated}
					{...props}
				>
					<TranslateIcon weight="bold" />
					<div className={cn(
						"absolute bottom-0.5 left-1/2 -translate-x-1/2",
						"size-1 bg-primary rounded-full",
						{ "hidden": !showTranslated },
					)} />
				</Button>
			} />
			<TooltipContent>
				{label}
			</TooltipContent>
		</Tooltip>
	);
}