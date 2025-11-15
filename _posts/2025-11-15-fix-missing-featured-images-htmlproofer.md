---
layout: post
title: "GitHub Actions エラー修正：htmlproofer で見つかった画像欠落バグの解決方法"
date: 2025-11-15 14:00:00 +0900
categories: [Dev, Tech]
tags: [GitHub Actions, htmlproofer, CI/CD, Jekyll, デバッグ, エラー修正, 画像管理]
description: ブログ記事を公開後、GitHub Actionsのhtmlprooferで画像欠落エラーが発生。note記事のOG画像取得からエラー解決までの一連の流れを技術的に解説します。
---

## はじめに

先ほど、note記事を2本紹介するブログ記事を公開したところ、GitHub Actionsでビルドエラーが発生しました。

この記事では、エラーの発見から原因特定、そして解決までのプロセスを技術的に記録します。

## 発生したエラー

### GitHub Actions の失敗

記事をプッシュ後、GitHub Actionsの `Build and Deploy` ワークフローが失敗しました。

```bash
$ gh run list --limit 5
completed  failure  feat(post): note記事2本追加（初の有料記事全力宣伝とごはん難民AIプロンプト）
```

### エラーログの確認

`gh run view` でログを確認すると、`htmlproofer` が画像の存在チェックでエラーを出していました：

```
For the Images check, the following failures were found:

* At _site/index.html:1:
  internal image /assets/img/2025-11-15-note-gohan-nanmin-ai-prompt.png does not exist

* At _site/index.html:1:
  internal image /assets/img/2025-11-15-first-paid-note-article.png does not exist

* At _site/index.html:1:
  internal image /assets/img/2025-11-14-note-genspark-github-mcp-15min-blog.png does not exist

HTML-Proofer found 9 failures!
```

## 原因の特定

### 問題点

3つの記事で、フロントマターに `image.path` を設定していましたが、実際の画像ファイルが `assets/img/` ディレクトリに存在していませんでした。

**欠落していた画像**：
1. `2025-11-15-first-paid-note-article.png` - 初の有料note記事
2. `2025-11-15-note-gohan-nanmin-ai-prompt.png` - ごはん難民AIプロンプト
3. `2025-11-14-note-genspark-github-mcp-15min-blog.png` - 15分ブログ

### なぜ発生したのか？

記事作成時に、アイキャッチ画像のパスをフロントマターに書いただけで、実際の画像ファイルをダウンロード・保存するのを忘れていました。

ローカルでは `bundle exec jekyll build` を実行していなかったため、この問題に気づきませんでした。

## 解決方法

### 1. note記事のOG画像URLを取得

各note記事から `og:image` のURLを `WebFetch` ツールで抽出しました：

```bash
# 初の有料記事
https://assets.st-note.com/production/uploads/images/229397290/0a3c2617b5dd5082abeeeecb7edc31a8.png

# ごはん難民プロンプト
https://assets.st-note.com/production/uploads/images/229505413/91cc8844526c2bca259fcfa9ebdb27a5.png

# 15分ブログ
https://assets.st-note.com/production/uploads/images/229350485/5e6182fe437d71e8c29e40fe4524ee11.png
```

### 2. 画像をダウンロード

`curl` コマンドで3つの画像をローカルに保存：

```bash
curl -L -o "assets/img/2025-11-15-first-paid-note-article.png" \
  "https://assets.st-note.com/production/uploads/images/229397290/0a3c2617b5dd5082abeeeecb7edc31a8.png"

curl -L -o "assets/img/2025-11-15-note-gohan-nanmin-ai-prompt.png" \
  "https://assets.st-note.com/production/uploads/images/229505413/91cc8844526c2bca259fcfa9ebdb27a5.png"

curl -L -o "assets/img/2025-11-14-note-genspark-github-mcp-15min-blog.png" \
  "https://assets.st-note.com/production/uploads/images/229350485/5e6182fe437d71e8c29e40fe4524ee11.png"
```

### 3. Git にコミット・プッシュ

```bash
git add assets/img/2025-11-15-first-paid-note-article.png \
        assets/img/2025-11-15-note-gohan-nanmin-ai-prompt.png \
        assets/img/2025-11-14-note-genspark-github-mcp-15min-blog.png

git commit -m "fix: add missing featured images for 3 note articles"
git push
```

### 4. GitHub Actions のビルド成功を確認

再度プッシュ後、GitHub Actions が成功しました：

```bash
$ gh run list --limit 2
completed  success  fix: add missing featured images for 3 note articles
```

## 学んだこと

### 1. htmlproofer の重要性

htmlproofer は、ビルド時に以下をチェックしてくれます：

- **画像の存在確認**: `img` タグや `image.path` で指定した画像が実際に存在するか
- **内部リンクの検証**: ブログ内のリンクが壊れていないか
- **外部リンクの検証**: （設定により）外部URLが有効か

このチェックがなければ、画像が表示されないまま公開してしまうところでした。

### 2. ローカルビルドの重要性

今回の失敗は、ローカルで `bundle exec jekyll build` を実行していなかったことが原因です。

**推奨ワークフロー**：
```bash
# 記事作成後
bundle exec jekyll build

# エラーがないことを確認
bundle exec jekyll serve

# ブラウザで確認後にプッシュ
git add -A
git commit -m "記事追加"
git push
```

### 3. 画像管理のチェックリスト

note記事紹介時のチェックリスト：

- [ ] note元記事のOG画像URLを確認
- [ ] `curl` または `WebFetch` で画像をダウンロード
- [ ] `assets/img/` 配下にローカル保存（命名規則：`YYYY-MM-DD-記事名.png`）
- [ ] フロントマターの `image.path` を設定
- [ ] ローカルビルドで画像表示を確認
- [ ] Git に画像ファイルを含めてコミット

### 4. CI/CD の価値

GitHub Actions による自動テストがなければ、この問題は本番環境で発見されていたかもしれません。

CI/CDパイプラインでの自動チェックは、品質保証に不可欠です。

## まとめ

今回のエラー修正を通じて、以下の重要性を再認識しました：

1. **自動テスト**（htmlproofer）による早期発見
2. **ローカルビルド**での事前確認
3. **画像管理のチェックリスト**の必要性
4. **CI/CDパイプライン**の価値

技術ブログを運営する上で、こうした細かいエラーハンドリングの積み重ねが、読者体験の向上につながります。

今後は、記事作成時に必ずローカルビルドを実行し、画像ファイルの存在を確認してからプッシュするようにします。

---

## 参考リンク

- [HTMLProofer - GitHub](https://github.com/gjtorikian/html-proofer)
- [Jekyll - Building and Testing](https://jekyllrb.com/docs/continuous-integration/github-actions/)
- [GitHub Actions - Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
