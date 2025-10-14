"use client";
import { memo, useMemo } from "react";
import { useEmomomoStore } from "@/lib/store/emomomo";
import {
	getEmojiCodePoints,
	getEmojiGroupId,
	getEmojiSubgroupTitle,
	getSkinToneKey,
} from "@/lib/emomomo/utils";

// Components & UI
import { toast } from "sonner";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Twemoji } from "@/components/common/twemoji";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { H4, Muted, Section } from "@/components/common/typography";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";

// Constants & Variables
import {
	DEFAULT_SKIN_TONE,
	PEOPLE_AND_BODY,
} from "@/lib/emomomo/constants";



export function EmojiPicker({ emojiData }) {
	const defaultValue = emojiData.groups.map(group => getEmojiGroupId(group.title));

	return (
		<Accordion type="multiple" defaultValue={defaultValue}>
			{emojiData.groups.map(group => (
				<EmojiGroup
					id={getEmojiGroupId(group.title)}
					key={group.title}
					title={group.title}
				>
					<EmojiGroupContent
						subgroups={group.subgroups}
						supportsSkinTone={group.title === PEOPLE_AND_BODY}
					/>
				</EmojiGroup>
			))}
		</Accordion>
	);
}

function EmojiGroup({ children, id, title, ...props }) {
	return (
		<AccordionItem id={id} value={id} className="scroll-mt-32" {...props}>
			<AccordionTrigger className="font-semibold text-xl">{title}</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</AccordionItem>
	);
}

function EmojiGroupContent({ subgroups, supportsSkinTone }) {
	const useSubgroup = useEmomomoStore(state => state.useSubgroup);
	const skinTone = useEmomomoStore(
		supportsSkinTone ? state => state.skinTone : () => undefined
	);

	return useSubgroup ? (
		<Virtuoso
			useWindowScroll
			totalCount={subgroups.length}
			itemContent={index => <EmojiSubgroup subgroup={subgroups[index]} skinTone={skinTone} />}
		/>
	) : <EmojiSupergroup subgroups={subgroups} skinTone={skinTone} />;
}

const EmojiSubgroup = memo(function EmojiSubgroup({ subgroup, skinTone }) {
	const title = getEmojiSubgroupTitle(subgroup.title);
	const emojis = useMemo(() => {
		return !skinTone
			? subgroup.emojis
			: flatMapEmojis(subgroup, skinTone);
	}, [subgroup, skinTone]);

	return (
		<Section>
			<H4>{title}</H4>
			<EmojiGrid emojis={emojis} />
		</Section>
	);
});

const EmojiSupergroup = memo(function EmojiSupergroup({ subgroups, skinTone }) {
	const supergroup = useMemo(() => {
		return subgroups.flatMap(subgroup => subgroup.emojis);
	}, [subgroups]);

	const emojis = useMemo(() => {
		return !skinTone
			? supergroup
			: flatMapEmojis({ emojis: supergroup }, skinTone);
	}, [supergroup, skinTone]);

	return <EmojiGrid emojis={emojis} />;
});

function EmojiGrid({ emojis }) {
	const EMOJIS_PER_LINE = 27;
	const LINE_THRESHOLD = 8;  // 5

	return emojis.length > EMOJIS_PER_LINE * LINE_THRESHOLD ? (
		<EmojiVirtuosoGrid emojis={emojis} />
	) : (
		<div className="flex flex-wrap gap-1 py-2 overflow-x-hidden isolate">
			{emojis.map(emoji => <EmojiButton key={emoji.e} emojiEntry={emoji} />)}
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
				itemContent={index => <EmojiButton emojiEntry={emojis[index]} />}
				listClassName="flex flex-wrap gap-1 overflow-x-hidden isolate"
				style={{ height: `${height}rem` }}
			/>
		</div>
	);
}

const EmojiButton = memo(function EmojiButton({ emojiEntry }) {
	const addEmoji = useEmomomoStore(state => state.addEmoji);

	const { e: emoji, n: name } = emojiEntry;

	const codePoints = useMemo(() => (
		getEmojiCodePoints(emoji)
	), [emoji]);
	const capitalizedName = useMemo(() => (
		name.charAt(0).toUpperCase() + name.slice(1)
	), [name]);

	return (
		<HoverCard openDelay={600} closeDelay={100}>
			<HoverCardTrigger asChild>
				<Button
					className="gap-0 transition ease-out-expo duration-500 active:scale-[0.8] overflow-clip select-none"
					variant="outline"
					size="emoji"
					onClick={() => handleCopy(emoji, addEmoji)}
				>
					<Twemoji className="inline size-7 pointer-events-none">
						{emoji}
					</Twemoji>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent
				className="max-md:hidden w-fit"
				side="top"
				collisionPadding={16}
			>
				<div className="flex gap-4">
					<Twemoji className="inline size-12">
						{emoji}
					</Twemoji>
					<div className="font-medium">
						<p className="text-lg mb-1">{capitalizedName}</p>
						<Muted className="font-mono whitespace-pre-wrap">
							Unicode   <span className="font-light">{emoji}</span>
						</Muted>
						<Muted className="font-mono whitespace-pre-wrap">
							HEX       <span className="font-extralight">{codePoints}</span>
						</Muted>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
});

function flatMapEmojis(subgroup, skinTone) {
	return subgroup.emojis.flatMap(emoji => {
		if (emoji.v && skinTone !== getSkinToneKey(DEFAULT_SKIN_TONE)) {
			const flv = emoji.v[skinTone];
			if (flv) {
				const slvs = flv.v;
				if (slvs) {
					return [
						{ ...flv, n: emoji.n, variants: undefined },
						...Object.values(slvs).map(variant => ({
							...variant,
							n: emoji.n
						})),
					];
				}
				return [{ ...flv, n: emoji.n }];
			}
		}
		return [emoji];
	});
}

async function handleCopy(emoji, addEmoji) {
	addEmoji(emoji);
	if (useEmomomoStore.getState().useCOC) {
		try {
			await navigator.clipboard.writeText(emoji);
		} catch (err) {
			const error = ensureError(err);
			console.error("ERR::COPY:", error);
			toast.error(
				"A small 🤏🌌 issue occurred...",
				{ description: "Failed to copy text to clipboard." }
			);
		}
	}
}