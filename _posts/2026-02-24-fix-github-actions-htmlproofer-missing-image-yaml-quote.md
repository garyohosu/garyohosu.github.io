---
layout: post
title: "GitHub Actionsでビルド失敗：HTMLProofer画像切れとYAML引用符エラーの原因と対策"
date: 2026-02-24 13:30:00 +0900
categories: [Dev, Troubleshooting]
tags: [GitHub Actions, HTMLProofer, Jekyll, YAML, GitHub Pages, CI/CD, トラブルシューティング]
description: "2026-02-23のBuild and Deploy失敗を事例に、HTMLProoferの画像リンク切れとYAML front matter引用符エラーの原因、修正手順、再発防止策をまとめます。"
image:
  path: /assets/img/2026-02-24-fix-github-actions-htmlproofer-missing-image-yaml-quote.svg
  alt: "GitHub Actions障害の原因と対策まとめ"
---

2026年2月23日、GitHub Pagesの `Build and Deploy` が連続で失敗しました。  
失敗した実行は `22301912679` と `22302830544` です。

この記事では、実際に発生した2つの原因と、修正内容・再発防止策を整理します。

## 発生したエラー

`build` ジョブの `Test site`（`htmlproofer`）で以下のエラーが発生していました。

```text
internal image /auto-ai-blog/assets/images/chatgpt-vs-claude-2026-comparison.png does not exist
internally linking to /auto-ai-blog/assets/images/chatgpt-vs-claude-2026-comparison.png, which does not exist
```

同時に `Build site` 側で、YAMLのパースエラーも出ていました。

```text
YAML Exception ... did not find expected key while parsing a block mapping at line 2 column 1
```

## 原因1: 実在しない内部画像への参照

問題の記事のフロントマターで、次のように `image` が設定されていました。

```yaml
image: /auto-ai-blog/assets/images/chatgpt-vs-claude-2026-comparison.png
```

このパスはこのリポジトリ内に存在せず、`htmlproofer` が内部リンク切れとしてビルドを停止しました。

### 対策

- `assets/img/` に画像ファイルを追加
- `image` をローカル画像パスへ修正

```yaml
image: /assets/img/2026-02-20-chatgpt-vs-claude-comparison-2026.svg
```

## 原因2: YAMLタイトルでの入れ子引用符

別記事のタイトルで、外側の `"` の中に未エスケープの `"` が含まれていました。

```yaml
# NG
title: "・・・AIは"実行力"の時代へ"
```

YAMLとして不正になるため、`Build site` 中に例外が出ていました。

### 対策

内側の引用符を `「」` に置換して、YAMLを正しい形式に修正しました。

```yaml
# OK
title: "・・・AIは「実行力」の時代へ"
```

## 今回の修正ファイル

- `_posts/2026-02-20-chatgpt-vs-claude-comparison-2026.md`
- `assets/img/2026-02-20-chatgpt-vs-claude-comparison-2026.svg`
- `_posts/2026-02-18-ai-news-trends-february-week3-update.md`
- `AGENTS.md`（インシデント記録と再発防止チェック追記）
- `CHANGELOG.md`

## 再発防止策

1. フロントマターの `image.path` だけでなく、`image:` 形式でも実在ファイル確認を必須化  
2. タイトル・説明文で入れ子の `"` を使わない（`「」` またはエスケープを使用）  
3. プッシュ後は必ず `gh run list --limit 1` で `Build and Deploy` の成功を確認  

Jekyll運用では、Markdown本文よりも「フロントマターの型・文字列形式」で落ちることが多いです。  
記事追加時は、YAMLと画像パスを最優先でチェックするのが安全です。
