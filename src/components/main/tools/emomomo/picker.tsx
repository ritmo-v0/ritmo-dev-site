"use client";
import { useMemo } from "react";
import { useEmomomoStore } from "@/lib/store/emomomo";
import { getEmojiGroupId, getEmojiSubgroupTitle } from "@/lib/emomomo/utils";
import { cn } from "@/lib/utils";

// Components & UI
import { EmojiButton } from "./emoji-button";
import { H3 } from "@/components/common/typography";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import {
	TooltipContent,
	TooltipMultiple,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons & Images
import {
	CityIcon,
	FlagIcon,
	ForkKnifeIcon,
	HandWavingIcon,
	HeartIcon,
	LeafIcon,
	LightbulbFilamentIcon,
	QuestionMarkIcon,
	SmileyIcon,
	SoccerBallIcon,
	SwatchesIcon,
} from "@phosphor-icons/react";

// Types & Interfaces
import type { Icon } from "@phosphor-icons/react";
import type {
	EmojiData,
	EmojiEntry,
	EmojiGroup,
	EmojiSubgroup,
	SkinToneKey,
} from "@/lib/emomomo/types";

// Constants & Variables
import { PEOPLE_AND_BODY } from "@/lib/emomomo/constants";
const GROUP_ICON_MAP: Record<string, Icon> = {
	"Smileys & Emotion": SmileyIcon,
	"People & Body": HandWavingIcon,
	"Component": SwatchesIcon,
	"Animals & Nature": LeafIcon,
	"Food & Drink": ForkKnifeIcon,
	"Travel & Places": CityIcon,
	"Activities": SoccerBallIcon,
	"Objects": LightbulbFilamentIcon,
	"Symbols": HeartIcon,
	"Flags": FlagIcon,
};



export function EmomomoPicker({ emojiData }: { emojiData: EmojiData }) {
	return (
		<TooltipProvider>
			<Tabs defaultValue="Smileys & Emotion">
				<div className="sticky top-58.25 z-1">
					<div className={cn(
						"absolute inset-0 h-[200%] pointer-events-none -z-10",
						"bg-linear-to-t/oklch from-transparent to-70% to-background",
					)} />
					<TabsList className="flex mx-auto gap-1.5">
						{emojiData.groups.map(group => (
							<EmojiGroupTabsTrigger
								key={group.title}
								title={group.title}
							/>
						))}
					</TabsList>
				</div>

				{emojiData.groups.map(group => (
					<EmojiGroupTab key={group.title} {...group} />
				))}
			</Tabs>
		</TooltipProvider>
	);
}

function EmojiGroupTabsTrigger({ title }: { title: string }) {
	const GroupIcon = GROUP_ICON_MAP[title] || QuestionMarkIcon;

	return (
		<TooltipMultiple>
			<TooltipTrigger
				className="size-7"
				render={<TabsTrigger value={title} />}
				aria-label={title}
			>
				<GroupIcon weight="fill" />
			</TooltipTrigger>
			<TooltipContent>{title}</TooltipContent>
		</TooltipMultiple>
	);
}

function EmojiGroupTab({ title, subgroups }: EmojiGroup) {
	const useSubgroup = useEmomomoStore(state => state.useSubgroup);

	return (
		<TabsContent value={title}>
			{useSubgroup ? (
				subgroups.map(subgroup => (
					<EmojiSubgroupContent
						key={subgroup.title}
						subgroup={subgroup}
						supportsSkinTone={title === PEOPLE_AND_BODY}
					/>
				))
			) : (
				<EmojiSupergroupContent
					subgroups={subgroups}
					supportsSkinTone={title === PEOPLE_AND_BODY}
				/>
			)}
		</TabsContent>
	);
}

function EmojiSupergroupContent({ subgroups, supportsSkinTone }: {
	subgroups: EmojiSubgroup[];
	supportsSkinTone?: boolean;
}) {
	const skinTone = useEmomomoStore(
		state => supportsSkinTone ? state.skinTone : undefined
	);

	const emojis = useMemo(() => {
		const supergroup = subgroups.flatMap(subgroup => subgroup.emojis);

		return skinTone
			? flatMapEmojis(supergroup, skinTone)
			: supergroup;
	}, [subgroups, skinTone]);

	return (
		<div className={cn(
			"flex flex-wrap gap-1.5 justify-center",
			"contain-paint [content-visibility:auto] [contain-intrinsic-height:calc(100vh-18rem)]",
		)}>
			{emojis.map(emoji => (
				<EmojiButton
					key={emoji.e}
					emojiEntry={emoji}
				/>
			))}
		</div>
	);
}

function EmojiSubgroupContent({ subgroup, supportsSkinTone }: {
	subgroup: EmojiSubgroup;
	supportsSkinTone?: boolean;
}) {
	const skinTone = useEmomomoStore(
		state => supportsSkinTone ? state.skinTone : undefined
	);

	const title = getEmojiSubgroupTitle(subgroup.title);
	const emojis = skinTone
		? flatMapEmojis(subgroup.emojis, skinTone)
		: subgroup.emojis;

	return (
		<>
			<H3 id={getEmojiGroupId(title)} className="[&+div]:mt-2">
				{title}
			</H3>
			<div className={cn(
				"flex flex-wrap gap-1.5",
				"contain-paint [content-visibility:auto] [contain-intrinsic-height:12rem]",
			)}>
				{emojis.map(emoji => (
					<EmojiButton
						key={emoji.e}
						emojiEntry={emoji}
					/>
				))}
			</div>
		</>
	);
}

function flatMapEmojis(entries: EmojiEntry[], skinTone: SkinToneKey) {
	return entries.flatMap(emoji => {
		if (emoji.v && skinTone !== "0") {
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