"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Components & UI
import { H2, Muted, Wrapper } from "@/components/common/typography";
import { DataTypeSelect } from "@/components/main/stuff/iroduku-pgm/data-type-select";
import { DatePaginator } from "@/components/main/stuff/iroduku-pgm/date-paginator";
import { DayChart } from "@/components/main/stuff/iroduku-pgm/day-chart";
import { SummaryChart } from "@/components/main/stuff/iroduku-pgm/summary-chart";

// Types & Interfaces
import type { DataType, DateKey } from "@/lib/iroduku-pgm/types";

// Constants & Variables
import { meta } from "@/app/stuff/iroduku-pgm/meta";
import { DATA_TYPES, DATE_KEYS } from "@/lib/iroduku-pgm/constants";
const DEFAULT_TYPES: DataType[] = ["steps", "floors"];
const DEFAULT_DATE: DateKey = "2026-03-17";

function parseDate(v: string | null): DateKey {
	return DATE_KEYS.includes(v as DateKey) ? (v as DateKey) : DEFAULT_DATE;
}

function parseTypes(v: string | null): DataType[] {
	if (!v) return DEFAULT_TYPES;

	const parts = v
		.split(",")
		.filter((p): p is DataType => DATA_TYPES.includes(p as DataType));
	return parts.length > 0 ? parts : DEFAULT_TYPES;
}



export default function IrodukuPilgrimagePage() {
	const router = useRouter();
	const params = useSearchParams();

	const date = parseDate(params.get("date"));
	const types = parseTypes(params.get("types"));

	const push = useCallback(
		(updates: Record<string, string>) => {
			const next = new URLSearchParams(params.toString());
			for (const [k, v] of Object.entries(updates)) next.set(k, v);
			router.push(`?${next.toString()}`, { scroll: false });
		},
		[router, params],
	);

	return (
		<Wrapper>
			<header className="grid gap-2">
				<H2 className="text-balance [&+p]:mt-0!">
					{meta.title}
				</H2>
				<Muted className="text-base">
					Nagasaki really does have a lot of stairs.
				</Muted>
			</header>

			<main className="grid mt-12 gap-12">
				{/* Day Chart */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<DatePaginator
								date={date}
								onChange={(d) => push({ date: d })}
							/>
							<DataTypeSelect
								types={types}
								onChange={(t) => push({ types: t.join(",") })}
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
								onChange={(t) => push({ types: t.join(",") })}
							/>
						</div>
						<Muted className="text-xs">
							Daily Totals
						</Muted>
					</div>
					<SummaryChart types={types} />
				</div>
			</main>
		</Wrapper>
	);
}