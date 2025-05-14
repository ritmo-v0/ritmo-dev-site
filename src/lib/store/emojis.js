import { create } from "zustand";
import { persist } from "zustand/middleware";



export const usePreviewStore = create(set => ({
	preview: "",
	addEmoji: emoji => set(state => ({ preview: state.preview + emoji })),
	setPreview: preview => set({ preview }),
	clearPreview: () => set({ preview: "" }),
}));

export const useSubgroupStore = create(
	persist(
		set => ({
			useSubgroup: false,
			setUseSubgroup: useSubgroup => set({ useSubgroup }),
		}),
		{ name: "emojis-useSubgroup" }
	)
);

export const useSkinToneStore = create(
	persist(
		set => ({
			skinTone: "",
			setSkinTone: skinTone => set({ skinTone }),
		}),
		{ name: "emojis-skinTone" }
	)
);

export const useTwemojiStore = create(
	persist(
		set => ({
			useTwemoji: false,
			setUseTwemoji: useTwemoji => set({ useTwemoji }),
		}),
		{ name: "emojis-useTwemoji" }
	)
);