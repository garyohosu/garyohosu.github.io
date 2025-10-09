---
title: Jekyll ビルドエラー修正：依存関係の問題を Claude が解決
date: 2025-10-09 09:00:00 +0900
categories: [Tech, Blog]
tags: [Jekyll, Claude, Chirpy, GitHub Pages, 依存関係, トラブルシューティング]
image:
  path: /assets/img/2025-10-09-jekyll-dependency-fix.png
  alt: Jekyll ビルドエラー修正 - jekyll-sass-converter バージョン不一致を解決
---

## はじめに

このブログで Jekyll のビルドエラーが発生していました。Claude Code を使って調査・修正した過程を記録します。

## 問題の発見

ブログの表示が崩れているという報告を受けました。まず、Claude が Playwright を使ってサイトの表示を確認しました。

```bash
# Playwrightでサイトをスクリーンショット
https://garyohosu.github.io/
```

構造的には問題なさそうでしたが、Jekyll のビルドプロセスを確認すると、エラーが発見されました。

## 原因の特定

ローカルでビルドを試したところ、以下のエラーが発生：

```
Could not find gem 'jekyll-sass-converter (~> 2.2)' in locally installed gems.

The source contains the following gems matching 'jekyll-sass-converter':
  * jekyll-sass-converter-3.1.0
```

### 問題点

- **Gemfile の指定**: `jekyll-sass-converter ~> 2.2`
- **実際にインストール済み**: `jekyll-sass-converter 3.1.0`
- **バージョン不一致**: 2.x系を要求しているが、3.x系がインストールされている

## 解決策

Gemfile を調査したところ、`jekyll-theme-chirpy` が既に適切な依存関係を管理していることが判明しました。

### 修正内容

Gemfile から以下の2行を削除：

```diff
- gem "jekyll-sass-converter", "~> 2.2"
- gem "sassc", "~> 2.4"
```

これらの依存関係は `jekyll-theme-chirpy` が自動的に管理するため、明示的な指定は不要でした。

## 検証プロセス

Claude が以下の手順で修正を検証：

1. **依存関係の再インストール**
   ```bash
   bundle install
   ```
   → 成功

2. **Jekyll ビルド**
   ```bash
   bundle exec jekyll build
   ```
   → 成功（警告はあるが既知の問題）

3. **ローカルサーバー起動**
   ```bash
   bundle exec jekyll serve --host 0.0.0.0 --port 4000
   ```
   → 成功

4. **ブラウザで確認**
   - Playwright で `http://0.0.0.0:4000/` にアクセス
   - スクリーンショット撮影
   → 表示が正常であることを確認

## コミットとデプロイ

修正を GitHub にプッシュ：

```bash
git add Gemfile
git commit -m "fix: Jekyll依存関係の問題を修正"
git push origin main
```

GitHub Pages が自動的に再ビルドを開始し、数分後にサイトが正常に表示されるようになりました。

## まとめ

### 学んだこと

1. **テーマの依存関係管理**: Jekyll テーマが依存関係を管理している場合、Gemfile での明示的な指定は不要（むしろ競合の原因になる）
2. **バージョン不一致の危険性**: 古いバージョン指定が残っていると、新しいバージョンとの不整合が発生する
3. **AI による自動トラブルシューティング**: Claude Code は調査から修正、検証まで一貫して実行できる

### 修正の影響

- ✅ Jekyll ビルドエラーが解消
- ✅ GitHub Pages での自動デプロイが正常に動作
- ✅ サイトの表示が正常に戻る
- ✅ 依存関係がシンプルになり、今後のメンテナンスが容易に

## 参考リンク

- [Jekyll Theme Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)
- [jekyll-sass-converter](https://github.com/jekyll/jekyll-sass-converter)
- [Bundler のバージョン管理](https://bundler.io/guides/gemfile.html)

---

このトラブルシューティングは Claude Code によって自動的に実行されました。AIアシスタントによるコード修正の実例として記録しています。
