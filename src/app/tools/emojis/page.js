"use client";
import { useState } from "react";

// Components & UI
import { WrapperLayout } from "@/components/common/layouts";
import { EmojiToolUtilSection, EmojiToolDisplaySection } from "@/components/main/tools/emojis/sections";



export default function EmojiToolPage() {
	const [useSubgroup, setUseSubgroup] = useState(true);

	return (
		<main className="isolate">
			<div className="sticky top-14 md:top-18 mx-auto bg-background z-[1]">
				<WrapperLayout className="[--width:_88rem]">
					<EmojiToolUtilSection
						useSubgroup={useSubgroup}
						setUseSubgroup={setUseSubgroup}
					/>
				</WrapperLayout>
			</div>
			<WrapperLayout className="[--width:_88rem]">
				<EmojiToolDisplaySection useSubgroup={useSubgroup} />
			</WrapperLayout>
		</main>
	);
}