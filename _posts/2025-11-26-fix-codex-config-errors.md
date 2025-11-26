---
layout: post
title: "Codex CLI起動エラーを解決：MCP設定とweb_search設定の問題"
date: 2025-11-26 15:00:00 +0900
categories: [Dev, Troubleshooting]
tags: [Codex, CLI, MCP, エラー解決, AI, 設定ファイル, トラブルシューティング, config.toml]
description: Codex CLIで発生したMCPサーバーの起動失敗とweb_search設定の非推奨警告を解決した手順を詳しく解説します。
---

## 問題の概要

Codex CLIを起動しようとしたところ、以下のエラーと警告が発生しました。

```
⚠ `tools.web_search` is deprecated. Use `web_search_request` instead.
Enable it with `--enable web_search_request` or `[features].web_search_request` in config.toml.

⚠ MCP client for `dalle` failed to start: MCP startup failed: handshaking with MCP server failed: connection closed:
  initialize response

⚠ MCP client for `serena` timed out after 10 seconds. Add or adjust `startup_timeout_sec` in your config.toml:
  [mcp_servers.serena]
  startup_timeout_sec = XX

⚠ MCP startup incomplete (failed: dalle, serena)
```

実行していたコマンド:
```bash
codex --yolo
```

## 原因の特定

調査の結果、3つの問題があることが判明しました:

1. **dalle MCPサーバーの起動失敗**: 設定されているが、正常に動作しないMCPサーバー
2. **serena MCPサーバーのタイムアウト**: WSL経由の起動が10秒でタイムアウト
3. **web_search設定の非推奨**: `tools.web_search`が非推奨となり、`features.web_search_request`に移行が必要

## 解決手順

### 1. 設定ファイルの場所を特定

Codex CLIの設定ファイルを検索:

```powershell
Get-ChildItem ~ -Recurse -File -Filter 'config.toml' -ErrorAction SilentlyContinue | Select-Object -First 5 FullName
```

設定ファイルの場所: `C:\Users\<username>\.codex\config.toml`

### 2. 設定ファイルの確認

`~/.codex/config.toml`を確認すると、以下の問題のある設定が見つかりました:

```toml
[tools]
web_search = true

[mcp_servers.dalle]
command   = "C:\\PROJECT\\cursor\\MCP\\dalle-mcp\\run-dalle.cmd"
args      = []
transport = "stdio"

[mcp_servers.serena]
command   = "wsl"
args      = ["-e","bash","-lc","uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context codex"]
transport = "stdio"
```

### 3. MCPサーバー設定をコメントアウト

動作しないMCPサーバーの設定をコメントアウト:

```toml
# [mcp_servers.dalle]
# command   = "C:\\PROJECT\\cursor\\MCP\\dalle-mcp\\run-dalle.cmd"
# args      = []
# transport = "stdio"

# [mcp_servers.serena]
# command   = "wsl"
# args      = ["-e","bash","-lc","uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context codex"]
# transport = "stdio"
```

### 4. web_search設定を新しい形式に移行

非推奨の`[tools]`セクションを削除し、`[features]`セクションを追加:

```toml
[features]
web_search_request = true
```

### 5. 最終的な設定ファイル

修正後の主要部分:

```toml
[features]
web_search_request = true

# [mcp_servers.dalle]
# command   = "C:\\PROJECT\\cursor\\MCP\\dalle-mcp\\run-dalle.cmd"
# args      = []
# transport = "stdio"

# [mcp_servers.serena]
# command   = "wsl"
# args      = ["-e","bash","-lc","uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context codex"]
# transport = "stdio"
```

### 6. Codex CLIを再起動

```bash
codex --yolo
```

成功！エラーなく起動できました。

## 解決後の状態

- dalle MCPサーバーのエラーが解消
- serena MCPサーバーのタイムアウトが解消
- web_search設定の非推奨警告が解消
- 正常に起動して使用可能

## まとめ

Codex CLIのエラーは、以下の2点を修正することで解決しました:

1. **MCPサーバー設定のコメントアウト**: 動作しない・接続できないMCPサーバーの設定を無効化
2. **web_search設定の移行**: `tools.web_search` → `features.web_search_request`

### ポイント

- Codex CLIの設定ファイルは `~/.codex/config.toml` に保存されている（Windowsの場合: `C:\Users\<username>\.codex\config.toml`）
- 使用しないMCPサーバーはコメントアウトして無効化することで起動を高速化できる
- 必要に応じて後で有効化することも可能（コメント記号 `#` を削除）
- `tools.web_search`は非推奨となり、`features.web_search_request`に移行が推奨されている

### 今後の対応

もし将来 `dalle` や `serena` を使いたい場合は:

1. 設定ファイルのコメント（`#`）を外す
2. それぞれのサーバーが正しく動作するように設定を修正する
3. `dalle`の場合: `run-dalle.cmd`のパスが正しいか確認
4. `serena`の場合: タイムアウト時間を延長するか、WSL環境を確認

同じような問題に遭遇した方の参考になれば幸いです。
