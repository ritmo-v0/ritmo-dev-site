// Components & UI
import { WrapperLayout } from "@/components/common/layouts";
import { EmojiToolUtilSection, EmojiToolPickerSection } from "@/components/main/tools/emojis/sections";



export default function EmojiToolPage() {
	return (
		<main className="isolate">
			<div className="sticky top-14 mx-auto bg-background z-10">
				<WrapperLayout>
					<EmojiToolUtilSection />
				</WrapperLayout>
			</div>
			<WrapperLayout>
				<EmojiToolPickerSection />
			</WrapperLayout>
		</main>
	);
}