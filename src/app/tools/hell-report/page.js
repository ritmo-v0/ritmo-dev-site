// Components & UI
import { WrapperLayout } from "@/components/common/layouts";
import {
	HellReportActionsSection,
	HellReportDetailSection,
	HellReportInfoSection,
} from "@/components/main/tools/hell-report/sections";



export default function HellReportPage() {
	return (
		<main>
			<WrapperLayout width={1000} className="h-full grid content-center">
				<HellReportInfoSection />
				<HellReportDetailSection />
				<HellReportActionsSection />
			</WrapperLayout>
		</main>
	);
}