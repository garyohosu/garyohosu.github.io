---
layout: post
title: "ここ1ヶ月で書いた未紹介noteを一気に紹介します（Hermes Agent自動化編）"
date: 2026-05-26 19:00:00 +0900
categories: [Note, AI]
tags: ["note", "HermesAgent", "自動化", "Microsoft", "Codex", "Claude"]
image:
  path: /assets/img/ai-news-manga-2026-05-26.png
---

## 今週のAIニュース漫画

![今週のAIニュース漫画](/assets/img/ai-news-manga-2026-05-26.png)

---

## 導入

みなさん、こんにちは。

ここ1ヶ月ほどnote.com/hantaniでいくつか記事を書いていましたが、ブログでの紹介が追いついていませんでした。

そこで**Hermes Agentの自動化機能**を使って、未紹介のnoteを一気にブログで紹介します。

特に「MicrosoftのAIツール移行」「CodexとClaude Codeの実践」「note自動紹介仕組み」など、AI実践系の内容が多いです。

非エンジニアの方にもわかりやすく、ポイントをまとめます。

## 1. Microsoftが“最強AI部下”を減らした本当の理由

**noteURL**: https://note.com/hantani/n/xxxxxxxx (Microsoft関連)

Microsoftが社内で急速に普及した**Claude Code**の利用を縮小し、自社の**GitHub Copilot CLI**に移行する決定をした話です。

**ポイント**:
- 理由は**爆発的なトークンコスト**（優秀すぎて使いすぎて予算がパンク）
- 「AI禁止」ではなく「自社ツールへのdogfooding（自社製品を自分たちで使う）」が目的
- Uberでも同様にAI予算が早期に尽きた事例あり

AIが便利すぎて企業がコスト管理に苦労する現実がよくわかる記事です。

## 2. Codex CLIにGame Studioを入れてみる / Claude CodeのAuto mode活用

**noteURL**: 該当2記事

Codex CLIとClaude Codeを**実務でどう活用するか**の実践レポートです。

- Game StudioをCodex CLIに入れてゲーム開発を加速
- Claude CodeのPro版でAuto modeが使えるようになったので試した結果

**読みどころ**: 「AIにコードを書かせる」から「AIと一緒に開発する」へのシフトが具体的に書かれています。

## 3. ロリポップのHermes Agentでnoteを自動でブログ紹介する仕組みを作ってみた

**noteURL**: https://note.com/hantani/n/n512893a0fb00 (本記事)

**この記事そのもの**です。

ロリポップのHermes Agentに**SKILL.md**とcronjobを組み合わせて、毎日自分のnoteをチェックし、新着があれば自動でブログ紹介記事を作成・公開する仕組みを作った話。

これにより「noteを書いたら自動でブログにも反映」されるようになりました。

**これがまさに今動いている仕組み**です。

## まとめ：AIは「書く」だけでなく「拡散」も自動化できる時代

ここ1ヶ月のnoteは、**AIの実践的な活用**と**自分自身のワークフローの自動化**に焦点が当たっていました。

特に最後の「note自動紹介仕組み」は、メタ的ですがとても重要です。

これからはnoteを書く→Hermes Agentが検知→ブログに自動反映、という流れがデフォルトになります。

### こんな方におすすめ
- noteで定期的に発信している人
- ブログも運用しているけど更新が追いつかない人
- AIで自分の作業を自動化したい人
- Hermes Agentやロリポップに興味がある人

---

**参考note一覧**（ここ1ヶ月分）
- Microsoft AI部下移行の話
- Codex Game Studio / Claude Auto mode実践
- note自動ブログ紹介仕組み（本記事）
- その他ロリポップHermes Agent関連

これで未紹介分を一気にキャッチアップしました。

今後 は**毎日自動で新着noteをチェック**するcronjobも有効化済みです。

新しいnoteが公開されたら、また自動でブログに紹介しますね！

（画像はgpt-image-2で生成した専用イラストを使用）
