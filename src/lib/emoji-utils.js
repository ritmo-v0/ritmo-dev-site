import { customAlphabet } from "nanoid";

// Constants & Variables
const VERSION_PREFIX = "# Version:";
const GROUP_PREFIX = "# group:";
const SUBGROUP_PREFIX = "# subgroup:";

const PEOPLE_AND_BODY = "People & Body";

export const EmojiStatus = Object.freeze({
	Component: "component",                     // An Emoji_Component, excluding Regional_Indicators, ASCII, and non-Emoji.
	FullyQualified: "fully-qualified",          // A fully-qualified emoji (see ED-18 in UTS #51), excluding Emoji_Component
	MinimallyQualified: "minimally-qualified",  // A minimally-qualified emoji (see ED-18a in UTS #51)
	Unqualified: "unqualified",                 // An unqualified emoji (See ED-19 in UTS #51)
});

export const EmojiSkinTone = Object.freeze({
	Default: "default skin tone",
	Light: "light skin tone",
	MediumLight: "medium-light skin tone",
	Medium: "medium skin tone",
	MediumDark: "medium-dark skin tone",
	Dark: "dark skin tone",
});



function nanoid(length = 6) {
	const customNanoId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", length);
	return customNanoId();
}

export async function fetchEmojiTestFile() {
	try {
		const file = await fetch(process.env.EMOJI_TEST_URL).then(res => res.text())
		return file;
	} catch (error) {
		console.error(`ERR::EMOJI::FETCH: ${error.message}`);
		throw error;
	}
}

export function parseEmojis(file) {
	let version = "";
	let emojiGroups = [];
	let currentGroup = null;
	let currentSubgroup = null;

	file.split("\n").map((line) => {
		// # Skip empty lines or unrelated comments
		if (isUnrelated(line)) return;

		// # Handle version
		if (isVersion(line)) {
			version = line.replace(VERSION_PREFIX, "").trim();
			return;
		}

		// # Handle groups
		if (isGroup(line)) {
			currentGroup = {
				id: nanoid(),
				title: line.replace(GROUP_PREFIX, "").trim(),
				subgroups: [],
			};

			emojiGroups.push(currentGroup);
			return;
		}

		// # Handle subgroups
		if (isSubgroup(line)) {
			currentSubgroup = {
				id: nanoid(),
				title: line.replace(SUBGROUP_PREFIX, "").trim(),
				emojis: [],
			};

			if (currentGroup) currentGroup.subgroups.push(currentSubgroup);
			return;
		}

		// # Handle emojis
		if (!isComment(line) && currentSubgroup) {
			const { status, emoji, name } = parseEmojiDataByLine(line);

			// Only accept fully-qualified emojis
			if (status !== EmojiStatus.FullyQualified && status !== EmojiStatus.Component) return;

			if (currentGroup.title === PEOPLE_AND_BODY) {
				const { baseName, skinTones } = getEmojiInfoByName(name);
				const skinToneCount = skinTones.length;

				if (skinToneCount === 0) {
					// Base Emoji: No skin tone variants
					const emojiObject = { emoji, name, variants: {} };
					currentSubgroup.emojis.push(emojiObject);
				} else if (skinToneCount === 1) {
					// First-Level Variant: 1 skin tone variant
					const baseEmoji = currentSubgroup.emojis.find(e => e.name === baseName);
					if (baseEmoji) {
						let firstLevelVariant = baseEmoji.variants[skinTones[0]];
						if (firstLevelVariant) {
							firstLevelVariant.emoji = emoji;
						} else {
							const emojiObject = { emoji, variants: {} };
							baseEmoji.variants[skinTones[0]] = emojiObject;
						}
					}
				} else if (skinToneCount >= 2) {
					// Second-Level Variant: 2+ skin tone variants
					const emojiObject = { emoji };
					const baseEmoji = currentSubgroup.emojis.find(e => e.name === baseName);
					if (baseEmoji) {
						let firstLevelVariant = baseEmoji.variants[skinTones[0]];
						if (firstLevelVariant) {
							firstLevelVariant.variants[skinTones[1]] = emojiObject;
						} else {
							baseEmoji.variants[skinTones[0]] = {
								variants: { [skinTones[1]]: emojiObject }
							};
						}
					}
				}
			} else {
				const emojiObject = { emoji, name };
				currentSubgroup.emojis.push(emojiObject);
			}

			return;
		}
	});

	return { version, groups: emojiGroups };
}

function parseEmojiDataByLine(line) {
	const [codePoints, details] = line.split(";", 2).map(part => part.trim());
	const [status, , emoji, version, ...nameParts] = details.split(/\s+/);
	const name = nameParts.join(" ");

	return { codePoints, status, emoji, version: version.replace(/E(\d+(\.\d+)?)/g, "$1"), name };
}

function getEmojiInfoByName(name) {
	const BASE_SEPARATOR = ": ";
	const VARIANT_SEPARATOR = ", ";

	let skinTones = [];
	let nonSkinToneVariants = [];

	const [base, variantString] = name.split(BASE_SEPARATOR).map(part => part.trim());
	const variants = variantString ? variantString.split(VARIANT_SEPARATOR).map(v => v.trim()) : [];

	for (const variant of variants) {
		if (Object.values(EmojiSkinTone).includes(variant)) {
			skinTones.push(variant);
		} else {
			nonSkinToneVariants.push(variant);
		}
	}

	const baseName = [base, nonSkinToneVariants.join(VARIANT_SEPARATOR)]
		.filter(Boolean)
		.join(BASE_SEPARATOR);

	return { baseName, skinTones };
}

// Helper functions
function isUnrelated(line) {
	return !line.trim() || (isComment(line) && !isVersion(line) && !isGroup(line) && !isSubgroup(line));
}

function isComment(line) {
	return line.startsWith("#");
}

function isVersion(line) {
	return line.startsWith(VERSION_PREFIX);
}

function isGroup(line) {
	return line.startsWith(GROUP_PREFIX);
}

function isSubgroup(line) {
	return line.startsWith(SUBGROUP_PREFIX);
}