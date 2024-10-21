"use client";
import { useTheme } from "next-themes";

// Components & UI
import { Button } from "@/components/ui/button";

// Images & Icons
import { Monitor, Sun } from "lucide-react";
import { MoonIcon } from "@radix-ui/react-icons";



export function ThemeToggle() {
	const { setTheme } = useTheme();

	return (
		<div className="flex items-center gap-1">
			<Button title="切換至淺色模式" variant="ghost" className="size-8" onClick={() => setTheme("light")}>
				<Sun />
			</Button>
			<Button title="切換至系統主題" variant="ghost" className="size-8" onClick={() => setTheme("system")}>
				<Monitor />
			</Button>
			<Button title="切換至黑暗模式" variant="ghost" className="size-8" onClick={() => setTheme("dark")}>
				<MoonIcon />
			</Button>
		</div>
	);
}