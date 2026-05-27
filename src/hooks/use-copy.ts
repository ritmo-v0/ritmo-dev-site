"use client";
import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ensureError } from "@/lib/fetch/response";

// Components & UI
import { toast } from "sonner";



export function useCopy(duration: number = 3000) {
	const t = useTranslations("toast.error");
	const [copied, setCopied] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const copy = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);

			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				setCopied(false);
				timeoutRef.current = null;
			}, duration);
		} catch (err) {
			const error = ensureError(err);
			console.error("ERR::COPY:", error);

			toast.error(t("copy"));
		}
	}, [duration, t]);

	return { copied, copy };
}