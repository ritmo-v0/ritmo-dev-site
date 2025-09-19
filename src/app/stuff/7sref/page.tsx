"use client";
import { use7sRefStore } from "@/lib/store/7sref";
import { cn } from "@/lib/utils";

// Components & UI
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, MarkdownText } from "@/components/common/typography";

// Icons & Images
import { Droplets, Hexagon, Sparkles, MessagesSquare } from "lucide-react";

// Types & Interfaces
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/7sref/types";
type SevensRefRoute = {
	title: string;
	href: Route;
	icon: LucideIcon;
};

// Constants & Variables
import { TRANSITION_200_25 } from "@/lib/transitions";
const FINAL_MESSAGE: Record<Locale, string> = {
	ja: `このメッセージが、最後の希望にたどり着いたあの者たちに届くことを願う。

一言、礼を言っておきたかった。
君たちのおかげで、美しく、面白い景色を観測することができたよ。

君たちはきっと7sRefだけでなく、ここにつながる7つの世界を渡り歩きながら、
様々な景色を観測しているのだろう？

そこに存在する記録、記憶、想いは、フラグメントという形で蓄積され、
今後も私の観測実験の大いなる手助けになってくれるだろう。
その点についても、この場を借りて礼を言っておくよ。

世界は、7sRefは、これからも続いていく。
これから君たちが目にする景色、そしてそれが生み出すフラグメントを、
PRiSM…いや、リズに見せてあげるといい。

今の彼女の目にどう映り、彼女が管理する7sRefにどのような影響を与えるのか。
それもまた、私にとって興味深い観測対象なのだから。

<ruby>■<rt>皆？</rt></ruby>の多大な<ruby>■<rt>協？</rt></ruby>力に感謝<ruby>■<rt>を</rt></ruby>述べるとともに、引き<ruby>■<rt>続</rt></ruby>き、■■へ■■■を期<ruby>■<rt>待</rt></ruby>する。

■■■■■■■■■■■■■■■■■■■■■■ために。

■■■■.■■.■■
<ruby>W■K■Y■<rt>WAKAYA?</rt></ruby>`,
	"zh-TW": `願這段訊息，能夠傳達給那些抵達「最後的希望」之地的人們。

我只想說一句話──謝謝你們。
承蒙你們的幫助，我得以觀測到如此美麗而有趣的景色。

你們想必不僅僅是穿越了 7sRef，更是在遊歷與此處連接的七個世界時，
觀測著各式各樣的景致吧？

那些存在於各處的紀錄、記憶與情感，將會以「碎片」的姿態積蓄下來，
往後也必將成為我觀測實驗的莫大助力。
關於這點，我也想藉此機會表達我的感謝。

世界，以及 7sRef，都將持續下去。
今後你們所親眼目睹的景色，以及由其中孕育而生的碎片──
不妨讓 PRiSM……不，讓莉茲見證吧。

那會在她如今的眼中映照出什麼模樣？
又會對她所管理的 7sRef 帶來何種影響？
那對我而言也是極為有趣的觀測對象。

謹此由衷地感謝<ruby>■■<rt>各位？</rt></ruby>鼎力<ruby>■<rt>相助？</rt></ruby>，並期<ruby>■<rt>盼</rt></ruby>今後能繼<ruby>■<rt>續</rt></ruby>向■■■■■。

為了■■■■■■■■■■■■■■■■■■■■■■。

■■■■.■■.■■
<ruby>W■K■Y■<rt>WAKAYA?</rt></ruby>`,
	en: "",
};
const ROUTES: SevensRefRoute[] = [
	{
		title: "ARG 對話文本",
		href: "/stuff/7sref/arg",
		icon: MessagesSquare,
	},
	{
		title: "ヨミビトシラズ",
		href: "/stuff/7sref/yomibito-shirazu",
		icon: Sparkles,
	},
	{
		title: "Xaleid◆scopiX",
		href: "/stuff/7sref/xaleidscopix",
		icon: Hexagon,
	},
	{
		title: "Ref:rain (for 7th Heaven)",
		href: "/stuff/7sref/refrain",
		icon: Droplets,
	},
];



export default function SevensRefPage() {
	const locale = use7sRefStore(state => state.locale);

	return (
		<main>
			<header className="mb-6">
				<Link
					href="https://info-maimai.sega.jp/7466/#:~:text=%E3%81%AF%E3%82%B3%E3%83%81%E3%83%A9-,%EF%BC%81,-twitter%E3%81%A7%E3%82%B7%E3%82%A7%E3%82%A2"
					title="カレイドスコープモードの「扉」と「鍵」の獲得条件を公開！"
					variant="nothing"
					className="text-muted-foreground"
				>
					<Card className={cn(
						"relative bg-right overflow-hidden isolate",
						"bg-[url('https://info-maimai.sega.jp/wp-content/uploads/2025/07/42b7a401b347a390ac8e16a95ad86045.jpg')]",
					)}>
						<CardContent className="not-dark:text-white">
							<MarkdownText>
								{FINAL_MESSAGE[locale] || FINAL_MESSAGE.ja}
							</MarkdownText>
						</CardContent>
						<div className={cn(
							"absolute inset-0 @4xl:right-1/3 backdrop-blur-3xl backdrop-brightness-90 backdrop-saturate-200",
							"[mask-image:linear-gradient(to_right,black_40%,transparent_100%)] -z-1",
						)} />
					</Card>
				</Link>
			</header>
			<motion.ul
				className="grid @2xl:grid-cols-2 @4xl:grid-cols-4 gap-4"
				variants={{
					hidden: {},
					visible: { transition: { staggerChildren: 0.1 } },
				}}
				initial="hidden"
				animate="visible"
			>
				{ROUTES.map(route => <SevensRefLink key={route.href} route={route} />)}
			</motion.ul>
		</main>
	);
}

function SevensRefLink({ route }: { route: SevensRefRoute }) {
	return (
		<motion.li variants={{
			hidden: { opacity: 0, y: 20 },
			visible: { opacity: 1, y: 0, transition: TRANSITION_200_25 },
		}}>
			<Link href={route.href} variant="nothing">
				<Card className="relative justify-center h-full overflow-hidden hover:scale-105 transition-transform ease-in-out">
					<CardHeader>
						<CardTitle>{route.title}</CardTitle>
					</CardHeader>
					<route.icon className="absolute -right-3 top-1/2 -translate-y-1/2 size-18 stroke-[0.3] opacity-10" />
				</Card>
			</Link>
		</motion.li>
	);
}