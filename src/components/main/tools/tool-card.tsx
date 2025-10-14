// Components & UI
import Image from "next/image";
import { Link, Muted } from "@/components/common/typography";

// Types & Interfaces
import type { ToolMeta } from "@/types/meta";



export function ToolCard({
	id,
	color,
	imageUrl = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQRgPt9uBWlDj3kitow0r8z5VN42BInQgvEmGc",
	title,
	description,
	url,
}: ToolMeta) {
	return (
		<Link
			id={id}
			href={url}
			variant="nothing"
			className="flex flex-col size-full rounded-xl transition-colors hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
		>
			<Image
				src={imageUrl}
				alt={`OG image of the ${title} tool`}
				className="border rounded-xl object-cover"
				width={960}
				height={540}
			/>
			<div className="flex justify-between gap-x-4 p-4 h-full">
				<div>
					<div className="font-semibold text-lg">{title}</div>
					<Muted className="line-clamp-2">{description}</Muted>
				</div>
				<div
					className="self-end shrink-0 size-3 rounded-full"
					style={{ backgroundColor: color }}
				></div>
			</div>
		</Link>
	);
}