"use client";
import { cn } from "@/lib/utils";

// Components & UI
import MuxVideo from "@mux/mux-video-react";
import { H1, P } from "@/components/common/typography";
import { WrapperLayout } from "@/components/common/layouts";



export default function HomePage() {
	// TODO
	function onLoadedData() {
		return;
	}

	return (
		<div>
			<header className="relative grid content-center justify-items-center h-[calc(100svh_-_3.5rem)]">
				<MuxVideo
					className="absolute bottom-0 w-full h-svh object-cover pointer-events-none -z-1"
					playbackId="y59sBUGIp00f9LNwFpbb5ikGzLfJLdOYT34dfHejsgjc"
					autoPlay muted loop
					onLoadedData={onLoadedData}
				/>
				<div className={cn(
					"space-y-10 text-center text-white -translate-y-[1.75rem] select-none",
					"[text-shadow:_0px_0px_4em_white] opacity-65 mix-blend-plus-lighter"
				)}>
					<H1 className="font-semibold text-7xl md:text-8xl">ritmo_v0</H1>
					<P className="text-2xl md:text-4xl text-muted-foreground">
						{`<PersonalWebsite />`}
					</P>
				</div>
			</header>
			<WrapperLayout asChild>
				<main>
				</main>
			</WrapperLayout>
		</div>
	);
}