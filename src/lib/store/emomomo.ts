import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { getSkinToneKey } from "@/lib/emomomo/utils";

import { DEFAULT_SKIN_TONE } from "@/lib/emomomo/constants";

// Types & Interfaces
interface EmojiPreviewState {
	// States
	preview: string;

	// Actions
	addEmoji: (emoji: string) => void;
	setPreview: (preview: string) => void;
	clearPreview: () => void;
}

interface EmojiUseCOCState {
	// States
	useCOC: boolean;

	// Actions
	setUseCOC: (useCOC: boolean) => void;
}

interface EmojiUseSubgroupState {
	// States
	useSubgroup: boolean;

	// Actions
	setUseSubgroup: (useSubgroup: boolean) => void;
}

interface EmojiUseSkinToneState {
	// States
	skinTone: string;

	// Actions
	setSkinTone: (skinTone: string) => void;
}



export const usePreviewStore = create<EmojiPreviewState>()(
	subscribeWithSelector(
		set => ({
			preview: "",
			addEmoji: emoji => set(state => ({ preview: state.preview + emoji })),
			setPreview: preview => set({ preview }),
			clearPreview: () => set({ preview: "" }),
		})
	)
);

export const useCOCStore = create<EmojiUseCOCState>()(
	persist(
		set => ({
			useCOC: true,
			setUseCOC: (useCOC: boolean) => set({ useCOC }),
		}),
		{ name: "emomomo-useCOC" }
	)
);

export const useSubgroupStore = create<EmojiUseSubgroupState>()(
	persist(
		set => ({
			useSubgroup: false,
			setUseSubgroup: (useSubgroup: boolean) => set({ useSubgroup }),
		}),
		{ name: "emomomo-useSubgroup" }
	)
);

export const useSkinToneStore = create<EmojiUseSkinToneState>()(
	persist(
		set => ({
			skinTone: getSkinToneKey(DEFAULT_SKIN_TONE),
			setSkinTone: (skinTone: string) => set({ skinTone }),
		}),
		{ name: "emomomo-skinTone" }
	)
);