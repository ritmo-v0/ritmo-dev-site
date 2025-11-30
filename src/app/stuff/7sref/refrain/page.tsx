"use client";
import { useRef, useState } from "react";
import { use7sRefStore } from "@/lib/store/7sref";
import { renderSections } from "@/lib/7sref/utils";
import { cn } from "@/lib/utils";

// Components & UI
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { Pre } from "@/components/common/shiki-highlighter";
import { IFrame, Section } from "@/components/common/typography";

// Types & Interfaces
import type { LyricLine } from "@/lib/7sref/types";

// Constants & Variables
const CODE_INTRO = `
PRiSM system ran into a problem and needs to restart. We're
just collecting fragments and errors, and then we'll restart
for you. (100% complete)

You need the key to access emotions:
PRiSM_INITIALIZATION_FAILED
`.trim();
const CODE_LOADING = `
C:¥7sRef¥SystemPRiSM>
******************************
** Welcome to KALEIDX_SCOPE **
** Thank you, and good bye. **
******************************

Loading music...
   produced by . . . . . . . . . . . . . : kamome sano
   vocal . . . . . . . . . . . . . . . . : haruka tsukishima
Connecting to Player(s)...
 * Starting system...                           [    ok    ]
 * Resurrecting 7sRef...                        [    ok    ]
 * Verifying 7 tones...
   1: G . . . . . . . . . . . . . . . . . . . . [    ok    ]
   2: C . . . . . . . . . . . . . . . . . . . . [    ok    ]
   3: D . . . . . . . . . . . . . . . . . . . . [    ok    ]
   4: E . . . . . . . . . . . . . . . . . . . . [    ok    ]
   5: F . . . . . . . . . . . . . . . . . . . . [    ok    ]
   6: E . . . . . . . . . . . . . . . . . . . . [    ok    ]
   7: D . . . . . . . . . . . . . . . . . . . . [    ok    ]
 * Verifying all fragments...                   [    ok    ]
 * Verifying doors...                           [    ok    ]
 * Verifying master key...                      [    ok    ]
 * Resurrecting areas...                        [  FAILED  ]
 * Resurrecting areas again...                  [    ok    ]
 * Recollecting yomibito_shirazu...             [    ok    ]
 * Simulating sky...                            [    ok    ]
 * Simulating stars...                          [    ok    ]
 * Returning emotion to BOXXX                   [    ok    ]
 * Loading story chart...                       [    ok    ]
 * Simulating storyboard...                     [    ok    ]
 * Visualizing 7sRef as board game...           [    ok    ]
`.trim();
const CODE_OUTRO = `
We ran into a problem, then you saved us. Thank you.
We're still collecting fragments and errors,
and now we'll restart this game.
Goodbye. (100% complete)

We're watching over you (through this round window):
PRiSM_INITIALIZATION_FAILED
`.trim();
const LYRICS: LyricLine[][] = [
	[
		{
			content: {
				"ja": "ソッ　　　　ト",
			}
		},
		{
			content: {
				"ja": "<ruby>ス<rt>s</rt></ruby>レ違イ",
			}
		},
		{
			content: {
				"ja": "<ruby>触<rt>f</rt></ruby>レヨウ　　ト",
			}
		},
		{
			content: {
				"ja": "<ruby>シ<rt>sh</rt></ruby>テイタ",
			}
		},
		{
			content: {
				"ja": "<ruby>ツ　キ<rt>月/尽き</rt></ruby>　ヘ　ト",
			}
		},
		{
			content: {
				"ja": "宝石　ガ　消エ",
			}
		},
		{
			content: {
				"ja": "凍エ切ッタ未明",
			}
		},
		{
			content: {
				"ja": "音デ満タシテヨ",
			}
		},
	],
	[
		{
			content: {
				"ja": "この画に飽きても",
			}
		},
	],
	[
		{
			content: {
				"ja": "探してきた　何を探しているのかも",
			}
		},
		{
			content: {
				"ja": "判らぬまま　何もかもを",
			}
		},
		{
			content: {
				"ja": "光求め　やがて眩んだ目は慣れ",
			}
		},
		{
			content: {
				"ja": "忘れてしまう　光の速さで",
			}
		},
	],
	[
		{
			content: {
				"ja": "繋がりたい　けれど優れていたい",
			}
		},
		{
			content: {
				"ja": "離れはじめたかつてのパンゲア",
			}
		},
		{
			content: {
				"ja": "集め続け　すべていずれは崩れて",
			}
		},
		{
			content: {
				"ja": "ただそれだけ",
			}
		},
		{
			content: {
				"ja": "知られないまま　腐った<ruby>得点<rt>score</rt></ruby>",
			}
		},
	],
	[
		{
			content: {
				"ja": "ずっと不安で　　　　　　　　<span class=\"font-mono\">//生きた意味とか</span>",
			}
		},
		{
			content: {
				"ja": "だけど君と居たくて　　　　　<span class=\"font-mono\">//居られるだけでいいと</span>",
			}
		},
		{
			content: {
				"ja": "何も要らない　　　　　　　　<span class=\"font-mono\">//他には</span>",
			}
		},
		{
			content: {
				"ja": "消して　　　　　　　　　　　<span class=\"font-mono\">//決して</span>",
			}
		},
		{
			content: {
				"ja": "それが間違いだって知った　　<span class=\"font-mono\">//ah　//知った</span>",
			}
		},
		{
			content: {
				"ja": "今更",
			}
		},
	],
	[
		{
			content: {
				"ja": "そう　今も",
			}
		},
		{
			content: {
				"ja": "火花揺らした風",
			}
		},
		{
			content: {
				"ja": "願い濡らした通り雨",
			}
		},
		{
			content: {
				"ja": "見つめていた世界を",
			}
		},
		{
			content: {
				"ja": "横で見たいって思う",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//いつまでだって</span>",
			}
		},
		{
			content: {
				"ja": "決められた線の向こうで　きっと",
			}
		},
	],
	[
		{
			content: {
				"ja": "行こう！　❱❱❱☆　❱❱❱☆　❱❱❱☆",
			}
		},
		{
			content: {
				"ja": "この夜の向こうへ君と　❱❱❱☆　❱❱❱☆　❱❱❱☆",
			}
		},
		{
			content: {
				"ja": "星空を壊してでも",
			}
		},
		{
			content: {
				"ja": "なんて「都合良い」って笑うのかな",
			}
		},
		{
			content: {
				"ja": "ああ！悴んでいくこの季節も",
			}
		},
		{
			content: {
				"ja": "やがて雪融けを待つ夢",
			}
		},
		{
			content: {
				"ja": "名もない想いよ届くまでさよなら",
			}
		},
	],
	[
		{
			content: {
				"ja": "<span class=\"font-mono\">//君をどこかで拒んで</span>",
			}
		},
		{
			content: {
				"ja": "閉ざしては",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//自分で描いた世界さえ傷つけてた</span>",
			}
		},
		{
			content: {
				"ja": "すべて傷つけてた",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//ごめんね</span>",
			}
		},
		{
			content: {
				"ja": "それでも",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//君が</span>",
			}
		},
		{
			content: {
				"ja": "叩いて光った粒が歌ってる　　<span class=\"font-mono\">//光ったnotesが歌ってる</span>",
			}
		},
		{
			content: {
				"ja": "有限で永遠の<ruby>リフレイン<rt>Ref:rain</rt></ruby>を",
			}
		},
	],
	[
		{
			content: {
				"ja": "<span class=\"font-mono\">//繰り返す五線譜の果て</span>",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//二重星が見えなくても</span>",
			}
		},
	],
	[
		{
			content: {
				"ja": "行こう！",
			}
		},
		{
			content: {
				"ja": "この夜の向こうへ君と",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//君と！</span>",
			}
		},
		{
			content: {
				"ja": "星空を壊してでも",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//それでも</span>",
			}
		},
		{
			content: {
				"ja": "なんて「都合良い」って笑うのかな",
			}
		},
		{
			content: {
				"ja": "ああ！",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//わかってるよ</span>",
			}
		},
		{
			content: {
				"ja": "鳴り止むとわかってる音",
			}
		},
		{
			content: {
				"ja": "<span class=\"font-mono\">//この曲も</span>",
			}
		},
		{
			content: {
				"ja": "仕組まれた表情さえも　　<span class=\"font-mono\">//emotionさえも</span>",
			}
		},
		{
			content: {
				"ja": "すべて「愛おしい」と思う季節に",
			}
		},
		{
			content: {
				"ja": "さよなら",
			}
		},
	],
	[
		{
			content: {
				"ja": "いまだけは",
			}
		},
	],
];



