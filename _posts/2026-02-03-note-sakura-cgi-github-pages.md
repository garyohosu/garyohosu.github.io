---
layout: post
title: "GitHub Pages内だけで完結する「さくらCGI」呼び出し術（403問題回避版）"
date: 2026-02-03 12:00:00 +0900
categories: [Note]
tags: [note, github-pages, sakura, cgi, sqlite, python, cors, 403]
image:
  path: /assets/img/2026-02-02-note-sakura-cgi-github-pages.png
---

noteに新しい記事を投稿しました。

## 記事の概要

GitHub Pagesの静的サイトに、さくらレンタルサーバーのCGI（Python）とSQLiteを組み合わせて、**月131円から動かせるデータベース駆動のウェブアプリ**を作る方法をまとめています。GitHub Pages内で完結する構成にするための工夫や、403問題の回避策も扱っています。

記事内では、実際に動いている**リアルタイム訪問者マップ**のデモや、CORS対応・SQLite保護・SQLインジェクション対策などの実装ポイントを紹介しています。

## この記事で分かること

- GitHub Pages + さくらCGI + SQLiteのシンプルな構成
- 403エラーやCORS問題を回避するための実装ポイント
- データベースファイルを直接取得されないための保護方法
- 小規模プロジェクト向けのコスト試算と注意点

## 記事を読む

詳しくはこちらのnoteをご覧ください：

[GitHub Pages内だけで完結する「さくらCGI」呼び出し術（403問題回避版）](https://note.com/hantani/n/ndabd906c2727)
