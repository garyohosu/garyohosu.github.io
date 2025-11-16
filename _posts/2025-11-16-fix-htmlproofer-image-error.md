---
title: GitHub Actions HTML-Prooferエラー「internal image does not exist」の原因と解決方法
date: 2025-11-16 10:00:00 +0900
categories: [Dev, Troubleshooting]
tags: [GitHub Actions, HTML-Proofer, Jekyll, GitHub Pages, CI/CD, トラブルシューティング]
description: GitHub Actionsでのビルド時に発生するHTML-Prooferの画像参照エラーの原因究明から解決まで。外部画像URL、Jekyllのフロントマター、CI/CDパイプラインの実践的なトラブルシューティング手順を解説。
---

## はじめに

GitHub PagesでJekyllブログを運用していると、突然GitHub Actionsのビルドが失敗することがあります。今回、`HTML-Proofer`による画像チェックで以下のエラーに遭遇しました：

```
For the Images check, the following failures were found:

* At _site/index.html:1:
    internal image /assets/img/posts/cloudflare-pages-deploy.png does not exist
```

この記事では、エラーの原因特定から解決までのプロセスを詳しく解説します。

---

## エラーの全容

### 発生した状況

- **タイミング**: 新しいブログ記事をGitHubにプッシュ後
- **場所**: GitHub Actions のビルドプロセス
- **エラー内容**: HTML-Prooferによる画像参照チェックの失敗

### エラーログの詳細

```
Running 3 checks (Images, Links, Scripts) in ["_site"] on *.html files...

For the Images check, the following failures were found:

* At _site/index.html:1:
    internal image /assets/img/posts/cloudflare-pages-deploy.png does not exist

* At _site/posts/cloudflare-pages-deploy-guide/index.html:1:
    internal image /assets/img/posts/cloudflare-pages-deploy.png does not exist

For the Links > Internal check, the following failures were found:

* At _site/posts/cloudflare-pages-deploy-guide/index.html:1:
    internally linking to /assets/img/posts/cloudflare-pages-deploy.png, which does not exist

- 752 internal links
- 0 external links
- 306 files
✗ 3 failures found!

Process completed with exit code 1.
```

### 影響範囲

- **ビルド失敗**: サイト全体のデプロイがストップ
- **複数ファイルに影響**: `index.html`と記事ページの両方でエラー
- **チェック項目**: 画像と内部リンクの2箇所で検出

---

## 原因の特定

### Playwrightでエラー内容を確認

まず、GitHub ActionsのエラーログをPlaywrightで自動取得しました：

```
URL: https://github.com/garyohosu/garyohosu.github.io/actions/runs/xxxxx
Workflow Run: #201 - "Add: Cloudflare Pagesデプロイ完全ガイド記事を追加"
Job: build (failed)
Status: Failed 13 hours ago in 26s
```

### 問題の記事を特定

エラーログから該当する記事を特定：

```bash
# GitHubリポジトリから記事を取得
curl -s "https://raw.githubusercontent.com/garyohosu/garyohosu.github.io/main/_posts/2025-11-15-cloudflare-pages-deploy-guide.md"
```

### フロントマターの確認

記事のYAMLフロントマターに以下の記述を発見：

```yaml
---
title: "【完全ガイド】静的サイトをCloudflare Pagesにデプロイする全手順"
date: 2025-11-15 11:00:00 +0900
categories: [Dev, Deployment]
tags: [Cloudflare Pages, GitHub Pages, 静的サイト, デプロイ]
image:
  path: /assets/img/posts/cloudflare-pages-deploy.png  # ← これが問題
  alt: Cloudflare Pagesデプロイガイド
---
```

### 根本原因の判明

**問題点**: 
- フロントマターで `/assets/img/posts/cloudflare-pages-deploy.png` を参照
- 実際にはこのファイルがリポジトリに存在しない
- HTML-Prooferがこれを検出してビルドを停止

---

## HTML-Prooferとは？

### 概要

**HTML-Proofer**は、HTML文書の整合性を検証するRuby製のツールです。

### 主な検証項目

| 検証項目 | 内容 |
|---------|------|
| **Images** | 画像ファイルの存在確認 |
| **Links** | 内部リンクと外部リンクの有効性 |
| **Scripts** | JavaScriptファイルの存在確認 |
| **HTML構文** | HTMLの文法チェック |

### GitHub Actionsでの動作

Jekyllのビルドプロセスに組み込まれ、以下の流れで実行：

```
1. Jekyll build (_site ディレクトリ生成)
   ↓
2. HTML-Proofer実行
   ↓
3. 検証結果の確認
   ↓
4. エラーがあればビルド失敗 (exit code 1)
```

