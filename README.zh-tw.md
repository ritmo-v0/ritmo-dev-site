[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ritmo-v0/ritmo-dev-site)

[![English](https://img.shields.io/badge/English-red)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-blue)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.zh-tw.md)
[![日本語](https://img.shields.io/badge/日本語-green)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.ja.md)

# 請問，這是鴿子嗎？🫴🦋

這是我個人網站的程式庫，託管於 [ritmo.dev](https://ritmo.dev)。

## 網站地圖

### [首頁](https://ritmo.dev)

目前這裡什麼都沒有。

### [文章](https://ritmo.dev/articles)

遊記、開發筆記、作品雜感，以及其他種種。

### [工具](https://ritmo.dev/tools)

#### [EMOMOMO <img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f609.svg" width="16" style="vertical-align: -0.2em;">](https://ritmo.dev/tools/emomomo)

一個表情符號選擇器，只需點擊一下即可複製表情符號；還附有一個文字區域，可以輸入文字並預覽與已複製表情符號的搭配效果。支援 Twemoji 和膚色篩選。

已撰寫排程任務，定期解析[最新一組 Unicode 表情符號](https://unicode.org/Public/emoji/latest/emoji-test.txt)並加以快取。

命名自 Ras 的歌曲 [EMOMOMO](https://youtu.be/F5GjEwI8wEA)（MV 由 yama_ko 製作）。

![EMOMOMO](https://img.ritmo.dev/tools/emomomo/thumbnail.webp)

#### [Tempus](https://ritmo.dev/tools/tempus)

一個 BPM 測量工具，靈感來自 [Rich Reel](https://www.all8.com/rich.htm) 的 [Tap for Beats Per Minute](https://www.all8.com/tools/bpm.htm)。自從我開始為節奏遊戲製作自製譜面以來便一直使用它，卻一直夢想著有一天學會前端開發後，能為它打造好看的外觀並加入更多功能。

![Tempus](https://img.ritmo.dev/tools/tempus/thumbnail.webp)

### 雜項

#### [INM Clock](https://ritmo.dev/stuff/inm-clock)

一個散發著惡臭的時鐘，在 `2025-05-14T19:19:00.810` 準時停下。

![INM Clock](https://img.ritmo.dev/stuff/inm-clock/thumbnail.webp)

#### [7sRef.exe](https://ritmo.dev/stuff/7sref)

##### [アシッド](https://ritmo.dev/stuff/7sref/arg)

與「アシッド」的訊息紀錄，出自 maimai DX 的 ARG 活動（7sRef 與 KALEIDXSCOPE 的最終章，自 2025/07/11 起開放）。

##### 歌曲頁面

活動中關鍵歌曲的歌詞及資訊展示頁。

- [ヨミビトシラズ](https://ritmo.dev/stuff/7sref/yomibito-shirazu)
- [Xaleid◆scopiX](https://ritmo.dev/stuff/7sref/xaleidscopix)
- [Ref:rain (for 7th Heaven)](https://ritmo.dev/stuff/7sref/refrain)

#### [《來自繽紛世界的明日》聖地巡禮活動資料](https://ritmo.dev/stuff/iroduku-pgm)

我的《色づく世界の明日から》聖地巡禮（2026）各式資料視覺化。好奇這趟旅程嗎？歡迎依序閱讀以下文章：

- [《來自繽紛世界的明日》聖地巡禮――福岡篇](https://ritmo.dev/articles/rJzdyAQoZe)
- 《來自繽紛世界的明日》聖地巡禮――長崎篇（上）
- 《來自繽紛世界的明日》聖地巡禮――長崎篇（下）

## shadcn/ui 元件庫

我自己開發、也在多數專案中使用的元件。安裝前，請先將此 registry 加入 `components.json`：

```bash
shadcn@latest registry add @ritmo_v0=https://ritmo.dev/r/{name}.json
```

或手動加入：

```json
{
	"registries": {
		"@ritmo_v0": "https://ritmo.dev/r/{name}.json"
	}
}
```

| 元件 | 指令 | 說明 |
| --- | --- | --- |
| JSON-LD | `shadcn@latest add @ritmo_v0/json-ld` | 從 schema-dts 型別化資料渲染 JSON-LD script 標籤。 |
| Twemoji | `shadcn@latest add @ritmo_v0/twemoji` | 透過 Next Image 將字串子元素中的表情符號渲染為 Twemoji SVG。 |

## 授權

表情符號由 Twemoji 提供，依 CC-BY 4.0 授權使用：https://creativecommons.org/licenses/by/4.0/

`/stuff/7sref` 路由下所使用圖片的所有版權歸 SEGA 及原創作者所有（除非另有標註）。「Ritmo」玩家頭像由本人繪製並擁有。

若您認為本節有所遺漏，歡迎聯絡我。