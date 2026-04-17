"use client";

// Components & UI
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";

// Icons & Images
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

// Types & Interfaces
import type { DateKey } from "@/lib/iroduku-pgm/types";
interface DatePaginatorProps {
	date: DateKey;
	onChange: (date: DateKey) => void;
};

// Constants & Variables
import { DATE_KEYS } from "@/lib/iroduku-pgm/constants";



export function DatePaginator({ date, onChange }: DatePaginatorProps) {
	const index = DATE_KEYS.indexOf(date);
	const isFirst = index === 0;
	const isLast = index === DATE_KEYS.length - 1;

	return (
		<ButtonGroup>
			<Button
				variant="outline"
				size="icon-sm"
				className="border-r-0 origin-right"
				onClick={() => !isFirst && onChange(DATE_KEYS[index - 1])}
				disabled={isFirst}
				aria-label="Previous day"
			>
				<CaretLeftIcon />
			</Button>
			<ButtonGroupText className="border-l! tabular-nums">
				{new Date(date).toLocaleDateString("en-US", {
					month: "short",
					day: "2-digit",
				})}
			</ButtonGroupText>
			<Button
				variant="outline"
				size="icon-sm"
				className="border-l-0 origin-left"
				onClick={() => !isLast && onChange(DATE_KEYS[index + 1])}
				disabled={isLast}
				aria-label="Next day"
			>
				<CaretRightIcon />
			</Button>
		</ButtonGroup>
	);
}