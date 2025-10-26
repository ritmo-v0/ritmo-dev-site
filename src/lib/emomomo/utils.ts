export function getEmojiGroupId(title: string): string {
	// Example: "Smileys & Emotion" => "smileys-and-emotion"
	return title
		.replace("&", "and")
		.split(/\s+/g)
		.filter(Boolean)
		.join("-")
		.toLowerCase();
}

export function getEmojiSubgroupTitle(title: string): string {
	// Examples
	// "face-smiling" => "Face Smiling"
	// "arts & crafts" => "Arts & Crafts"
	return title
		.split(/-|\s+/g)
		.join(" ")
		.replace(/\b\w/g, char => char.toUpperCase());
}

export function getEmojiCodePoints(emoji: string): string {
	return Array.from(emoji, symbol =>
		symbol.codePointAt(0)?.toString(16).toUpperCase()
	).join("-");
}