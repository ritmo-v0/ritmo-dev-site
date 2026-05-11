import { getBaseUrl } from "@/lib/utils";

// Icons & Images
import {
	BehanceLogoIcon,
	GithubLogoIcon,
	PencilLineIcon,
	ThreadsLogoIcon,
	YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";

// Types & Interfaces
import type { Person } from "schema-dts";

// Constants & Variables
export const SOCIAL_LINKS = [
	{ label: "GitHub", icon: GithubLogoIcon, url: "https://github.com/ritmo-v0" },
	{ label: "YouTube", icon: YoutubeLogoIcon, url: "https://www.youtube.com/@ritmo_v0" },
	{ label: "Threads", icon: ThreadsLogoIcon, url: "https://www.threads.com/@ritmo_v0" },
	{ label: "HackMD", icon: PencilLineIcon, url: "https://hackmd.io/@Ritmo" },
	{ label: "Behance", icon: BehanceLogoIcon, url: "https://www.behance.net/ritmo_v0" },
];

export const PERSON_ID = `${getBaseUrl().origin}/#person`;

export const PERSON_JSON_LD: Person = {
	"@type": "Person",
	"@id": PERSON_ID,
	name: "ritmo_v0",
	alternateName: ["Ritmo", "里莫"],
	url: getBaseUrl().origin,
	sameAs: SOCIAL_LINKS.map(link => link.url),
};