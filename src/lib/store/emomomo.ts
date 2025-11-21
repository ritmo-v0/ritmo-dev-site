import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
import type { SkinToneKey } from "@/lib/emomomo/types";
interface EmomomoState {
	// States
	textareaRef: HTMLTextAreaElement | null;
	preview: string;
	useSubgroup: boolean;
	useCOC: boolean;
	skinTone: SkinToneKey;

	// Actions
	addEmoji: (emoji: string) => void;
	setPreview: (preview: string) => void;
	clearPreview: () => void;

	setTextareaRef: (textareaRef: HTMLTextAreaElement | null) => void;
	setUseSubgroup: (useSubgroup: boolean) => void;
	setUseCOC: (useCOC: boolean) => void;
	setSkinTone: (skinTone: SkinToneKey) => void;
}



export const useEmomomoStore = create<EmomomoState>()(
	persist(
		(set, get) => ({
			// Initial states
			textareaRef: null,
			preview: "",
			useSubgroup: false,
			useCOC: true,
			skinTone: "0",

			// Actions
			addEmoji: (emoji) => {
				const textarea = get().textareaRef;
				const preview = get().preview;

				if (!textarea) {
					set({ preview: preview + emoji });
					return;
				}

				const start = textarea.selectionStart;
				const end = textarea.selectionEnd;
				const newPreview = preview.slice(0, start) + emoji + preview.slice(end);
				set({ preview: newPreview });

				requestAnimationFrame(() => {
					textarea.focus();
					textarea.setSelectionRange(
						start + emoji.length,
						start + emoji.length
					);
				});
			},
			setPreview: (preview) => set({ preview }),
			clearPreview: () => set({ preview: "" }),

			setTextareaRef: (textareaRef) => set({ textareaRef }),
			setUseSubgroup: (useSubgroup) => set({ useSubgroup }),
			setUseCOC: (useCOC) => set({ useCOC }),
			setSkinTone: (skinTone) => set({ skinTone }),
		}), {
		name: "emomomo-store",
		partialize: (state) => ({
			useCOC: state.useCOC,
			useSubgroup: state.useSubgroup,
			skinTone: state.skinTone,
		}),
	}
	)
);