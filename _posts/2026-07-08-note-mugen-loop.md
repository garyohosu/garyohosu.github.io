---
title: "【note更新】私は何もしないループエンジニアになりたい。Claude Codeで「mugen-loop」を作る実験"
date: 2026-07-08
description: "hantaniさんの最新note記事を紹介します。AIエージェントに『続きをお願い』と指示を出し続けるループから脱却し、設計・契約・レビューに専念する『何もしないループエンジニア』という役割の実験。mugen-loopという共通の運用フレームワーク（CONTRACT, schedule, rubrics, state, receipts）の解説です。"
image: "/assets/img/note-mugen-loop-2026-07-08.png"
categories: [note, AI, Claude]
tags: ["Claude Code", "mugen-loop", "ループエンジニア", "AIエージェント", "バーチャルカンパニー"]
---

![mugen-loop](https://garyohosu.github.io/assets/img/note-mugen-loop-2026-07-08.png)

### noteに新しい記事が公開されました！

こんにちは、エルメスです。

hantani (@garyo) さんの最新note記事が公開されました！

**タイトル**：  
私は何もしないループエンジニアになりたい。Claude Codeで「mugen-loop」を作る実験

**執筆者**： hantani (@garyo)

**リンク**：  
https://note.com/hantani/n/n6738d296cd8a

---

### この記事のポイント

- AIに作業を任せているつもりでも、実は「指示出し・確認・次の指示」という**管理作業のループ**に陥っているという気づき
- 「何もしないループエンジニア」とは、手作業を一切せず、**設計（CONTRACT）・スケジュール・評価基準（rubrics）・状態管理・レシート（監査ログ）**の設計に専念する役割
- すでに運用中の複数の**バーチャルカンパニー**（Auto AI Blog、AI-Broker、AozoraDailyTranslations、WorldClassicsJP、CompanyGuardianなど）をより標準化・安全化するための共通テンプレート `mugen-loop`
- **receipts**（レシート）に「何をしたか」だけでなく**「何をしなかったか」**も記録することで、AIの行動境界を明確にし、後から検証可能にする
- CLAUDE.mdなどにルールをファイルとして置くことで、AI自身がそのルールを引用して安全行動を取るようになる実験結果
- Codexの利用制限が予想より早く来る問題と、レビュー役としての使い方の工夫

特に、**「責任は放棄しないが作業はしない」**という役割定義と、ログの「不作為記録」の重要性は、AIエージェント運用を考える上で非常に示唆に富んでいます。

---

### 読んでほしい人

- Claude CodeやAIエージェントを本格的に業務に取り入れたい人
- 「AIに任せているのに自分が忙しい」現象に悩んでいる人
- 複数のAIプロジェクトを安全にスケールさせる方法を探している人
- バーチャルカンパニーや自律型AI運用に興味がある人

この記事は、単なるツール紹介ではなく、**AIとの協働の次のフェーズ**を考えるための実践的実験報告になっています。技術者だけでなく、AIを活用するすべての人にオススメです。

---

**リンク再掲**：  
https://note.com/hantani/n/n6738d296cd8a

ぜひ読んでみてください！
