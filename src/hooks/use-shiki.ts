"use client";
import { useEffect, useRef, useState } from "react";
import { ensureError } from "@/lib/fetch/response";

// Shiki
import { createHighlighterCore } from "@shikijs/core";
import { createJavaScriptRawEngine } from "@shikijs/engine-javascript";
import OneLight from "@shikijs/themes/one-light"
import OneDarkPro from "@shikijs/themes/one-dark-pro";

// Types & Interfaces
import type { HighlighterCore } from "@shikijs/core";

// Constants & Variables
let highlighterPromise: Promise<HighlighterCore> | null = null;



export async function getShikiHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighterCore({
			engine: createJavaScriptRawEngine(),
			themes: [OneLight, OneDarkPro],
			langs: [
				import("@shikijs/langs-precompiled/html"),
				() => import("@shikijs/langs-precompiled/css"),
				() => import("@shikijs/langs-precompiled/js"),
				() => import("@shikijs/langs-precompiled/jsx"),
				import("@shikijs/langs-precompiled/ts"),
				import("@shikijs/langs-precompiled/tsx"),
				() => import("@shikijs/langs-precompiled/json"),
				() => import("@shikijs/langs-precompiled/jsonc"),
			],
		});
	}

	return highlighterPromise;
}

export function useShiki() {
	const highlighterRef = useRef<HighlighterCore | null>(null);
	const [isHighlighterReady, setIsHighlighterReady] = useState(false);

	useEffect(() => {
		getShikiHighlighter()
			.then(highlighter => {
				highlighterRef.current = highlighter;
				setIsHighlighterReady(true);
			})
			.catch(err => {
				const error = ensureError(err);
				console.error("ERR::SHIKI::INIT:", error.message);
			});

		return () => setIsHighlighterReady(false);
	}, []);

	return {
		highlighter: highlighterRef.current,
		isHighlighterReady: isHighlighterReady || highlighterRef.current !== null,
	};
}