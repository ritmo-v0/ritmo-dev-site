"use client";

// SWR
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

// Components & UI
import { EmojiPickerToolbar } from "./emoji-picker-toolbar";
import { EmojiPicker } from "./emoji-picker";
import { SectionLayout } from "@/components/common/layouts";
import { Skeleton } from "@/components/ui/skeleton";



export function EmomomoUtilSection({ ...props }) {
	return (
		<SectionLayout titleAs="h3" {...props}>
			<EmojiPickerToolbar />
		</SectionLayout>
	);
}

export function EmomomoPickerSection({ ...props }) {
	const { data, error, isLoading } = useSWRImmutable("/api/emojis", fetcher);
	const emojiData = data?.data || {};

	return (
		<SectionLayout titleAs="h3" {...props}>
			{error ? (
				<span>{error.message}</span>
			) : isLoading ? (
				<div className="grid gap-2">
					{Array.from({ length: 3 }).map((_, index) => (
						<Skeleton key={index} className="w-full h-24" />
					))}
				</div>
			) : (
				<EmojiPicker emojiData={emojiData} />
			)}
		</SectionLayout>
	);
}