"use client";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";

// Components & UI
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Types & Interfaces
import type { Locale } from "next-intl";

// Constants & Variables
import { LOCALES } from "@/lib/i18n/config";



export function LocaleSelect({
	className
}: React.ComponentProps<typeof SelectTrigger>) {
	const t = useTranslations("common.locales");
	const locale = useLocale();
	const [isPending, startTransition] = useTransition();

	function handleLocaleChange(value: Locale | null) {
		startTransition(() => {
			setUserLocale(value);
		});
	}

	return (
		<Select<Locale>
			value={locale}
			onValueChange={handleLocaleChange}
			disabled={isPending}
		>
			<SelectTrigger
				size="sm"
				className={cn("w-26", className)}
				aria-label={t("label")}
			>
				<SelectValue>
					{t(locale) || locale.toUpperCase()}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{LOCALES.map(locale => (
					<SelectItem key={locale} value={locale}>
						{t(locale) || locale.toUpperCase()}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}