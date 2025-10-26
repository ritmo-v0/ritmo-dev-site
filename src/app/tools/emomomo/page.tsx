import { RedisRO } from "@/lib/db/redis";

// Components & UI
import { EmomomoPicker } from "@/components/main/tools/emomomo/picker";
import { EmomomoToolbar } from "@/components/main/tools/emomomo/toolbar";
import { Wrapper } from "@/components/common/typography";

// Types & Interfaces
import type { EmojiData } from "@/lib/emomomo/types";

// Constants & Variables
import { EMOJI_DATA_REDIS_KEY } from "@/lib/emomomo/constants";

// Route Segment Config
export const dynamic = "force-static";
export const revalidate = 604800;  // 1 week (60 * 60 * 24 * 7)



export default async function EmomomoPage() {
	const emojiData = await RedisRO.get(EMOJI_DATA_REDIS_KEY) as EmojiData;

	return (
		<>
			<div className="sticky top-16 mx-auto bg-background z-10">
				<Wrapper className="relative py-2">
					<div className="absolute top-0 left-0 w-full h-16 bg-background -translate-y-full" />
					<EmomomoToolbar />
				</Wrapper>
			</div>
			<Wrapper className="py-3">
				{emojiData && <EmomomoPicker emojiData={emojiData} />}
			</Wrapper>
		</>
	);
}