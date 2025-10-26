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



export function SkinToneSelect() {
	const skinTone = useEmomomoStore(state => state.skinTone);
	const setSkinTone = useEmomomoStore(state => state.setSkinTone);

	return (
		<Select
			value={skinTone}
			onValueChange={(value) => setSkinTone(value as SkinToneKey)}
		>
			<SelectTrigger title="Select a skin tone" className="sm:w-42">
				<SelectValue placeholder="Skin tone" />
			</SelectTrigger>
			<SelectContent>
				{EMOJI_SKIN_TONES.map((value, index) => (
					<SelectItem
						key={value}
						value={index.toString()}
						className="flex items-center gap-3"
					>
						<Twemoji className="m-0 size-4">
							{index !== 0
								? String.fromCodePoint(0x1F3FA + index)
								: String.fromCodePoint(0x1F9B2)
							}
						</Twemoji>
						<span className="max-sm:hidden">
							{value
								.replace("skin tone", "").replace("-", " ")
								.replace(/\b\w/g, char => char.toUpperCase())
							}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}