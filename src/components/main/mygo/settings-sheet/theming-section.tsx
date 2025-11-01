// Components & UI
import { ModeToggle } from "@/components/common/mode-toggle";
import { ThemeSelect } from "@/components/common/theme-select";
import { Label } from "@/components/ui/label";



export function ThemingSection() {
	return (
		<section>
			<h3 className="font-heading font-semibold">
				Theming
			</h3>
			<div className="mt-4 grid gap-2">
				<div className="flex items-center justify-between gap-2">
					<Label>Theme</Label>
					<ThemeSelect />
				</div>
				<div className="flex items-center justify-between gap-2">
					<Label>Mode</Label>
					<ModeToggle />
				</div>
			</div>
		</section>
	);
}