export default function RefrainPage() {
	const locale = use7sRefStore(state => state.locale);

	return (
		<main>
			<header className="mb-6">
				<IFrame
					src="https://www.youtube-nocookie.com/embed/-3wzWwhHW3g"
					title="Ref:rain (for 7th Heaven) - カモメサノエレクトリックオーケストラ include Limonène [maimai でらっくす]"
				/>
			</header>
			<article className="tracking-wider">
				{/* Intro */}
				<Section>
					<div className="px-4 py-12 bg-[#0100FF] **:bg-transparent! **:rounded-none **:text-white!">
						<p className="pt-8 font-mono text-8xl">:(</p>
						<RefrainPre code={CODE_INTRO} className="border-none" />
					</div>
				</Section>
				{renderSections([LYRICS[0]], locale, "font-mono")}
				{renderSections([LYRICS[1]], locale)}
				<Section>
					<SongTitle />
					<RefrainPre code={CODE_LOADING} className="mt-4 leading-tight" />
				</Section>

				{/* Main lyrics */}
				{renderSections(LYRICS.slice(2), locale)}

				{/* Outro */}
				<Section>
					<p className="pb-4 font-mono text-8xl">:)</p>
					<RefrainPre code={CODE_OUTRO} />
				</Section>
			</article>
		</main>
	);
}

function SongTitle() {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "0px 0px -20px 0px" });
	const [title, setTitle] = useState("refrain");

	return (
		<Button
			ref={ref}
			variant="nothing"
			title="Show spoiler"
			className="flex h-auto mx-auto p-0"
			onClick={() => {
				const hidden = "ヨミビトシラズ";
				if (title !== hidden) setTitle(hidden);
			}}
		>
			<motion.div
				className={cn(
					"grid grid-flow-col gap-2 md:gap-4",
					!isInView && "grid-stack",
				)}
				layout
			>
				{title.split("").map((char, index) => (
					<div
						key={index}
						className="grid size-8 xs:size-12 md:size-20 border border-foreground"
					>
						<span className="place-self-center block text-lg xs:text-3xl md:text-6xl -translate-y-[0.05em]">
							{char}
						</span>
					</div>
				))}
			</motion.div>
		</Button>
	);
}

function RefrainPre({
	className,
	code
}: React.ComponentProps<typeof Pre> & { code: string }) {
	return (
		<Pre
			code={code}
			className={cn(
				"font-black text-lg leading-relaxed tracking-[0.2em] [&_code]:font-mono-7sref!",
				className,
			)}
		/>
	);
}