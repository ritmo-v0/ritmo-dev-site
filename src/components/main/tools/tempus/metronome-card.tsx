"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Components & UI
import NumberFlow from "@number-flow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

// Icons & Images
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";



export function MetronomeCard({ className }: React.ComponentProps<typeof Card>) {
	const [value, setValue] = useState(100);
	const [step, setStep] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const [wasPlaying, setWasPlaying] = useState(false);

	const audioContext = useRef<AudioContext | null>(null);
	const sfx = useRef<AudioBuffer | null>(null);
	const intervalRef = useRef(0);

	useEffect(() => {
		audioContext.current = new (window.AudioContext);
		fetch("https://aaw2tslxqb.ufs.sh/f/vQ66ADGRMiselntgRFEbZhtipnrSKAc8zy0eWVDCEoU4sa3m")
			.then((response) => response.arrayBuffer())
			.then((arrayBuffer) => {
				audioContext.current?.decodeAudioData(arrayBuffer, (buffer) => {
					sfx.current = buffer;
				})
			});
	}, []);

	useEffect(() => {
		stop();
		if (isPlaying) start();
		return stop;
		// TODO
	}, [isPlaying, value]);

	// Metronome
	function handleClick() {
		const state = !isPlaying;
		setIsPlaying(state);
		setWasPlaying(state);
	}

	function start() {
		const interval = (60 / value) * 1000;
		playSFX();
		intervalRef.current = window.setInterval(() => {
			playSFX();
		}, interval);
	}

	function stop() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = 0;
		}
	}

	function playSFX() {
		const audioCtx = audioContext.current;
		const buffer = sfx.current;
		if (!audioCtx || !buffer) return;

		const bufferSource = audioCtx.createBufferSource();
		bufferSource.buffer = buffer;
		bufferSource.connect(audioCtx.destination);
		bufferSource.start(0);
	}

	function handleValueChange(value: number) {
		setIsPlaying(false);
		setValue(value);
	}

	// Drag and Drop
	function onDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	}

	function onDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const bpm = e.dataTransfer.getData("text/plain");
		if (bpm) {
			const bpmValue = parseFloat(bpm);
			if (!Number.isNaN(bpmValue)) setValue(bpmValue);
		}
	}

	return (
		<Card
			className={cn("gap-0", className)}
			onDragOver={onDragOver}
			onDrop={onDrop}
		>
			<CardHeader>
				<CardTitle>Metronome</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid auto-rows-min justify-items-center gap-2">
					<NumberFlow
						className="font-bold text-5xl pointer-events-none"
						value={value}
						locales="en-US"
						format={{ useGrouping: false }}
						aria-hidden="true"
						animated
						willChange
					/>
					<Slider
						value={[value]}
						min={40}
						max={400}
						step={step}
						onKeyDown={(e) => {
							if (e.key === "Shift" && !e.repeat) setStep(0.01);
						}}
						onKeyUp={(e) => {
							if (e.key === "Shift") setStep(1);
						}}
						onValueChange={(value) => handleValueChange(value[0])}
						onPointerUp={() => { if (wasPlaying) setIsPlaying(true) }}
					/>
				</div>
				<div className="w-max mx-auto mt-4">
					<Button variant="ghost" size="icon" onClick={handleClick} >
						{isPlaying ? <Pause /> : <Play />}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}