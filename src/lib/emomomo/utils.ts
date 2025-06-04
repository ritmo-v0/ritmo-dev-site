import { match } from "ts-pattern";

// Constants & Variables
import {
	VERSION_PREFIX,
	GROUP_PREFIX,
	SUBGROUP_PREFIX,
	PEOPLE_AND_BODY,
	EmojiStatus,
	EmojiSkinTone,
	EmojiSkinToneOrder,
} from "./constants";

// Types & Interfaces
import type {
	EmojiData,
	EmojiEntry,
	EmojiGroup,
	EmojiProps,
	EmojiSubgroup,
	EmojiSubEntry,
	ParseOptions,
	SkinToneKey,
	SkinToneName,
	EmojiEntryByComp,
	SubEmojiEntryByComp,
} from "@/types/emoji";



// # Emoji Parsing
export async function fetchEmojiTestFile() {
	try {
		const file = await fetch(process.env.EMOJI_TEST_URL as string).then(res => res.text())
		return file;
	} catch (error: any) {
		console.error(`ERR::EMOJI::FETCH: ${error.message}`);
		throw error;
	}
}

export function parseEmojis<C extends boolean = false>(
	file: string,
	options?: ParseOptions & { compressed?: C }
): EmojiData<EmojiEntryByComp<C>> {
	const compressed = options?.compressed ?? false as C;
	type Entry = EmojiEntryByComp<C>;

	let version = "";
	let emojiGroups: EmojiGroup<Entry>[] = [];
	let currentGroup: EmojiGroup<Entry> | null = null;
	let currentSubgroup: EmojiSubgroup<Entry> | null = null;

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
				// id: nanoid(),
				title: line.replace(GROUP_PREFIX, "").trim(),
				subgroups: [],
			};

			emojiGroups.push(currentGroup);
			return;
		}

		// # Handle subgroups
		if (isSubgroup(line)) {
			currentSubgroup = {
				// id: nanoid(),
				title: line.replace(SUBGROUP_PREFIX, "").trim(),
				emojis: [],
			};

			if (currentGroup) currentGroup.subgroups.push(currentSubgroup);
			return;
		}

		// # Handle emojis
		if (!isComment(line) && currentSubgroup) {
			const emojiData = parseEmojiDataByLine(line);
			const { status, emoji, name } = emojiData;

			// Only accept fully-qualified emojis
			if (status !== EmojiStatus.FullyQualified && status !== EmojiStatus.Component) return;

			if (currentGroup?.title === PEOPLE_AND_BODY) {
				const { baseName, skinTones } = getEmojiInfoByName(name);
				const skinToneCount = skinTones.length;

				match(skinToneCount)
					.with(0, () => {  // Base Emoji: No skin tone variants
						const emojiEntry = createEmojiEntry(emojiData, { compressed, initVariants: true });
						// ! Trust the format of the file, it should always have a subgroup
						if (currentSubgroup) currentSubgroup.emojis.push(emojiEntry);
					})
					.with(1, () => {  // First Level Variant
						const baseEmoji = currentSubgroup?.emojis.find(emoji => getName(emoji) === baseName);
						if (baseEmoji) {
							const variants = getVariants(baseEmoji);
							const skinToneKey = getSkinToneKey(skinTones[0]);

							const flv = variants?.[skinToneKey];
							if (flv) {  // Might already exist because of pushing SLVs
								setEmoji(flv, emoji);
							} else {
								const emojiEntry = createSubEmojiEntry(emojiData, { compressed, initVariants: true });
								// `variants` is guaranteed to exist (`createEmojiEntry`)
								if (variants) variants[skinToneKey] = emojiEntry;
							}
						}
					})
					.otherwise(() => {  // Second Level Variant
						const emojiEntry = createSubEmojiEntry(emojiData, { compressed });
						const baseEmoji = currentSubgroup?.emojis.find(emoji => getName(emoji) === baseName);
						if (baseEmoji) {
							const flVariants = getVariants(baseEmoji);
							const flSkinToneKey = getSkinToneKey(skinTones[0]);
							const slSkinToneKey = getSkinToneKey(skinTones[1]);

							const flv = flVariants?.[flSkinToneKey];
							if (flv) {
								const slVariants = getVariants(flv);
								// `slVariants` is guaranteed to exist (1's `createSubEmojiEntry`)
								if (slVariants) slVariants[slSkinToneKey] = emojiEntry;
							} else {
								const empty = createSubEmojiEntry({} as EmojiProps, { compressed, initVariants: true });
								// `flVariants` is guaranteed to exist (0's `createEmojiEntry`)
								if (flVariants) flVariants[flSkinToneKey] = empty;  // It now holds the reference to `empty`

								const slVariants = getVariants(empty);
								// `slVariants` is guaranteed to exist (empty's `createSubEmojiEntry`)
								if (slVariants) slVariants[slSkinToneKey] = emojiEntry;
							}
						}
					});
			} else {
				const emojiEntry = createEmojiEntry(emojiData, { compressed });
				currentSubgroup.emojis.push(emojiEntry);
			}

			return;
		}
	});

	return { version, groups: emojiGroups };
}

