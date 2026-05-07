// Types & Interfaces
import type { Meta } from "@/types/meta";

// Constants & Variables
import { meta as sevensRefMeta } from "@/app/[locale]/stuff/7sref/meta";
import { meta as inmClockMeta } from "@/app/[locale]/stuff/inm-clock/meta";
import { meta as irodukuPilgrimageMeta } from "@/app/[locale]/stuff/iroduku-pgm/meta";

export const STUFF: Meta[] = [
	sevensRefMeta,
	inmClockMeta,
	irodukuPilgrimageMeta,
] as const;