import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useSerialNumberStore = create(
	persist(
		set => ({
			serialNumber: "",
			setSerialNumber: serialNumber => set({ serialNumber }),
		}),
		{ name: "hell-report-serialNumber" }
	)
);

export const useNameStore = create(
	persist(
		set => ({
			name: "",
			setName: name => set({ name }),
		}),
		{ name: "hell-report-name" }
	)
);

export const useLocationStore = create(set => ({
	location: "",
	setLocation: location => set({ location }),
}));

export const useDoingStore = create(set => ({
	doing: "",
	setDoing: doing => set({ doing }),
}));