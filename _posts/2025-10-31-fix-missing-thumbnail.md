---
layout: post
title: "Jekyll ブログのサムネイル表示問題を修正：フロントマター欠落が原因"
date: 2025-10-31 10:00:00 +0900
categories: [Tech, Blog]
tags: [Jekyll, Chirpy, Playwright, デバッグ, フロントマター]
description: 最新記事のサムネイルが一覧ページで表示されない問題を、Playwrightで調査・修正した過程を記録します。
image:
  path: /assets/img/2025-10-31-fix-thumbnail.png
  alt: Jekyll ブログのサムネイル表示問題修正
---

## はじめに

このブログで最新記事のサムネイル画像が一覧ページで表示されない問題が発生しました。Claude Code と Playwright を使って調査・修正した過程を記録します。

## 問題の発見

ユーザーから「記事を開いた時に画像は問題なく表示されるが、記事を一覧表示した時のサムネが表示されていない。最新記事の話」という報告を受けました。

### Playwright で確認

まず、Playwright を使ってトップページの状態を確認しました：

```bash
# Playwrightでトップページにアクセス
https://garyohosu.github.io
```

アクセシビリティスナップショットで確認したところ、他の記事には `img` タグがあるのに、最初の記事だけ `img` タグが欠落していることが判明しました：

```yaml
# 最初の記事（サムネなし）
- article [ref=e58]:
  - link "Note Genspark Super Ai Agent 3d Printer Stl ..." [ref=e59]:
    - generic [ref=e61]:  # imgタグがない
      - heading "Note Genspark Super Ai Agent 3d Printer Stl"

# 2番目の記事（サムネあり）
- article [ref=e69]:
  - link "..." [ref=e70]:
    - img "【無料でここまで!?】Gemini CLI..." [ref=e73]  # imgタグがある
```

スクリーンショットでも視覚的に確認し、最初の記事だけサムネイルが表示されていないことを確認しました。

## 原因の特定

記事ファイル `_posts/2025-10-31-note-genspark-super-ai-agent-3d-printer-stl.md` を確認したところ、フロントマターが空でした：

```markdown
---
---

![GensparkのスーパーAIエージェントで3Dプリンタ用のSTLファイル作った](/assets/img/2025-10-31-note-genspark-stl.png)

2025-10-31（JST）に、noteで次の記事を書きました...
```

Jekyll の Chirpy テーマでは、フロントマターの `image` フィールドを使って一覧ページのサムネイルを生成します。フロントマター自体が空だったため、サムネイルが表示されませんでした。

### 確認ポイント

- ✅ 画像ファイル自体は `/assets/img/2025-10-31-note-genspark-stl.png` に存在
- ✅ 記事詳細ページでは本文中の画像が正常に表示
- ❌ フロントマターに `image` フィールドがなく、一覧ページでサムネイルが表示されない

## 修正内容

他の記事と同様の構造でフロントマターを追加しました：

```markdown
---
layout: post
title: "Note Genspark Super Ai Agent 3d Printer Stl"
date: 2025-10-31 09:00:00 +0900
categories: [Dev, Link]
tags: [note, AI, Genspark, 3Dプリンタ, STL]
description: 2025-10-31（JST）に、noteで次の記事を書きました。サマリーとリンクを置いておきます。
image:
  path: /assets/img/2025-10-31-note-genspark-stl.png
  alt: GensparkのスーパーAIエージェントで3Dプリンタ用のSTLファイル作った
---
```

### 重要なフィールド

- `layout`: 投稿のレイアウト（`post`）
- `title`: 記事タイトル
- `date`: 投稿日時
- `categories` / `tags`: カテゴリとタグ
- `description`: 記事の説明文
- **`image.path`**: サムネイル画像のパス（一覧ページで使用）
- **`image.alt`**: 画像の alt テキスト

## 検証

修正後、GitHub Actions でビルドが成功し、Playwright で再度確認しました：

```yaml
# 修正後：imgタグが追加された
- article [ref=e58]:
  - link "..." [ref=e59]:
    - img "GensparkのスーパーAIエージェントで3Dプリンタ用のSTLファイル作った" [ref=e62]
    - generic [ref=e64]:
      - heading "Note Genspark Super Ai Agent 3d Printer Stl"
```

スクリーンショットでも、3Dプリンタのキャラクター画像がサムネイルとして正しく表示されることを確認しました。

## 学んだこと

### Jekyll + Chirpy でのサムネイル表示の仕組み

1. **記事一覧ページ**：フロントマターの `image.path` を使用
2. **記事詳細ページ**：本文中の Markdown 画像（`![alt](path)`）を表示
3. 両方が異なる画像パスを指定できるため、適切に設定する必要がある

### デバッグのポイント

- **Playwright のアクセシビリティスナップショット**は、DOM 構造を素早く確認できる
- **スクリーンショット**で視覚的な確認も重要
- Jekyll のフロントマターは YAML 形式で、**空のフロントマター（`---\n---`）は有効だが、フィールドがないと機能しない**

## まとめ

Jekyll ブログでサムネイルが表示されない場合は、以下を確認しましょう：

1. ✅ 画像ファイルが存在するか
2. ✅ フロントマターに `image.path` が設定されているか
3. ✅ `image.path` のパスが正しいか
4. ✅ ビルドエラーが発生していないか

Playwright などのツールを活用することで、視覚的な問題を素早く特定・修正できます。

---

関連記事：
- [Jekyll ビルドエラー修正：依存関係の問題を Claude が解決](/posts/jekyll-dependency-fix/)
