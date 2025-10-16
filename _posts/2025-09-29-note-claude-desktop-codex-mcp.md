---
layout: post
title: "ClaudeデスクトップにCodex CLIのMCPサーバーをつなぐ（note記事）"
date: 2025-09-29 13:40:00 +0900
categories: [Dev, Link]
tags: [note, Claude, Codex, CLI, MCP, Anthropic]
description: 2025-09-29にnoteで公開した「ClaudeデスクトップにCodex CLIのMCPサーバーを接続する」手順の紹介。設定ファイルの追記例と動作確認ポイントを簡単にまとめます。
image:
  path: https://assets.st-note.com/production/uploads/images/218689302/rectangle_large_type_2_b6fab2ebb6c467bdb85940187af857b8.jpeg
  alt: Claude DesktopにCodex CLIのMCPサーバーを接続（note記事サムネイル）
---

2025-09-29 13:14（JST）に、noteで以下の記事を公開しました。

- 外部リンク（note）: [ClaudeデスクトップにCodex CLIのMCPサーバーを接続する](https://note.com/hantani/n/n6a44c2633efc)

## 記事のポイント

- 目的: Anthropicの「Claudeデスクトップ」に、OpenAIの「Codex CLI」をMCPサーバーとして接続する。
- やること: `Roaming\Claude` 配下の設定ファイル（JSON）に `mcpServers` を追記して、`codex mcp` を起動するよう指定。
- 確認: 再起動後に現れる「codex MCPサーバーにつながっていますか?」の確認に「はい」で接続完了。

### 設定例（JSON）

```json
{
  "mcpServers": {
    "codex": {
      "command": "codex",
      "args": ["mcp"],
      "env": {}
    }
  }
}
```

### スクリーンショット

![Claude DesktopにMCPサーバーを追加](https://assets.st-note.com/production/uploads/images/218689302/rectangle_large_type_2_b6fab2ebb6c467bdb85940187af857b8.jpeg)

---

細かな画面や追記のニュアンスは、ぜひnote本編をご覧ください。Codex CLI側のMCPは追加のセットアップをほぼ要さず、Claude Desktopからの呼び出し導線に自然に乗せられるのが良いところです。

## 関連リンク

- Codex CLIで仕様駆動開発ツールを使ってみる（note記事の紹介） — {% post_url 2025-09-29-note-spec-driven-tool %}
