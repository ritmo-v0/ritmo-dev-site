"use client";
import { useEmomomoStore } from "@/lib/store/emomomo";

// Components & UI
import { Twemoji } from "@/components/common/twemoji";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Types & Interfaces
import type { SkinToneKey } from "@/lib/emomomo/types";

// Constants & Variables
import { EMOJI_SKIN_TONES } from "@/lib/emomomo/constants";
const ITEMS = EMOJI_SKIN_TONES.map((skinTone, index) => ({
	value: skinTone,
	label: skinTone
		.replace("skin tone", "").replace("-", " ")
		.replace(/\b\w/g, char => char.toUpperCase()),
	emoji: index !== 0
		? String.fromCodePoint(0x1F3FA + index)
		: String.fromCodePoint(0x1F9B2),
}));



export function SkinToneSelect() {
	const skinTone = useEmomomoStore(state => state.skinTone);
	const setSkinTone = useEmomomoStore(state => state.setSkinTone);

	return (
		<Select<SkinToneKey> value={skinTone} onValueChange={setSkinTone}>
			<SelectTrigger className="sm:w-42">
				<SelectValue>
					{(value) => renderSelectItem(ITEMS[value])}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{ITEMS.map((item, index) => (
					<SelectItem
						key={item.value}
						value={index}
						className="flex items-center gap-3"
					>
						{renderSelectItem(item)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

const renderSelectItem = (item: typeof ITEMS[number]) => (
	<>
		<Twemoji className="m-0 size-4">
			{item.emoji}
		</Twemoji>
		<span className="max-sm:hidden">
			{item.label}
		</span>
	</>
);