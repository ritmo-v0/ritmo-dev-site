import { generateNanoId } from "@/lib/utils";

// Constants & Variables
const VERSION_PREFIX = "# Version:";
const GROUP_PREFIX = "# group:";
const SUBGROUP_PREFIX = "# subgroup:";



export async function fetchEmojiTestFile() {
	try {
		const file = await fetch(process.env.EMOJI_TEST_URL).then(res => res.text())
		return file;
	} catch (error) {
		console.error(`ERR::EMOJI::FETCH: ${error.message}`);
		throw error;
	}
}

export function parseEmojiData(file) {
	let count = 0;
	let version = "";
	let emojiGroups = [];
	let currentGroup = null;
	let currentSubgroup = null;

	file.split("\n").map((line) => {
		// Skip empty lines or unrelated comments
		if (isUnrelated(line)) return;

		// Handle version
		if (isVersion(line)) {
			version = line.replace(VERSION_PREFIX, "").trim();
			return;
		}

		// Handle groups
		if (isGroup(line)) {
			currentGroup = {
				id: generateNanoId(),
				title: line.replace(GROUP_PREFIX, "").trim(),
				subgroups: [],
			};

			emojiGroups.push(currentGroup);
			return;
		}

		// Handle subgroups
		if (isSubgroup(line)) {
			currentSubgroup = {
				id: generateNanoId(),
				title: line.replace(SUBGROUP_PREFIX, "").trim(),
				emojis: [],
			};

			if (currentGroup) currentGroup.subgroups.push(currentSubgroup);
			return;
		}

		// Handle emoji entries
		if (!isComment(line) && currentSubgroup) {
			const [codePoints, details] = line.split(";").map(part => part.trim());
			const [status, description] = details.split("#").map(part => part.trim());

			const [emoji, ...rest] = description.split(" ");
			rest.shift();  // Remove Emoji version

			if (codePoints && status && description) {
				const emojiObject = {
					emoji,
					// code_points: codePoints,
					// status,
					name: rest.join(" "),
				}

				count++;
				if (currentSubgroup) currentSubgroup.emojis.push(emojiObject);
			}
		}
	});

	console.log(`${count} emojis parsed.`);
	return { version, groups: emojiGroups };
}

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