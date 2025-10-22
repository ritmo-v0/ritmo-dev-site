import { cn } from "@/lib/utils";

// Components & UI
import { Markdown } from "@/components/common/markdown";
import { Section } from "@/components/common/typography";

// Types & Interfaces
import type { LyricLine } from "@/lib/7sref/types";

// Constants & Variables
const CODE_INTRO = `\`\`\`
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
\`\`\``;
const LYRICS: LyricLine[][] = [
	[
		{
			content: {
				"ja": "ソッ　　　　ト",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>ス<rt>s</rt></ruby>レ違イ",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>触<rt>f</rt></ruby>レヨウ　　ト",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>シ<rt>sh</rt></ruby>テイタ",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>ツ　キ<rt>月/尽き</rt></ruby>　ヘ　ト",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "宝石　ガ　消エ",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "凍エ切ッタ未明",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "音デ満タシテヨ",
				"zh-TW": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "この画に飽きても",
				"zh-TW": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "探してきた　何を探しているのかも",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "判らぬまま　何もかもを",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "光求め　やがて眩んだ目は慣れ",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "忘れてしまう　光の速さで",
				"zh-TW": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "繋がりたい　けれど優れていたい",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "離れはじめたかつてのパンゲア",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "集め続け　すべていずれは崩れて",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "ただそれだけ",
				"zh-TW": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "知られないまま　腐った<ruby>得点<rt>score</rt></ruby>",
				"zh-TW": "",
				"en": "",
			}
		},
	],
];



export default function RefrainPage() {
	return (
		<main>
			<header className="mb-6">
				<iframe
					className="w-full aspect-video rounded-xl"
					src="https://www.youtube-nocookie.com/embed/-3wzWwhHW3g"
					title="Ref:rain (for 7th Heaven) - カモメサノエレクトリックオーケストラ include Limonène [maimai でらっくす]"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			</header>
			<article>
				{/* Intro */}
				{LYRICS.slice(0, 2).map((section, index) => (
					<Section
						key={index}
						className={cn(index === 0 && "font-sans")}
					>
						<Markdown>
							{section.map(line => (
								`${line.content.ja}`
							)).join("\n\n")}
						</Markdown>
					</Section>
				))}
				<div className="my-8 [&_pre]:font-black [&_pre]:text-lg [&_pre]:tracking-[0.2em] [&_code]:font-mono-7sref!">
					<Markdown>{CODE_INTRO}</Markdown>
				</div>

				{/* Main lyrics */}
				{LYRICS.slice(2).map((section, index) => (
					<Section key={index}>
						<Markdown>
							{section.map(line => (
								`${line.content.ja}`
							)).join("\n\n")}
						</Markdown>
					</Section>
				))}
			</article>
		</main>
	);
}