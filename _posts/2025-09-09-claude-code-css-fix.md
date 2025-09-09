---
title: "Claude CodeでChirpyカスタムCSS適用問題を解決した"
date: 2025-09-09 15:30:00 +0900
categories: [Dev, Blog]
tags: [Jekyll, GitHub Pages, Chirpy, Claude Code, CSS]
description: カスタムデザインが反映されない問題をClaude Codeで診断・修正。Chirpy v7.3での正しいCSS override方法を記録。
---

## 問題発生

先日実装したChirpyテーマのカスタマイズ（フォント変更・配色・ヒーロー追加）が、ローカルでは正常に表示されるのに**本番サイト（GitHub Pages）では全く反映されない**という問題が発生。

見た目が全くデフォルトのままで、せっかくの作業が水の泡に。

## Claude Codeによる診断

Claude Codeに状況を説明すると、即座に問題の核心を特定してくれました：

### 原因の特定
- `assets/css/jekyll-theme-chirpy.scss` の構造問題
- **テーマのベースimport部分が欠如**していたため、Chirpyの基本スタイルが全く読み込まれていない
- カスタムCSSだけが適用された結果、スタイルが破綻

### 診断プロセス
1. **ファイル構造確認**: ビルドログとファイル内容をチェック
2. **生成されたCSSの検証**: カスタム要素が含まれているか確認
3. **テーマ構造との比較**: Chirpy v7.3の正しいSCSS構造を確認

## 解決策の実装

Claude Codeが提示した修正方法：

**修正前:**
```scss
/* ==== custom overrides (2025-09) ==== */
/* Web Fonts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Noto+Sans+JP:wght@400;700&display=swap");

:root {
  --global-theme-color: #0ea5a3;
  /* ... カスタム変数 ... */
}
/* ... カスタムスタイル ... */
```

**修正後:**
```scss
---
---

/* prettier-ignore */
@use 'main
{%- if jekyll.environment == 'production' -%}
  .bundle
{%- endif -%}
';

/* append your custom style below */

/* ==== custom overrides (2025-09) ==== */
/* Web Fonts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Noto+Sans+JP:wght@400;700&display=swap");

:root {
  --global-theme-color: #0ea5a3;
  /* ... カスタム変数 ... */
}
/* ... カスタムスタイル ... */
```

### 重要なポイント
- **Frontmatter** (`---` `---`) の追加
- **テーマベースの読み込み** (`@use 'main'`) を最初に配置
- **カスタムCSSは指定位置以降**に記述

## 結果

修正後：
- `bundle exec jekyll build` で正常コンパイル確認
- 生成されたCSSにカスタム要素が正しく含まれることを検証
- GitHub Actionsで自動デプロイ
- **数分後に本番サイトでカスタムデザインが正常表示**

## Claude Codeの優秀さ

今回特に感動したのは：

1. **即座の問題特定**: 長々と説明する前に核心を突いてくれた
2. **具体的な解決策**: 抽象的なアドバイスではなく、実際のコードまで提示
3. **検証プロセス**: 修正後の動作確認まで一緒に実行
4. **ドキュメント化**: todo.mdへの記録まで提案してくれた

人間だったら「CSSの優先度かな？」「キャッシュの問題？」と様々な推測をするところを、**ログとファイル内容から直接原因を特定**してくれるのは、AIならではの強みだと感じました。

## 学び

### Chirpy v7.3でのカスタマイズ注意点
- テーマファイルを完全に上書きするのではなく、**テーマベースを維持してoverride**
- Frontmatterと`@use`構文は必須
- `/* append your custom style below */`コメント以降に記述

### 今後の開発体験
Claude Codeのような技術的な問題解決能力があれば、**一人での開発でも安心感**があります。特にフロントエンド系の「なぜか動かない」問題は、人間には時間がかかるケースが多いので。

---

*この記事はClaude Codeとの協働で作成・投稿しています。*