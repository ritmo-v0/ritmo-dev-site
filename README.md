[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ritmo-v0/ritmo-dev-site)

[![English](https://img.shields.io/badge/English-red)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-blue)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.zh-tw.md)
[![日本語](https://img.shields.io/badge/日本語-green)](https://github.com/ritmo-v0/ritmo-dev-site/blob/main/README.ja.md)

# Is this a pigeon? 🫴🦋

This is the repo of my personal website, hosted on [ritmo.dev](https://ritmo.dev).

## Sitemap

### [Homepage](https://ritmo.dev)

There's nothing in here currently.

### [Articles](https://ritmo.dev/articles)

Articles about travel, development, and thoughts on various works.

### [Tools](https://ritmo.dev/tools)

#### [EMOMOMO <img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f609.svg" width="16" style="vertical-align: -0.2em;">](https://ritmo.dev/tools/emomomo)

An emoji picker that allows you to copy emojis by just one click; it also has a textarea that allows typing and previewing the looks along with the emojis copied into. Supports Twemoji and skin tone filtering.

A cron job is written to periodically parse the [latest set of Unicode emojis](https://unicode.org/Public/emoji/latest/emoji-test.txt) and cached.

Named after the song [EMOMOMO](https://youtu.be/F5GjEwI8wEA) by Ras (MV by yama_ko).

![EMOMOMO](https://img.ritmo.dev/tools/emomomo/thumbnail.webp)

#### [Tempus](https://ritmo.dev/tools/tempus)

A BPM measuring tool inspired from [Tap for Beats Per Minute](https://www.all8.com/tools/bpm.htm) by [Rich Reel](https://www.all8.com/rich.htm). Been using it since I started writing custom rhythm game charts, but always dreamed of giving it a good look and more functionality one day when I learn front-end.

![Tempus](https://img.ritmo.dev/tools/tempus/thumbnail.webp)

### Stuff

#### [INM Clock](https://ritmo.dev/stuff/inm-clock)

A clock, giving off a terrible stench, that stops at exactly `2025-05-14T19:19:00.810`.

![INM Clock](https://img.ritmo.dev/stuff/inm-clock/thumbnail.webp)

#### [7sRef.exe](https://ritmo.dev/stuff/7sref)

##### [アシッド](https://ritmo.dev/stuff/7sref/arg)

The message record with "アシッド" that appeared in maimai DX's ARG event (the last chapter of 7sRef and KALEIDXSCOPE, starting from 2025/07/11).

##### Song Pages

Stylized lyrics and information display of critical songs in the event.

- [ヨミビトシラズ](https://ritmo.dev/stuff/7sref/yomibito-shirazu)
- [Xaleid◆scopiX](https://ritmo.dev/stuff/7sref/xaleidscopix)
- [Ref:rain (for 7th Heaven)](https://ritmo.dev/stuff/7sref/refrain)

#### [_Iroduku: The World in Colors_ Pilgrimage Activity Data](https://ritmo.dev/stuff/iroduku-pgm)

Various data visualization of my _Iroduku: The World in Colors_ Pilgrimage (2026). Curious about the trip? Check out the following articles in order:

- [《來自繽紛世界的明日》聖地巡禮――福岡篇](https://ritmo.dev/articles/rJzdyAQoZe)
- 《來自繽紛世界的明日》聖地巡禮――長崎篇（上）
- 《來自繽紛世界的明日》聖地巡禮――長崎篇（下）

## shadcn/ui Registries

Components I built and use across most of my projects. Add the registry to your `components.json` before installing:

```bash
shadcn@latest registry add @ritmo_v0=https://ritmo.dev/r/{name}.json
```

or manually:

```json
{
	"registries": {
		"@ritmo_v0": "https://ritmo.dev/r/{name}.json"
	}
}
```

| Component | Command | Description |
| --------- | ------- | ----------- |
| JSON-LD | `shadcn@latest add @ritmo_v0/json-ld` | Renders a JSON-LD script tag from schema-dts typed data. |
| Twemoji | `shadcn@latest add @ritmo_v0/twemoji` | Renders emoji as Twemoji SVGs via Next Image, parsed from string children. |

## License

Emoji Powered by Twemoji, used under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/

All credits of images used under the `/stuff/7sref` route go to SEGA and the original artists, unless specified right under. The "Ritmo" player avatar is drawn and owned by myself.

Please contact me if you think something isn't listed in this section.