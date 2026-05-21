---
layout: post
title: "noteに記事を公開しました：Antigravity CLIインストールしてみる"
date: 2026-05-20 13:37:51 +0900
categories: [Note]
tags: [note, AntigravityCLI, AntiGravity, Google, GeminiCLI, Windows, PowerShell, CLI]
description: noteで公開した「Antigravity CLIインストールしてみる」を紹介します。GoogleのAntigravity CLIをWindows 11で試し、初回起動の認証や `agy --help` の挙動まで確認したインストールメモです。
image:
  path: /assets/img/2026-05-20-note-antigravity-cli-install.png
  alt: "Antigravity CLIインストールしてみる（note サムネイル）"
---

noteで以下の記事を公開しました。概要とリンクを置いておきます。

- 外部リンク（note）： [Antigravity CLIインストールしてみる](https://note.com/hantani/n/nee2e9179c67b)
- note公開日時：2026-05-20 13:37

### 記事タイトル

Antigravity CLIインストールしてみる

### 記事のポイント

- Googleから新しく出てきた Antigravity CLI を実際にインストールして試している
- Windows 11 では PowerShell から `irm https://antigravity.google/cli/install.ps1 | iex` を実行して導入できる
- 初回起動では `agy` の起動、Google OAuth、利用規約の確認、作業フォルダの選択まで進む
- `agy --help` を見ながら install / plugin / update などの機能を確認している
- `--dangerously-skip-permissions` を `agyyolo` という別名で呼びたくなるなど、権限周りの使い勝手も触れている

### こんな方におすすめ

- Antigravity CLIをこれから触ってみたい方
- Gemini CLIの後継っぽいツールの初期設定を知りたい方
- Windows 11 で AI CLI を試す手順を探している方

詳細は上記のnote本文をご覧ください。
