"use client";
import { useMemo } from "react";
import { usePreviewStore, useSubgroupStore, useSkinToneStore, useTwemojiStore } from "./stores";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import { EmojiSkinTone } from "@/lib/emoji-utils";
import Twemoji from "react-twemoji";

// Toast
import { useToast } from "@/hooks/use-toast";
import { generateToastObject } from "@/lib/toast-utils";

// Components & UI
import { SectionLayout } from "@/components/common/layouts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";



export function EmojiPicker({ emojiData }) {
	const useSubgroup = useSubgroupStore(state => state.useSubgroup);
	const defaultValue = useMemo(() => (
		emojiData.groups.map(group => group.id)
	), [emojiData.groups]);

	return (
		<TooltipProvider>
			<Accordion type="multiple" defaultValue={defaultValue}>
				{emojiData.groups.map(group => (
					<EmojiGroup key={group.id} id={group.id} title={group.title}>
						{useSubgroup ? (
							<Virtuoso
								useWindowScroll
								totalCount={group.subgroups.length}
								itemContent={index => <EmojiSubgroup subgroup={group.subgroups[index]} />}
							/>
						) : (
							<EmojiSupergroup subgroups={group.subgroups} />
						)}
					</EmojiGroup>
				))}
			</Accordion>
		</TooltipProvider>
	);
}

function EmojiGroup({ children, id, title, ...props }) {
	return (
		<AccordionItem value={id} {...props}>
			<AccordionTrigger>{title}</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</AccordionItem>
	);
}

function EmojiSubgroup({ subgroup }) {
	const skinTone = useSkinToneStore(state => state.skinTone);

	const flattenedEmojis = useMemo(() => {
		return flatMapEmojisFromSubgroup(subgroup, skinTone);
	}, [subgroup, skinTone]);

	const title = subgroup.title
		.split(/[-\s]/)
		.map(word => word.trim().charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return (
		<SectionLayout title={title} titleAs="h4">
			<EmojiGrid emojis={flattenedEmojis} />
		</SectionLayout>
	);
}

function EmojiSupergroup({ subgroups }) {
	const skinTone = useSkinToneStore(state => state.skinTone);

	const flattenedEmojis = useMemo(() => {
		return subgroups.flatMap(subgroup => flatMapEmojisFromSubgroup(subgroup, skinTone));
	}, [subgroups, skinTone]);

	return (
		<EmojiGrid emojis={flattenedEmojis} />
	);
}

function EmojiGrid({ emojis }) {
	const useSubgroup = useSubgroupStore(state => state.useSubgroup);
	const lineThreshold = useSubgroup ? 5 : 8;

	return emojis.length > 27 * lineThreshold ? (
		<EmojiVirtuosoGrid emojis={emojis} />
	) : (
		<div className="flex flex-wrap gap-1 py-2 overflow-x-hidden isolate">
			{emojis.map((emoji, index) => (
				<EmojiButton key={index} emoji={emoji} />
			))}
		</div>
	);
}

function EmojiVirtuosoGrid({ emojis }) {
	const EMOJI_BUTTON_SIZE = 3;
	const GAP_SIZE = 0.25;
	const height = 4 * (EMOJI_BUTTON_SIZE + GAP_SIZE) + EMOJI_BUTTON_SIZE;

	return (
		<div className="w-full py-2">
			<VirtuosoGrid
				totalCount={emojis.length}
				itemContent={index => <EmojiButton emoji={emojis[index]} />}
				listClassName="flex flex-wrap gap-1 overflow-x-hidden isolate"
				style={{ height: `${height}rem` }}
			/>
		</div>
	);
}

function EmojiButton({ emoji }) {
	const { toast } = useToast();
	const addEmoji = usePreviewStore(state => state.addEmoji);
	const useTwemoji = useTwemojiStore(state => state.useTwemoji);

	async function handleClick(emoji) {
		try {
			requestAnimationFrame(async () => {
				addEmoji(emoji.emoji);
				await navigator.clipboard.writeText(emoji.emoji);
			});
		} catch (error) {
			toast(generateToastObject("error", error.message));
		}
	}

	return (
		<Tooltip delayDuration={500}>
			<TooltipTrigger asChild>
				<Button
					className="transition ease-out-expo duration-500 hover:z-[1] active:scale-[0.8]"
					variant="outline"
					size="emoji"
					onClick={() => handleClick(emoji)}
				>
					{useTwemoji ? (
						<Twemoji options={{ className: "inline size-[1.75rem]" }}>{emoji.emoji}</Twemoji>
					) : (
						<span className="text-[1.75rem] select-none">{emoji.emoji}</span>
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>{emoji.name.charAt(0).toUpperCase() + emoji.name.slice(1)}</TooltipContent>
		</Tooltip>
	)
}

function flatMapEmojisFromSubgroup(subgroup, skinTone) {
	return subgroup.emojis.flatMap(emoji => {
		if (emoji.variants && skinTone !== EmojiSkinTone.Default) {
			const firstLevelVariant = emoji.variants[skinTone];
			if (firstLevelVariant) {
				const secondLevelVariant = firstLevelVariant.variants;
				if (secondLevelVariant) {
					return [
						{ ...firstLevelVariant, name: emoji.name, variants: undefined },
						...Object.values(secondLevelVariant).map(variant => ({
							...variant,
							name: emoji.name
						})),
					];
				}
				return [{ ...firstLevelVariant, name: emoji.name }];
			}
		}
		return [emoji];
	});
}