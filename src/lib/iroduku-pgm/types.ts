import type { DATA_TYPES, DATE_KEYS } from "./constants";

export type DataType = typeof DATA_TYPES[number];
export type DateKey = typeof DATE_KEYS[number];

export type DailySummary = {
	date: string;             // "YYYY-MM-DD"
	steps: number;
	floorsAscended: number;
	floorsDescended: number;  // Z-
	calories: number;
	activeCalories: number;
	restingCalories: number;
};

export type IntervalPoint = {
	startTime: string;        // ISO string in UTC
	endTime: string;
	steps: number;
	floorsAscended: number;
	floorsDescended: number;  // Z-
	activityLevel:
	| "highlyActive"
	| "active"
	| "generic"
	| "sedentary"
	| "sleeping"
	| null;
};