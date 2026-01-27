---
layout: post
title: "GitHub Pages + さくらCGIでCORS問題を解決 - Cloudflare Workersなど他の選択肢との比較も"
date: 2026-01-27 12:00:00 +0900
categories: [Note]
tags: [note, github-pages, cors, cgi, cloudflare-workers, vercel, deno-deploy]
image:
  path: /assets/img/2026-01-27-note-github-pages-sakura-cgi-cors.png
---

noteに新しい記事を投稿しました。

## 記事の概要

GitHub Pagesは静的サイトホスティングとして優れていますが、動的な処理が必要な場合に制約があります。この記事では、さくらレンタルサーバーのCGI機能と連携することで、その制約を超える方法を実験しました。

実際に試してみると**CORS（クロスオリジンリソース共有）**の問題に直面。その解決方法について詳しく解説しています。

## 他の選択肢との比較

GitHub Pagesで動的処理を追加したい場合、さくらCGI以外にも以下の選択肢があります：

| サービス | 特徴 | 料金 |
|---------|------|------|
| **さくらCGI** | 既存サーバーを活用、Perl/PHP対応 | レンタルサーバー料金内 |
| **Cloudflare Workers** | エッジで高速実行、KV/D1対応 | 無料枠あり（10万リクエスト/日） |
| **Vercel Functions** | Next.jsと親和性高、簡単デプロイ | 無料枠あり |
| **Deno Deploy** | TypeScript/Denoネイティブ | 無料枠あり |

それぞれ一長一短がありますが、既存のさくらレンタルサーバーを持っている場合はCGI連携も有力な選択肢です。

## 記事を読む

詳細はnoteの記事をご覧ください：

[GitHub PagesからさくらレンタルサーバーのCGIを呼び出す実験― CORSで詰まった話と回避方法 ―](https://note.com/hantani/n/n8f73bdfa48a1)
