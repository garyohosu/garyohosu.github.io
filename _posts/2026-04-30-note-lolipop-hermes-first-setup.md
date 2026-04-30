---
layout: post
title: "noteに記事を公開しました：ロリポップのHermes Agentで最初にやったこと"
date: 2026-04-30 14:00:00 +0900
categories: [Note]
tags: [note, HermesAgent, エルメス, OpenClaw, ロリポップ, Github, Discord, AIエージェント]
description: noteで公開した「ロリポップのHermes Agentで最初にやったこと」を紹介します。GitHubリポジトリの整備・バックアップ構築・Discord連携など、エージェント「エルメス」との初期セットアップをまとめています。
image:
  path: /assets/img/2026-04-30-note-lolipop-hermes-first-setup.jpg
  alt: "ロリポップ Hermes Agent で最初にやったこと（note サムネイル）"
---

noteで以下の記事を公開しました。概要とリンクを置いておきます。

- 外部リンク（note）： [ロリポップのHermes Agentで最初にやったこと](https://note.com/hantani/n/n45c1c7fa8b32)
- note公開日時：2026-04-30

### 記事タイトル

ロリポップのHermes Agentで最初にやったこと

### 記事のポイント

- **GitHubにプライベートリポジトリ「hermes」を作成** — サーバーに「エルメス」と名前をつけ、作業用フォルダとして運用開始
- **cronによる自動バックアップを構築** — 1日ごとにGitHubへ差分をプッシュする仕組みをエルメスに構築してもらった
- **GitHubリポジトリ内にフォルダ体系を整備** — `instructions/`（指示）・`tasks/`（作業依頼）・`notes/`（参考メモ）・`runbooks/`（手順書）でファイルを管理
- **Discord連携を設定** — 「エルメス」サーバーとBOTを新規作成し、チャネル連携からトークンを登録。Discordからチャットが可能になった

### こんな方におすすめ

- Hermes Agentを契約してこれから使い始める方
- AIエージェントとのファイルやり取りをGitHubで管理したい方
- DiscordとHermes Agentを連携させたい方

詳細は上記のnote本文をご覧ください。
