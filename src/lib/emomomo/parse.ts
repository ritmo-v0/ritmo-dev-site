import { match } from "ts-pattern";

// Types & Interfaces
import type {
	EmojiData,
	EmojiEntry,
	EmojiGroup,
	EmojiProps,
	EmojiSubgroup,
	EmojiSubEntry,
	SkinTone,
	SkinToneKey,
} from "@/lib/emomomo/types";

// Constants & Variables
import {
	VERSION_PREFIX,
	GROUP_PREFIX,
	SUBGROUP_PREFIX,
	PEOPLE_AND_BODY,
	EMOJI_SKIN_TONES,
	EmojiStatus,
} from "./constants";



// # Emoji Parsing
export function parseEmojis(file: string): EmojiData {
	const emojiGroups: EmojiGroup[] = [];
	let version = "";
	let currentGroup: EmojiGroup | null = null;
	let currentSubgroup: EmojiSubgroup | null = null;

	file.split("\n").forEach((line) => {
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
				title: line.replace(GROUP_PREFIX, "").trim(),
				subgroups: [],
			};

			emojiGroups.push(currentGroup);
			return;
		}

		// # Handle subgroups
		if (isSubgroup(line)) {
			currentSubgroup = {
				title: line.replace(SUBGROUP_PREFIX, "").trim(),
				emojis: [],
			};

			if (currentGroup) currentGroup.subgroups.push(currentSubgroup);
			return;
		}

		// # Handle emojis
		if (!isComment(line) && currentSubgroup) {
			const emojiProps = parseEmojiProps(line);
			const { status, emoji, name } = emojiProps;

			// Only accept fully-qualified emojis and components
			if (status !== EmojiStatus.FullyQualified && status !== EmojiStatus.Component) return;

			if (currentGroup?.title === PEOPLE_AND_BODY) {
				const { baseName, skinTones } = parseEmojiVariantInfo(name);
				match(skinTones.length)
					// Base Emoji: No skin tone variants
					.with(0, () => {
						const emojiEntry = createEmojiEntry(emojiProps, true);
						// ! Trust the format of the file, it should always have a subgroup
						if (currentSubgroup) currentSubgroup.emojis.push(emojiEntry);
					})
					// First Level Variant
					.with(1, () => {
						const baseEntry = getBaseEntry(currentSubgroup, baseName);
						if (baseEntry) {
							const variants = baseEntry.v;
							const skinToneKey = getSkinToneKey(skinTones[0]);
							const flv = variants?.[skinToneKey];

							// Might already exist because of pushing SLVs
							if (flv) {
								flv.e = emoji;
							} else {
								// `variants` is guaranteed to exist (`createEmojiEntry`)
								const emojiEntry = createSubEmojiEntry(emojiProps);
								if (variants) variants[skinToneKey] = emojiEntry;
							}
						}
					})
					// Second Level Variant
					.with(2, () => {
						const baseEntry = getBaseEntry(currentSubgroup, baseName);
						if (baseEntry) {
							const emojiSubEntry = createSubEmojiEntry(emojiProps);
							const flVariants = baseEntry.v;
							const flSkinToneKey = getSkinToneKey(skinTones[0]);
							const slSkinToneKey = getSkinToneKey(skinTones[1]);
							const flv = flVariants?.[flSkinToneKey];

							if (flv) {
								const slVariants = flv.v;
								// `slVariants` is guaranteed to exist (1's `createSubEmojiEntry`)
								if (slVariants) slVariants[slSkinToneKey] = emojiSubEntry;
							} else {
								// `flVariants` is guaranteed to exist (0's `createEmojiEntry`)
								const empty = createSubEmojiEntry({} as EmojiProps);
								if (flVariants) flVariants[flSkinToneKey] = empty;

								// `slVariants` is guaranteed to exist (empty's `createSubEmojiEntry`)
								const slVariants = empty.v;
								if (slVariants) slVariants[slSkinToneKey] = emojiSubEntry;
							}
						}
					})
					// ! Assume no more than 2 skin tone variants
					.otherwise(() => { });
			} else {
				const emojiEntry = createEmojiEntry(emojiProps);
				currentSubgroup.emojis.push(emojiEntry);
			}
		}
	});

	// Prune redundant `v: {}`
	for (const group of emojiGroups) {
		if (group.title === PEOPLE_AND_BODY) {
			for (const subgroup of group.subgroups) {
				for (const entry of subgroup.emojis) {
					pruneVariants(entry);
				}
			}
		}
	}

	return { version, groups: emojiGroups };
}

