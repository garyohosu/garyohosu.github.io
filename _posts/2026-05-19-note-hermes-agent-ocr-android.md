---
layout: post
title: "noteに記事を公開しました：Hermes AgentにAndroidのOCRアプリを作ってもらった"
date: 2026-05-19 13:00:00 +0900
categories: [Dev, Link]
tags: [note, HermesAgent, Android, OCR, AndroidApp, LORIPOP, GitHubActions]
description: noteで公開した「ロリポップHermes AgentにAndoroidアプリを作ってもらった」を紹介します。Hermes AgentにOCRアンドロイドアプリを一気に作らせ、GitHub ActionsでAPKビルドまで完了した体験記です。
image:
  path: /assets/img/2026-05-19-note-hermes-agent-ocr-android.png
  alt: ロリポップHermes AgentにAndoroidアプリを作ってもらった（note サムネイル）
---

noteで以下の記事を公開しました。概要とリンクを置いておきます。

- 外部リンク（note）： [ロリポップHermes AgentにAndoroidアプリを作ってもらった](https://note.com/hantani/n/nf59605f7c4f4)

### 記事タイトル

ロリポップHermes AgentにAndoroidアプリを作ってもらった

### 記事のポイント

- 既存のバーコードリーダー比較アプリのリポジトリURLを渡すだけで、OCR版に作り変えてもらった
- Hermes Agentが git clone → コード修正 → mainブランチへpushまで一気に実行
- Hermes Agent環境にAndroidビルド環境がなくても、GitHub Actionsを活用してAPKを生成
- 公開用APKをスマホにインストールして、OCRでカメラ文字認識が動作することを確認

### こんな方におすすめ

- Hermes Agent（ロリポップ）でアプリ開発をどこまで自動化できるか試したい方
- AndroidアプリをAIエージェントに作らせる流れを知りたい方
- GitHub ActionsによるCI/CDとAIエージェントの組み合わせに興味がある方

本文では、実際の指示内容とHermes Agentの応答ログ、動作確認の様子も掲載しています。詳細は上記の note 本文をご覧ください。
