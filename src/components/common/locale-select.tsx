"use client";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Components & UI
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Types & Interfaces
import type { Locale } from "next-intl";

// Constants & Variables
import { LOCALES } from "@/lib/i18n/constants";



export function LocaleSelect({ className }: { className?: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();

	const locale = useLocale();
	const t = useTranslations("common.locale");
	const [isPending, startTransition] = useTransition();

	function handleLocaleChange(locale: Locale | null) {
		if (!locale) return;

		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale },
			);
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
				className={cn(className)}
				aria-label={t("label")}
			>
				<SelectValue>
					{t.has(`${locale}.label`)
						? t(`${locale}.label`)
						: locale.toUpperCase()}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{LOCALES.map(locale => (
						<SelectItem key={locale} value={locale}>
							{t.has(`${locale}.label`)
								? t(`${locale}.label`)
								: locale.toUpperCase()}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}