### なぜ厳密にチェックするのか？

- **リンク切れ防止**: ユーザーが404エラーに遭遇しない
- **SEO対策**: 壊れたリンクは検索エンジンの評価を下げる
- **品質保証**: 公開前に問題を検出

---

## 過去の記事から学ぶ：画像URLのパターン

### 調査方法

過去の成功している記事を確認：

```bash
curl -s "https://raw.githubusercontent.com/garyohosu/garyohosu.github.io/main/_posts/2025-11-14-chatgpt-group-chats-japan.md" | grep -A2 "^image:"
```

### 結果

```yaml
image:
  path: https://sspark.genspark.ai/cfimages?u1=xxx&u2=xxx&width=1024
  alt: ChatGPTグループチャット機能の画面イメージ
```

### 分かったこと

**成功パターン**: 外部URL（Gensparkの画像生成サービス）を直接使用

| 項目 | 失敗ケース | 成功ケース |
|------|-----------|-----------|
| **パス形式** | `/assets/img/posts/xxx.png` | `https://sspark.genspark.ai/cfimages?...` |
| **ファイル管理** | リポジトリ内に必要 | 外部サービスで管理 |
| **HTML-Proofer** | 存在チェックで失敗 | 外部URLはスキップ |

---

## 解決策の検討

### 選択肢1: 画像をリポジトリに追加

**方法**:
```bash
# 画像を生成
# (AI画像生成サービスなどで作成)

# リポジトリに追加
git add assets/img/posts/cloudflare-pages-deploy.png
git commit -m "Add: アイキャッチ画像を追加"
git push
```

**メリット**:
- ✅ ファイルが確実に存在
- ✅ リポジトリで完結

**デメリット**:
- ❌ リポジトリサイズが増加
- ❌ 画像更新時の手間

### 選択肢2: 外部URL（Genspark）を使用

**方法**:
```yaml
image:
  path: https://sspark.genspark.ai/cfimages?u1=xxx&u2=xxx&width=1024
  alt: Cloudflare Pagesデプロイガイド
```

**メリット**:
- ✅ リポジトリが軽量
- ✅ 画像管理が外部で完結

**デメリット**:
- ❌ 外部サービス依存
- ❌ URLの信頼性に不安

**実際に試した結果**:
```yaml
# 最初に試したURL（失敗）
path: https://www.genspark.ai/api/files/s/8irEOJKQ?cache_control=3600

# 問題: このURLが正常に機能しない
```

### 選択肢3: 画像フィールドを削除（採用）

**方法**:
```yaml
---
title: "【完全ガイド】静的サイトをCloudflare Pagesにデプロイする全手順"
date: 2025-11-15 11:00:00 +0900
categories: [Dev, Deployment]
tags: [Cloudflare Pages, GitHub Pages, 静的サイト, デプロイ]
# image フィールドを完全に削除
---
```

**メリット**:
- ✅ 最もシンプルで確実
- ✅ ビルドエラーが確実に解消
- ✅ 技術記事では画像なしでも問題なし

**デメリット**:
- ❌ SNSシェア時のビジュアルがデフォルトになる
- ❌ 記事一覧での視覚的な魅力が減少

---

## 実際の修正手順

### ステップ1: ファイルの現在のSHAを取得

```bash
curl -s "https://api.github.com/repos/garyohosu/garyohosu.github.io/contents/_posts/2025-11-15-cloudflare-pages-deploy-guide.md" \
  | grep -o '"sha": "[^"]*"' | head -1 | cut -d'"' -f4
```

**結果**:
```
c0271cb7cddb19b9cfc25d820a15f1fe4f1e127e
```

### ステップ2: GitHub API経由でファイルを更新

```bash
# GitHub MCPを使用してファイルを更新
mcp_15a17c48_create_or_update_file \
  --owner garyohosu \
  --repo garyohosu.github.io \
  --path _posts/2025-11-15-cloudflare-pages-deploy-guide.md \
  --message "Fix: 画像フィールドを削除してビルドエラーを完全に解決" \
  --branch main \
  --sha c0271cb7cddb19b9cfc25d820a15f1fe4f1e127e
```

### ステップ3: 修正内容の確認

修正後のフロントマター：

```yaml
---
title: "【完全ガイド】静的サイトをCloudflare Pagesにデプロイする全手順"
date: 2025-11-15 11:00:00 +0900
categories: [Dev, Deployment]
tags: [Cloudflare Pages, GitHub Pages, 静的サイト, デプロイ]
description: ポートフォリオサイトをCloudflare Pagesに移行した全プロセスを詳細解説。
# imageフィールドを削除
---
```

### ステップ4: コミットの確認

