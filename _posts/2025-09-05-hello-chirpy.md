---
layout: post
title: はじめての投稿 — Chirpy でブログ開始
date: 2025-09-05 12:00:00 +0900
categories: [Blog]
tags: [intro, chirpy]
---

最初のエントリです。Chirpy テーマと GitHub Pages の動作確認を兼ねています。

- 設定: `_config.yml` を編集（`url`, `lang`, `timezone`）
- 投稿場所: `_posts/` に `YYYY-MM-DD-title.md`
- カテゴリ/タグ: 配列で指定（例を参照）

```bash
# 新しい記事の雛形（PowerShell 例）
$today = (Get-Date -Format 'yyyy-MM-dd')
Set-Content "_posts/$today-new-post.md" "---`nlayout: post`ntitle: 新しい投稿`ndate: $today 12:00:00 +0900`ncategories: [Blog]`ntags: [note]`n---`n"
```

必要に応じて About やナビゲーションも編集してください（`_tabs/`）。