function parseEmojiProps(line: string): EmojiProps {
	// Example
	// 1F600 ; fully-qualified     # 😀 E1.0 grinning face
	const [codePoints, details] = line.split(";", 2).map(part => part.trim());
	const [status, , emoji, version, ...nameParts] = details.split(/\s+/);

	return {
		codePoints,
		status,
		emoji,
		version: version.replace("E", ""),
		name: nameParts.join(" "),
	};
}

function parseEmojiVariantInfo(name: string): { baseName: string; skinTones: SkinTone[] } {
	// Examples
	// waving hand: light skin tone                                  => (single skin tone variant)
	// person: light skin tone, blond hair                           => (with non-skin tone variant)
	// people holding hands: light skin tone, medium-light skin tone => (multiple skin tone variants)
	// kiss: person, person, light skin tone, medium-light skin tone => (both with multiple variants)
	const BASE_SEPARATOR = ": ";
	const VARIANT_SEPARATOR = ", ";

	const skinTones: SkinTone[] = [];
	const nonSkinTones: string[] = [];

	const [base, variantString] = name.split(BASE_SEPARATOR).map(part => part.trim());
	const variants = variantString ? variantString.split(VARIANT_SEPARATOR).map(v => v.trim()) : [];

	for (const variant of variants) {
		if (isSkinTone(variant)) skinTones.push(variant);
		else nonSkinTones.push(variant);
	}

	const baseName = [base, nonSkinTones.join(VARIANT_SEPARATOR)]
		.filter(Boolean)
		.join(BASE_SEPARATOR);

	return { baseName, skinTones };
}

function getBaseEntry(subgroup: EmojiSubgroup | null, name: string) {
	return subgroup?.emojis.find(emoji => emoji.n === name) || null;
}

function createEmojiEntry(props: EmojiProps, initVariants?: boolean): EmojiEntry {
	const emoji = props.emoji || "";
	const name = props.name || "";
	return {
		n: name,
		e: emoji,
		...(initVariants ? { v: {} } : {})
	};
}

function createSubEmojiEntry(props: EmojiProps): EmojiSubEntry {
	const emoji = props.emoji || "";
	return { e: emoji, v: {} };
}

function pruneVariants(entry: EmojiEntry | EmojiSubEntry) {
	if (!entry.v) return;

	if (Object.keys(entry.v).length === 0) {
		delete entry.v;
		return;
	}

	Object.entries(entry.v).forEach(([, subEntry]) => {
		pruneVariants(subEntry);
	});
}

// Helper functions
function isUnrelated(line: string): boolean {
	return !line.trim() || (isComment(line) && !isVersion(line) && !isGroup(line) && !isSubgroup(line));
}

function isComment(line: string): boolean {
	return line.startsWith("#");
}

function isVersion(line: string): boolean {
	return line.startsWith(VERSION_PREFIX);
}

function isGroup(line: string): boolean {
	return line.startsWith(GROUP_PREFIX);
}

function isSubgroup(line: string): boolean {
	return line.startsWith(SUBGROUP_PREFIX);
}

export function isSkinTone(value: string): value is SkinTone {
	return EMOJI_SKIN_TONES.includes(value as any);
}

export function getSkinToneKey(skinTone: SkinTone): SkinToneKey {
	const index = EMOJI_SKIN_TONES.indexOf(skinTone);
	if (index === -1) throw new Error(`Invalid skin tone: ${skinTone}`);

	return index.toString() as SkinToneKey;
}