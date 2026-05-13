// Components & UI
import Image from "next/image";
import { Link, Muted } from "@/components/common/typography";

// Types & Interfaces
import type { Tool } from "@/lib/tools/types";
interface ToolCardProps extends Tool {
	title: string;
	description: string;
	url: string;
	imageUrl?: string;
};



export function ToolCard({
	id,
	title,
	description,
	url,
	imageUrl = "https://img.ritmo.dev/placeholder.webp"
}: ToolCardProps) {
	return (
		<Link
			id={id}
			href={url}
			variant="ghost"
			className="flex flex-col size-full focus-visible:"
		>
			<Image
				src={imageUrl}
				alt=""
				className="ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-[inherit]"
				sizes="(max-width: 45rem) 100vw, (max-width: 76rem) 50vw, 33vw"
				width={720}
				height={405}
				loading="eager"
			/>
			<div className="flex flex-col gap-1.5 h-full p-4">
				<div className="font-semibold text-lg/tight">
					{title}
				</div>
				<Muted className="text-pretty line-clamp-2">
					{description}
				</Muted>
			</div>
		</Link>
	);
}