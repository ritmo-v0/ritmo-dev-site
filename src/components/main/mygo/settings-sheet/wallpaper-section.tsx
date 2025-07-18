"use client";
import { useRef, useState } from "react";
import { useMyGOStore } from "@/lib/store/mygo";
import { ensureError } from "@/lib/fetch/response";

// Components & UI
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionLayout } from "@/components/common/layouts";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// Icons & Images
import { Check } from "lucide-react";
import { Muted } from "@/components/common/typography";



export function WallpaperSection() {
	const { blur, opacity, setBlur, setOpacity } = useMyGOStore();

	return (
		<SectionLayout title="Wallpaper" titleAs="h3">
			<div className="mt-4 grid gap-6">
				<ImageUrlInput />
				<div>
					<Label htmlFor="mygo-blur">Blur</Label>
					<div className="flex items-center gap-4">
						<Slider
							id="mygo-blur"
							name="mygo-blur"
							value={[blur]}
							min={0}
							max={20}
							step={1}
							onValueChange={(value) => setBlur(value[0])}
						/>
						<Muted className="w-[5ch] font-mono text-right">
							{blur}px
						</Muted>
					</div>
				</div>
				<div>
					<Label htmlFor="mygo-opacity">Opacity</Label>
					<div className="flex items-center gap-4">
						<Slider
							id="mygo-opacity"
							name="mygo-opacity"
							value={[opacity]}
							min={0}
							max={1}
							step={0.01}
							onValueChange={(value) => setOpacity(value[0])}
						/>
						<Muted className="w-[5ch] font-mono text-right">
							{Math.floor(100 * opacity)}%
						</Muted>
					</div>
				</div>
			</div>
		</SectionLayout>
	);
}

function ImageUrlInput() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("");

	const { image, setImage } = useMyGOStore();

	function handleInput() {
		const current = inputRef.current?.value ?? "";
		setValue(current);
	}

	function handleSave(url: string) {
		try {
			if (!url.trim()) {
				setImage(undefined);
				return;
			}

			new URL(url);
			setImage(url);
		} catch (err) {
			const error = ensureError(err);
			console.warn("ERR::MYGO::IMAGE:", error.message);
			toast.error("Invalid image URL. Please check the URL and try again.");
		}
	}

	return (
		<div className="space-y-3">
			<Label htmlFor="mygo-image">Image URL</Label>
			<div className="flex items-center gap-4">
				<Input
					id="mygo-image"
					ref={inputRef}
					type="url"
					defaultValue={image}
					onInput={handleInput}
				/>
				<Button
					size="icon"
					onClick={() => handleSave(value)}
					disabled={value === image}
				>
					<Check />
				</Button>
			</div>
		</div>
	);
}