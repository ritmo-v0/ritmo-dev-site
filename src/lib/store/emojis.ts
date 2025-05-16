import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

// Types & Interfaces
interface EmojiPreviewState {
	// States
	preview: string;

	// Actions
	addEmoji: (emoji: string) => void;
	setPreview: (preview: string) => void;
	clearPreview: () => void;
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

export const useSubgroupStore = create(
	persist(
		set => ({
			useSubgroup: false,
			setUseSubgroup: (useSubgroup: Boolean) => set({ useSubgroup }),
		}),
		{ name: "emojis-useSubgroup" }
	)
);

export const useSkinToneStore = create(
	persist(
		set => ({
			skinTone: "",
			setSkinTone: (skinTone: Boolean) => set({ skinTone }),
		}),
		{ name: "emojis-skinTone" }
	)
);

export const useTwemojiStore = create(
	persist(
		set => ({
			useTwemoji: false,
			setUseTwemoji: (useTwemoji: Boolean) => set({ useTwemoji }),
		}),
		{ name: "emojis-useTwemoji" }
	)
);