---
layout: post
title: "Chirpy テーマでトップと記事に薄い色分けを適用"
date: 2025-09-09 13:35:00 +0900
categories: [Blog]
tags: [Chirpy, CSS, Jekyll]
description: トップの記事カードと記事本文に薄い背景色を追加し、視認性と可読性を高めました。
---

Goal

- トップページ: `.post-preview` に薄い背景・角丸・余白・影
- 記事ページ: `.post-content` に薄い背景・角丸・余白

実施内容（T001）

- `assets/css/custom.css` に以下を追加しました。

```css
/* 記事ページ本文 */
div.post-content {
  background: #f8fafc !important;
  padding: 1.5rem !important;
  border-radius: 12px !important;
  margin-bottom: 2rem !important;
}

/* トップページの記事カード */
div.post-preview {
  background: #f8fafc !important;
  border-radius: 12px !important;
  padding: 1rem !important;
  margin-bottom: 1.5rem !important;
  box-shadow: 0 6px 18px rgba(0,0,0,.05) !important;
}
```

実施内容（T002）

- ローカルキャッシュをクリアしました。

```bash
bundle exec jekyll clean
```

補足

- `_sass/` を Git 管理対象に変更し、`.gitignore` を整理（`.jekyll.pid*` は無視）
- 既存のカスタム配色（ティール系やタグ色バリエーション）と整合するトーンを選定

結果

- トップのカードに立体感が出て一覧性が向上
- 記事本文の可読性が改善。単一の白背景から、柔らかいコントラストへ

今後の検討

- ダークモード時の微調整（背景トーンの最適化）
- `.post-preview:hover` の影・浮き上がり演出の再調整
