"use client";
import { useTranslations } from "next-intl";
import { useQueryStates, parseAsStringEnum, parseAsArrayOf } from "nuqs";

// Components & UI
import { Suspense } from "react";
import { H2, Muted, Wrapper } from "@/components/common/typography";
import { DataTypeSelect } from "@/components/main/stuff/iroduku-pgm/data-type-select";
import { DatePaginator } from "@/components/main/stuff/iroduku-pgm/date-paginator";
import { DayChart } from "@/components/main/stuff/iroduku-pgm/day-chart";
import { SummaryChart } from "@/components/main/stuff/iroduku-pgm/summary-chart";

// Types & Interfaces
import type { DataType, DateKey } from "@/lib/iroduku-pgm/types";

// Constants & Variables
import { DATA_TYPES, DATE_KEYS } from "@/lib/iroduku-pgm/constants";
const DEFAULT_TYPES: DataType[] = ["steps", "floors"];
const DEFAULT_DATE: DateKey = "2026-03-17";



export default function IrodukuPilgrimagePage() {
	const t = useTranslations("stuff.iroduku-pgm.activity");

	return (
		<Wrapper>
			<header className="grid gap-2">
				<H2 className="text-balance [&+p]:mt-0!">
					{t("title")}
				</H2>
				<Muted className="text-base">
					{t("description")}
				</Muted>
			</header>

			<main className="grid mt-12 gap-12">
				<Suspense>
					<IrodukuPilgrimageCharts />
				</Suspense>
			</main>
		</Wrapper>
	);
}

function IrodukuPilgrimageCharts() {
	const [{ date, types }, setParams] = useQueryStates(
		{
			date: parseAsStringEnum<DateKey>([...DATE_KEYS]).withDefault(DEFAULT_DATE),
			types: parseAsArrayOf(
				parseAsStringEnum<DataType>([...DATA_TYPES])
			).withDefault(DEFAULT_TYPES),
		},
		{
			history: "push",
			scroll: false,
			urlKeys: {
				date: "d",
				types: "t",
			},
		},
	);

	return (
		<>
			{/* Day Chart */}
			<div className="flex flex-col gap-6">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						<DatePaginator
							date={date}
							onChange={(d) => setParams({ date: d })}
						/>
						<DataTypeSelect
							types={types}
							onChange={(t) => setParams({ types: t })}
						/>
					</div>
					<Muted className="text-xs">
						Cumulative．JST
					</Muted>
				</div>
				<DayChart date={date} types={types} />
			</div>

			{/* Summary Chart */}
			<div className="flex flex-col gap-6">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						<DataTypeSelect
							types={types}
							onChange={(t) => setParams({ types: t })}
						/>
					</div>
					<Muted className="text-xs">
						Daily Totals
					</Muted>
				</div>
				<SummaryChart types={types} />
			</div>
		</>
	);
}