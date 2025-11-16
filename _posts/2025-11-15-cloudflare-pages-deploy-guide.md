---
title: "【完全ガイド】静的サイトをCloudflare Pagesにデプロイする全手順―GitHub連携からトラブルシューティングまで"
date: 2025-11-15 11:00:00 +0900
categories: [Dev, Deployment]
tags: [Cloudflare Pages, GitHub Pages, 静的サイト, デプロイ, ポートフォリオ, DNS, Web開発]
description: ポートフォリオサイトをCloudflare Pagesに移行した全プロセスを詳細解説。GitHub連携、ビルド設定、カスタムドメイン設定の成功例・失敗例、トラブルシューティングまで網羅。
image:
  path: https://www.genspark.ai/api/files/s/8irEOJKQ?cache_control=3600
  alt: Cloudflare Pagesデプロイガイド
---

## はじめに

静的サイトのホスティング先として、GitHub Pagesに加えてCloudflare Pagesが注目を集めています。本記事では、実際にポートフォリオサイトをCloudflare Pagesへデプロイした経験をもとに、**完全な手順とハマりどころ**を詳細に解説します。

### この記事で得られること

- Cloudflare Pagesの基本理解とメリット
- GitHubリポジトリからのデプロイ手順（スクショ想定）
- ビルド設定の詳細解説
- カスタムドメイン設定（成功例・失敗例）
- よくあるトラブルと解決方法
- 他サービス（Netlify、Vercel）との比較

---

## Cloudflare Pagesとは？

### 概要

**Cloudflare Pages**は、Cloudflareが提供する静的サイトホスティングサービスです。GitHub/GitLabと連携し、コミットするだけで自動デプロイが可能です。

### 主な特徴

#### ✅ メリット

| 項目 | 詳細 |
|------|------|
| **完全無料** | 個人プロジェクトなら無制限に近い利用が可能 |
| **高速CDN** | 世界275都市以上のエッジネットワーク |
| **自動HTTPS** | SSL証明書の自動発行・更新 |
| **GitHub連携** | プッシュするだけで自動デプロイ |
| **プレビューデプロイ** | ブランチごとにプレビューURL生成 |
| **無制限帯域幅** | 転送量制限なし |

#### ⚠️ デメリット・制約

| 項目 | 詳細 |
|------|------|
| **ビルド時間制限** | 無料プランでは月500回まで |
| **サーバーサイド処理不可** | 静的サイト限定（Functions除く） |
| **日本語ドキュメント少なめ** | 公式は英語が中心 |
| **GitHub依存** | Git連携が前提（直接アップロード不可） |

---

## 準備するもの

### 必須要件

1. **GitHubアカウント**
   - リポジトリの作成・管理権限
   - パブリック/プライベートどちらでも可

2. **Cloudflareアカウント**
   - 無料プランで十分
   - メールアドレスで登録

3. **デプロイするサイト**
   - HTML/CSS/JavaScript
   - 静的サイトジェネレーター（Jekyll、Hugo、Next.js等）の出力

### あると便利なもの

- **カスタムドメイン**（オプション）
  - `.com` `.net` `.dev` などの独自ドメイン
  - 年間1,000〜2,000円程度
  - Cloudflare Registrarなら最安値で取得可能

---

## 手順1: GitHubリポジトリの準備

### 1.1 リポジトリ作成

まず、デプロイするサイトのファイルをGitHubリポジトリにプッシュします。

