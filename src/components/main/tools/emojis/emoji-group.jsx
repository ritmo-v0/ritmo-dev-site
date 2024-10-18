"use client";
import { useState, useEffect, useRef } from "react";
import { usePreviewStore } from "./stores";
import { VirtuosoGrid } from "react-virtuoso";

// Components & UI
import { SectionLayout } from "@/components/common/layouts";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";



export function EmojiGroup({ children, id, title, ...props }) {
	return (
		<AccordionItem value={id} {...props}>
			<AccordionTrigger>
				<div className="flex items-center gap-2">
					{title}
					{title === "People & Body" && <Badge variant="outline">建議收合</Badge>}
				</div>
			</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</AccordionItem>
	);
}

export function EmojiSubgroup({ subgroup }) {
	const title = subgroup.title
		.split(/[-\s]/)
		.map(word => word.trim().charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return (
		<SectionLayout title={title} titleAs="h4">
			<EmojiList emojis={subgroup.emojis} />
		</SectionLayout>
	);
}

export function EmojiList({ emojis }) {
	return emojis.length > 300 ? (
		<EmojiVirtuosoList emojis={emojis} />
	) : (
		<div className="flex flex-wrap gap-1">
			{emojis.map((emoji, index) => (
				<EmojiButton key={index} emoji={emoji} />
			))}
		</div>
	);
}

function EmojiVirtuosoList({ emojis }) {
	const ref = useRef();
	const [width, setWidth] = useState(1408);

	useEffect(() => {
		function handleResize() {
			if (ref.current) {
				setWidth(ref.current.getBoundingClientRect().width);
			}
		}

		// Initial resize
		handleResize();

		// Listen for resize events
		const resizeObserver = new ResizeObserver(handleResize);
		if (ref.current) resizeObserver.observe(ref.current);

		return () => {
			if (ref.current) resizeObserver.unobserve(ref.current);
		};
	}, []);

	const EMOJI_BUTTON_SIZE = 2.5;
	const GAP_SIZE = 0.25;
	const REM_SIZE = parseFloat(getComputedStyle(document.documentElement).fontSize);
	const columns = Math.floor(width / REM_SIZE / (EMOJI_BUTTON_SIZE + GAP_SIZE));
	const rows = Math.ceil(emojis.length / columns);
	const height = (rows - 1) * (EMOJI_BUTTON_SIZE + GAP_SIZE) + EMOJI_BUTTON_SIZE;

	return (
		<div ref={ref} className="w-full">
			<VirtuosoGrid
				totalCount={emojis.length}
				itemContent={index => <EmojiButton emoji={emojis[index]} />}
				overscan={REM_SIZE * (5 * (EMOJI_BUTTON_SIZE + GAP_SIZE) + EMOJI_BUTTON_SIZE)}
				listClassName="flex flex-wrap gap-1"
				style={{ height: `${height}rem` }}
			/>
		</div>
	);
}

function EmojiButton({ emoji }) {
	const addEmoji = usePreviewStore(state => state.addEmoji);

	function handleClick(emoji) {
		try {
			addEmoji(emoji.emoji);
			navigator.clipboard.writeText(emoji.emoji);
			console.log(`您複製了 ${emoji.emoji}`);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Tooltip delayDuration={500}>
			<TooltipTrigger asChild>
				<Button
					className="transition ease-out-expo duration-500 active:scale-[0.8]"
					variant="outline"
					size="icon"
					onClick={() => handleClick(emoji)}
				>
					<span className="text-[1.75rem]">{emoji.emoji}</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent>{emoji.name}</TooltipContent>
		</Tooltip>
	)
}