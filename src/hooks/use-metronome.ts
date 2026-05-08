"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Types & Interfaces
interface UseMetronomeOptions {
	bpm: number;
	timeSignature?: TimeSignature;
};
type BeatType = "downbeat" | "upbeat";
type TimeSignature = { numerator: number, denominator: number };

// Constants & Variables
const DOWNBEAT_URL = "https://img.ritmo.dev/tools/tempus/downbeat.mp3";
const UPBEAT_URL = "https://img.ritmo.dev/tools/tempus/upbeat.mp3";
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;



export function useMetronome({
	bpm,
	timeSignature = { numerator: 4, denominator: 4 },
}: UseMetronomeOptions) {
	const [isPlaying, setIsPlaying] = useState(false);

	// Audio
	const ctxRef = useRef<AudioContext | null>(null);
	const buffers = useRef<Partial<Record<BeatType, AudioBuffer>>>({});
	const pendingNodes = useRef<AudioBufferSourceNode[]>([]);

	// Scheduler
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const nextNoteTimeRef = useRef(0);

	// Metronome
	const bpmRef = useRef(bpm);
	const beatRef = useRef(0);
	const timeSignatureRef = useRef(timeSignature);

	bpmRef.current = bpm;
	timeSignatureRef.current = timeSignature;

	// Initialization
	useEffect(() => {
		const ctx = new AudioContext();
		ctxRef.current = ctx;

		Promise.all([
			fetchAudioBuffer(ctx, DOWNBEAT_URL),
			fetchAudioBuffer(ctx, UPBEAT_URL),
		]).then(([downbeatBuf, upbeatBuf]) => {
			buffers.current.downbeat = downbeatBuf;
			buffers.current.upbeat = upbeatBuf;
		});

		return () => { ctx.close() };
	}, []);

	// Scheduler with lookahead
	const scheduleNote = useCallback((beatIndex: number, time: number) => {
		const ctx = ctxRef.current;
		const type: BeatType = beatIndex === 0 ? "downbeat" : "upbeat";
		const buf = buffers.current[type];
		if (!ctx || !buf) return;

		const node = playAudioBuffer(ctx, buf, time);
		node.onended = () => {
			const i = pendingNodes.current.indexOf(node);
			if (i !== -1) pendingNodes.current.splice(i, 1);
		};

		pendingNodes.current.push(node);
	}, []);

	const scheduler = useCallback(() => {
		const ctx = ctxRef.current;
		if (!ctx) return;

		while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_S) {
			scheduleNote(beatRef.current, nextNoteTimeRef.current);

			beatRef.current = (beatRef.current + 1) % timeSignatureRef.current.numerator;
			nextNoteTimeRef.current += (60 / bpmRef.current) * (4 / timeSignatureRef.current.denominator);
		}

		timerRef.current = setTimeout(scheduler, LOOKAHEAD_MS);
	}, [scheduleNote]);

	// Playback
	const stop = useCallback(() => {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		for (const node of pendingNodes.current) {
			try { node.stop(); } catch { }
		}

		beatRef.current = 0;
		pendingNodes.current = [];
	}, []);

	const start = useCallback(() => {
		stop();
		const ctx = ctxRef.current;
		if (!ctx) return;
		if (ctx.state === "suspended") ctx.resume();

		beatRef.current = 0;
		nextNoteTimeRef.current = ctx.currentTime;
		scheduler();
	}, [stop, scheduler]);

	useEffect(() => {
		if (isPlaying) {
			start();
			return stop;
		} else stop();
	}, [isPlaying, start, stop]);

	// Return
	const toggle = useCallback(() => setIsPlaying(p => !p), []);

	const sliderPointerHandlers = {
		onPointerDown: stop,
		onPointerUp: isPlaying ? start : undefined,
	};

	return { isPlaying, toggle, sliderPointerHandlers };
}

// Utility Functions
async function fetchAudioBuffer(
	ctx: AudioContext,
	url: string
): Promise<AudioBuffer> {
	const res = await fetch(url);
	const arrayBuffer = await res.arrayBuffer();

	return ctx.decodeAudioData(arrayBuffer);
}

function playAudioBuffer(
	ctx: AudioContext,
	buffer: AudioBuffer,
	when: number
): AudioBufferSourceNode {
	const src = ctx.createBufferSource();
	src.buffer = buffer;
	src.connect(ctx.destination);
	src.start(when);

	return src;
}