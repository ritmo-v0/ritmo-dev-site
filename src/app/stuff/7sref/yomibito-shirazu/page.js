"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Components & UI
import { SectionLayout, WrapperLayout } from "@/components/common/layouts";
import { HR, MarkdownText, P } from "@/components/common/typography";

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
`;
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
`;
const LYRICS = [
	[
		{
			role: "リズ",
			content: {
				"ja": "（星を見て）この世にある思い出の粒が目に見えるとして、夜空の光とどちらが多いのだろう？",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			role: "アシッド",
			content: {
				"ja": "（ナレーション風に）ざわめき立つ明かりを逃れて夜風は静か。うまく話せないふたりは火を灯した──。",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "なんてこうやって思い出して書き続けた",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "使い古されたメロディを手垢まみれの魔法で",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "捨てられると分かって歌うソドレミファミレド",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "あそびつかれたらさよなら",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "やがてあきがきてさよなら",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "ぼくらの資源は残酷にも有限だって",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "仕方ないって",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "わかってるよ",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "きっとすぐに",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "光は掠れて名前も忘れてしまうとして",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "（それでもぼくら）ふたりだけで",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "片隅を照らす瞬きを永遠にしたいと思う",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			showCursor: true,
			content: {
				"ja": "掃いて捨てるほどの<ruby>記録<rt>archive</rt></ruby>の上",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "半径25cmの窓で",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "きみを見ている",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "まだ名前も何もない始まりも終わりもない距離感でいたい",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "\`\`\`html\n<p class=\"hook\">\n	\"変わっていくよ\"\n	<br>\n	\"きみもぼくもすべては色褪せ\"\n	<br>\n	\"より強いキラキラが掻き消していって\"\n	<br>\n	<!--ふたりの断片-->\n	\"それでもいま夏風に揺れるこの星がいちばん眩しいと思う\"\n	<br>\n</p>",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			role: "〇舞台装置（早朝）",
			content: {
				"ja": "　すべての照明が消えていく。\n　消えていく書き割りの星空を創作物たち眺めている。",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			role: "リズ",
			isRoleSpoiler: true,
			content: {
				"ja": "静かに香る赤い赤い花火よ",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			role: "アシッド",
			isRoleSpoiler: true,
			content: {
				"ja": "どうかこのまま時間を止めて",
				"zh-tw": "",
				"en": "",
			}
		},
	],
	[
		{
			content: {
				"ja": "流れ行くように\n見失うように",
				"zh-tw": "",
				"en": "",
			}
		},
		{
			content: {
				"ja": "いつかはぼくらも\nそっと消えてしまうのかな",
				"zh-tw": "",
				"en": "",
			}
		},
	],
];



export default function YomibitoShirazuPage() {
	return (
		<WrapperLayout className="font-serif-7sref" width={960}>
			<iframe
				className="w-full aspect-video rounded-xl"
				src="https://www.youtube-nocookie.com/embed/vEhZzJM-8DM"
				title="ヨミビトシラズ - Limonène [maimai でらっくす]"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			/>
			<SectionLayout>
				{/* Intro */}
				<SectionLayout className="space-y-4">
					{LYRICS[0].map((line, index) => (
						<Serifu key={index} line={line} />
					))}
				</SectionLayout>
				<div className="my-8">
					<MarkdownText>
						{`\`\`\`plaintext\n${CODE_INTRO}\n\`\`\``}
					</MarkdownText>
				</div>

				{/* Main lyrics */}
				{LYRICS.slice(1, -2).map((section, index) => (
					<SectionLayout key={index}>
						<MarkdownText>
							{section.map(line => (
								`${line.content.ja}`
							)).join("\n\n")}
						</MarkdownText>
					</SectionLayout>
				))}

				{/* Outro */}
				<SectionLayout className="space-y-4">
					{LYRICS[LYRICS.length - 2].map((line, index) => (
						<Serifu key={index} line={line} />
					))}
				</SectionLayout>
				<HR className="mb-4" />
				<SectionLayout>
					<MarkdownText>
						{LYRICS[LYRICS.length - 1].map(line => (
							`${line.content.ja}`
						)).join("\n\n")}
					</MarkdownText>
				</SectionLayout>
				<div className="my-8">
					<MarkdownText>
						{`\`\`\`plaintext\n${CODE_OUTRO}\n\`\`\``}
					</MarkdownText>
				</div>
			</SectionLayout>
		</WrapperLayout>
	);
}

function Serifu({ line }) {
	const [showRole, setShowRole] = useState(false);
	const role = line?.role || "";
	const isRoleSpoiler = line?.isRoleSpoiler || false;

	const isRoleLong = role.length >= MAX_ROLE_LENGTH;
	const PAD_LENGTH = !isRoleLong ? MAX_ROLE_LENGTH - role.length : 0;

	function handleRoleClick() {
		if (isRoleSpoiler && !showRole) setShowRole(true);
	}

	return (
		<div className={cn("flex", isRoleLong && "flex-col")}>
			{line.role && (
				<span className="shrink-0 leading-relaxed">
					<span
						className={cn(
							"relative before:transition-opacity before:ease-in-out before:duration-1500",
							isRoleSpoiler && "before:absolute before:block before:content-[''] before:size-full before:bg-foreground cursor-pointer",
							isRoleSpoiler && showRole && "before:opacity-0 cursor-default"
						)}
						onClick={handleRoleClick}
					>
						{line.role}
					</span>
					{PAD_LENGTH > 0 && <span>{"　".repeat(PAD_LENGTH)}</span>}
				</span>
			)}
			<div className="flex">
				{isRoleLong && "　".repeat(MAX_ROLE_LENGTH)}
				<P className={cn("!mt-0 whitespace-pre-wrap")}>
					{line.content.ja}
				</P>
			</div>
		</div>
	);
}