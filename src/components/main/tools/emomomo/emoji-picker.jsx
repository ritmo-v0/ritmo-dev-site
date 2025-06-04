"use client";
import { useMemo } from "react";
import {
	useCOCStore,
	usePreviewStore,
	useSkinToneStore,
	useSubgroupStore,
} from "@/lib/store/emomomo";
import { match } from "ts-pattern";
import { copyToClipboard } from "@/lib/utils";
import {
	getEmojiCodePoints,
	getEmojiGroupId,
	getEmojiSubgroupTitle,
	getSkinToneKey,
} from "@/lib/emomomo/utils";

// Components & UI
import Twemoji from "react-twemoji";
import { toast } from "sonner";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Muted } from "@/components/common/typography";
import { SectionLayout } from "@/components/common/layouts";
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
	const useSubgroup = useSubgroupStore(state => state.useSubgroup);
	const skinTone = useSkinToneStore(state => state.skinTone);

	return useSubgroup ? (
		<Virtuoso
			useWindowScroll
			totalCount={subgroups.length}
			itemContent={index => (
				<EmojiSubgroup
					subgroup={subgroups[index]}
					skinTone={skinTone}
					supportsSkinTone={supportsSkinTone}
				/>
			)}
		/>
	) : (
		<EmojiSupergroup
			subgroups={subgroups}
			skinTone={skinTone}
			supportsSkinTone={supportsSkinTone}
		/>
	);
}

function EmojiSubgroup({ subgroup, skinTone, supportsSkinTone }) {
	const title = getEmojiSubgroupTitle(subgroup.title);
	const emojis = useMemo(() => {
		return supportsSkinTone
			? flatMapEmojis(subgroup, skinTone)
			: subgroup.emojis;
	}, [subgroup, skinTone]);

	return (
		<SectionLayout title={title} titleAs="h4">
			<EmojiGrid emojis={emojis} />
		</SectionLayout>
	);
}

function EmojiSupergroup({ subgroups, skinTone, supportsSkinTone }) {
	const supergroup = useMemo(() => {
		return subgroups.flatMap(subgroup => subgroup.emojis);
	}, [subgroups]);

	const emojis = useMemo(() => {
		return supportsSkinTone
			? flatMapEmojis({ emojis: supergroup }, skinTone)
			: supergroup;
	}, [supergroup, skinTone]);

	return (
		<EmojiGrid emojis={emojis} />
	);
}

function EmojiGrid({ emojis }) {
	const EMOJIS_PER_LINE = 27;
	const LINE_THRESHOLD = 8;  // 5

	return emojis.length > EMOJIS_PER_LINE * LINE_THRESHOLD ? (
		<EmojiVirtuosoGrid emojis={emojis} />
	) : (
		<div className="flex flex-wrap gap-1 py-2 overflow-x-hidden isolate">
			{emojis.map((emoji, index) => (
				<EmojiButton key={index} emojiEntry={emoji} />
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
				itemContent={index => <EmojiButton emojiEntry={emojis[index]} />}
				listClassName="flex flex-wrap gap-1 overflow-x-hidden isolate"
				style={{ height: `${height}rem` }}
			/>
		</div>
	);
}

function EmojiButton({ emojiEntry }) {
	const useCOC = useCOCStore(state => state.useCOC);
	const addEmoji = usePreviewStore(state => state.addEmoji);

	const { e: emoji, n: name } = emojiEntry;
	const codePoints = useMemo(() => (
		getEmojiCodePoints(emoji)
	), [emoji]);

	async function handleCopy() {
		addEmoji(emoji);
		if (useCOC) {
			const copyResult = await copyToClipboard(emoji);
			match(copyResult)
				.with({ success: true }, () => {})
				.with({ success: false }, ({ message }) => {
					toast.error(
						"A small 🤏🌌 issue occurred...",
						{ description: message }
					);
				})
				.exhaustive();
		}
	}

	return (
		<HoverCard openDelay={600} closeDelay={100}>
			<HoverCardTrigger asChild>
				<Button
					className="transition ease-out-expo duration-500 active:scale-[0.8] overflow-clip select-none"
					variant="outline"
					size="emoji"
					onClick={handleCopy}
				>
					<Twemoji options={{ className: "inline size-7 pointer-events-none" }}>{emoji}</Twemoji>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent
				className="w-fit"
				side="top"
				collisionPadding={16}
			>
				<div className="flex gap-4 w-fit">
					<Twemoji options={{ className: "inline size-12" }}>{emoji}</Twemoji>
					<div className="font-medium">
						<p className="text-lg mb-1">
							{name.charAt(0).toUpperCase() + name.slice(1)}
						</p>
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
}

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