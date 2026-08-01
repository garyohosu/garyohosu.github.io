---
layout: post
title: "noteに記事を公開しました：AIにAIを指揮させる「ai-director」で、人間を伝言係から解放する"
date: 2026-08-02 08:00:00 +0900
categories: [note, AI]
tags: [note, AI, Claude, Codex, Gemini, orchestration]
description: noteで公開した「AIにAIを指揮させる「ai-director」を作った」の紹介です。複数AIのオーケストレーション、HITL/HOTL、待機と失敗の分離などをまとめました。
permalink: /posts/note-ai-director-2026-08-02/
image:
  path: /assets/img/note-ai-director-2026-08-02.png
  alt: ai-directorのnoteサムネイル
---

![ai-directorのnoteサムネイル]({{ site.baseurl }}/assets/img/note-ai-director-2026-08-02.png)

2026年8月1日に、noteで以下の記事を公開しました。

- 外部リンク（note）：[AIにAIを指揮させる「ai-director」を作った](https://note.com/hantani/n/n0d0c17485298)

### このnoteの主なポイント
- `ai-director` は、複数のAIエージェントに仕事を割り振って、質問・回答・再開・完了まで管理するオーケストレーションシステム
- `ai-director` / `ai-orchestrator` / `aiagent-mail` の3層で、指揮・実行・連絡網を分担する
- HITL から HOTL へ移行し、人間は工程ごとの伝言係ではなく監督者として関わる
- Claude、Codex、Gemini などの利用枠をまとめて、長い作業に最大限投入する発想が面白い
- `COMPLETED` / `DELEGATED` / `WAITING` / `FAILED` の状態管理や、秘密情報のマスキングなど、運用面の詰めも丁寧

### 印象に残ったところ
- AIの報告を読んで次の指示を貼り付ける、という人間の手間を減らす発想が本質的
- 途中で質問が出たら別のAIへ委任し、その回答で元のAI作業を再開する流れが、自動化の肝
- ただの並列実行ではなく、作業工程そのものを管理する小さなワークフローエンジンとして捉えているのがわかりやすい

### 関連記事
- [AIで5日間開発したら「残りあと半月」と言われたので、AI開発そのものを自動化することにした](https://note.com/hantani/n/n0bb3870b6e14)
- [Windows 11でClaude CodeとCodexを連携させた記録](https://note.com/hantani/n/n85eb4842a300)

**元noteはこちら**：https://note.com/hantani/n/n0d0c17485298

---

*この記事はnote記事の紹介として作成しました。*