function parseEmojiDataByLine(line: string): EmojiProps {
	// Example
	// 1F600 ; fully-qualified     # 😀 E1.0 grinning face
	// .replace(/E(\d+(\.\d+)?)/g, "$1") => Version 1 instead of 1.0
	const [codePoints, details] = line.split(";", 2).map(part => part.trim());
	const [status, , emoji, version, ...nameParts] = details.split(/\s+/);
	const name = nameParts.join(" ");

	return {
		codePoints,
		status,
		emoji,
		version: version.replace("E", ""),
		name
	};
}

function getEmojiInfoByName(name: string): { baseName: string; skinTones: SkinToneName[] } {
	// Examples
	// waving hand: light skin tone (single skin tone variant)
	// person: light skin tone, blond hair (with non-skin tone variant)
	// people holding hands: light skin tone, medium-light skin tone (multiple skin tone variants)
	// kiss: person, person, light skin tone, medium-light skin tone (both with multiple variants)
	const BASE_SEPARATOR = ": ";
	const VARIANT_SEPARATOR = ", ";

	let skinTones: SkinToneName[] = [];
	let nonSkinToneVariants: string[] = [];

	const [base, variantString] = name.split(BASE_SEPARATOR).map(part => part.trim());
	const variants = variantString ? variantString.split(VARIANT_SEPARATOR).map(v => v.trim()) : [];

	for (const variant of variants) {
		if (isSkinToneName(variant)) skinTones.push(variant);
		else nonSkinToneVariants.push(variant);
	}

	const baseName = [base, nonSkinToneVariants.join(VARIANT_SEPARATOR)]
		.filter(Boolean)
		.join(BASE_SEPARATOR);

	return { baseName, skinTones };
}

function createEmojiEntry<C extends boolean>(
	props: EmojiProps, { compressed, initVariants = false }: { compressed: C; initVariants?: boolean }
): EmojiEntryByComp<C> {
	const emoji = props.emoji || "";
	const name = props.name || "";
	return compressed
		? { e: emoji, n: name, ...(initVariants ? { v: {} } : {}) } as EmojiEntryByComp<C>
		: { emoji, name, ...(initVariants ? { variants: {} } : {}) } as EmojiEntryByComp<C>;
}

function createSubEmojiEntry<C extends boolean>(
	props: EmojiProps, { compressed, initVariants = false }: { compressed: C; initVariants?: boolean }
): SubEmojiEntryByComp<C> {
	const emoji = props.emoji || "";
	return compressed
		? { e: emoji, ...(initVariants ? { v: {} } : {}) } as SubEmojiEntryByComp<C>
		: { emoji, ...(initVariants ? { variants: {} } : {}) } as SubEmojiEntryByComp<C>;
}

function getName(entry: EmojiEntry): string {
	return "name" in entry ? entry.name : entry.n;
}

function getVariants(entry: EmojiEntry | EmojiSubEntry) {
	return "variants" in entry
		? entry.variants
		: "v" in entry
			? entry.v
			: undefined;
}

function setEmoji(entry: EmojiEntry | EmojiSubEntry, emoji: string): void {
	if ("emoji" in entry) {
		entry.emoji = emoji;
	} else {
		entry.e = emoji
	};
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

function isSkinToneName(value: string): value is SkinToneName {
	return Object.values(EmojiSkinTone).includes(value as any);
}

export function getSkinToneKey(skinTone: SkinToneName): SkinToneKey {
	const index = EmojiSkinToneOrder.indexOf(skinTone);
	if (index === -1) throw new Error(`Invalid SkinToneName: ${skinTone}`);

	return index.toString() as SkinToneKey;
}

// # Emoji Rendering
export function getEmojiGroupId(title: string): string {
	// Example: "Smileys & Emotion" => "smileys-and-emotion"
	return title
		.replace("&", "and")
		.split(/\s+/g)
		.map(word => word.trim().toLowerCase())
		.join("-");
}

export function getEmojiSubgroupTitle(title: string): string {
	// Examples
	// "face-smiling" => "Face Smiling"
	// "arts & crafts" => "Arts & Crafts"
	return title
		.split(/-|\s+/g)
		.map(word => word.trim().charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function getEmojiCodePoints(emoji: string): string {
	const arr = [];
	for (const symbol of [...emoji]) {
		arr.push(symbol.codePointAt(0)!.toString(16).toUpperCase());
	}
	return arr.join("-");
}