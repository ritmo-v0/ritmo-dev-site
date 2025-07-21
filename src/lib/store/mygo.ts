import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types & Interfaces
interface MyGOState {
	// States
	image: string | undefined;
	blur: number;
	opacity: number;

	// Actions
	setImage: (image: string | undefined) => void;
	setBlur: (blur: number) => void;
	setOpacity: (opacity: number) => void;
}



export const useMyGOStore = create<MyGOState>()(
	persist(
		set => ({
			// Initial states
			image: undefined,
			blur: 0,
			opacity: 1,

			// Actions
			setImage: (image: string | undefined) => set({ image }),
			setBlur: (blur: number) => set({ blur }),
			setOpacity: (opacity: number) => set({ opacity }),
		}), {
			name: "mygo-store",
			partialize: (state) => ({
				image: state.image,
				blur: state.blur,
				opacity: state.opacity,
			}),
		}
	)
);