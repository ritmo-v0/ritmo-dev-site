import { ModeToggle } from "@/components/common/mode-toggle";
import { ThemeSelect } from "@/components/common/theme-select";

// Components & UI
import { Label } from "@/components/ui/label";
import { SectionLayout } from "@/components/common/layouts";



export function ThemingSection() {
	return (
		<SectionLayout title="Theming" titleAs="h3">
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
		</SectionLayout>
	);
}