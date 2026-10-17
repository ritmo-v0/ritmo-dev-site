export type BpmReading =
	| { status: "empty" }
	| { status: "insufficient" }
	| { status: "ready"; bpm: number; whole: number };