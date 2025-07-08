// Components & UI
import { WrapperLayout } from "@/components/common/layouts";
import { EmomomoUtilSection, EmomomoPickerSection } from "@/components/main/tools/emomomo/sections";



export default function EmomomoPage() {
	return (
		<main className="isolate">
			<div className="sticky top-14 mx-auto bg-background z-10">
				<WrapperLayout>
					<EmomomoUtilSection />
				</WrapperLayout>
			</div>
			<WrapperLayout>
				<EmomomoPickerSection />
			</WrapperLayout>
		</main>
	);
}