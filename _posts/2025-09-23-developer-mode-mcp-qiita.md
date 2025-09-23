---
layout: post
title: "ChatGPTの開発モードでMCP経由でQiitaに記事を書く（noteリンク）"
date: 2025-09-23 12:30:00 +0900
categories: [Dev, Link]
tags: [ChatGPT, MCP, Qiita, Developer Mode, コネクタ]
description: ChatGPTの開発者モードでMCPコネクタを作成し、Qiitaに下書き作成〜公開まで行う手順をまとめたnote記事の紹介。
image: https://assets.st-note.com/production/uploads/images/215178569/rectangle_large_type_2_8a294e9a67212a0800dd10fe29821bfa.png?fit=bounds&quality=85&width=1200
---

本日は、ChatGPTの「開発モード（Developer Mode）」でMCP（Model Context Protocol）コネクタを使い、Qiitaへ直接記事を書けるようにする手順をまとめたnoteを公開しました。詳細な手順、注意点、実際のプロンプト例まで載せています。

- 外部リンク（note）: https://note.com/hantani/n/nfa5764ea933a

## 記事の要点

- ChatGPTの開発モードを有効化し、`Connectors` から「カスタムMCP」を追加
- Qiitaの個人用アクセストークンを発行（記事の作成/更新権限を付与）
- MCPサーバーURLを指定（例）:

  ```text
  https://qiita-com.fastmcp.app/mcp?token=YOUR_ACCESS_TOKEN
  ```

  ※ 認証方式を「No Auth」にし、URLパラメータの `token` を自分のアクセストークンに置き換えます（漏えい対策は各自で十分に）。

- 開発モードのチャットでQiitaコネクタが提供するツールを確認し、下書き作成→更新→公開まで対話で操作
- 公開規約やQiitaのMarkdown記法チェックも、MCP経由の機能でサポート

## こんな人におすすめ

- ChatGPTを執筆アシスタントとして本番導線に組み込みたい
- 下書き作成から公開までを1つのチャットで流したい
- Qiitaへの投稿を自動化・省力化したい

## 関連

- 参考: ChatGPTからQiita記事を直接投稿する（qiita-mcp-server の紹介）

詳細は上記のnote本文をご覧ください。運用上の小さなハマりどころや、権限設定の注意点もまとめています。

—

公開日: 2025-09-23（JST）
---
layout: post
title: "ChatGPTの開発モードでMCP経由でQiitaに記事を書く（noteリンク）"
date: 2025-09-23 12:30:00 +0900
categories: [Dev, Link]
tags: [ChatGPT, MCP, Qiita, Developer Mode, コネクタ]
description: ChatGPTの開発モードでカスタムMCPコネクタを設定し、Qiitaに下書き作成〜公開まで行う実手順・注意点をまとめたnote記事の紹介と補足解説。
image: https://assets.st-note.com/production/uploads/images/217274083/rectangle_large_type_2_d48a065977d8f3315f906c8e372ca57c.png?fit=bounds&quality=85&width=1280
---

本日は、ChatGPTの「開発モード（Developer Mode）」でMCP（Model Context Protocol）コネクタを使い、Qiitaへ直接記事を書けるようにする手順をまとめたnoteを公開しました。この記事では、note本文の要点に加えて、セットアップの背景や運用時の注意点を補足します。

- 外部リンク（note）: https://note.com/hantani/n/nfa5764ea933a

## 背景と狙い

- 開発モードは、ChatGPTに「コネクタ（MCPクライアント）」を通じて外部ツール/APIを安全に接続する仕組み。
- Qiita用MCPサーバーをつなぐと、チャットから「記事の下書き作成→更新→公開」までを完結でき、執筆〜配信のフローを一元化できる。

## 記事の要点（noteの内容）

- ChatGPTの開発モードで「カスタムMCP」を追加。
- Qiitaで個人用アクセストークンを発行し、記事の作成・更新に必要な権限（例: `write_qiita`）を付与。
- MCPサーバーURLを設定（具体的なURLや認証方法はnote本文の案内に従う）。
- チャット側で提供ツールを確認し、下書き→更新→公開を対話で操作。
- QiitaのMarkdown記法や公開ポリシーも合わせてチェック。

## 前提条件

- Qiitaアカウント（メール認証済み）
- 個人用アクセストークン（必要権限: `write_qiita` ほか、運用に応じて）
- ChatGPTの開発モードが利用可能な環境

## セットアップ手順（補足）

1. ChatGPT右上の設定 → `Connectors` → `Custom MCP` を追加。
2. note本文で案内されているQiita向けMCPサーバーのURLを入力。
3. 認証はサーバーの説明に従う（例: URLパラメータの `token`、またはヘッダー方式）。
4. 追加後、開発モードのチャットから「ツール一覧」を確認し、提供される操作（下書き作成・更新・公開など）を把握。

## 使い方の例（プロンプト案）

- 「Qiitaで新規下書きを作成。タイトルは『XXX』、タグは `python`, `mcp`。本文は以下のMarkdown…」
- 「下書きID `xxxxx` の本文を更新。コードブロックは `bash` 言語で、見出し構成はH2まで。」
- 「下書きID `xxxxx` を公開。タグとスラッグはそのまま。」

## 運用のコツ

- バージョン管理: 重要な記事はGitやGistに原稿を保存し、MCP経由は配信レイヤーに専念。
- 下書き→レビュー→公開の3段階をチャットで明示して事故公開を防止。
- Markdown整形: コードブロックの言語指定、表や脚注のレンダリングを事前にプレビュー。

## セキュリティ注意

- トークンをプロンプト本文に貼らない（会話履歴に残る）。
- ブラウザ/クライアントに残る設定値の扱いに注意し、不要ならトークンは速やかにローテーション。
- 公開後はQiitaの編集履歴で差分を確認し、誤公開時は速やかに非公開/修正。

## こんな人におすすめ

- ChatGPTを執筆アシスタントとして本番導線に組み込みたい
- 下書き作成から公開までを1つのチャットで流したい
- Qiitaへの投稿を自動化・省力化したい

## 関連

- 参考: note本文で紹介している「Qiita向けMCPサーバー」の解説記事を参照（リンクはnote内に記載）。

詳細は上記のnote本文をご覧ください。この記事では実運用の補足とセキュリティ観点を中心に追記しました。
