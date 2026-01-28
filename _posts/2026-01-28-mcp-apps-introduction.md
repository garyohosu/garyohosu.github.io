---
layout: post
title: "MCP Apps登場：AIアシスタントにインタラクティブUIを提供する新拡張機能"
date: 2026-01-28 12:00:00 +0900
categories: [Dev, AI]
tags: [MCP, Claude, OpenAI, ChatGPT, AI, UI, Anthropic]
description: Model Context Protocolの公式拡張機能「MCP Apps」が登場。AnthropicとOpenAIが協力して開発したこの仕様により、AIツールがダッシュボードやフォームなどのUIコンポーネントを会話内に直接表示できるようになりました。
---

## MCP Appsとは

**MCP Apps**は、Model Context Protocol（MCP）の最初の公式拡張機能です。この拡張により、MCPツールがダッシュボード、フォーム、ビジュアライゼーション、マルチステップワークフローなどの**インタラクティブなUIコンポーネント**を会話内に直接返せるようになりました。

これまでMCPサーバーはテキストやデータを返すことしかできませんでしたが、MCP Appsによってリッチなビジュアル体験を提供できるようになります。

## 背景：競合から協調へ

MCP Appsの興味深い点は、**AnthropicとOpenAIが協力して開発した**ということです。

もともと、MCPコミュニティでは[MCP-UI](https://github.com/nicholascostadev/mcp-ui)というプロジェクトがIdoSalomonとLiadYosefによって開発されていました。このプロジェクトは、Postman、Shopify、HuggingFaceなどの企業に採用され、エージェントアプリケーションにおけるインタラクティブUIの実現可能性を実証しました。

一方、OpenAIも**Apps SDK**で同様の機能を開発していました。

MCPコミュニティの断片化を防ぐため、両社のMCPコア保守担当者がMCP-UIの開発者とともに**統一された仕様**を作成することになりました。その結果生まれたのが、MCP Apps Extension（SEP-1865）です。

## 主な機能と4つのユースケース

MCP Appsは以下の4つの主要なユースケースをカバーしています：

### 1. データ探索（インタラクティブダッシュボード）

データベースやAPIから取得したデータを、グラフやチャートとして対話的に表示できます。

### 2. 設定ウィザード（条件付きフィールド）

複雑な設定をステップバイステップで案内するウィザードUIを提供。ユーザーの選択に応じて表示内容が動的に変化します。

### 3. ドキュメント確認（PDF表示と決定マーク）

PDF文書を表示し、ユーザーが承認や確認のマークを付けられるインターフェースを提供します。

### 4. リアルタイム監視（動的更新メトリクス）

システムの状態やメトリクスをリアルタイムで更新表示するダッシュボードを実現します。

## 技術的な仕組み

MCP Appsは2つの基本要素で構成されています：

1. **UIメタデータ付きツール**：`_meta.ui.resourceUri`フィールドを含むツール定義
2. **UIリソース**：`ui://`スキーム経由で配信されるHTML/JavaScript

ホストがリソースを取得し、**サンドボックス化されたiframe内**でHTML/JavaScriptコンテンツを実行します。双方向通信は**JSON-RPC over postMessage**で行われます。

```
┌─────────────────────────────────────────────────┐
│  MCP Host (Claude, ChatGPT, etc.)               │
│  ┌───────────────────────────────────────────┐  │
│  │  Sandboxed iframe                         │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │  MCP App UI                         │  │  │
│  │  │  (HTML/JavaScript)                  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
│            ↕ JSON-RPC over postMessage          │
│  ┌───────────────────────────────────────────┐  │
│  │  MCP Server                               │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## 対応クライアント

現在、以下のクライアントがMCP Appsをサポートしています：

- **Claude**（Webおよびデスクトップ）
- **ChatGPT**
- **Goose**
- **Visual Studio Code Insiders**

今後も対応クライアントは増えていく予定です。

## セキュリティモデル

MCPサーバーからUIを実行するということは、自分が書いていないコードをMCPホスト内で実行することを意味します。MCP Appsはこれに対して複数層の保護を提供しています：

| 保護機能 | 説明 |
|---------|------|
| **iframeサンドボックス** | UIは隔離されたiframe内で実行され、親ページへのアクセスが制限される |
| **テンプレート事前申告** | UIリソースは事前に宣言され、予測可能性を確保 |
| **JSON-RPC監査ログ** | すべてのメッセージが監査可能 |
| **ユーザー同意メカニズム** | 必要に応じてユーザーの明示的な同意を取得 |

## 開発を始めるには

MCP Appsを使った開発を始めるには、`@modelcontextprotocol/ext-apps`パッケージを利用できます。

GitHubには以下のような例が公開されています：

- 3D可視化
- 地図表示
- PDF表示
- インタラクティブフォーム

詳細なドキュメントは[Model Context Protocolの公式サイト](https://modelcontextprotocol.io/)で確認できます。

## MCPの急成長

MCP Appsの登場は、MCPエコシステムの急成長を象徴しています。

2024年11月にAnthropicが発表してから1年で：

- **月間SDKダウンロード数**：9,700万以上
- **MCPサーバー数**：5,800以上
- **MCPクライアント数**：300以上

Anthropic、OpenAI、Google、Microsoftといった主要企業がMCPを支持し、2025年12月にはAnthropicがMCPを**Linux Foundation傘下のAgentic AI Foundation（AAIF）**に寄贈しました。

## まとめ

MCP Appsは、AIアシスタントの可能性を大きく広げる拡張機能です。テキストベースのやり取りだけでなく、リッチなUIを通じてより直感的で効率的なインタラクションが可能になります。

AnthropicとOpenAIという競合他社が協力して統一仕様を作成したことも、オープンスタンダードとしてのMCPの健全な発展を示しています。

今後、MCP Appsを活用したツールやサービスが増えていくことで、AIアシスタントの利用体験はさらに向上していくでしょう。

## 参考リンク

- [MCP Apps - Bringing UI Capabilities To MCP Clients](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
- [Anthropic and OpenAI Join Forces to Standardize Interactive AI Interfaces](https://inkeep.com/blog/anthropic-openai-mcp-apps-extension)
- [Model Context Protocol公式サイト](https://modelcontextprotocol.io/)
- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
