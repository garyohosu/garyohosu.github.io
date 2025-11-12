---
layout: post
title: "note記事のアイキャッチ画像を修正：別記事の画像が表示される問題を解決"
date: 2025-11-13 09:00:00 +0900
categories: [Dev, Blog]
tags: [Jekyll, ブログ運用, トラブルシューティング, note, OGP, アイキャッチ画像]
description: ブログで公開したnote記事の紹介ポストのアイキャッチ画像が混同していた問題を修正しました。問題原因と対策、今後同じ不具合を避けるための注意事項をまとめます。
image:
  path: /assets/img/2025-11-13-fix-note-article-thumbnails.svg
  alt: note記事のアイキャッチ画像修正完了
---

## やったこと

Gensparkの記事と沖縄弁の記事のアイキャッチ画像が同じ `/assets/img/note.png`になっていた問題を修正しました。

### 修正内容

| 記事 | 修正前 | 修正後 |
|------|--------|--------|
| **Genspark** | `/assets/img/note.png` | `/assets/img/2025-11-12-note-genspark-ai-browser.png` |
| **沖縄弁** | `/assets/img/note.png` | `/assets/img/2025-11-11-note-okinawan-dialect.png` |

それぞれnote元記事の正式なサムネイル画像をダウンロードして、個別のファイルとして保存しました。

## 問題原因

複数のnote記事紹介ポストを追加する際に、**汎用のnote.pngを全ての記事で使い回していた**ため、以下の問題が発生していました：

1. **視覚的な混同**：どの記事がどのコンテンツなのか区別がつかない
2. **OGP情報の不適切さ**：SNS共有時に記事ごとのサムネイルが表示されない
3. **ユーザー体験の低下**：リスト表示でどの記事を読むか判断しづらい

### 原因の根本

- note記事紹介ポストが増えるにつれ、個別にOG画像をダウンロード・管理するのが煩雑だと考えていた
- noteのロゴだけで十分だという誤認
- note本体のOG画像URLを直接参照せずにローカル保存する習慣がなかった

## 対策

### 1. 正式なサムネイル画像の取得

それぞれのnote元記事のメタデータから、OG画像URLを抽出：

```
Genspark記事:  https://assets.st-note.com/production/uploads/images/228941584/4bd5bf35b4f07496b444fa795c9c50f4.png
沖縄弁記事:    https://assets.st-note.com/production/uploads/images/228414301/e8e9f6a6fd0a85713326ee996fe689f1.png
```

### 2. ローカル保存

命名規則を統一して保存：

```bash
curl -L -o "2025-11-12-note-genspark-ai-browser.png" "https://assets.st-note.com/..."
curl -L -o "2025-11-11-note-okinawan-dialect.png" "https://assets.st-note.com/..."
```

### 3. フロントマターの更新

各記事のmarkdownファイルの`image.path`を修正：

```yaml
# 修正前
image:
  path: /assets/img/note.png

# 修正後（Genspark記事）
image:
  path: /assets/img/2025-11-12-note-genspark-ai-browser.png

# 修正後（沖縄弁記事）
image:
  path: /assets/img/2025-11-11-note-okinawan-dialect.png
```

## 今後同じ不具合を避けるための注意事項

### ✅ アイキャッチ画像の管理ルール

1. **note記事紹介時は必ず個別画像を保存する**
   - 汎用のnote.pngではなく、記事ごとのサムネイル画像を取得
   - note元記事のOG画像（`og:image`）を参考にする

2. **ファイル命名規則の統一**
   ```
   形式: {YYYY-MM-DD}-{サービス名}-{記事テーマ}.png
   例:   2025-11-12-note-genspark-ai-browser.png
        2025-11-11-note-okinawan-dialect.png
   ```
   - 日付で記事追加順序を把握しやすく
   - サービス+テーマで記事内容を判別可能に

3. **記事追加時のチェックリスト**
   - [ ] note元記事のOG画像URLを確認
   - [ ] `assets/img/`配下にローカル保存
   - [ ] フロントマターの`image.path`を個別ファイルに設定
   - [ ] ローカルビルドで画像表示を確認

### ⚠️ 避けるべきパターン

| ❌ やってはいけないこと | ✅ 推奨する方法 |
|----------------------|----------------|
| 複数記事で同じ汎用画像を使い回す | 記事ごとに固有のサムネイル画像を用意 |
| 記事追加時に画像確認をスキップ | ローカルビルドで表示確認を必須化 |
| noteの外部URLを直接参照 | 変更に備えてローカル保存を推奨 |

## 参考リソース

- **修正コミット**: `fix: fix article thumbnails to use note original images`
- **修正ファイル**:
  - `_posts/2025-11-12-note-genspark-ai-browser-831-mcp-servers.md`
  - `_posts/2025-11-11-note-okinawan-dialect-realtime-translation.md`
  - `assets/img/2025-11-12-note-genspark-ai-browser.png`（新規）
  - `assets/img/2025-11-11-note-okinawan-dialect.png`（新規）

---

このような細かいUX改善が積み重なると、読者にとってより使いやすいブログになっていきます。引き続き品質向上に努めます。
