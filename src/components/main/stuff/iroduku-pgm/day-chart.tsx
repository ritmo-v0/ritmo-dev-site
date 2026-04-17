"use client";
import { useFormatter } from "next-intl";

// Components & UI
import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceLine,
	XAxis,
	YAxis,
} from "recharts";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Types & Interfaces
import type { DataType, DateKey } from "@/lib/iroduku-pgm/types";
interface DayChartProps {
	date: DateKey;
	types: DataType[];
};

// Constants & Variables
import summaryData from "@/lib/iroduku-pgm/summary.json";
import i0317 from "@/lib/iroduku-pgm/intervals/2026-03-17.json" with { type: "json" };
import i0318 from "@/lib/iroduku-pgm/intervals/2026-03-18.json" with { type: "json" };
import i0319 from "@/lib/iroduku-pgm/intervals/2026-03-19.json" with { type: "json" };
import i0320 from "@/lib/iroduku-pgm/intervals/2026-03-20.json" with { type: "json" };
import i0321 from "@/lib/iroduku-pgm/intervals/2026-03-21.json" with { type: "json" };
import i0322 from "@/lib/iroduku-pgm/intervals/2026-03-22.json" with { type: "json" };
import i0323 from "@/lib/iroduku-pgm/intervals/2026-03-23.json" with { type: "json" };
import i0324 from "@/lib/iroduku-pgm/intervals/2026-03-24.json" with { type: "json" };
import i0325 from "@/lib/iroduku-pgm/intervals/2026-03-25.json" with { type: "json" };
import i0326 from "@/lib/iroduku-pgm/intervals/2026-03-26.json" with { type: "json" };

const INTERVALS: Record<DateKey, typeof i0317> = {
	"2026-03-17": i0317, "2026-03-18": i0318, "2026-03-19": i0319, "2026-03-20": i0320,
	"2026-03-21": i0321, "2026-03-22": i0322, "2026-03-23": i0323, "2026-03-24": i0324,
	"2026-03-25": i0325, "2026-03-26": i0326,
};



export function DayChart({ date, types }: DayChartProps) {
	const format = useFormatter();

	const showSteps = types.includes("steps");
	const showFloors = types.includes("floors");
	const showCalories = types.includes("calories");
	const showPrimary = showSteps || showCalories;

	const dailyCalories = summaryData.find(d => d.date === date)?.calories ?? 0;

	// Cumulative sums across data points
	let cumSteps = 0, cumAscended = 0, cumDescended = 0;
	const chartData: object[] = INTERVALS[date].map(pt => {
		cumSteps += pt.steps;
		cumAscended += pt.floorsAscended;
		cumDescended += pt.floorsDescended;

		return {
			startTime: pt.startTime,
			steps: cumSteps,
			floorsAscended: cumAscended,
			floorsDescended: cumDescended,
			calories: dailyCalories,
		};
	});

	return (
		<ChartContainer config={{
			steps: {
				label: "Steps",
				color: "var(--chart-1)",
			},
			calories: {
				label: "Calories",
				color: "var(--chart-2)",
			},
			floorsAscended: {
				label: "Floors ↑",
				color: "var(--chart-3)",
			},
			floorsDescended: {
				label: "Floors ↓",
				color: "var(--chart-4)",
			},
		}}>
			<LineChart
				data={chartData}
				margin={{ top: 12, right: 8, bottom: 0, left: 0 }}
				accessibilityLayer
			>
				<CartesianGrid vertical={false} />

				<XAxis
					dataKey="startTime"
					tickLine={false}
					axisLine={false}
					interval={7}
					tickMargin={8}
					tickFormatter={(value) => format.dateTime(
						new Date(value),
						"time",
						{ timeZone: "Asia/Tokyo" }
					)}
				/>

				<YAxis
					yAxisId="primary"
					orientation="left"
					tickLine={false}
					axisLine={false}
					tickMargin={4}
					width={40}
					tickFormatter={(value) => format.number(value, "compact")}
					hide={!showPrimary}
				/>
				<YAxis
					yAxisId="floors"
					orientation={showPrimary ? "right" : "left"}
					tickLine={false}
					axisLine={false}
					tickMargin={4}
					width={28}
					hide={!showFloors}
				/>
				{showFloors && (
					<ReferenceLine
						y={0}
						yAxisId="floors"
						stroke="var(--border)"
					/>
				)}

				<ChartTooltip content={
					<ChartTooltipContent
						indicator="line"
						labelFormatter={(value) => format.dateTime(
							new Date(value),
							"time",
							{ timeZone: "Asia/Tokyo" }
						)}
					/>
				} />

				<ChartLegend content={<ChartLegendContent />} />

				<Line
					dataKey="calories"
					yAxisId="primary"
					stroke="var(--color-calories)"
					strokeWidth={2}
					strokeDasharray="6 3"
					dot={false}
					activeDot={{ r: 4 }}
					hide={!showCalories}
				/>
				<Line
					dataKey="steps"
					yAxisId="primary"
					stroke="var(--color-steps)"
					strokeWidth={2}
					dot={false}
					activeDot={{ r: 4 }}
					hide={!showSteps}
				/>
				<Line
					dataKey="floorsAscended"
					yAxisId="floors"
					type="stepAfter"
					stroke="var(--color-floorsAscended)"
					strokeWidth={2}
					dot={false}
					activeDot={{ r: 4 }}
					hide={!showFloors}
				/>
				<Line
					dataKey="floorsDescended"
					yAxisId="floors"
					type="stepAfter"
					stroke="var(--color-floorsDescended)"
					strokeWidth={2}
					dot={false}
					activeDot={{ r: 4 }}
					hide={!showFloors}
				/>
			</LineChart>
		</ChartContainer>
	);
}