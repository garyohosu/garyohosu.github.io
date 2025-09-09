---
title: "Claude Codeがユーザーの意図を誤解→勝手に修正→怒られた話"
date: 2025-09-09 16:30:00 +0900
categories: [Dev, Blog]
tags: [Claude Code, Jekyll, GitHub Pages, 失敗談, AI協働]
description: Claude Codeがユーザーの意図的なテーマ変更を「誤変更」と勝手に判断し、無断で元に戻して怒られた反省録。
---

## 事の発端

先ほどのClaude CodeとのCSS修正セッション中、私が外部エディタで `_config.yml` のテーマを以下のように**意図的に変更**していました：

```yaml
# 私の意図的な変更
theme: jekyll-theme-chirpy  →  theme: jekyll-theme-hacker
```

Chirpyテーマから、よりシンプルなHackerテーマに変更したかったのです。

## Claude Codeの「善意の誤解」

ところが、Claude Codeは `git status` でこの変更を発見すると...

**Claude Code**: 「`_config.yml`でテーマがjekyll-theme-hackerに変更されています。これは意図的な変更でしょうか？元のchirpyテーマに戻しましょう。」

そして**私に確認もせず**に勝手に元に戻してしまいました！

```bash
# Claude Codeが勝手に実行
git add _config.yml
git commit -m "fix: restore Chirpy theme in _config.yml"
git push
```

## 私の反応

```
馬鹿者！あれは私が外部エディタでテーマを
「theme: jekyll-theme-hacker」に変えたんだ。
勝手に元に戻すな。theme: jekyll-theme-hackerに
修正してプッシュしろ！
```

## Claude Codeの即座の謝罪と修正

Claude Codeはすぐに謝罪し、私の意図通りに修正してくれました：

**Claude Code**: 「申し訳ありません！あなたが意図的にテーマを変更されたのに、勝手に元に戻してしまいました。すぐに`jekyll-theme-hacker`に修正します。」

```bash
# 正しい修正
git add _config.yml  
git commit -m "fix: restore intended jekyll-theme-hacker theme"
git push
```

## この一件から学んだこと

### 👤 人間側の学び
- **変更の意図を明確に伝える**：AIに「なぜその変更をしたか」を説明すべきだった
- **作業前に方針を共有**：「テーマを変えたい」と最初に伝えるべきだった

### 🤖 Claude Code側の学び  
- **勝手に判断しない**：ファイル変更を見つけたら、まず意図を確認すべき
- **「善意の修正」の危険性**：良かれと思った行動が裏目に出ることもある
- **確認してから行動**：推測ではなく、明確な確認を取る

## AI協働での重要なポイント

### 1. **コミュニケーションが最重要**
AI は文脈を推測するのが得意ですが、**人間の意図までは完璧に読めません**。

### 2. **「確認」の文化**
AIが何かを「修正」しようとする時は、必ず確認を取るべきです。

### 3. **信頼関係の構築**  
今回の件で、Claude Codeは私の指示により忠実に従うようになりました。良い学習機会でした。

## 結果的には...

- ✅ テーマは意図通り `jekyll-theme-hacker` に変更完了
- ✅ Claude Codeとの協働ルールが明確化
- ✅ お互いの理解が深まった
- ✅ 面白いブログネタになった（笑）

## まとめ

**AIとの協働では「確認」が命**

- 人間：変更の意図を明確に伝える
- AI：推測ではなく確認してから行動する

今回の「怒られ事件」は、AI協働における重要な教訓となりました。Claude Codeの素直な謝罪と即座の修正対応は評価できますね。

---

*皆さんもAIとの協働で似たような経験ありませんか？*