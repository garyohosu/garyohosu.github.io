---
layout: post
title: "家のPCからブログを書いてみた"
date: 2025-09-07 00:01:00 +0900
categories: [blog]
tags: [Codex, GitHub Pages, 自宅環境]
---

今回は自宅のPCからCodex CLIとghを使ってブログ投稿に成功しました。手順は以下の通りです。

1. リポジトリをクローン

   ```bash
   git clone https://github.com/garyohosu/garyohosu.github.io.git
   ```

2. ブランチを作成

   ```bash
   git checkout -b from-home-pc
   ```

3. 記事を追加

   ```bash
   codex new "家のPCからブログを書いてみた"
   ```

4. 変更をコミット＆プッシュ

   ```bash
   git add _posts/2025-09-07-from-home-pc.md
   git commit -m "feat: 家のPCからブログを書いてみた"
   git push --set-upstream origin from-home-pc
   ```

5. GitHub CLI でプルリクエスト作成

   ```bash
   gh pr create --fill
   ```

このようにして、自宅環境から問題なくブログに記事を追加し、公開まで完了しました。