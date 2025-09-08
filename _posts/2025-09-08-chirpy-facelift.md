---
title: "Chirpy最小カスタムでブログの見た目を刷新した"
date: 2025-09-08 12:00:00 +0900
categories: [Dev, Blog]
tags: [Jekyll, GitHub Pages, Chirpy, デザイン]
description: Chirpyテーマを大改造せず、フォントと配色、トップのヒーローだけを最小限に上書きして読みやすさを高めた記録。
---

## ねらい
GitHub Pages + Jekyll（Chirpy）運用のまま、雰囲気を現代寄りに。フォントとアクセント色を刷新し、トップに軽いヒーローを置いて導線を明確化。

## 何を変えたか
- フォントを「Inter × Noto Sans JP」に
- アクセントをティール系に統一
- 投稿カードに浅めの影、タグをピル表示
- ナビに薄いブラーを付与
- トップにヒーロー（キャッチ＋CTA）

## 実装メモ（最小カスタム）
- `assets/css/jekyll-theme-chirpy.scss` をサイト側に置き、末尾に override を追記
- `index.md`（layout: home）にヒーローを差し込み
- 既定OGPは `_config.yml` の `defaults` で `image` を指定（後で差し替え可）

## 今後
タグ導線の改善、Rougeハイライトの配色調整、OGPの共通テンプレ作成など。