```bash
# ローカルでリポジトリ初期化
cd your-portfolio
git init
git add .
git commit -m "Initial commit"

# GitHubにプッシュ
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### 1.2 リポジトリ構造の確認

静的サイトの場合、以下のような構成が一般的です：

```
portfolio/
├── index.html          # メインページ
├── css/
│   └── style.css      # スタイルシート
├── js/
│   └── main.js        # JavaScript
├── images/            # 画像ファイル
└── README.md          # ドキュメント
```

**重要ポイント**:
- `index.html` がルートディレクトリにあること
- 相対パスで記述されていること
- 不要なビルドファイルは `.gitignore` で除外

---

## 手順2: Cloudflare Pagesへの接続

### 2.1 Cloudflare Dashboardにアクセス

1. [Cloudflare](https://dash.cloudflare.com/) にログイン
2. 左サイドバーから **Workers & Pages** を選択
3. **Create application** をクリック
4. **Pages** タブを選択
5. **Connect to Git** をクリック

### 2.2 GitHubとの連携

#### 初回接続の場合

1. **Connect GitHub** ボタンをクリック
2. GitHub認証画面が表示される
3. **Authorize Cloudflare** で権限を付与
4. 連携するリポジトリを選択
   - **All repositories** or **Only select repositories**
   - セキュリティ重視なら個別選択を推奨

#### リポジトリの選択

1. デプロイするリポジトリを一覧から選択
2. **Begin setup** をクリック

### 2.3 ビルド設定の構成

ここが最も重要なステップです。プロジェクトタイプに応じて設定します。

#### 静的サイト（HTML/CSS/JS）の場合

| 設定項目 | 値 |
|---------|-----|
| **Project name** | `your-portfolio`（任意の名前） |
| **Production branch** | `main` or `master` |
| **Framework preset** | `None` |
| **Build command** | （空欄） |
| **Build output directory** | `/` |

**解説**:
- **Framework preset**: フレームワークを使っていない場合は `None`
- **Build command**: ビルド不要なら空欄
- **Build output directory**: `index.html` があるディレクトリ（ルートなら `/`）

#### Jekyllサイトの場合

| 設定項目 | 値 |
|---------|-----|
| **Framework preset** | `Jekyll` |
| **Build command** | `jekyll build` |
| **Build output directory** | `_site` |

#### Next.js（Static Export）の場合

| 設定項目 | 値 |
|---------|-----|
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |

#### Hugo の場合

| 設定項目 | 値 |
|---------|-----|
| **Framework preset** | `Hugo` |
| **Build command** | `hugo` |
| **Build output directory** | `public` |

### 2.4 環境変数の設定（必要に応じて）

**Environment variables** セクションで必要な変数を追加：

```
NODE_VERSION=18
HUGO_VERSION=0.120.0
```

### 2.5 デプロイ開始

**Save and Deploy** をクリックすると、初回ビルドが開始されます。

---

## 手順3: デプロイプロセスの確認

### 3.1 ビルドログの確認

デプロイが開始されると、リアルタイムでビルドログが表示されます。

#### 成功時の表示例

```
Initializing build environment...
Cloning repository...
Installing dependencies...
Building your site...
✓ Build successful!
Deploying to Cloudflare's global network...
✓ Deployment complete!

Your site is live at: https://your-portfolio.pages.dev
```

#### エラー時の表示例

```
✗ Build failed
Error: Command "npm run build" exited with 1
```

エラーが発生した場合、ログの詳細を確認して原因を特定します。

### 3.2 プレビューURL

デプロイが成功すると、以下のURLが自動生成されます：

- **本番URL**: `https://your-portfolio.pages.dev`
- **コミットごとのプレビューURL**: `https://abc123.your-portfolio.pages.dev`

---

## 手順4: カスタムドメイン設定

### 4.1 ドメインの準備

独自ドメインを使用する場合、以下のいずれかで取得：

1. **Cloudflare Registrar**（最安値・おすすめ）
2. お名前.com
3. さくらインターネット
4. Google Domains（現在はSquarespaceに移管）

### 4.2 Cloudflare Pagesでカスタムドメイン追加

#### 手順

1. プロジェクトの **Custom domains** タブに移動
2. **Set up a custom domain** をクリック
3. ドメイン名を入力（例: `portfolio.example.com`）
4. **Continue** をクリック

Cloudflareが自動的にDNSレコードを提案します：

```
Type: CNAME
Name: portfolio
Target: your-portfolio.pages.dev
```