```
Commit SHA: d7a7a82f87f889e5e9c92e77edf132dd78a739bd
Author: garyohosu
Date: 2025-11-16T01:39:51Z
Message: Fix: 画像フィールドを削除してビルドエラーを完全に解決
```

---

## ビルド結果の検証

### GitHub Actionsの確認

修正後、GitHub Actionsで自動ビルドが実行されます：

```
Expected Results:
✅ HTML-Proofer: Images check - No errors
✅ HTML-Proofer: Internal links check - No errors
✅ Build successful
✅ Site deployed
```

### 検証項目

1. **画像チェック**: 存在しない画像への参照なし
2. **内部リンクチェック**: 壊れたリンクなし
3. **ビルドステータス**: 成功（exit code 0）
4. **デプロイ**: サイトが正常に公開

---

## 学んだこと・ベストプラクティス

### 1. 画像管理の方針

| 方法 | 使用場面 |
|------|---------|
| **リポジトリ内** | 重要な図解、独自のスクリーンショット |
| **外部URL** | 一時的な画像、大きなファイル |
| **画像なし** | 技術記事、テキスト主体のコンテンツ |

### 2. フロントマターのチェックリスト

記事作成時に確認すべき項目：

- [ ] `image.path`に指定したファイルは存在するか？
- [ ] 外部URLの場合、URLは有効か？
- [ ] 画像が必須でない場合、`image`フィールドを削除できないか？

### 3. CI/CDパイプラインの理解

```
記事作成 → Git push → GitHub Actions起動
                           ↓
                    Jekyll build
                           ↓
                    HTML-Proofer検証 ← ここでエラー検出
                           ↓
                    デプロイ（成功時のみ）
```

**重要**: ローカルでのテストだけでは不十分。CI/CDでの検証が必須。

### 4. エラー調査のワークフロー

1. **GitHub Actionsログ確認**: Playwrightで自動取得
2. **エラー箇所の特定**: ファイル名、行番号を確認
3. **原因の究明**: フロントマター、リンク、ファイル存在を確認
4. **過去の成功例を参照**: 同じパターンを探す
5. **修正と検証**: 最小限の変更で解決

### 5. 今後の対策

**記事作成テンプレート**を用意：

```yaml
---
title: "記事タイトル"
date: YYYY-MM-DD HH:MM:SS +0900
categories: [Category1, Category2]
tags: [tag1, tag2, tag3]
description: 記事の概要（150文字以内）
# image:
#   path: https://example.com/image.png  # 確認済みのURLのみ
#   alt: 画像の説明
---
```

---

## トラブルシューティング：類似エラーへの対処

### ケース1: 外部リンク切れ

**エラー例**:
```
External link https://example.com/page failed: 404 Not Found
```

**対処法**:
1. リンク先URLの確認
2. Internet Archiveで代替リンクを探す
3. リンク削除または更新

### ケース2: 相対パスの誤り

**エラー例**:
```
internal image ../images/test.png does not exist
```

**対処法**:
- Jekyllの`baseurl`を確認
- 絶対パス（`/images/test.png`）を使用

### ケース3: HTML-Prooferのスキップ設定

一時的に特定のチェックをスキップ：

```yaml
# .github/workflows/pages.yml
- name: Test site
  run: |
    bundle exec htmlproofer _site \
      --disable-external \
      --ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/localhost/"
```

---

## まとめ

### 今回の教訓

1. **CI/CDは信頼できる品質管理**: ローカルでは見逃すエラーを検出
2. **シンプルな解決策が最善**: 画像フィールドの削除が最も確実
3. **過去の成功例を参照**: パターンを見つけて応用
4. **Playwrightで効率化**: エラーログの自動取得で時間短縮

### HTML-Prooferとの付き合い方

- ✅ **味方として活用**: 品質保証の強力なツール
- ✅ **エラーは早期発見**: デプロイ前に問題を検出
- ✅ **適切な設定**: 必要に応じてチェックをカスタマイズ

### 次のステップ

1. **ローカルでHTML-Prooferを実行**: プッシュ前にチェック
2. **画像管理の方針確立**: リポジトリ vs 外部サービス
3. **テンプレート整備**: 記事作成時のチェックリスト化

---

## 参考リンク

- [HTML-Proofer公式ドキュメント](https://github.com/gjtorikian/html-proofer)
- [Jekyll公式サイト](https://jekyllrb.com/)
- [GitHub Actions公式ドキュメント](https://docs.github.com/actions)
- [Playwright公式サイト](https://playwright.dev/)

---

**作成日**: 2025年11月16日  
**執筆者**: hantani  
**カテゴリ**: Dev, Troubleshooting  
**対処時間**: エラー発見から解決まで約30分
