"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { renderSections } from "@/lib/7sref/utils";
import { cn } from "@/lib/utils";

// Components & UI
import { Pre } from "@/components/common/shiki-highlighter";
import { HR, IFrame, P, Section } from "@/components/common/typography";

// Types & Interfaces
import type { Locale } from "next-intl";
import type { LyricLine } from "@/lib/7sref/types";

// Constants & Variables
const MAX_ROLE_LENGTH = 6;
const CODE_INTRO = `
C:\\7sRef\\System256>metaverse

**********************************
** Welcome to METAVERSE v3.0+1.0
** Presented by Limonène
**********************************

Loading credit...
   produce. . . . . . . . . . . . . . . . . . : kamome sano
   vocal. . . . . . . . . . . . . . . . . . . : jaruka tsukishima

Connecting to metaverse...                                                       [    ok    ]
 * Initializing 7sRef...                                                         [    ok    ]
 * Starting system...                                                            [    ok    ]
 * Starting maimai...                                                            [    ok    ]
 * Starting network bridge...                                                    [    ok    ]
 * Recollecting senkou_hanabi                                                    [    ok    ]
 * Simulating rhythm game...                                                     [    ok    ]
 * Simulating 7sRef world...                                                     [    ok    ]
 * Writing lyrics...                                                             [  FAILED  ]
 * Writing lyrics again...                                                       [  FAILED  ]
 * Writing lyrics again and again...                                             [  FAILED  ]
 * Writing lyrics again and again and again...                                   [    ok    ]
 * Arranging for rhythm games...                                                 [    ok    ]
 * Playing the guitar...                                                         [    ok    ]
 * Playing the bass...                                                           [    ok    ]
 * Playing the keyboard...                                                       [    ok    ]
 * Singing with love...                                                          [    ok    ]
`.trim();
const CODE_OUTRO = `
A problem has been detect and 7sRef.exe has been shut down to prevent damage
to your world.


YOMIBITO_SHIRAZU

If this is the first time you've seen this Stop error screen,
<please> replay this song. If this screen appears again, follow these steps;

Check to make sure any new hardware or software is properly installed.
If this is a new installation, ask your hardware or software manufacturer
for any 7sRef updates you might need.

If problems continue, disable or remove any newly installed hardware
or software. Disable BIOS memory options such as caching or shadowing.
If you need to use Safe Mode to remove or disable components, restart
your world, select other song in this event, and do your best.

Meta information:

*** Limonène are kamome_sano and karuka_tsukishima <movie by hanaken>
`.trim();
const LYRICS: LyricLine[][] = [
	[
		{
			role: "リズ",
			content: {
				ja: "（星を見て）この世にある思い出の粒が目に見えるとして、夜空の光とどちらが多いのだろう？",
			},
		},
		{
			role: "アシッド",
			content: {
				ja: "（ナレーション風に）ざわめき立つ明かりを逃れて夜風は静か。うまく話せないふたりは火を灯した──。",
			},
		},
		{
			content: {
				ja: "なんてこうやって思い出して書き続けた",
			},
		},
	],
	[
		{
			content: {
				ja: "使い古されたメロディを手垢まみれの魔法で",
			},
		},
		{
			content: {
				ja: "捨てられると分かって歌うソドレミファミレド",
			},
		},
	],
	[
		{
			content: {
				ja: "あそびつかれたらさよなら",
			},
		},
		{
			content: {
				ja: "やがてあきがきてさよなら",
			},
		},
	],
	[
		{
			content: {
				ja: "ぼくらの資源は残酷にも有限だって",
			},
		},
		{
			content: {
				ja: "仕方ないって",
			},
		},
		{
			content: {
				ja: "わかってるよ",
			},
		},
		{
			content: {
				ja: "きっとすぐに",
			},
		},
		{
			content: {
				ja: "光は掠れて名前も忘れてしまうとして",
			},
		},
		{
			content: {
				ja: "（それでもぼくら）ふたりだけで",
			},
		},
		{
			content: {
				ja: "片隅を照らす瞬きを永遠にしたいと思う",
			},
		},
	],
	[
		{
			content: {
				ja: '掃いて捨てるほどの<ruby>記録<rt>archive</rt></ruby>の上<span className="animate-blink ml-0.5">|</span>',
			},
		},
		{
			content: {
				ja: "半径25cmの窓で",
			},
		},
		{
			content: {
				ja: "きみを見ている",
			},
		},
		{
			content: {
				ja: "まだ名前も何もない始まりも終わりもない距離感でいたい",
			},
		},
	],
	[
		{
			content: {
				ja: '```html\n<p class="hook">\n	"変わっていくよ"\n	<br>\n	"きみもぼくもすべては色褪せ"\n	<br>\n	"より強いキラキラが掻き消していって"\n	<br>\n	<!--ふたりの断片-->\n	"それでもいま夏風に揺れるこの星がいちばん眩しいと思う"\n	<br>\n</p>\n```',
			},
		},
	],
	[
		{
			role: "〇舞台装置（早朝）",
			content: {
				ja: "　すべての照明が消えていく。\n　消えていく書き割りの星空を創作物たち眺めている。",
			},
		},
		{
			role: "リズ",
			isRoleSpoiler: true,
			content: {
				ja: "静かに香る赤い赤い花火よ",
			},
		},
		{
			role: "アシッド",
			isRoleSpoiler: true,
			content: {
				ja: "どうかこのまま時間を止めて",
			},
		},
	],
	[
		{
			content: {
				ja: "<i>流れ行くように\n見失うように</i>",
			},
		},
		{
			content: {
				ja: "<i>いつかはぼくらも\nそっと消えてしまうのかな</i>",
			},
		},
	],
];