### 4.3 DNS設定（Cloudflare管理の場合）

ドメインがCloudflareで管理されている場合、**Activate domain** をクリックするだけで自動設定されます。

### 4.4 DNS設定（外部DNS管理の場合）

#### サブドメイン（例: portfolio.example.com）

外部DNSプロバイダーで以下を設定：

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | portfolio | your-portfolio.pages.dev | 3600 |

#### ルートドメイン（例: example.com）

**重要**: ルートドメインにはCNAMEを設定できません。

**解決方法**:

1. **Aレコードを使用**（Cloudflare提供のIPアドレス）
2. **ALIAS/AFLATレコード**（一部DNSプロバイダーのみ対応）
3. **ドメインをCloudflareに移管**（推奨）

Cloudflareが提供するIPアドレス例：
```
Type: A
Name: @
Target: 192.0.2.1
```

### 4.5 SSL証明書の自動発行

DNSレコードが正しく設定されると、Cloudflareが自動的に：

1. SSL証明書を発行
2. HTTPSを有効化
3. HTTPからHTTPSへリダイレクト

**所要時間**: 通常5〜15分（DNS伝搬含む）

---

## 手順5: 自動デプロイの確認

### 5.1 GitHubでコミット

リポジトリのファイルを更新してプッシュ：

```bash
# ファイルを編集
nano index.html

# コミット
git add .
git commit -m "Update homepage content"
git push origin main
```

### 5.2 自動ビルドの確認

Cloudflare Dashboardで**Deployments**タブを確認すると：

- 自動的に新しいビルドが開始
- リアルタイムでビルドステータス表示
- 完了後、自動的に本番環境に反映

### 5.3 ロールバック機能

万が一問題が発生した場合、以前のデプロイにワンクリックで戻せます：

1. **Deployments** タブで過去のデプロイ一覧表示
2. 戻したいバージョンの **...** メニュー
3. **Rollback to this deployment** を選択

---

## トラブルシューティング

### 問題1: ビルドが失敗する

#### 症状
```
✗ Build failed
Error: Command not found
```

#### 原因と対処法

| 原因 | 対処法 |
|------|--------|
| Node.jsバージョン不一致 | 環境変数で `NODE_VERSION=18` 指定 |
| 依存関係のインストール失敗 | `package-lock.json` をコミット |
| ビルドコマンドが間違っている | `package.json` の `scripts` を確認 |
| メモリ不足 | ビルドプロセスを軽量化 |

### 問題2: カスタムドメインが反映されない

#### 症状
- DNSレコードを設定したのにアクセスできない
- SSL証明書が発行されない

#### 原因と対処法

