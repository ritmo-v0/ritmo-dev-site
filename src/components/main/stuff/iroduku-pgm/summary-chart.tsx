"use client";
import { useFormatter } from "next-intl";

// Components & UI
import {
	Bar,
	BarChart,
	CartesianGrid,
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
import type { DataType } from "@/lib/iroduku-pgm/types";
interface SummaryChartProps {
	types: DataType[];
};

// Constants & Variables
import summaryData from "@/lib/iroduku-pgm/summary.json" with { type: "json" };



export function SummaryChart({ types }: SummaryChartProps) {
	const format = useFormatter();

	const showSteps = types.includes("steps");
	const showFloors = types.includes("floors");
	const showCalories = types.includes("calories");
	const showPrimary = showSteps || showCalories;

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
			<BarChart
				data={summaryData}
				margin={{ top: 12, right: 8, bottom: 0, left: 0 }}
				maxBarSize={32}
				barCategoryGap="15%"
				accessibilityLayer
			>
				<CartesianGrid vertical={false} />

				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					interval={0}
					tickMargin={8}
					tickFormatter={(value) => format.dateTime(
						new Date(value),
						"date",
						{ timeZone: "UTC" }
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
						indicator="dot"
						labelFormatter={(value) => format.dateTime(
							new Date(value),
							"2-digit",
							{ timeZone: "UTC" }
						)}
					/>
				} />

				<ChartLegend content={<ChartLegendContent />} />

				<Bar
					dataKey="steps"
					yAxisId="primary"
					fill="var(--color-steps)"
					radius={[Infinity, Infinity, 0, 0]}
					hide={!showSteps}
				/>
				<Bar
					dataKey="calories"
					yAxisId="primary"
					fill="var(--color-calories)"
					radius={[Infinity, Infinity, 0, 0]}
					hide={!showCalories}
				/>
				<Bar
					dataKey="floorsAscended"
					yAxisId="floors"
					fill="var(--color-floorsAscended)"
					radius={[Infinity, Infinity, 0, 0]}
					hide={!showFloors}
				/>
				<Bar
					dataKey="floorsDescended"
					yAxisId="floors"
					fill="var(--color-floorsDescended)"
					radius={[Infinity, Infinity, 0, 0]}
					hide={!showFloors}
				/>
			</BarChart>
		</ChartContainer>
	);
}