"use client";
import { Virtuoso } from "react-virtuoso";

// SWR
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

// Components & UI
import { Skeleton } from "@/components/ui/skeleton";



export function TxtReaderDisplaySection() {
	const { data, error, isLoading } = useSWRImmutable(
		"https://utfs.io/a/eyd4snedyf/eSfcZOiD4RG0Y7rgLdWu0toMQZwElSOACezfTXBI8YVGHvsh",
		// eSfcZOiD4RG01ftkmngZBLQz6fGvaV2yAjWPuO3K5k9rI8wT
		(url) => fetcher(url, { contentType: "text/plain", responseType: "text" }),
	);
	const textData = data
		? Object.values(data).join("").slice(0, -3).split("\n")
			.map(line => line.replace(/^\u0020+|\u0020+$/g, ""))
			.filter(Boolean)
		: [];

	return (
		error ? (
			<span>{error.message}</span>
		) : isLoading ? (
			<div className="grid gap-2">
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton key={index} className="w-full h-24" />
				))}
			</div>
		) : textData && (
			<Virtuoso
				useWindowScroll
				totalCount={textData.length}
				overscan={200}
				itemContent={index => (
					<p className="leading-[1.6] [padding-block:_1.5rem]">
						{textData[index]}
					</p>
				)}
			/>
		)
	);
}