**DNS伝搬の遅延**
- 最大48時間かかる場合あり
- [WhatsMyDNS](https://www.whatsmydns.net/) で伝搬状況を確認

**CNAMEレコードの設定ミス**
```
# ❌ 間違い
Name: portfolio.example.com
Target: your-portfolio.pages.dev.  # 末尾のドット不要

# ✅ 正しい
Name: portfolio
Target: your-portfolio.pages.dev
```

**ルートドメインにCNAME設定**
- ルートドメイン（@）にはAレコードを使用
- または、ドメインをCloudflareに移管

### 問題3: 404エラーが発生する

#### 症状
- トップページは表示されるが、サブページで404エラー

#### 原因と対処法

**SPAルーティングの問題**

Next.js/React Router等のSPAでは、`_redirects` ファイルが必要：

```
# public/_redirects
/*    /index.html   200
```

**相対パスの問題**

`/css/style.css` ではなく `./css/style.css` を使用

### 問題4: さくらの無料ドメイン（.jpn.org）が使えない

#### 実際に遭遇した問題

さくらインターネットの無料ドメイン（`.jpn.org`）には重大な制約があります：

**制約内容**:
- **TXTレコードのみ編集可能**
- **CNAME/Aレコードの編集・追加が不可**
- さくらサーバー内部専用の制限付きドメイン
- 外部サービス（Cloudflare Pages）への接続は技術的に不可能

#### 解決策

1. **無料URLで運用**
   - Cloudflare Pages: `your-site.pages.dev`
   - GitHub Pages: `username.github.io/repo`

2. **独自ドメインを取得**
   - `.com` `.net` `.dev` など
   - 年間1,000〜2,000円程度
   - Cloudflare Registrarがおすすめ

---

## 他サービスとの比較

### Cloudflare Pages vs GitHub Pages vs Netlify vs Vercel

| 項目 | Cloudflare Pages | GitHub Pages | Netlify | Vercel |
|------|-----------------|--------------|---------|--------|
| **無料プラン** | 無制限に近い | 月100GB | 月100GB | 月100GB |
| **ビルド時間** | 月500回 | 月2,000分 | 月300分 | 月6,000分 |
| **CDN** | 世界275都市+ | GitHub CDN | Netlify CDN | Vercel Edge |
| **カスタムドメイン** | 無制限 | 無制限 | 無制限 | 無制限 |
| **プレビュー** | あり | なし | あり | あり |
| **Functions** | あり | なし | あり | あり |
| **分析** | あり | なし | 有料 | 有料 |
| **日本語ドキュメント** | 少 | 多 | 中 | 中 |

### おすすめの使い分け

| 用途 | おすすめサービス |
|------|-----------------|
| **個人ブログ** | GitHub Pages（Jekyll連携） |
| **ポートフォリオ** | Cloudflare Pages（高速・無料） |
| **Next.jsアプリ** | Vercel（公式サポート） |
| **ビルドヘビー** | Netlify（ビルド時間長い） |
| **グローバル展開** | Cloudflare Pages（CDN最強） |

---

## パフォーマンス最適化

### 画像の最適化

#### WebP変換

```bash
# ImageMagickを使用
convert image.jpg -quality 80 image.webp

# HTMLで使用
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="画像">
</picture>
```

### CSS/JSの最小化

#### ビルド設定で自動化

```json
// package.json
{
  "scripts": {
    "build": "npm run minify-css && npm run minify-js",
    "minify-css": "cleancss -o dist/style.min.css src/style.css",
    "minify-js": "terser src/main.js -o dist/main.min.js"
  }
}
```

### キャッシュ設定

Cloudflareは自動的に最適なキャッシュ設定を適用しますが、カスタマイズも可能：

**_headers ファイル**
```
/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

## まとめ

### Cloudflare Pagesのメリット再確認

- ✅ **完全無料**で高速なCDN
- ✅ **GitHub連携**で自動デプロイ
- ✅ **無制限帯域幅**で安心
- ✅ **プレビューデプロイ**で安全に確認
- ✅ **自動HTTPS**でセキュア

### 注意すべきポイント

- ⚠️ さくらの無料ドメイン（`.jpn.org`）は使えない
- ⚠️ ルートドメインにはCNAME不可（Aレコード使用）
- ⚠️ ビルドコマンドとディレクトリの設定に注意
- ⚠️ DNS伝搬には最大48時間かかる

### 次のステップ

1. **OGP設定**: SNSシェア対応
2. **Google Analytics**: アクセス解析
3. **Cloudflare Analytics**: パフォーマンス監視
4. **SEO最適化**: メタタグ、sitemap.xml

---

## 参考リンク

- [Cloudflare Pages公式ドキュメント](https://developers.cloudflare.com/pages/)
- [GitHub Pages公式ドキュメント](https://docs.github.com/pages)
- [DNS伝搬チェックツール](https://www.whatsmydns.net/)
- [Lighthouse（パフォーマンス測定）](https://developers.google.com/web/tools/lighthouse)

---

**作成日**: 2025年11月15日  
**執筆者**: hantani  
**カテゴリ**: Dev, Deployment  
**所要時間**: 約15分で完了（DNS伝搬除く）
