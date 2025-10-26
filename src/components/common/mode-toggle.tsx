"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Components & UI
import { Button } from "@/components/ui/button";

// Icons & Images
import { DesktopIcon, MoonStarsIcon, SunIcon } from "@phosphor-icons/react";

// Constants & Variables
const BUTTONS = [
	{ theme: "light", title: "Toggle light mode", icon: SunIcon, },
	{ theme: "system", title: "Toggle system theme", icon: DesktopIcon },
	{ theme: "dark", title: "Toggle dark mode", icon: MoonStarsIcon },
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
					title={button.title}
					variant="ghost"
					className="size-8 rounded-full not-first:-ml-1"
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