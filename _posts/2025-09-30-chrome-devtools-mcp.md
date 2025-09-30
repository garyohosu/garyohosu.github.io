---
layout: post
title: "note更新：Chrome DevTools MCPでブラウザ自動操作（Claude & Gemini CLIまとめ）"
date: 2025-09-30 11:00:00 +0900
categories: [Automation, AI]
tags: [note, Claude, Gemini, Chrome DevTools, MCP, Browser Automation]
description: 2025年9月29日にnoteで公開したChrome DevTools MCPの自動操作記事をClaude Desktop版とGemini CLI版あわせて紹介します。
image:
  path: /assets/img/chrome-devtools-mcp-note.jpg
  alt: "Chrome DevTools MCPのブラウザ自動操作サムネイル"
---

2025年9月29日（月）にnoteで公開した、Chrome DevTools MCPを使ったブラウザ自動操作の2本立て記事をブログでもまとめて紹介します。Claude DesktopとGemini CLIという異なるエージェントから同じMCPサーバーを扱ったときのセットアップ手順や使いどころの違いを比較できる内容です。

## まず押さえておきたいポイント
- どちらの記事も[MCP（Model Context Protocol）](https://modelcontextprotocol.io/)対応のChrome DevToolsサーバー `chrome-devtools-mcp@latest` を `npx` で呼び出す構成。
- Claude DesktopとGemini CLIそれぞれで設定ファイルの場所や書式が異なるため、導入の第一歩は環境ごとのJSONへ`mcpServers`を追記すること。
- ブラウザ経由のログインやページ遷移をAIに任せつつ、最終レビューやセキュリティ確認は人間が担当するワークフローを想定しています。

## 記事1：Claude DesktopからChrome DevTools MCPを操作
- note: [ClaudeでChrome-devtools MCPを設定してブラウザを自動操作してみる](https://note.com/hantani/n/nae427d007381)
- 設定場所は `C:\\Users\\(ユーザー名)\\AppData\\Roaming\\Claude\\claude_desktop_config.json`。`"chrome-devtools"` サーバーを追加したうえでClaude Desktopを再起動します。
- プロンプト例として「noteの記事を読んで感想を教えて」と指示すると、Chromeが自動起動してログイン→記事巡回→フィードバックの一連をMCPが代行。
- 操作ログを眺めているだけでブラウザ自動化の流れが可視化され、業務タスクをClaudeへ委譲する際のイメージが掴めます。

## 記事2：Gemini CLIからChrome DevTools MCPを呼び出す
- note: [無料で使えるGemini CLIでブラウザを自動操縦](https://note.com/hantani/n/nfb33d58cfcc4)
- 設定ファイルは `C:\\Users\\(ユーザー名)\\.gemini\\settings.json`。セキュリティ設定（`"selectedType": "oauth-personal"`）と `mcpServers` セクションを追記してから `gemini` コマンドを起動。
- CLI上で「Chrome-devtools使って私のnoteを読んで感想を聞かせて」といった指示を投げると、許可ダイアログを経てChromeが起動し、ページ巡回や要約まで自動化。
- Gemini CLIは無料枠で試せるので、課金なしでMCPブラウザ自動化を体験したい場合に最初の一歩として最適です。

## どちらのワークフローを選ぶ？
- **GUI派ならClaude Desktop**：デスクトップアプリからプロンプトを対話的に投げ、ブラウザの動きをリアルタイムで確認したいケースに向いています。
- **ターミナル派ならGemini CLI**：シェルスクリプトや他のCLIツールとの連携もしやすく、無料枠でも動作確認できるのが強みです。
- **共通の注意点**：ログイン情報を扱う場合は使い捨てアカウントや2段階認証の有効化など、MCPが触れる範囲をコントロールしましょう。

## 次のアクション候補
1. 2本の記事を読み比べて、手元の作業スタイルに近い方から設定を試してみる。
2. 既存の社内/個人タスクでブラウザ操作が多いものを洗い出し、MCP経由で代行できる手順をメモしておく。
3. 自動操作の結果ログ（スクリーンショットや感想まとめ）を活用し、ナレッジ共有や顧客レポートのテンプレートに落とし込む。

どちらのnote記事も簡単なコマンド追記だけでスタートできます。まずは無料で始められる範囲から、Chrome DevTools MCPのポテンシャルを試してみてください。
