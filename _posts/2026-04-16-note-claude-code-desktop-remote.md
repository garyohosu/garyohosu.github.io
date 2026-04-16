---
layout: post
title: "noteに記事を公開しました：Claude Codeデスクトップの新機能「リモート」の仕様について調べる"
date: 2026-04-16 14:40:00 +0900
categories: [Note]
tags: [note, ClaudeCode, remote, "Claude Code on the web", VM, SessionStart, 環境構築]
description: noteで公開した「Claude Codeデスクトップの新機能「リモート」の仕様について調べる」を紹介します。クラウド実行環境の仕様・設定ファイルの優先度・VM容量・使用できる言語ランタイムまで実測レポートです。
image:
  path: /assets/img/2026-04-16-note-claude-code-desktop-remote.png
  alt: "Claude Codeデスクトップの新機能「リモート」の仕様について調べる（note サムネイル）"
---

noteで以下の記事を公開しました。概要とリンクを置いておきます。

- 外部リンク（note）： [Claude Codeディスクトップの新機能「リモート」の仕様について調べる](https://note.com/hantani/n/n851603f8a681)
- note公開日時：2026-04-16

### 記事タイトル

Claude Codeディスクトップの新機能「リモート」の仕様について調べる

### 記事のポイント

- **リモート環境は2種類** — Anthropic管理のクラウドVM（Claude Code on the web）と、SSHによる外部サーバー接続の2パターンが存在する
- **VMはセッションごとに使い捨て** — セッション終了時にすべてのファイルが消えるため、APIキーなど秘密情報の永続化にはSessionStartフックが有効
- **設定ファイルの優先度** — 管理 > ローカル > プロジェクト > グローバルの順で適用され、`settings.json`（権限・環境変数）と`CLAUDE.md`（指示・コンテキスト）で役割を分けて運用する
- **実測スペック** — Ubuntu 24.04 LTS・カーネル4.4.0（gVisorサンドボックス）・ストレージ30GB・RAM 21GB・bash 5.2.21
- **使えるランタイム** — Python・Node.js・Ruby・Go・Rust・Java・PHP・C++など。.NET・Swift・Kotlin・Deno・Julia・Rは利用不可

### こんな方におすすめ

- Claude Code on the webを使い始めた、またはリモート機能を試してみたい方
- クラウドVM上でのAPIキー管理や環境構築の方法を知りたい方
- 実際の環境スペック（OS・容量・言語ランタイム）を把握した上で使いたい方

詳細は上記のnote本文をご覧ください。
