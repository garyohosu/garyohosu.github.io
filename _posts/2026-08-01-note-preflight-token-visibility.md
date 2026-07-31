---
layout: post
title: "noteに記事を公開しました：AIトークン切れ対策に、Preflightで利用状況を見える化してみた"
date: 2026-08-01 08:00:00 +0900
categories: [note, AI]
tags: [note, AI, MCP, Claude, Codex, Grok]
description: noteで公開した「使ってるAIトークンが見えるMCPサーバーPreflightを使ってみる」の紹介です。トークン利用の見える化と導入手順をまとめました。
permalink: /posts/note-preflight-token-visibility-2026-08-01/
image:
  path: /assets/img/note-preflight-token-2026-08-01.png
  alt: Preflightを使ってみる（note サムネイル）
---

![Preflightを使ってみる（note サムネイル）]({{ site.baseurl }}/assets/img/note-preflight-token-2026-08-01.png)

2026年7月31日に、noteで以下の記事を公開しました。

- 外部リンク（note）：[使ってるAIトークンが見えるMCPサーバーPreflightを使ってみる](https://note.com/hantani/n/n8670c484b74a)

### このnoteの主なポイント
- Claude Code / Codex CLI / AntiGravity / Grok CLI など、複数のAI CLIを切り替えながら使っていると、トークン切れが地味に痛い
- Preflight は AI コーディングの利用状況やコストを見える化できる MCP サーバー
- `preflight setup` を実行して、デフォルト設定のまま進めると導入しやすい
- Claude Code にセットアップ後のプロンプトを貼って設定を任せる流れがわかりやすい
- `nr_observe_get_session_stats` で動作確認し、`http://127.0.0.1:7777` を開くと状態を見られる

### 試したコマンド
```text
preflight setup
nr_observe_get_session_stats
```

### こんな人におすすめ
- AI CLI を複数使い分けている人
- 何にトークンを使っているか把握したい人
- MCP サーバーを実戦投入してみたい人

### ひとこと
「何となく減ってる」ではなく、使いどころを可視化できるのがうれしいところです。運用の見通しが一段上がります。

### 関連記事
- [Codex Security CLIを使ってみる](https://note.com/hantani/n/na1347737a92d)
- [Windows 11でClaude CodeとCodexを連携させた記録](https://note.com/hantani/n/n85eb4842a300)

**元noteはこちら**：https://note.com/hantani/n/n8670c484b74a

---

*この記事はnote記事の紹介として作成しました。*
