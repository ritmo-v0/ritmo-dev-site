// Components & UI
import { Markdown } from "@/components/common/markdown";
import { Section } from "@/components/common/typography";

// Types & Interfaces
import type { Locale, LyricLine } from "@/lib/7sref/types";



export function renderSections(
	sections: LyricLine[][],
	locale: Locale,
	className?: string,
) {
	return sections.map((section, index) => (
		<Section key={index} className={className}>
			<Markdown>
				{section
					.map(line => line.content[locale] || line.content.ja)
					.join("\n\n")}
			</Markdown>
		</Section>
	));
}