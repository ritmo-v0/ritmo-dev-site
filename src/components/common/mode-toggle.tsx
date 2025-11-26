"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";

// Icons & Images
import { DesktopIcon, MoonStarsIcon, SunIcon } from "@phosphor-icons/react";

// Constants & Variables
const MODES = {
	light: SunIcon,
	system: DesktopIcon,
	dark: MoonStarsIcon,
};



export function ModeToggle({ className }: React.ComponentProps<"div">) {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	return (
		<div className={cn(
			"flex flex-nowrap items-center w-max border border-input rounded-full",
			className,
		)}>
			{Object.entries(MODES).map(([mode, Icon]) => (
				<Button
					key={mode}
					title={`Toggle ${mode} mode`}
					variant="ghost"
					size="icon-sm"
					className="not-first:-ml-1"
					onClick={() => setTheme(mode)}
				>
					<Icon weight={mounted && mode === theme ? "fill" : "regular"} />
				</Button>
			))}
		</div>
	);
}