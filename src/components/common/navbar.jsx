"use client";
import { presets } from "@/lib/theme/presets";
import { useThemeStore } from "@/lib/store/theme";
// import { cn } from "@/lib/utils";

// Components & UI
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { ThemePresetSelect } from "./theme-preset-select";
import { WrapperLayout } from "@/components/common/layouts";



export default function Navbar() {
	const { preset, setPreset } = useThemeStore();

	return (
		<nav className="sticky top-0 h-14 bg-background z-50 isolate">
			{/* <div className={cn(
				"absolute inset-0 w-full h-[200%] backdrop-blur-xs -z-1",
				"bg-linear-to-t from-transparent to-background/80",
				"mask-linear-to-t mask-linear-from-transparent mask-linear-to-80% mask-linear-to-background",
			)} /> */}
			<WrapperLayout className="flex items-center justify-between gap-4 h-full">
				<Link href="/" className="font-bold">Ritmo.</Link>
				<div className="flex items-center gap-2">
					<ThemePresetSelect
						className="w-42 !h-8"
						presets={presets}
						currentPreset={preset}
						onPresetChange={(value) => setPreset(value)}
					/>
					<ThemeToggle />
				</div>
			</WrapperLayout>
		</nav>
	);
}