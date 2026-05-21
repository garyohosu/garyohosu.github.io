---
layout: post
title: "noteに記事を公開しました：【新機能】ロリポップのHermesAgentでGrokが使えるようになったので試して見る"
date: 2026-05-21 09:39:09 +0900
categories: [Note]
tags: [note, HermesAgent, Grok, xAI, OpenClaw, CLI, AI]
description: noteで公開した「【新機能】ロリポップのHermesAgentでGrokが使えるようになったので試して見る」を紹介します。Hermes AgentにGrok連携が追加された流れと、xAI CLIの導入・認証、モデル切り替えの確認をまとめた記事です。
image:
  path: /assets/img/2026-05-21-note-hermesagent-grok.png
  alt: "【新機能】ロリポップのHermesAgentでGrokが使えるようになったので試して見る（note サムネイル）"
---

noteで以下の記事を公開しました。概要とリンクを置いておきます。

- 外部リンク（note）： [【新機能】ロリポップのHermesAgentでGrokが使えるようになったので試して見る](https://note.com/hantani/n/n11b21719f4c7)
- note公開日時：2026-05-21 09:39

### 記事タイトル

【新機能】ロリポップのHermesAgentでGrokが使えるようになったので試して見る

### 記事のポイント

- Hermes AgentにGrokが利用可能になり、X APIを使ったリアルタイム検索やエージェント処理ができるようになった
- 料金体系が「サブスクリプション」と「従量課金」に分かれ、サブスクリプションを選ぶべきだと整理している
- ローカルPCでは `grok login` がそのままでは動かず、`irm https://x.ai/cli/install.ps1 | iex` でCLIを入れ直して認証を進めた
- `auth.json` をアップロードして認証を完了し、Hermes Agentの会話モデルをGrokに切り替えて試している
- Grok連携のメリットとして、Hermesのツール呼び出しとGrokの推論を組み合わせられる点を確認している

### こんな方におすすめ

- Hermes AgentでGrokを使ってみたい方
- xAI / Grok のCLI認証と初期セットアップを知りたい方
- AIエージェントのモデル切り替えや使い分けに興味がある方

詳細は上記のnote本文をご覧ください。
