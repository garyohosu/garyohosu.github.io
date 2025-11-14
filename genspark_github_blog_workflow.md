# GensparkでGitHubブログを更新する手順書

## 概要

この手順書では、Gensparkを使ってGitHub Pagesで運用しているブログに記事を追加・公開する方法を解説します。PCがなくても、スマホのGensparkアプリから実行可能です。

## 前提条件

- GensparkアカウントとGitHubアカウントの連携済み
- GitHub MCPサーバーがGensparkに接続済み
- GitHub Pagesブログのリポジトリが存在すること

## 手順1: リポジトリの確認

### 1.1 自分のGitHubリポジトリが見えるか確認

**プロンプト例:**
```
私のGitHubリポジトリ見れる？
```

**Gensparkの動作:**
- GitHub MCPサーバー経由でリポジトリ一覧を取得
- アカウント名とリポジトリ一覧を表示

### 1.2 ブログ用リポジトリの特定

**プロンプト例:**
```
リポジトリ garyohosu.github.io がブログ用です
```

**確認事項:**
- リポジトリ名が正しいか
- GitHub Pagesとして設定されているか

## 手順2: サンドボックスへのクローン

### 2.1 リポジトリをクローン

**プロンプト例:**
```
リポジトリ garyohosu.github.io をサンドボックスにクローンしてください
```

**Gensparkの動作:**
```bash
cd /home/user
git clone https://github.com/garyohosu/garyohosu.github.io.git
```

### 2.2 クローン完了の確認

**Gensparkが実行すること:**
```bash
cd /home/user/garyohosu.github.io
ls -la
```

**確認ポイント:**
- `_posts/` ディレクトリの存在
- `_config.yml` の存在
- 既存記事の確認

## 手順3: 記事の作成

### 3.1 元記事URLを渡す

**プロンプト例:**
```
このニュースを翻訳してブログの記事にしてプッシュしてほしい。
https://openai.com/index/group-chats-in-chatgpt/
```

### 3.2 Gensparkが実行する処理

#### a. Web Crawlerで記事取得
- 指定URLの内容を完全取得
- テキスト、画像、メタデータを抽出

#### b. 記事の翻訳と構成
- 英文を日本語に翻訳
- ブログ記事として構成を整理
- Jekyllフロントマター形式で作成

#### c. ファイル作成
**作成されるファイル例:**
```markdown
---
title: 【速報】ChatGPTにグループチャット機能が登場！日本でも利用可能に
date: 2025-11-14 13:00:00 +0900
categories: [AI, ChatGPT]
tags: [OpenAI, ChatGPT, グループチャット, コラボレーション, AI技術]
image:
  path: [画像URL]
  alt: ChatGPTグループチャット機能の画面イメージ
---

記事本文...
```

**保存先:**
```
_posts/2025-11-14-chatgpt-group-chats-japan.md
```

## 手順4: GitHubへのプッシュ

### 4.1 GitHub API経由でファイル作成

**Gensparkが使用するツール:**
- `mcp_15a17c48_create_or_update_file`

**実行内容:**
- リポジトリ: `garyohosu/garyohosu.github.io`
- ブランチ: `main`
- パス: `_posts/2025-11-14-chatgpt-group-chats-japan.md`
- コミットメッセージ: 記事の概要

### 4.2 コミット完了の確認

**確認事項:**
- GitHub上でコミットが反映されているか
- ファイルが正しい場所に配置されているか
- GitHub Actions（ビルドプロセス）が実行されているか

## 手順5: 作業記録の保存（オプション）

### 5.1 AIドライブにセッション記録を保存

**プロンプト例:**
```
AIドライブにChatフォルダーを作って、今日のチャットを保存してください
```

**Gensparkの動作:**
```bash
# フォルダー作成
mkdir /mnt/aidrive/Chat

# サンドボックスからAIドライブへコピー
cp [セッション記録ファイル] /mnt/aidrive/Chat/
```

### 5.2 保存内容
- セッションの全プロセス
- 使用したプロンプト
- 作成した記事の情報
- 技術的詳細

## 技術的な仕組み

### サンドボックスとは

**特徴:**
- サーバー上の仮想Linux環境
- ブラウザから操作可能
- セッション終了で自動削除

**できること:**
- ファイルの読み書き
- コマンド実行（bash, git, pythonなど）
- ライブラリのインストール
- MCPサーバー経由の外部連携

### GitHub MCP連携

**仕組み:**
```
ブラウザ（Genspark）
    ↓
サンドボックス（仮想環境）
    ↓
GitHub MCP Server
    ↓
GitHub API
    ↓
GitHubリポジトリ
```

**利点:**
- ブラウザから直接Git操作
- 認証はMCPサーバーが処理
- CLIツール不要

### AIドライブとの使い分け

| 項目 | サンドボックス | AIドライブ |
|------|---------------|-----------|
| 永続性 | セッション終了で削除 | 永続保存 |
| 用途 | 作業環境 | ストレージ |
| アクセス | `/home/user/` | `/mnt/aidrive/` |
| 速度 | 高速 | やや低速 |

**ベストプラクティス:**
1. サンドボックスで作業
2. 完成したらAIドライブに保存
3. サンドボックスは気にせず使い捨て

## トラブルシューティング

### リポジトリが見つからない

**症状:**
```
404 Not Found
```

**対処法:**
1. リポジトリ名のスペルを確認
2. アカウント名を確認（organizationか個人か）
3. プライベートリポジトリの場合、権限を確認

### プッシュが失敗する

**症状:**
```
fatal: could not read Username
```

**対処法:**
- GitHub MCPサーバー経由でプッシュ
- `git push` コマンドではなく、MCP APIを使用

### 記事が公開されない

**確認事項:**
1. GitHub Actionsのビルド状況
2. ファイル名形式: `YYYY-MM-DD-title.md`
3. フロントマターの構文エラー
4. GitHub Pagesの設定（Settings > Pages）

## まとめ

### この手順でできること

✅ スマホ1台でブログ記事作成  
✅ 英文記事の自動翻訳  
✅ GitHubへの自動プッシュ  
✅ 場所を選ばない情報発信  

### 従来との比較

| 項目 | 従来（PCで作業） | Genspark活用 |
|------|----------------|-------------|
| 必要機器 | PC必須 | スマホでOK |
| 作業時間 | 2-3時間 | 15分 |
| 場所 | 自宅・オフィス | どこでも |
| 技術レベル | CLI操作必要 | プロンプトのみ |

### 応用例

- **技術ニュースの即時対応**: 最新情報を即座に記事化
- **多言語展開**: 英語記事を日本語ブログで紹介
- **出張中の更新**: PCがなくても記事公開
- **共同編集**: 複数人でのブログ運営効率化

## 参考リンク

- [GitHub Pages公式ドキュメント](https://docs.github.com/pages)
- [Jekyll公式サイト](https://jekyllrb.com/)
- [Chirpyテーマ](https://github.com/cotes2020/jekyll-theme-chirpy)
- [MCP（Model Context Protocol）](https://modelcontextprotocol.io/)

---

**作成日**: 2025年11月14日  
**作成者**: garyohosu  
**用途**: Gensparkを使ったGitHubブログ運用の標準手順  
**更新履歴**: 初版作成