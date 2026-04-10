"use client";
import { useState } from "react";
import { useMyGOStore } from "@/lib/store/mygo";
import { cn } from "@/lib/utils";

// Components & UI
import Image from "next/image";
import { motion } from "motion/react";
import { Wrapper } from "@/components/common/typography";
import { SettingsSheet } from "@/components/main/mygo/settings-sheet";

// Types & Interfaces
type Bookmark = {
	id: string;
	title: string;
	href: string;
	image: string;
};

// Constants & Variables
import {
	TRANSITION_200_25,
	getContainerVariants,
	getChildVariants
} from "@/lib/transitions";
const BOOKMARKS: Bookmark[] = [
	{ id: "facebook", title: "Facebook", href: "https://www.facebook.com", image: "https://img.ritmo.dev/mygo/icon-facebook.webp" },
	{ id: "messenger", title: "Messenger", href: "https://www.facebook.com/messages/t", image: "https://img.ritmo.dev/mygo/icon-messenger.webp" },
	{ id: "instagram", title: "Instagram", href: "https://www.instagram.com", image: "https://img.ritmo.dev/mygo/icon-instagram.webp" },
	{ id: "twitter", title: "Twitter", href: "https://www.twitter.com", image: "https://img.ritmo.dev/mygo/icon-twitter.webp" },
	{ id: "youtube", title: "YouTube", href: "https://www.youtube.com", image: "https://img.ritmo.dev/mygo/icon-youtube.webp" },
	{ id: "threads", title: "Threads", href: "https://www.threads.net", image: "https://img.ritmo.dev/mygo/icon-threads.webp" },
	{ id: "ani-gamer", title: "巴哈姆特動畫瘋", href: "https://ani.gamer.com.tw", image: "https://img.ritmo.dev/mygo/icon-ani-gamer.webp" },
	{ id: "github", title: "GitHub", href: "https://github.com", image: "https://img.ritmo.dev/mygo/icon-github.webp" },
	{ id: "chatgpt", title: "ChatGPT", href: "https://chatgpt.com", image: "https://img.ritmo.dev/mygo/icon-chatgpt.webp" },
	{ id: "pixiv", title: "PIXIV", href: "https://www.pixiv.net", image: "https://img.ritmo.dev/mygo/icon-pixiv.webp" },
];



export default function MyGOPage() {
	return (
		<div className={cn(
			"fixed inset-0 bg-background z-1",
			"[&_img]:select-none [&_img]:touch-none [&_img]:pointer-events-none",
		)}>
			<MyGOWallpaper />
			<SettingsSheet className="absolute top-3.75 right-3.75 sm:top-8 sm:right-8" />
			<Wrapper boxSizing="border" className="relative size-full content-center lg:px-16 py-16 pointer-events-none">
				<motion.ul
					className={cn(
						"grid justify-items-center pointer-events-auto",
						"grid-cols-3 @2xl:grid-cols-4 @6xl:grid-cols-5",
						"gap-2 @4xl:gap-8 @6xl:gap-y-12",
					)}
					variants={getContainerVariants(0.025)}
					initial="hidden"
					animate="visible"
				>
					{BOOKMARKS.map(bookmark => (
						<Bookmark
							key={bookmark.id}
							bookmark={bookmark}
						/>
					))}
				</motion.ul>
			</Wrapper>
		</div>
	);
}

function MyGOWallpaper() {
	const { image, blur, opacity } = useMyGOStore();
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<motion.img
			src={image}
			className="absolute size-full object-cover scale-110"
			width={3840} height={2160}
			variants={getChildVariants(
				{ opacity: 0, filter: `blur(${blur / 2}px)` },
				{
					opacity,
					filter: `blur(${blur}px)`,
					transition: TRANSITION_200_25
				}
			)}
			initial="hidden"
			animate={isLoaded ? "visible" : "hidden"}
			onLoad={() => setIsLoaded(true)}
		/>
	);
}

function Bookmark({ bookmark }: { bookmark: Bookmark }) {
	return (
		<motion.li
			key={bookmark.id}
			variants={getChildVariants(
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, transition: TRANSITION_200_25 },
			)}
		>
			<a
				href={bookmark.href}
				rel="noopener noreferrer"
				className={cn(
					"group flex flex-col items-center justify-center p-4",
					"gap-3 @4xl:gap-4",
				)}
			>
				<Image
					src={bookmark.image}
					alt={bookmark.title}
					className={cn(
						"group-hover:ring-2 transition",
						"@max-md:max-w-20 @max-4xl:max-w-24",
						"rounded-3xl @md:rounded-4xl",
					)}
					width={128} height={128}
					priority
				/>
				<span className="font-medium text-sm @xl:text-base @6xl:text-lg text-center truncate">
					{bookmark.title}
				</span>
			</a>
		</motion.li>
	);
}