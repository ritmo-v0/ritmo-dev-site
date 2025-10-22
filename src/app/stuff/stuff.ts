// Types & Interfaces
import type { Meta } from "@/types/meta";

// Constants & Variables
import { meta as sevensRefMeta } from "@/app/stuff/7sref/meta";
import { meta as inmClockMeta } from "@/app/stuff/inm-clock/meta";
export const STUFF: Meta[] = [
	sevensRefMeta,
	inmClockMeta,
] as const;