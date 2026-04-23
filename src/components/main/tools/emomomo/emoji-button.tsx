"use client";
import { memo, useCallback } from "react";
import { useEmomomoStore } from "@/lib/store/emomomo";
import { useCopy } from "@/hooks/use-copy";
import { getEmojiCodePoints } from "@/lib/emomomo/utils";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { Twemoji } from "@/components/common/twemoji";
import {
	TooltipContent,
	TooltipMultiple,
	TooltipTrigger,
} from "@/components/ui/tooltip";

// Types & Interfaces
import type { EmojiEntry } from "@/lib/emomomo/types";



export const EmojiButton = memo(function EmojiButton({ emojiEntry }: { emojiEntry: EmojiEntry }) {
	const { copy } = useCopy(0);

	const { e: emoji } = emojiEntry;

	const handleClick = useCallback(() => {
		const { useCOC, addEmoji } = useEmomomoStore.getState();

		addEmoji(emoji);
		if (useCOC) copy(emoji);
	}, [emoji, copy]);

	return (
		<TooltipMultiple>
			<TooltipTrigger render={
				<Button
					variant="outline"
					size="icon-lg"
					className={cn(
						"gap-0 size-12 xs:size-14 rounded-2xl overflow-clip",
						"active:scale-[0.8] ease-out-expo duration-500",
						"not-focus-visible:focus:border-primary not-focus-visible:focus:border-3",
					)}
					onClick={handleClick}
				/>
			}>
				<Twemoji className="size-6 xs:size-7">
					{emoji}
				</Twemoji>
			</TooltipTrigger>
			<TooltipContent className="p-3 rounded-2xl">
				<EmojiTooltipContent emojiEntry={emojiEntry} />
			</TooltipContent>
		</TooltipMultiple>
	);
});

function EmojiTooltipContent({ emojiEntry }: { emojiEntry: EmojiEntry }) {
	const { e: emoji, n: name } = emojiEntry;
	const codePoints = getEmojiCodePoints(emoji);
	const capitalizedName = name.replace(/\b\w/g, char => char.toUpperCase());

	return (
		<div className="flex gap-4">
			<div className="flex items-center justify-center gap-1 size-12 overflow-hidden">
				<Twemoji className="m-0 size-12">
					{emoji}
				</Twemoji>
			</div>
			<div className="grid gap-1">
				<p className="font-medium text-lg">{capitalizedName}</p>
				<div className="grid grid-cols-[auto_1fr] items-center gap-x-[3ch] font-mono">
					<div className="col-span-2 grid grid-cols-subgrid">
						<span className="text-background/60">Unicode</span>
						<span>{emoji}</span>
					</div>
					<div className="col-span-2 grid grid-cols-subgrid">
						<span className="text-background/60">HEX</span>
						<span className="max-w-40 font-extralight">
							{codePoints}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}