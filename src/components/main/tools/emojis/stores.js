import { create } from "zustand";



export const usePreviewStore = create(set => ({
	preview: "",
	addEmoji: (emoji) => set(state => ({ preview: state.preview + emoji })),
	setPreview: (preview) => set({ preview }),
	clearPreview: () => set({ preview: "" }),
}));