import { cn } from "@/lib/utils";

// Components & UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



export function MetronomeCard({ className }: { className?: string }) {
	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<CardTitle>Metronome</CardTitle>
			</CardHeader>
			<CardContent className="grid auto-rows-min grid-cols-1 @xs/card:grid-cols-2 gap-8">

			</CardContent>
		</Card>
	);
}