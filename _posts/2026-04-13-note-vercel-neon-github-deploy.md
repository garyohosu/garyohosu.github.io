---
layout: post
title: "noteに記事を公開しました：GitHub連携によるVercelとNeonの自動デプロイ"
date: 2026-04-13 14:25:00 +0900
categories: [Note]
tags: [note, Vercel, Neon, GitHub, ClaudeCode, CodexCLI, 自動デプロイ]
description: noteで公開した「GitHub連携によるVercelとNeonの自動デプロイ」を紹介します。GitHubリポジトリと連携して、コードをプッシュするだけでVercel+Neonに自動デプロイされる仕組みを構築する手順をまとめた記事です。
image:
  path: /assets/img/2026-04-13-note-vercel-neon-github-deploy.png
  alt: "GitHub連携によるVercelとNeonの自動デプロイ（note サムネイル）"
---

noteで以下の記事を公開しました。概要とリンクを置いておきます。

- 外部リンク（note）： [GitHub連携によるVercelとNeonの自動デプロイ](https://note.com/hantani/n/na995ec748afd?app_launch=false)
- note公開日時：2026-04-13

### 記事タイトル

GitHub連携によるVercelとNeonの自動デプロイ

### 記事のポイント

- **前回記事の続編** — [前回](https://note.com/hantani/n/nddacb12ee48c?app_launch=false)はGitHub連携なしでデプロイしたが、今回はGitHub連携を加えてCI/CD化する
- **GitHubリポジトリの作成からスタート** — 新規リポジトリを作成し、Neonプロジェクトとの接続文字列取得まで一気通貫で解説
- **VercelへのインポートとEnvironment Variables設定** — `DATABASE_URL` を環境変数として登録する具体的な手順を紹介
- **プッシュだけで自動反映** — GitHub上でコードを更新するとVercelとNeonに自動的にデプロイされる仕組みが完成する

### こんな方におすすめ

- VercelとNeonの組み合わせをGitHubと連携させたい方
- コードのプッシュで自動デプロイが走る環境を作りたい方
- Claude CodeやCodex CLIと一緒にWebアプリ開発を効率化したい方

詳細は上記のnote本文をご覧ください。
