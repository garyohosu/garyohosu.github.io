---
layout: post
title: "Jekyllでタグに「数字だけ」を使うとビルドが落ちる罠と解決策"
date: 2026-02-04 15:00:00 +0900
categories: [Note]
tags: [jekyll, liquid, troubleshooting, github-actions, ruby]
---

Jekyll（GitHub Pages）でブログを運営している際、特定の記事を追加した直後にGitHub Actionsのビルドが突然失敗する現象に遭遇しました。

原因を調査したところ、Liquidテンプレート特有の「数値と文字列の扱い」に関する意外な罠がありました。

## 現象：ビルド時に発生する謎のエラー

GitHub Actionsのログに以下のエラーが出力され、サイトの生成が停止しました。

```
Liquid Exception: undefined method `gsub' for an instance of Integer in .../_layouts/post.html
...
jekyll-4.4.1/lib/jekyll/utils.rb:368:in `replace_character_sequence_with_hyphen': undefined method `gsub' for an instance of Integer (NoMethodError)
```

「Integer（整数）に対して `gsub`（文字列置換）メソッドが定義されていない」というエラーです。

## 原因：YAMLが「数字だけのタグ」を整数として解釈した

原因は、新しく追加した記事のフロントマター（YAML）にありました。

```yaml
# 失敗した例
tags: [note, github-pages, 403]
```

この記事には「403エラー」に関する内容が含まれていたため、タグに `403` を指定しました。しかし、YAMLパーサーは引用符のない数字 `403` を**「文字列」ではなく「整数（Integer）」**として読み込みます。

その後、Jekyll（またはテーマのテンプレート）がこのタグをURLフレンドリーな形式に変換しようと `slugify` フィルタを通した際、内部で文字列置換メソッド `gsub` を呼び出そうとします。しかし、対象が整数であるためエラーが発生してしまったのです。

## 解決策：数字だけのタグはクォートで囲む

解決方法は非常にシンプルです。YAML内で数字を**ダブルクォート（`"`）またはシングルクォート（`'`）で囲み、明示的に文字列として指定します。**

```yaml
# 修正後
tags: [note, github-pages, "403"]
```

これで、パーサーが文字列として読み込むようになり、ビルドエラーは解消されました。

## 再発防止：自動化とチェックリスト

今回の教訓として、以下の対策を実施しました。

1.  **ナレッジベース（AGENTS.md）への追記**: AIエージェントや開発者が同じミスを繰り返さないよう、インシデント事例として記録しました。
2.  **チェックリストの強化**: 記事作成時の確認事項に「数字のみのタグはクォートすること」を追加しました。
3.  **プッシュ後のActions確認**: 記事をアップロードした後は、必ずGitHub Actionsの実行結果を確認し、成功を見届けるまでを「作業完了」の定義としました。

Jekyllは自由度が高い反面、YAMLの型解釈によるエラーが起こりやすい一面もあります。特に数字を含むタグやカテゴリーを扱う際は、常にクォートを意識するのが安全です。
