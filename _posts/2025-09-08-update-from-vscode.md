---
layout: post
title: "VS Codeからブログを更新してみた"
date: 2025-09-08 00:01:00 +0900
categories: [blog]
tags: [VS Code, Codex, Jekyll, GitHub Pages]
---

VS Code 上でこのリポジトリを開き、記事を追加しました。作業の流れとメモを残します。

## 変更内容

- `_posts/` に本記事を新規作成
- ローカルプレビュー手順を追記
- デプロイは GitHub Actions（Pages）に任せる構成のまま

## 手順メモ

1. VS Code でフォルダを開く
2. 新規記事を作成（`_posts/YYYY-MM-DD-title.md`）
3. フロントマターを設定（`layout`, `title`, `date`, `categories`, `tags`）
4. ローカルで表示確認（任意）

```bash
bundle install
bundle exec jekyll serve
# ブラウザで http://127.0.0.1:4000 を開く
```

5. Git にコミット & プッシュ（Pages が自動デプロイ）

```bash
git add _posts/2025-09-08-update-from-vscode.md
git commit -m "feat: VS Codeからブログを更新してみた"
git push
```

## 補足

- サイト設定は `/_config.yml`（`lang: ja-JP`, `timezone: Asia/Tokyo`）。
- PWA/SEO/コメント等は必要に応じて `comments`, `analytics` を設定可能です。

