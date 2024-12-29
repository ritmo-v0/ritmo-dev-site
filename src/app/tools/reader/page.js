// Components & UI
import { WrapperLayout } from "@/components/common/layouts";
import { TxtReaderDisplaySection } from "@/components/main/tools/reader/sections";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Image & Icons
import { TextIcon } from "@radix-ui/react-icons";



export default function TxtReaderPage() {
	return (
		<>
			<div className="sticky top-14 mx-auto bg-background z-10">
				<WrapperLayout>
					<ToggleGroup type="single" size="sm" defaultValue="md">
						<ToggleGroupItem value="sm" aria-label="Toggle font-sm">
							<TextIcon className="size-4 scale-75" />
						</ToggleGroupItem>
						<ToggleGroupItem value="md" aria-label="Toggle font-md">
							<TextIcon className="size-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="lg" aria-label="Toggle font-lg">
							<TextIcon className="size-4 scale-125" />
						</ToggleGroupItem>
					</ToggleGroup>
				</WrapperLayout>
			</div>
			<WrapperLayout className="h-max font-serif font-extralight">
				<TxtReaderDisplaySection />
			</WrapperLayout>
		</>
	);
}