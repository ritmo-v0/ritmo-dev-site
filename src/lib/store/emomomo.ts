import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSkinToneKey } from "@/lib/emomomo/utils";

// Types & Interfaces
interface EmomomoState {
	// States
	textareaRef: HTMLTextAreaElement | null;
	preview: string;
	useCOC: boolean;
	useSubgroup: boolean;
	skinTone: string;

	// Actions
	addEmoji: (emoji: string) => void;
	setPreview: (preview: string) => void;
	clearPreview: () => void;

	setTextareaRef: (textareaRef: HTMLTextAreaElement | null) => void;
	setUseCOC: (useCOC: boolean) => void;
	setUseSubgroup: (useSubgroup: boolean) => void;
	setSkinTone: (skinTone: string) => void;
}

// Constants & Variables
import { DEFAULT_SKIN_TONE } from "@/lib/emomomo/constants";



export const useEmomomoStore = create<EmomomoState>()(
	persist(
		(set, get) => ({
			// Initial states
			textareaRef: null,
			preview: "",
			useCOC: true,
			useSubgroup: false,
			skinTone: getSkinToneKey(DEFAULT_SKIN_TONE),

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
			setUseCOC: (useCOC) => set({ useCOC }),
			setUseSubgroup: (useSubgroup) => set({ useSubgroup }),
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