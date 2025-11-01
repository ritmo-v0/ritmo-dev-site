"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Components & UI
import { Button } from "@/components/ui/button";

// Icons & Images
import { DesktopIcon, MoonStarsIcon, SunIcon } from "@phosphor-icons/react";

// Constants & Variables
const BUTTONS = [
	{ theme: "light", icon: SunIcon, },
	{ theme: "system", icon: DesktopIcon },
	{ theme: "dark", icon: MoonStarsIcon },
] as const;



export function ModeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	return (
		<div className="flex flex-nowrap items-center w-max border border-input rounded-full">
			{BUTTONS.map(button => (
				<Button
					key={button.theme}
					title={`Toggle ${button.theme} mode`}
					variant="ghost"
					size="icon-sm"
					className="rounded-full not-first:-ml-1"
					onClick={() => setTheme(button.theme)}
				>
					<button.icon
						weight={mounted && button.theme === theme ? "fill" : "regular"}
					/>
				</Button>
			))}
		</div>
	);
}