export default function YomibitoShirazuPage() {
	const locale = useLocale();

	return (
		<main>
			<header className="mb-6">
				<IFrame
					src="https://www.youtube-nocookie.com/embed/vEhZzJM-8DM"
					title="ヨミビトシラズ - Limonène [maimai でらっくす]"
				/>
			</header>
			<article className="tracking-wider">
				{/* Intro */}
				{renderSerifuList(LYRICS[0], locale)}
				<Section>
					<Pre code={CODE_INTRO} />
				</Section>

				{/* Main */}
				<HR />
				{renderSections(LYRICS.slice(1, -2), locale)}

				{/* Outro */}
				{renderSerifuList(LYRICS[LYRICS.length - 2], locale)}
				<HR className="mb-4" />
				{renderSections([LYRICS[LYRICS.length - 1]], locale)}
				<Section>
					<div className="bg-[#0100FF] **:bg-transparent! **:rounded-none [&_span]:text-white!">
						<Pre code={CODE_OUTRO} className="border-none" />
					</div>
				</Section>
			</article>
		</main>
	);
}

function renderSerifuList(section: LyricLine[], locale: Locale) {
	return (
		<Section className="space-y-4">
			{section.map(line => (
				<Serifu
					key={line.content.ja}
					line={line}
					locale={locale}
				/>
			))}
		</Section>
	);
}

function Serifu({ line, locale }: { line: LyricLine, locale: Locale }) {
	const [showRole, setShowRole] = useState(false);
	const role = line?.role || "";
	const isRoleSpoiler = !!line?.isRoleSpoiler;

	const isRoleLong = role.length >= MAX_ROLE_LENGTH;
	const PAD_LENGTH = !isRoleLong ? MAX_ROLE_LENGTH - role.length : 0;

	return (
		<div className={cn("flex", isRoleLong && "flex-col")}>
			{role && (
				<span className="shrink-0 leading-relaxed">
					{isRoleSpoiler ? (
						<button
							type="button"
							title="Show spoiler"
							className={cn(
								"relative before:transition-opacity before:ease-in-out before:duration-1500",
								"before:absolute before:block before:content-[''] before:size-full before:bg-foreground",
								showRole && "before:opacity-0 cursor-default",
							)}
							onClick={() => { if (!showRole) setShowRole(true) }}
						>
							{role}
						</button>
					) : role}
					{PAD_LENGTH > 0 && <span>{"　".repeat(PAD_LENGTH)}</span>}
				</span>
			)}
			<div className="flex">
				{isRoleLong && "　".repeat(MAX_ROLE_LENGTH)}
				<P className={cn("mt-0! whitespace-pre-wrap")}>
					{line.content[locale] || line.content.ja}
				</P>
			</div>
		</div>
	);
}