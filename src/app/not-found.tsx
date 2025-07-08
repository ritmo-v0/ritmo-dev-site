import { cn } from "@/lib/utils";

// Components & UI
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/common/typography";
import { WrapperLayout } from "@/components/common/layouts";

// Icons & Images
import { ArrowLeft } from "lucide-react";

// Types & Interfaces
type BeatDiceProps = {
	isActive?: boolean;
	pattern?: Array<1 | 0>;
	currentBeat?: number;
};



export default function NotFound() {
	return (
		<WrapperLayout className="justify-items-center content-center space-y-8">
			<div className="text-2xl">
				<MarkdownText>
					{`\\[ \\not\\exists p \\in P \\;:\\; p = p_{\\text{requested}} \\]`}
				</MarkdownText>
			</div>
			<div className="flex items-center gap-4">
				<BeatDice className="bg-chart-1" pattern={[1, 1, 1]} currentBeat={2} isActive />
				<BeatDice className="bg-chart-3" />
				<BeatDice className="bg-chart-4" pattern={[0, 0, 0, 0]} />
				<BeatDice className="bg-chart-5" />
			</div>
			<div>
				<Button asChild><Link href="/">
					<ArrowLeft />
					Back to Home
				</Link></Button>
			</div>
		</WrapperLayout>
	);
}

function BeatDice({
	className,
	isActive = false,
	pattern = [1, 1, 1, 1],
	currentBeat = 0,
}: React.ComponentProps<"div"> & BeatDiceProps) {
	return (
		<div
			data-active={isActive}
			className={cn("inline-flex items-center justify-center size-16 data-[active=false]:bg-muted-foreground rounded-xl hover:scale-110 transition-transform ease-out-expo duration-500", className)}
		>
			<div className="grid grid-cols-2 gap-3">
				{pattern.map((beat, index) => (
					<div
						key={index + 1}
						className={cn(
							"size-2.5 bg-black rounded-full",
							pattern.length === 3 && "first:col-span-full justify-self-center",
							!beat && "opacity-20",
							(isActive && index < currentBeat) && "bg-white",
						)}
					/>
				))}
			</div>
		</div>
	);
}