"use client";
import { useRef, useState } from "react";
import { ensureError } from "@/lib/fetch/response";

// Components & UI
import { toast } from "sonner";



export function useCopy(duration: number = 3000) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [copied, setCopied] = useState(false);

	async function copy(text: string) {
		try {
			await navigator.clipboard.writeText(text);

			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			setCopied(true);
			timeoutRef.current = setTimeout(() => {
				setCopied(false);
				timeoutRef.current = null;
			}, duration);
		} catch (err) {
			const error = ensureError(err);
			console.error("ERR::COPY:", error);
			toast.error(
				"A small 🤏🌌 issue occurred...",
				{ description: "Failed to copy text to clipboard." }
			);
		}
	}

	return { copied, copy };
}