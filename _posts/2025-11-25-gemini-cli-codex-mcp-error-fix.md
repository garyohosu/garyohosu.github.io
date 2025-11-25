---
layout: post
title: "Gemini CLIが起動しないエラーを解決：codex MCPサーバーとモデル名の問題"
date: 2025-11-25 20:00:00 +0900
categories: [Dev, Troubleshooting]
tags: [Gemini, CLI, MCP, エラー解決, AI, 設定ファイル, トラブルシューティング]
description: Gemini CLIで発生した「codex MCPサーバー接続エラー」と「モデル名の誤り」の2つの問題を解決した手順を詳しく解説します。
---

## 問題の概要

Gemini CLIを起動しようとしたところ、以下の2つのエラーが発生して正常に動作しませんでした。

```
[ERROR] Error during discovery for server 'codex': Connection failed for 'codex': MCP error -32000: Connection closed
[API Error: [{
  "error": {
    "code": 404,
    "message": "Requested entity was not found.",
    "status": "NOT_FOUND"
  }
}]]
```

実行していたコマンド:
```bash
gemini chat --model gemini-3.0-pro
```

## 原因の特定

調査の結果、2つの問題があることが判明しました:

1. **codex MCPサーバーの接続エラー**: 設定ファイルに登録されているが、実際には利用できないMCPサーバーが存在
2. **モデル名の誤り**: `gemini-3.0-pro`というモデルは存在しない

## 解決手順

### 1. MCP設定ファイルの確認

まず、設定されているMCPサーバーのリストを確認:

```bash
gemini mcp list
```

結果:
```
✓ chrome-devtools: Connected
✓ playwright: Connected
✗ markitdown: Disconnected
✓ arxiv-mcp-server: Connected
✓ context7: Connected
✓ youtube: Connected
✓ gemini-cli: Connected
✗ codex: Disconnected  ← これが問題
```

### 2. 設定ファイルの場所を特定

Gemini CLIの設定ファイルを検索:

```bash
cd ~ && find .gemini -type f 2>/dev/null
```

設定ファイルの場所: `~/.gemini/settings.json`

### 3. codex設定を削除

`~/.gemini/settings.json`を編集して、以下の部分を削除:

```json
"codex": {
  "type": "stdio",
  "command": "codex",
  "args": [
    "mcp"
  ],
  "env": {}
},
```

### 4. 利用可能なモデルを確認

```bash
gemini models list
```

結果:
```
The available models for `chat` and `googleSearch` are:
- "gemini-2.5-pro" (default)
- "gemini-2.5-flash"
```

### 5. 正しいモデル名で起動

```bash
gemini chat --model gemini-2.5-pro
```

成功！エラーなく起動できました。

## 解決後の状態

- codex MCPサーバーのエラーが解消
- 正しいモデル名 (`gemini-2.5-pro` または `gemini-2.5-flash`) で起動可能
- "Ready." と表示され、正常に使用可能

## まとめ

Gemini CLIのエラーは、以下の2点を修正することで解決しました:

1. **設定ファイルのクリーンアップ**: 使用していない・接続できないMCPサーバーの設定を削除
2. **正しいモデル名の使用**: `gemini-3.0-pro` → `gemini-2.5-pro` または `gemini-2.5-flash`

### ポイント

- Gemini CLIの設定ファイルは `~/.gemini/settings.json` に保存されている（Windowsの場合: `C:\Users\<username>\.gemini\settings.json`）
- `gemini mcp list` コマンドで現在の MCP サーバーの接続状態を確認できる
- `gemini models list` コマンドで利用可能なモデル名を確認できる

同じような問題に遭遇した方の参考になれば幸いです。
