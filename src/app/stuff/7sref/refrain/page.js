"use client";
import { cn } from "@/lib/utils";

// Components & UI
import { SectionLayout } from "@/components/common/layouts";
import { MarkdownText } from "@/components/common/typography";

// Constants & Variables
const CODE_INTRO = `
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
`;
const LYRICS = [
	[
		{
			content: {
				"ja": "ソッ　　　　ト",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>ス<rt>s</rt></ruby>レ違イ",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>触<rt>f</rt></ruby>レヨウ　　ト",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>シ<rt>sh</rt></ruby>テイタ",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "<ruby>ツ　キ<rt>月/尽き</rt></ruby>　ヘ　ト",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "宝石　ガ　消エ",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "凍エ切ッタ未明",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "音デ満タシテヨ",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "この画に飽きても",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "探してきた　何を探しているのかも",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "判らぬまま　何もかもを",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "光求め　やがて眩んだ目は慣れ",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "忘れてしまう　光の速さで",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "繋がりたい　けれど優れていたい",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "離れはじめたかつてのパンゲア",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "集め続け　すべていずれは崩れて",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "ただそれだけ",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "知られないまま　腐った<ruby>得点<rt>score</rt></ruby>",
				"zh-tw": "",
				"en": "",
			}
		},
	],
];



export default function RefrainPage() {
	return (
		<>
			<iframe
				className="w-full aspect-video rounded-xl"
				src="https://www.youtube-nocookie.com/embed/-3wzWwhHW3g"
				title="Ref:rain (for 7th Heaven) - カモメサノエレクトリックオーケストラ include Limonène [maimai でらっくす]"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			/>
			<SectionLayout>
				{/* Intro */}
				{LYRICS.slice(0, 2).map((section, index) => (
					<SectionLayout
						key={index}
						className={cn(index === 0 && "font-sans")}
					>
						<MarkdownText>
							{section.map(line => (
								`${line.content.ja}`
							)).join("\n\n")}
						</MarkdownText>
					</SectionLayout>
				))}
				<div className="my-8 [&_pre]:font-black [&_pre]:text-lg [&_pre]:tracking-[0.2em] [&_code]:font-mono-7sref!">
					<MarkdownText>
						{`\`\`\`plaintext\n${CODE_INTRO}\n\`\`\``}
					</MarkdownText>
				</div>

				{/* Main lyrics */}
				{LYRICS.slice(2).map((section, index) => (
					<SectionLayout key={index}>
						<MarkdownText>
							{section.map(line => (
								`${line.content.ja}`
							)).join("\n\n")}
						</MarkdownText>
					</SectionLayout>
				))}
			</SectionLayout>
		</>
	);
}