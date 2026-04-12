// Components & UI
import Image from "next/image";
import { Link, Muted } from "@/components/common/typography";

// Types & Interfaces
import type { ToolMeta } from "@/types/meta";



export function ToolCard({
	id,
	color,
	imageUrl = "https://img.ritmo.dev/placeholder.webp",
	title,
	description,
	url,
}: ToolMeta) {
	return (
		<Link
			id={id}
			href={url}
			variant="ghost"
			className="flex flex-col size-full"
		>
			<Image
				src={imageUrl}
				alt={`OG image of the ${title} tool`}
				className="border rounded-[inherit] object-cover"
				width={720}
				height={405}
			/>
			<div className="flex justify-between gap-x-4 p-4 h-full">
				<div>
					<div className="font-semibold text-lg">{title}</div>
					<Muted className="line-clamp-2">{description}</Muted>
				</div>
				<div
					className="self-end shrink-0 size-3 bg-(--tool-color) rounded-full"
					style={{ "--tool-color": color } as React.CSSProperties}
				></div>
			</div>
		</Link>
	);
}