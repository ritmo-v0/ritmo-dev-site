"use client";
import { useState } from "react";
import { useMyGOStore } from "@/lib/store/mygo";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Components & UI
import Link from "next/link";
import Image from "next/image";
import { SettingsSheet } from "@/components/main/mygo/settings-sheet";
import { WrapperLayout } from "@/components/common/layouts";

// Types & Interfaces
import type { Variants } from "motion/react";
type Bookmark = {
	id: string;
	title: string;
	href: string;
	image: string;
};

// Constants & Variables
const BOOKMARKS: Bookmark[] = [
	{ id: "facebook", title: "Facebook", href: "https://www.facebook.com", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs1aij2TURjkKsgrZX5932Si8FNHcyhYTz6Gbqt" },
	{ id: "messenger", title: "Messenger", href: "https://www.facebook.com/messages/t", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs18IlgXqXGW4wLAeEmHVTRdPyDNvsZJn9YUfQ2" },
	{ id: "instagram", title: "Instagram", href: "https://www.instagram.com", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs1W3bGIsA7b0ZLSFHv5toEpJYqzcyXwDgBGnPx" },
	{ id: "twitter", title: "Twitter", href: "https://www.twitter.com", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs1zAE95G840tFjqwOsdi7pJbGuSoXxryegR9cT" },
	{ id: "youtube", title: "YouTube", href: "https://www.youtube.com", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs1ILYABRWUDQLh6AgySY2zHbcW9GoFsidRJqNk" },
	{ id: "threads", title: "Threads", href: "https://www.threads.net", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs1ziBKg3840tFjqwOsdi7pJbGuSoXxryegR9cT" },
	{ id: "ani-gamer", title: "巴哈姆特動畫瘋", href: "https://ani.gamer.com.tw", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs18LW1hbGW4wLAeEmHVTRdPyDNvsZJn9YUfQ2I" },
	{ id: "github", title: "GitHub", href: "https://github.com", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs1FxA6dX5OhkxaiHcUzpwqT9j7WKs24rnGQBYb" },
	{ id: "chatgpt", title: "ChatGPT", href: "https://chatgpt.com", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs10ZNkpZYmxTj5cmdVkoDGvCFWLOyHQ6RfzgAS" },
	{ id: "pixiv", title: "PIXIV", href: "https://www.pixiv.net", image: "https://ywu5w3rxj7.ufs.sh/f/qAQXfUAIKDs18ySrmDGW4wLAeEmHVTRdPyDNvsZJn9YUfQ2I" },
];
const CONTAINER_VARIANTS: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.025 } },
};
const CHILDREN_VARIANTS: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
};



export default function MyGOPage() {
	return (
		<div className="fixed inset-0 bg-background [&_img]:select-none [&_img]:touch-none [&_img]:pointer-events-none">
			<MyGoWallpaper />
			<SettingsSheet className="absolute top-8 right-8 z-1" />
			<WrapperLayout className="relative size-full content-center lg:px-16">
				<motion.div
					className={cn(
						"grid justify-items-center",
						"grid-cols-3 @2xl:grid-cols-4 @6xl:grid-cols-5",
						"gap-2 @4xl:gap-8 @6xl:gap-y-12",
					)}
					variants={CONTAINER_VARIANTS}
					initial="hidden"
					animate="visible"
				>
					{BOOKMARKS.map(bookmark => (
						<motion.div
							key={bookmark.id}
							variants={CHILDREN_VARIANTS}
						>
							<Bookmark bookmark={bookmark} />
						</motion.div>
					))}
				</motion.div>
			</WrapperLayout>
		</div>
	);
}

function MyGoWallpaper() {
	const { image, blur, opacity } = useMyGOStore();
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<motion.img
			src={image}
			alt="Background Image"
			className="absolute inset-0 object-cover size-full scale-120 transition-all"
			width={3840} height={2160}
			variants={{
				hidden: { opacity: 0, filter: `blur(0px)` },
				visible: {
					opacity,
					filter: `blur(${blur}px)`,
					transition: { type: "spring", stiffness: 200, damping: 25 }
				},
			}}
			initial="hidden"
			animate={isLoaded ? "visible" : "hidden"}
			onLoad={() => setIsLoaded(true)}
		/>
	);
}

function Bookmark({ bookmark }: { bookmark: Bookmark }) {
	return (
		<Link
			className={cn(
				"group flex flex-col items-center justify-center p-4",
				"gap-3 @4xl:gap-4",
			)}
			href={bookmark.href}
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
			/>
			<span className="font-medium text-sm @xl:text-base @6xl:text-lg text-center truncate">{bookmark.title}</span>
		</Link>
	);
}