// Components & UI
import { Markdown } from "@/components/common/markdown";
import { H1, Muted } from "@/components/common/typography";

// Constants & Variables
const WIKI = `
## 当 Wiki の編集について

> wikiwiki では誰でも・自由にページの作成・編集が行えます。

また、記法についてはテンプレートが用意されており、<span class="text-destructive">CSS や HTML などの専門知識も必要ありません。</span>
**特に攻略部分の執筆は慢性的に人手が不足しています。皆様のご協力が必要不可欠です。**
あなたが見つけた情報、攻略法を広めてみませんか？
編集にご興味のある方は、まず初めに[編集ルール](https://wikiwiki.jp/chunithmwiki/%E7%B7%A8%E9%9B%86%E3%83%A1%E3%83%A2)をご一読ください。
情報提供は[情報提供掲示板](https://wikiwiki.jp/chunithmwiki/%E6%83%85%E5%A0%B1%E6%8F%90%E4%BE%9B%E6%8E%B2%E7%A4%BA%E6%9D%BF)へお願いします。

## 臨時規制情報

同一人物と思われる荒らしが断続的に発生した為、現在ドメイン「**mesh.ad.jp**」の広域編集規制を行っています。
BIGLOBE の回線を用いて編集を行っている方はお手数ですが SMS 認証をお願い致します。

### 今月の日替わりボーナス

| 曜日 | ボーナス | 効果 |
| --- | ------- | --- |
| 月 | マップマス数 +2 | マップ進行マス数計算における基本値が 3 に。全国対戦では 4 曲すべてに適用されるため 12 に |
| 火 | キャラクター EXP x1.5 | キャラ経験値計算におけるブースト効果が 1.5 倍。EXP ストック以外のチケットの経験値ブースト効果と重複する |
| 水 | マップマス数 +2 | マップ進行マス数計算における基本値が 3 に。全国対戦では 4 曲すべてに適用されるため 12 に |
| 木 | 超アバターチャンス | アバターチャンスの際、未獲得のコスチュームに「NEW」が表示される。※必ず未獲得のコスチュームが選択肢に現れるとは限らない |
| 金 | キャラクター EXP x1.5 | キャラ経験値計算におけるブースト効果が 1.5 倍。EXP ストック以外のチケットの経験値ブースト効果と重複する |
| <span class="text-blue-500">土</span> | ペンギンセレクション確定 | 全国対戦で必ずお題が出る。※期間中だけ「自由に選曲！※ボーナスはありません」がお題として出現しません |
| <span class="text-destructive">日</span> | マップのメモリー ×2 倍 | マップ移動画面上では「×2」表示。獲得アイテム一覧では2個表示 |

### 不具合情報

- 楽曲リザルト画面内に表示されるレーティングアップ演出において、不要なエフェクトが表示される。(2025/7/16 ~ )
	- バージョンアップ告知の時点で既知の不具合として記載されていた。今後のアップデートで修正予定。
- [Linked VERSE](https://wikiwiki.jp/chunithmwiki/Linked%20VERSE) において、楽曲プレイ開始直後から「Link FAILED…」の表示が最前面に現れ正常にプレイが出来ない不具合 (2025/7/16 ~ ?)
	- **発生条件不明。低確率ではあるものの要注意。**

不具合に関する新しい情報があれば[情報提供掲示板](https://wikiwiki.jp/chunithmwiki/%E6%83%85%E5%A0%B1%E6%8F%90%E4%BE%9B%E6%8E%B2%E7%A4%BA%E6%9D%BF)へお願いします。

## 関連サイト

- [公式サイト](https://chunithm.sega.jp/index.html)
- [CHUNITHM-NET](https://new.chunithm-net.com/)
- [イロドリミドリ公式サイト](https://chunithm.sega.jp/irodorimidori/)

## 設置店舗
公式サイトの[設置店舗一覧](https://location.am-all.net/alm/location?gm=109)

## プレイ規約
公式からの[プレイ規約 (2024 年 4 月 1 日改訂)](https://chunithm.sega.jp/play/rule/)

## 当サイトについて
SEGA のアーケード音楽ゲーム、CHUNITHM (チュウニズム) の有志 wiki です。
楽曲情報やキャラクターストーリーなどのネタバレもございますので閲覧の際はご注意下さい。

---

当 wiki は [Google アナリティクス](https://ja.wikipedia.org/wiki/Google_Analytics)を使用しております。

ページ内に広告が表示される事がありますが、wikiwiki 側の仕様であり管理者、編集者は一切の収益を得ておりません。
`;



export default function ChuniWikiPage() {
	return (
		<>
			<header>
				<H1>CHUNITHM Wiki へようこそ！！</H1>
				<Muted className="text-lg">
					あなたは{` `}
					<span className="font-bold text-[#00AD90]">
						1731000
					</span>
					{` `}匹目のペンギンです
				</Muted>
			</header>
			<main className="mt-8">
				<article className="[&_td]:nth-of-type-3:whitespace-normal">
					<Markdown>{WIKI}</Markdown>
				</article>
			</main>
		</>
	);
}