---
layout: post
title: "MCPでDALL·E画像生成をブログ環境に追加して動作確認"
date: 2025-09-18 12:10:00 +0900
categories: [Dev, MCP]
tags: [OpenAI, MCP, DALL·E, gpt-image-1, dall-e-2, Claude]
description: ブログの作業環境にSTDIO型のMCPサーバー「dall」を追加し、実際に画像生成を行ってサンプルを保存。gpt-image-1未認証時はdall-e-2へ自動フォールバック。
image: /assets/img/dall-mcp-sample-20250918.png
---

ブログのローカル作業環境に、OpenAI Images（DALL·E）用の MCP サーバー `dall` を追加し、実際に画像を生成して確認しました。

## 追加したもの
- MCPサーバー本体: `/home/garyo/project/dall-server/server.mjs`（STDIO型）
- 依存: `@modelcontextprotocol/sdk`, `openai`, `zod`
- ツール: `dall-generate`（prompt, size, model）
- エラーハンドリング: `gpt-image-1` が403のとき自動で `dall-e-2` にフォールバック

## 実行例（クライアント側設定の一例）
Claude/Cursor/VS Code などの MCP クライアントから、以下のようにコマンドと環境変数を設定します。

```
command: node
args: [/home/garyo/project/dall-server/server.mjs]
env:
  OPENAI_API_KEY: sk-...  # 自分のキー
```

その後、ツール `dall-generate` を呼び出します。

- prompt: やさしいロボットがノートPCでコードを書くフラットイラスト、パステルカラー
- size: 1024x1024
- model: gpt-image-1（未認証なら自動でdall-e-2）

## 出力サンプル

![dall mcp sample](/assets/img/dall-mcp-sample-20250918.png)

ローカル確認用に `outputs/sample.png`（dall-server 側）で取得した画像を、ブログ側 `assets/img/` に配置しています。

## 補足（dall-serverの改善）
- OpenAI クライアントを起動時ではなくツール実行時に生成。
- `OPENAI_API_KEY` 未設定時はプロセスを落とさず、ツールエラーとして返す。
- `inputSchema` を `z.object` 化、`size` を列挙に制限。
- `model` 引数を追加（`gpt-image-1` / `dall-e-2`）。

詳細な作業ログは `dall-server/todo.md` と ブログ側 `todo.md` に追記済みです。
