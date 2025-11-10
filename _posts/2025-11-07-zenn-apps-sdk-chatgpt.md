---
layout: post
title: "Zenn記事メモ：Apps SDKでChatGPTアプリを作る手順まとめ"
date: 2025-11-07 13:10:00 +0900
categories: [blog, link]
tags: [ChatGPT Apps, Apps SDK, MCP, React, microCMS]
description: Zennの「Apps SDKでシンプルなChatGPTアプリを作る」を読み、ChatGPT Appsの仕組みやMCPサーバー＋React UIの実装手順を要約しました。
---

Zennで公開された [Apps SDKでシンプルなChatGPTアプリを作る](https://zenn.dev/himara2/articles/ae362b516e9e52)（著者: ひまらつさん）を読み、ポイントを自分用にメモしました。ChatGPT Appsのプレビューを触りつつ、microCMS + MCPサーバー + React UIで「Z Coffee」の店舗検索アプリを仕上げるまでの流れが丁寧にまとまっています。

## 記事で分かること

- ChatGPT Appsの概要と、MCPとの違い（リッチUI/ユーザー事前設定不要/推薦フロー）。
- プレビュー段階でできること（2025年後半に審査＆収益化のアナウンス予定、現状はApps SDK + 開発者モードで試行）。
- microCMSで店舗データを管理し、TypeScript製MCPサーバーで `store-list` ツールを提供する実装例。
- React + Tailwind + Apps SDKのUIサンドボックスを使ったウィジェットの組み立て方（`SetGlobalsEvent` / `useOpenAiGlobal` でツール出力を受け取る）。
- ngrok経由でローカルサーバーをチャットGPTに接続し、開発者モードの「アプリとコネクター」でMCPエンドポイントを登録する手順。

## 実装ダイジェスト

- **データ整備**: microCMSに店舗情報を入稿し、フィルタリング/ソートできるAPIを用意。
- **MCPサーバー**: `@modelcontextprotocol/sdk` と `@hono/mcp` で `store-list` ツールを実装し、`structuredContent` に店舗配列を返す。
- **ウィジェットリソース**: esbuild + tailwindcss でバンドルした `store-list.js/css` を `ui://widget/...` リソースとしてMCPから供給。
- **UI**: Reactでカルーセル状のカードリストを実装し、`window.openai.toolOutput` をHook経由で反映。PIP/inline切り替えに備え、`DisplayMode` APIも触れている。
- **動作確認**: MCP Inspector→ngrok→ChatGPT開発者モードという順で接続を確認し、住所クエリでの絞り込み（例: 六本木）まで検証。

## 気になったTips

- Apps SDKは「MCP + UI」と捉えると理解しやすい。UIは任意のフロント技術でOKだが、`text/html+skybridge` MIMEで渡す必要がある。
- BusinessプランのChatGPTではAppsをまだ有効化できず、個人プランで試す必要がある点に注意。
- 公式サンプルは一部そのままでは動かないことがあるため、Issueやガイドラインをウォッチしながら組むのが安全。

ChatGPT Appsの実装感を素早く掴みたい人に刺さる内容でした。詳細はぜひ原文をチェックしてください！
