// Icons & Images
import {
	BookIcon,
	GlobeSimpleIcon,
	UsersThreeIcon,
} from "@phosphor-icons/react";

// Types & Interfaces
import type { Locale } from "next-intl";
import type { Icon } from "@phosphor-icons/react";
import type { SevensRefMessage } from "./types";
type SevensRefMessageTab = {
	id: string;
	icon: Icon;
	name: Record<Locale, string>;
	messages: SevensRefMessage[];
};

// Constants & Variables
import storyMessages from "./messages/story.json";
import charactersMessages from "./messages/characters.json";
import worldviewMessages from "./messages/worldview.json";
const STORY_MESSAGES = storyMessages as SevensRefMessage[];
const CHARACTERS_MESSAGES = charactersMessages as SevensRefMessage[];
const WORLDVIEW_MESSAGES = worldviewMessages as SevensRefMessage[];
export const MESSAGE_TABS: SevensRefMessageTab[] = [
	{
		id: "story",
		icon: BookIcon,
		name: {
			ja: "本編",
			"zh-TW": "主線故事",
			en: "Main Story",
		},
		messages: STORY_MESSAGES,
	},
	{
		id: "characters",
		icon: UsersThreeIcon,
		name: {
			ja: "キャラクター",
			"zh-TW": "角色",
			en: "Characters",
		},
		messages: CHARACTERS_MESSAGES,
	},
	{
		id: "worldview",
		icon: GlobeSimpleIcon,
		name: {
			ja: "世界観",
			"zh-TW": "世界觀",
			en: "Worldview",
		},
		messages: WORLDVIEW_MESSAGES,
	},
];