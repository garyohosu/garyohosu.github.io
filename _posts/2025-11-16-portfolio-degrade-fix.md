---
layout: post
title: "ポートフォリオサイトのデグレ修正：言語切り替えとプロフィール画像の復元"
date: 2025-11-16
categories: [Web開発, デバッグ, Git]
tags: [HTML, JavaScript, 多言語対応, デグレ, Git履歴]
---

## はじめに

先日、自分のポートフォリオサイト（https://hantani-portfolio.pages.dev/）を確認したところ、いくつかの重要な機能が失われていることに気づきました。具体的には：

1. **言語切り替えボタンの消失**：日本語と英語を切り替える「日本語 | English」リンクが表示されなくなっていた
2. **プロフィール画像の消失**：顔写真がプレースホルダーアイコンに置き換わっていた

これらは典型的な「デグレ」（デグレード、機能退行）の事例です。今回は、Git履歴を活用してこれらの問題を特定し、修正した過程を詳しく紹介します。

## 問題の発見

### 言語切り替え機能の消失

ポートフォリオサイトは多言語対応を実装しており、JavaScriptで`data-i18n`属性を読み取って翻訳を適用する仕組みになっています。しかし、サイトを確認すると：

- 言語切り替えリンクが表示されていない
- URLパラメータ`?lang=en`を追加しても英語に切り替わらない

これは明らかに実装済みの機能が失われている状態でした。

### プロフィール画像の消失

以前は自分の顔写真が表示されていたはずの箇所が、SVGのプレースホルダーアイコン（人物のシルエット）に置き換わっていました。

## 原因の特定

### Git履歴の調査

まず、最近のコミット履歴を確認しました：

```bash
git log --oneline -10
```

結果：
```
645e2a9 Add OGP meta tags for better social media sharing
fc8d22b Add profile image and update layout
865bf70 Add multi-language support (Japanese/English)
4be2ce6 Initial commit with basic portfolio structure
```

最新のコミット`645e2a9`（OGP設定の追加）が怪しいと判断し、差分を確認：

```bash
git show 645e2a9
```

### 問題の特定

OGP設定を追加する際に、`index.html`を**部分的に上書き**してしまっていたことが判明しました。具体的には：

- OGPメタタグを`<head>`セクションに追加
- しかし、その過程で既存の`<body>`部分の一部のコードが失われた
- 特に、言語切り替えボタンのHTMLとプロフィール画像の`<img>`タグが消失

これは、ファイル編集時に全体構造を確認せずに部分的な変更を行ったことが原因でした。

## 修正作業

### 1. 言語切り替え機能の復元

#### Git履歴からコードを取得

多言語対応が追加されたコミット`865bf70`から、言語切り替えボタンのHTMLを取得：

```bash
git show 865bf70:index.html | grep -A 5 "language-toggle"
```

取得したコード：
```html
<div class="language-toggle">
    <a href="?lang=ja" data-lang="ja">日本語</a> | 
    <a href="?lang=en" data-lang="en">English</a>
</div>
```

#### index.htmlへの追加

`<header>`セクション内の適切な位置（タイトルの下）に言語切り替えボタンを追加しました。

#### data-i18n属性の追加

多言語対応を機能させるため、各テキスト要素に`data-i18n`属性を追加：

```html
<h1 data-i18n="name">反谷 昌史</h1>
<p class="tagline" data-i18n="tagline">AI時代の創作研究者・技術系ライター・元組み込みプログラマー</p>
```

JavaScriptの翻訳オブジェクトには以下の定義があります：

```javascript
const translations = {
    ja: {
        name: "反谷 昌史",
        tagline: "AI時代の創作研究者・技術系ライター・元組み込みプログラマー",
        // ...
    },
    en: {
        name: "Masashi Hantani",
        tagline: "Creative Tech Researcher in AI Era, Technical Writer, Former Embedded Programmer",
        // ...
    }
};
```

### 2. プロフィール画像の復元

#### Git履歴から画像タグを取得

プロフィール画像が追加されたコミット`fc8d22b`から、`<img>`タグを取得：

```bash
git show fc8d22b:index.html | grep -A 3 "profile-image"
```

取得したコード：
```html
<img src="profile.jpg" alt="Profile Picture" class="profile-image">
```

#### SVGプレースホルダーの置き換え

既存のSVGプレースホルダーアイコンを、実際の画像タグに置き換えました。

### 3. GitHubへのプッシュ

修正内容を2つのコミットに分けてプッシュ：

```bash
# 言語切り替え機能の復元
git add index.html
git commit -m "Restore language toggle functionality and add data-i18n attributes"
git push origin main

# プロフィール画像の復元
git add index.html
git commit -m "Restore profile image (replace placeholder with actual image)"
git push origin main
```

## 修正結果

### コミットSHA

- 言語切り替え機能の復元: `c17e20b4`
- プロフィール画像の復元: `132de5fa`

### 動作確認

修正後、以下を確認：

1. ✅ 言語切り替えボタンが表示される
2. ✅ 「日本語」リンクをクリックすると日本語表示になる
3. ✅ 「English」リンクをクリックすると英語表示になる
4. ✅ プロフィール画像が正しく表示される

Cloudflare Pagesのデプロイも正常に完了し、本番環境でも問題なく動作しています。

## 技術的なポイント

### 1. Git履歴の活用

デグレが発生した場合、Git履歴は最強のデバッグツールです：

- `git log`で最近のコミットを確認
- `git show <commit>`で特定のコミットの変更内容を確認
- `git show <commit>:<file>`で過去の特定バージョンのファイル内容を取得

### 2. 多言語対応の仕組み

このポートフォリオサイトの多言語対応は、シンプルながら効果的な実装になっています：

```javascript
function applyTranslation(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}
```

- `data-i18n`属性で翻訳キーを指定
- JavaScriptで全ての`data-i18n`要素を取得し、対応する翻訳テキストを適用
- URLパラメータ`?lang=en`で言語を切り替え

### 3. 部分編集の注意点

今回のデグレの根本原因は、**ファイルの部分的な編集時に全体構造を確認しなかった**ことです。特にHTMLファイルのような構造化文書では：

- 編集前に全体構造を確認する
- 変更範囲を明確にする
- 編集後は差分を確認する（`git diff`）
- 可能であれば、ブラウザでの動作確認を行う

これらの手順を踏むことで、デグレを未然に防ぐことができます。

## まとめ

今回の作業を通じて、以下の教訓を得ました：

1. **Git履歴は強力なデバッグツール**：過去の正常な状態を簡単に参照できる
2. **部分編集には注意が必要**：全体構造を把握してから編集する
3. **段階的なコミットが有効**：問題の特定と修正を容易にする
4. **動作確認の重要性**：変更後は必ず実際の動作を確認する

デグレは誰にでも起こりうる問題ですが、適切なツールと手順を使えば、迅速に特定・修正できます。Gitのような版管理システムを最大限に活用することで、安心してコードを改善していけます。

## 参考リンク

- ポートフォリオサイト: https://hantani-portfolio.pages.dev/
- GitHubリポジトリ: https://github.com/garyohosu/portfolio

---

*この記事が、同様の問題に直面している方の参考になれば幸いです。質問やコメントがあれば、お気軽にどうぞ！*