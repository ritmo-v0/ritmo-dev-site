"use client";
import { use7sRefStore } from "@/lib/store/7sref";
import { cn } from "@/lib/utils";

// Components & UI
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// 7sRef
import { type Locale, LOCALES } from "@/types/7sref";



export function LocaleSelect({ className }: React.ComponentProps<typeof SelectTrigger>) {
	const { locale, setLocale } = use7sRefStore();

	return (
		<Select
			value={locale}
			onValueChange={(value) => setLocale(value as Locale)}
		>
			<SelectTrigger className={cn("w-24", className)}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{LOCALES.map(locale => (
					<SelectItem key={locale} value={locale}>
						{locale.toUpperCase()}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}