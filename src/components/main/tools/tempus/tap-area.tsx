"use client";
import { useTempusStore } from "@/lib/store/tempus";
import { cn } from "@/lib/utils";

// Components & UI
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Muted } from "@/components/common/typography";

// Icons & Images
import {
	CircleArrowOutUpLeft,
	CornerDownLeft,
	MousePointerClick,
	Pointer,
	Space,
} from "lucide-react";



export function TapArea({ className }: React.ComponentProps<typeof Card>) {
	const addTap = useTempusStore(state => state.addTap);

	return (
		<Card
			className={cn(
				"flex items-center justify-center gap-4 w-full max-h-96 p-8 bg-secondary hover:bg-secondary/80 focus-visible:bg-secondary/80",
				"font-mono text-secondary-foreground border-2 border-dashed aspect-square @3xl:aspect-square cursor-pointer select-none transition-all",
				className,
			)}
			tabIndex={0}
			onClick={addTap}
		>
			<div className="space-y-1">
				<Muted className="text-center">
					{"Tap: "}
					<ShortcutKeyBadge>
						<span className="hidden xs:inline">Click</span>
						<MousePointerClick className="hidden xs:block" />
						<Pointer className="xs:hidden" />
					</ShortcutKeyBadge>{" "}
					<ShortcutKeyBadge>
						<span className="hidden xs:inline">Space</span>
						<Space />
					</ShortcutKeyBadge>{" "}
					<ShortcutKeyBadge>
						<span className="hidden xs:inline">Enter</span>
						<CornerDownLeft />
					</ShortcutKeyBadge>
				</Muted>
				<Muted className="text-center">
					{"Reset: "}
					<ShortcutKeyBadge>
						<span className="hidden xs:inline">Esc</span>
						<CircleArrowOutUpLeft />
					</ShortcutKeyBadge>
				</Muted>
			</div>
			<TapCount />
		</Card>
	);
}

function TapCount() {
	const taps = useTempusStore(state => state.taps);

	return <Muted>Taps: {taps.length}</Muted>;
}

function ShortcutKeyBadge({ children }: React.ComponentProps<typeof Badge>) {
	return (
		<Badge variant="outline" className="gap-2 text-secondary-foreground">
			{children}
		</Badge>
	);
}