import { RedisRO } from "@/lib/db/redis";

// Components & UI
import { EmojiPicker } from "@/components/main/tools/emomomo/emoji-picker";
import { EmojiPickerToolbar } from "@/components/main/tools/emomomo/emoji-picker-toolbar";
import { SectionLayout, WrapperLayout } from "@/components/common/layouts";

// Types & Interfaces
import type { EmojiData, CompEmojiEntry } from "@/types/emoji";

// Constants & Variables
import { EMOJI_DATA_REDIS_KEY } from "@/lib/emomomo/constants";

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 604800;  // 1 week (60 * 60 * 24 * 7)



export default async function EmomomoPage() {
	const emojiData = await RedisRO.get(EMOJI_DATA_REDIS_KEY) as EmojiData<CompEmojiEntry>;

	return (
		<main className="isolate">
			<div className="sticky top-14 mx-auto bg-background z-10">
				<WrapperLayout>
					<SectionLayout titleAs="h3">
						<EmojiPickerToolbar />
					</SectionLayout>
				</WrapperLayout>
			</div>
			<WrapperLayout>
				<SectionLayout titleAs="h3">
					{emojiData && <EmojiPicker emojiData={emojiData} />}
				</SectionLayout>
			</WrapperLayout>
		</main>
	);
}