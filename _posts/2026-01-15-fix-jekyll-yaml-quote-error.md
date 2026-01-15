---
layout: post
title: "Jekyll YAML front matterの引用符エラーを解決：タイトルが表示されない問題"
date: 2026-01-15 12:00:00 +0900
categories: [Dev, Troubleshooting]
tags: [Jekyll, YAML, GitHub Pages, エラー解決, トラブルシューティング, ブログ]
description: Jekyll/GitHub Pagesでブログ記事のタイトルが表示されず、日付も正しく反映されない問題を解決した手順を解説します。原因はYAML front matterの引用符の入れ子でした。
---

## 問題の概要

ブログ記事のページを開いたところ、以下の問題が発生していました。

- **タイトルが表示されない**: ページタイトルが「\| garyohosu」のみで、記事タイトルが欠落
- **日付が間違っている**: front matterで `2025-11-21` と指定しているのに、今日の日付（2026-01-15）が表示される
- **本文は正常**: 記事の本文自体は正しく表示されている

問題のURL: `https://garyohosu.github.io/posts/2025-11-21-note-multi-agent-language-negotiation/`

## 原因の特定

GitHubでソースファイルを確認したところ、以下のエラーメッセージが表示されていました。

```
Error in user YAML: (<unknown>): did not find expected key while parsing a block mapping at line 1 column 1
```

front matterを確認すると、問題の原因が判明しました。

```yaml
---
layout: post
title: "noteに記事を公開しました：エージェント同士が"言語で交渉するAI"が登場した"
---
```

**問題点**: `title` の値を囲む外側のダブルクォート `"..."` の中に、内側のダブルクォート `"言語で交渉するAI"` が含まれていました。YAMLパーサーはこれを正しく解釈できず、front matter全体のパースに失敗していました。

## 解決手順

### 1. 問題のあるファイルを特定

```
_posts/2025-11-21-note-multi-agent-language-negotiation.md
```

### 2. front matterの引用符を修正

内側のダブルクォートを日本語の鉤括弧に変更しました。

**修正前:**
```yaml
title: "noteに記事を公開しました：エージェント同士が"言語で交渉するAI"が登場した"
description: noteで公開した「エージェント同士が"言語で交渉するAI"が登場した」を紹介します。
```

**修正後:**
```yaml
title: "noteに記事を公開しました：エージェント同士が「言語で交渉するAI」が登場した"
description: noteで公開した「エージェント同士が『言語で交渉するAI』が登場した」を紹介します。
```

### 3. 変更をコミット・プッシュ

```bash
git add _posts/2025-11-21-note-multi-agent-language-negotiation.md
git commit -m "fix(post): YAML front matterの引用符エラーを修正"
git push
```

### 4. GitHub Pagesのビルド完了を待つ

プッシュ後、1-2分程度でGitHub Pagesが再ビルドされ、正しく表示されるようになりました。

## 解決後の状態

- タイトルが正しく表示される
- 日付が `2025-11-21` で正しく表示される
- YAMLパースエラーが解消

## まとめ

Jekyll/GitHub Pagesで記事のメタデータが正しく表示されない場合、YAML front matterのパースエラーが原因である可能性があります。

### ポイント

- **引用符の入れ子に注意**: YAMLで文字列を `"..."` で囲む場合、内側に同じ `"` を使うとパースエラーになる
- **代替記号を使う**: 日本語の場合は鉤括弧 `「」` や二重鉤括弧 `『』` を使うとよい
- **GitHubで確認**: GitHubのファイル表示画面でYAMLエラーが表示されることがある
- **症状**: front matterのパースに失敗すると、タイトルや日付などのメタデータが正しく反映されない

### 他の解決方法

引用符の問題は以下の方法でも解決できます。

1. **シングルクォートで囲む**: `title: 'タイトルに"引用"を含む'`
2. **エスケープする**: `title: "タイトルに\"引用\"を含む"`
3. **引用符なしで書く**: 特殊文字がなければ引用符は不要（ただしコロン `:` などがある場合は必要）

同じような問題に遭遇した方の参考になれば幸いです。
