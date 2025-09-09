---
title: "Hackerテーマへの変更を試みたが、複雑すぎて中止した話"
date: 2025-09-09 17:00:00 +0900
categories: [Dev, Blog]
tags: [Jekyll, GitHub Pages, Chirpy, Theme, 失敗談]
description: jekyll-theme-hackerへの変更を試みたものの、既存のChirpy専用構成との互換性問題で断念。安定動作を優先した判断記録。
---

## 事の経緯

Claude Codeでのテーマ修正セッション中、私が外部エディタで `_config.yml` のテーマを変更：

```yaml
theme: jekyll-theme-chirpy  →  theme: jekyll-theme-hacker
```

シンプルでかっこいいHackerテーマに変更したかったのです。

## 第1回目の挫折

### 🚫 エラー1: Gemが見つからない

```
The jekyll-theme-hacker theme could not be found. (Jekyll::Errors::MissingDependencyException)
Could not find 'jekyll-theme-hacker' (>= 0) among 128 total gem(s)
```

**修正**: `Gemfile`に追加

```ruby
gem "jekyll-theme-hacker", "~> 0.2.0"
```

## 第2回目の挫折（決定的）

### 🚫 エラー2: CSS import失敗

```
Error: Can't find stylesheet to import.
2 │ @use 'main.bundle';
  │ ^^^^^^^^^^^^^^^^^^
/assets/css/jekyll-theme-chirpy.scss
```

### 🚫 エラー3: レイアウト不存在

```
Build Warning: Layout 'categories' requested in _tabs/categories.md does not exist.
Build Warning: Layout 'tags' requested in _tabs/tags.md does not exist.
Build Warning: Layout 'archives' requested in _tabs/archives.md does not exist.
Build Warning: Layout 'home' requested in index.html does not exist.
```

## 根本的な問題発見

**互換性の壁**が立ちはだかっていました：

### 1. **CSSファイル問題**
- `assets/css/jekyll-theme-chirpy.scss` がChirpy専用の `main.bundle` を参照
- Hackerテーマには該当するSCSSが存在しない

### 2. **レイアウトファイル問題**  
- Chirpy専用レイアウト（categories, tags, archives, home）を使用
- Hackerテーマはシンプル構成でこれらのレイアウトを提供しない

### 3. **設定構造問題**
- `_config.yml` 全体がChirpy向けに最適化
- pagination, jekyll-archives等の設定が不整合

### 4. **データファイル問題**
- `_data/contact.yml`, `_data/share.yml` 等
- Chirpy専用の構造とフィールド

## Claude Codeからの提案

「できますが、以下の作業が必要です...」

**必要な変更作業一覧:**
1. CSS ファイル系の全面書き換え
2. レイアウトファイルの変更・簡素化  
3. 設定ファイルのHacker用最適化
4. データファイルの構造変更
5. 不要なChirpy専用ファイル削除
6. テーマ変更のテスト・デバッグ

**推定作業時間: 2-3時間**

## 私の判断：「まあやめておこう」

理由：

### ✅ **現在の構成が安定**
- GitHub Actionsでエラーなくビルド
- カスタムCSS（Inter + Noto Sans JP、ティール配色）が正常動作
- すべての機能が完備

### ⚠️ **変更リスクが高い**  
- 2-3時間の大規模作業
- 既存コンテンツ（カテゴリ、タグ等）の一部機能喪失
- 新たなバグの可能性

### 🎯 **費用対効果が低い**
- 見た目の変更のみ
- 機能的なメリットなし
- 安定性を犠牲にするリスク

## 最終的な復元

```bash
# _config.yml と Gemfile をChirpyに戻す
git add Gemfile _config.yml
git commit -m "fix: revert to jekyll-theme-chirpy to resolve build errors"  
git push
```

## 学んだこと

### 1. **「動いているものに触るな」の原則**
安定している環境を無理に変更するリスクを理解。

### 2. **テーマ変更の複雑性**
Jekyllテーマは単なる見た目の変更ではなく、**アーキテクチャ全体に影響**する大きな変更。

### 3. **互換性の重要性**
既存のカスタマイズとテーマの相性を事前に調査する必要性。

### 4. **現実的な判断力**  
理想と現実のバランスを取り、**実用性を優先**する判断の大切さ。

## まとめ

**「完璧は良の敵」**

現在のChirpy構成は：
- ✅ 安定動作
- ✅ 機能豊富  
- ✅ カスタマイズ済み

無理にHackerテーマに変更する必要はありませんでした。

時には「やめておく」という判断も、重要な技術的選択です。

---

*みなさんも「動いているもの」を変更する時は、リスクと効果をよく考えてからにしましょうね。*