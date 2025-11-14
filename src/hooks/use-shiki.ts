"use client";
import { useEffect, useRef, useState } from "react";
import { ensureError } from "@/lib/fetch/response";

// Shiki
import { createHighlighterCore, createOnigurumaEngine } from "react-shiki/core";
import { bundledLanguages } from "shiki/bundle/web";
import OneLight from "@shikijs/themes/one-light"
import OneDarkPro from "@shikijs/themes/one-dark-pro";

// Types & Interfaces
import type { HighlighterCore } from "shiki";

// Constants & Variables
let highlighterPromise: Promise<HighlighterCore> | null = null;



export async function getShikiHighlighter() {
	if (!highlighterPromise) {
		const t0 = performance.now();
		highlighterPromise = createHighlighterCore({
			themes: [
				OneLight,
				OneDarkPro,
			],
			langs: [
				bundledLanguages.html,
				// bundledLanguages.css,
				bundledLanguages.js,
				bundledLanguages.ts,
				// bundledLanguages.jsx,
				bundledLanguages.tsx,
				bundledLanguages.json,
				bundledLanguages.jsonc,
			],
			engine: createOnigurumaEngine(import("shiki/wasm")),
		}).then(highlighter => {
			const t1 = performance.now();
			console.info(`Shiki highlighter created in ${(t1 - t0).toFixed(2)} ms`);
			return highlighter;
		});
	}

	return highlighterPromise;
}

export function useShiki() {
	const highlighterRef = useRef<HighlighterCore | null>(null);
	const [isHighlighterReady, setIsHighlighterReady] = useState(false)

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