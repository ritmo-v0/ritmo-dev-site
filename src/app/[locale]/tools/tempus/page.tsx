// Components & UI
import { Wrapper } from "@/components/common/typography";
import { TapArea } from "@/components/main/tools/tempus/tap-area";
import { MetronomeCard } from "@/components/main/tools/tempus/metronome-card";
import { AllTapsCard, LastTapsCard } from "@/components/main/tools/tempus/taps-cards";



export default function TempusPage() {
	return (
		<Wrapper className="grid gap-4 grid-cols-2 md:grid-cols-3">
			<TapArea className="col-span-full max-md:order-1" />
			<LastTapsCard />
			<AllTapsCard />
			<MetronomeCard className="max-md:col-span-full max-md:-order-1" />
		</Wrapper>
	);
}