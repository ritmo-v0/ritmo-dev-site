import { create } from "zustand";



export const usePreviewStore = create(set => ({
	preview: "",
	addEmoji: emoji => set(state => ({ preview: state.preview + emoji })),
	setPreview: preview => set({ preview }),
	clearPreview: () => set({ preview: "" }),
}));

export const useSubgroupStore = create(set => ({
	useSubgroup: false,
	setUseSubgroup: useSubgroup => set({ useSubgroup }),
}));

export const useSkinToneStore = create(set => ({
	skinTone: "",
	setSkinTone: skinTone => set({ skinTone }),
}));

export const useTwemojiStore = create(set => ({
	useTwemoji: false,
	setUseTwemoji: useTwemoji => set({ useTwemoji }),
}));