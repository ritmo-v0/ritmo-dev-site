"use client";
import { usePreviewStore } from "./stores";
import { useToast } from "@/hooks/use-toast";
import { generateToastObject } from "@/lib/toast-utils";

// SWR
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

// Components & UI
import { EmojiGroup, EmojiSubgroup, EmojiList } from "./emoji-group";
import { SectionLayout } from "@/components/common/layouts";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { TooltipProvider } from "@/components/ui/tooltip";

// Images & Icons
import { ListTree } from "lucide-react";
import { Switch } from "@/components/ui/switch";



export function EmojiToolUtilSection({ useSubgroup, setUseSubgroup, ...props }) {
	const { toast } = useToast();
	const { preview, setPreview, clearPreview } = usePreviewStore();

	function handleCopy() {
		try {
			navigator.clipboard.writeText(preview);
			toast(generateToastObject("info", "Copied to clipboard!"));
		} catch (error) {
			toast(generateToastObject("warning", "Copied to clipboard!"));
		}
	}

	return (
		<SectionLayout {...props}>
			<div className="space-y-4">
				<Textarea value={preview} onChange={(e) => setPreview(e.target.value)} />
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Toggle
							pressed={useSubgroup}
							onPressedChange={() => setUseSubgroup(prevState => !prevState)}
							aria-label="Toggle subgroup"
						>
							<ListTree className="size-4" />
							<span className="hidden xs:block ml-2">子分類</span>
						</Toggle>
						<div className="flex items-center space-x-2">
							<Switch id="use-twemoji" />
							<Label htmlFor="use-twemoji">使用 Twemoji</Label>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="ghost" onClick={handleCopy}>複製</Button>
						<Button variant="destructive" onClick={clearPreview}>清除</Button>
					</div>
				</div>
			</div>
		</SectionLayout>
	);
}

export function EmojiToolDisplaySection({ useSubgroup, ...props }) {
	const { data, error, isLoading } = useSWRImmutable("/api/emojis", fetcher);
	const emojiData = data?.data || [];

	return (
		<SectionLayout {...props}>
			{error ? (
				<span>{error.message}</span>
			) : isLoading ? (
				null
			) : (
				<TooltipProvider>
					<Accordion type="multiple" defaultValue={emojiData.groups.map(group => group.id)}>
						{emojiData.groups.map(group => (
							<EmojiGroup key={group.id} id={group.id} title={group.title}>
								{useSubgroup ? (
									group.subgroups.map(subgroup => (
										<EmojiSubgroup key={subgroup.id} subgroup={subgroup} />
									))
								) : (
									<EmojiList emojis={group.subgroups.flatMap(subgroup => subgroup.emojis)} />
								)}
							</EmojiGroup>
						))}
					</Accordion>
				</TooltipProvider>
			)}
		</SectionLayout>
	);
}