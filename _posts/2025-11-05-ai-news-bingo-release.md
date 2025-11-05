---
layout: post
title: "AIニュースBingoを公開：毎日変わる5x5盤をXへ共有できるPWA"
date: 2025-11-05 21:45:00 +0900
categories: [blog, app]
tags: [AIニュースBingo, PWA, GitHub Pages, Service Worker, 生成AIニュース]
description: "ブログ内の /apps/ai-news-bingo/ で遊べるAIニュース向けビンゴPWAを公開。主な機能、使い方、裏側の仕組み、今後の改善アイデアをまとめました。"
---

GitHub Pages 上に置いた軽量PWA「AIニュースBingo」を公開しました。アプリ直通リンクは [/apps/ai-news-bingo/](/apps/ai-news-bingo/)。

毎日増えていくAI関連ニュースをそのまま楽しめる小ネタとして、5×5 のビンゴ盤で「今日のトレンド用語」を追いかけられます。ブログの「アプリ」タブからもアクセス可能です。

## どんなアプリ？

- 日付シードで盤面が固定される 5×5 ビンゴ。中央マスは FREE。
- 用語は `words.json`（AIニュース要素を手作業で選定）から抽選し、カテゴリ別に色分け。
- 画像出力（PNG）して X にそのまま添付できる共有メッセージを生成。
- PWA 対応でオフラインでも遊べ、ホーム画面追加プロンプトを内蔵。

## 使い方

1. [/apps/ai-news-bingo/](/apps/ai-news-bingo/) にアクセスすると、その日の AI ニュース語彙で埋まった盤面が生成されます。
2. 「日付シード」で過去・未来の日付を選ぶと、その日付の話題に基づいた盤面を再現。
3. 「もう一枚」で派生シード（同日付で別の組み合わせ）を作成。
4. Bingo を作ったら「画像を書き出す」でPNGを保存するか、「Xで共有する」でテキスト＋画像URLを添付。
5. 右下のインストールボタンからホーム画面に追加すればオフラインでも利用できます。

## 技術メモ

- すべて静的ファイルで構成し、`apps/ai-news-bingo/` ディレクトリだけで完結。Jekyll 側のビルド設定変更は不要でした。
- `sw.js` は Network-First → Cache-Fallback 戦略。盤面生成に必要な JSON は日次で更新される想定なので、更新検出用に `update-bingo-words.yml` ワークフローで `words.json` を定期取得。
- 画像書き出しは canvas + `toDataURL` を使い、`<a id="download">` に一時的な blob URL を割り当ててダウンロード。HTML Proofer の警告回避のために空リンクへ `href="#"` を入れたのが今回のデプロイ修正ポイントです。
- UI はプレーン CSS。カテゴリ色は `categories.json` でまとめ、JS 側で割り当てています。

## 今後やりたいこと

- 用語リストを自動更新するスクリプトの公開（ソースは `scripts/update_bingo_words.mjs`）。
- Bing/Google ニュースRSSを解析し、ニュース本文へのリンクを盤面に添える拡張。
- Bingo 達成ライン数をベースに X 投稿テンプレートを自動生成。
- 週次でランキング的な共有（何人が Bingo 達成したか）を作るかも検討中。

ぜひ遊んでみて、改善アイデアがあれば教えてください！
