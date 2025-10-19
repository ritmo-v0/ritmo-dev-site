"use client";
import { cn } from "@/lib/utils";

// Components & UI
import MuxVideo from "@mux/mux-video-react";
import { H1, Muted, Wrapper } from "@/components/common/typography";

// Icons & Images
// import { RitmoIcon } from "@/components/common/icons";



export default function HomePage() {
	// TODO
	function onLoadedData() {
		return;
	}

	return (
		<div>
			<header className="relative grid h-svh">
				<MuxVideo
					className="absolute size-full object-cover pointer-events-none -z-1"
					playbackId="y59sBUGIp00f9LNwFpbb5ikGzLfJLdOYT34dfHejsgjc"
					autoPlay muted loop
					onLoadedData={onLoadedData}
				/>
				<div className={cn(
					"place-self-center flex items-center gap-16",
					"text-center text-white select-none",
					"text-shadow-[0px_0px_4em_white] opacity-65 mix-blend-plus-lighter",
				)}>
					{/* <RitmoIcon className="size-20 md:size-32" /> */}
					<div className="grid gap-y-4 md:gap-y-6">
						<H1 className="font-semibold text-6xl md:text-8xl">ritmo_v0</H1>
						<Muted className="text-2xl md:text-4xl text-muted-foreground">
							{`<PersonalWebsite />`}
						</Muted>
					</div>
				</div>
			</header>
			<Wrapper asChild>
				<main>
				</main>
			</Wrapper>
		</div>
	);
}