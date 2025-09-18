// Components & UI
import { Link, LI, UL } from "@/components/common/typography";



export default function SevensRefPage() {
	return (
		<UL>
			<LI>
				<Link href="/stuff/7sref/arg">ARG 對話文本</Link>
			</LI>
			<LI>
				<Link href="/stuff/7sref/yomibito-shirazu">ヨミビトシラズ</Link>
			</LI>
			<LI>
				<Link href="/stuff/7sref/refrain">
					Ref:rain (for 7th Heaven)
				</Link>
			</LI>
		</UL>
	);
}