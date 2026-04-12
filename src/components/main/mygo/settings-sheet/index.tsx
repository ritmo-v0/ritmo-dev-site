import { cn } from "@/lib/utils";

// Components & UI
import { ThemingSection } from "./theming-section";
import { WallpaperSection } from "./wallpaper-section";
import { BookmarksSection } from "./bookmarks-section";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

// Icons & Images
import { Settings2 } from "lucide-react";



export function SettingsSheet({ className }: React.ComponentProps<typeof Button>) {
	return (
		<Sheet>
			<SheetTrigger
				className={cn(className)}
				render={<Button variant="ghost" size="icon" />}>
				<Settings2 />
			</SheetTrigger>
			<SheetContent className="w-4/5">
				<SheetHeader>
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription>Customize your own experience.</SheetDescription>
				</SheetHeader>
				<div className="grid gap-6 px-6">
					<ThemingSection />
					<WallpaperSection />
					<BookmarksSection />
				</div>
				<SheetFooter>
					<SheetClose render={<Button variant="outline" />}>
						Close
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}