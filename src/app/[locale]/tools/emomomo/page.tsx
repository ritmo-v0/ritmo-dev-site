import { RedisRO } from "@/lib/db/redis";

// Components & UI
import { EmomomoPicker } from "@/components/main/tools/emomomo/picker";
import { EmomomoToolbar } from "@/components/main/tools/emomomo/toolbar";
import { Container } from "@/components/ui/container";

// Types & Interfaces
import type { EmojiData } from "@/lib/emomomo/types";

// Constants & Variables
import { EMOJI_DATA_REDIS_KEY } from "@/lib/emomomo/constants";
const CONTAINER_WIDTH = 720;



export default async function EmomomoPage() {
	const emojiData = await RedisRO.get<EmojiData>(EMOJI_DATA_REDIS_KEY);

	return (
		<>
			<Container
				className="sticky top-16 pb-6 z-10 bg-background"
				width={CONTAINER_WIDTH}
			>
				<div className="absolute inset-0 h-16 bg-inherit -translate-y-full -z-1" />
				<EmomomoToolbar />
			</Container>
			<Container width={CONTAINER_WIDTH}>
				{emojiData && <EmomomoPicker emojiData={emojiData} />}
			</Container>
		</>
	);
}