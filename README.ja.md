[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ritmo-v0/ritmo-dev-site)

[![English](https://img.shields.io/badge/English-red)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-blue)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.zh-tw.md)
[![日本語](https://img.shields.io/badge/日本語-green)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.ja.md)

# これは鳩ですか？🫴🦋

これは私の個人サイトのリポジトリです。[ritmo.dev](https://ritmo.dev) でホストされています。

## サイトマップ

### [ホーム](https://ritmo.dev)

今のところ何もありません。

### [記事](https://ritmo.dev/articles)

旅行記録、開発メモ、作品の雑感など。

### [ツール](https://ritmo.dev/tools)

#### [EMOMOMO <img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f609.svg" width="16" style="vertical-align: -0.2em;">](https://ritmo.dev/tools/emomomo)

ワンクリックで絵文字をコピーできる絵文字ピッカー。コピーした絵文字と一緒に文字を入力してプレビューできるテキストエリアも付いています。Twemoji と肌の色の絞り込みに対応。

[最新の Unicode 絵文字セット](https://unicode.org/Public/emoji/latest/emoji-test.txt)を定期的にパースしてキャッシュするクーロンジョブを作成済みです。

Ras の楽曲 [EMOMOMO](https://youtu.be/F5GjEwI8wEA) にちなんで命名（MV は yama_ko 制作）。

![EMOMOMO](https://img.ritmo.dev/tools/emomomo/thumbnail.webp)

#### [Tempus](https://ritmo.dev/tools/tempus)

[Rich Reel](https://www.all8.com/rich.htm) 氏の [Tap for Beats Per Minute](https://www.all8.com/tools/bpm.htm) にインスパイアされた BPM 計測ツール。自作の音ゲー譜面を作り始めた頃からずっと使っていましたが、いつかフロントエンドを学んだらちゃんとした見た目と豊富な機能を持たせたいとずっと夢見ていました。

![Tempus](https://img.ritmo.dev/tools/tempus/thumbnail.webp)

### いろいろ

#### [INM Clock](https://ritmo.dev/stuff/inm-clock)

こんなに臭い時計で、`2025-05-14T19:19:00.810` ちょうどに止まる。

![INM Clock](https://img.ritmo.dev/stuff/inm-clock/thumbnail.webp)

#### [7sRef.exe](https://ritmo.dev/stuff/7sref)

##### [アシッド](https://ritmo.dev/stuff/7sref/arg)

maimai DX の ARG イベント（7sRef と KALEIDXSCOPE の最終章、2025/07/11 より開催）にて登場した「アシッド」とのメッセージ記録です。

##### 楽曲ページ

イベントの重要楽曲の歌詞．情報表示ページ。

- [ヨミビトシラズ](https://ritmo.dev/stuff/7sref/yomibito-shirazu)
- [Xaleid◆scopiX](https://ritmo.dev/stuff/7sref/xaleidscopix)
- [Ref:rain (for 7th Heaven)](https://ritmo.dev/stuff/7sref/refrain)

#### [《色づく世界の明日から》聖地巡礼アクティビティデータ](https://ritmo.dev/stuff/iroduku-pgm)

私の『色づく世界の明日から』聖地巡礼（2026年）の各種データをビジュアライズしたページです。旅程が気になる方は、以下の記事を順番にどうぞ：

- [《來自繽紛世界的明日》聖地巡禮――福岡篇](https://ritmo.dev/articles/rJzdyAQoZe)
- 《來自繽紛世界的明日》聖地巡禮――長崎篇（上）
- 《來自繽紛世界的明日》聖地巡禮――長崎篇（下）

## shadcn/ui レジストリ

自身が開発し、ほとんどのプロジェクトで使用しているコンポーネントです。インストール前に、`components.json` へ registry を追加してください：

```bash
shadcn@latest registry add @ritmo_v0=https://ritmo.dev/r/{name}.json
```

または手動で追加：

```json
{
	"registries": {
		"@ritmo_v0": "https://ritmo.dev/r/{name}.json"
	}
}
```

| コンポーネント | コマンド | 説明 |
| ------------ | ------ | ---- |
| JSON-LD | `shadcn@latest add @ritmo_v0/json-ld` | schema-dts の型付きデータから JSON-LD の script タグをレンダリングします。 |
| Twemoji | `shadcn@latest add @ritmo_v0/twemoji` | 文字列の子要素の絵文字を Next Image 経由で Twemoji SVG としてレンダリングします。 |

## ライセンス

絵文字は Twemoji によって提供されており、CC-BY 4.0 のもとで使用しています：https://creativecommons.org/licenses/by/4.0/

`/stuff/7sref` ルート下で使用している画像の著作権は、特に明記されていない限り、SEGA および原作者に帰属します。「Ritmo」のプレイヤーアバターは私自身が描いたものです。

このセクションに漏れがあると思われる場合はご連絡ください。