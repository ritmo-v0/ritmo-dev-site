"use client";
import { presets } from "@/lib/theme/presets";
import { useThemeStore } from "@/lib/store/theme";

// Components & UI
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { ThemePresetSelect } from "./theme-preset-select";
import { WrapperLayout } from "@/components/common/layouts";



export default function Navbar() {
	const { preset, setPreset } = useThemeStore();

	return (
		<nav className="sticky top-0 h-14 bg-background z-50">
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