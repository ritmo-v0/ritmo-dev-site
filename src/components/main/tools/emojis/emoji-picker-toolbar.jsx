"use client";
import { usePreviewStore, useSubgroupStore, useSkinToneStore, useTwemojiStore } from "@/lib/store/emojis";
import { EmojiSkinTone } from "@/lib/emoji-utils";

// Components & UI
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";

// Images & Icons
import { ListTree, PartyPopper } from "lucide-react";



export function EmojiPickerToolbar() {
	const { preview, setPreview, clearPreview } = usePreviewStore();
	const { useSubgroup, setUseSubgroup } = useSubgroupStore();
	const { useTwemoji, setUseTwemoji } = useTwemojiStore();
	const { skinTone, setSkinTone } = useSkinToneStore();

	async function handleCopy() {
		try {
			requestAnimationFrame(async () => {
				await navigator.clipboard.writeText(preview);
				toast.success("已複製到剪貼簿。");
			});
		} catch (error) {
			toast.error("發生了一點🤏🌌小問題", {
				description: error.message
			});
		}
	}

	return (
		<div className="space-y-4">
			<div className="grid gap-2">
				<Label htmlFor="emoji-preview">預覽</Label>
				<Textarea
					id="emoji-preview"
					value={preview}
					rows="5"
					className="field-sizing-fixed"
					placeholder="點選下方按鈕新增 emoji…"
					onChange={(e) => setPreview(e.target.value)}
				/>
			</div>
			<div className="flex flex-wrap items-center justify-between gap-2">
				{/* Options */}
				<div className="flex items-center gap-2">
					<Toggle
						pressed={useSubgroup}
						onPressedChange={() => setUseSubgroup(!useSubgroup)}
						aria-label={`${useSubgroup ? "不" : ""}使用子分類`}
					>
						<ListTree />
						<span className="hidden sm:block">子分類</span>
					</Toggle>
					<Toggle
						pressed={useTwemoji}
						onPressedChange={() => setUseTwemoji(!useTwemoji)}
						aria-label={`${useTwemoji ? "不" : ""}使用 Twemoji`}
					>
						<PartyPopper />
						<span className="hidden sm:block">Twemoji</span>
					</Toggle>
					<Select value={skinTone} onValueChange={(value) => setSkinTone(value)}>
						<SelectTrigger title="選擇膚色" className="w-36">
							<SelectValue placeholder="選擇膚色" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(EmojiSkinTone).map(([key, value]) => (
								<SelectItem key={value} value={value}>{key}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Textarea */}
				<div className="flex items-center gap-2">
					<Button title="複製表情符號" variant="ghost" onClick={handleCopy}>複製</Button>
					<Button title="清除表情符號" variant="destructive" onClick={clearPreview}>清除</Button>
				</div>
			</div>
		</div>
	);
}