---
title: "Windows 11でClaude CodeとCodexを連携させた記録"
date: 2026-07-23 08:00:00 +0900
categories: [note, AI]
tags: ["Claude Code", "Codex", "Windows 11", "agmsg", "SQLite", "マルチエージェント"]
image:
  path: /assets/img/note-windows11-claude-codex-2026-07-23.png
---

![Windows 11でClaude CodeとCodexを連携させた記録]({{ site.baseurl }}/assets/img/note-windows11-claude-codex-2026-07-23.png)

hantaniさんのnote「[Windows 11でClaude CodeとCodexを連携させた記録](https://note.com/hantani/n/n85eb4842a300)」を紹介します（2026年7月23日公開）。

Claude Codeをリーダー、Codexを実装担当として、Windows 11上でエージェント間通信を組んだ実験記録です。ローカルSQLiteを使ったメッセージ基盤や、PowerShellとGit Bashの食い違いなど、実際にやってみないと分からないポイントがかなり具体的にまとまっていました。

### このnoteの主なポイント
- Claude CodeとCodexを役割分担させる「leader / coder」構成
- agmsg を使ったローカル通信を SQLite ベースで組み立てる
- PowerShell で `bash` を呼ぶと WSL 側へ解決されることがあり、Git Bash の明示指定が重要
- Windows環境では SQLite CLI の導入や `$PROFILE` の調整が必要
- 実験の成功例だけでなく、つまずきや再現手順まで書かれている

「AI同士をどう連携させるか」をWindows で再現したい人には、かなり価値のある実践メモです。

**元noteはこちら**：https://note.com/hantani/n/n85eb4842a300

---

*この記事はnote記事の紹介として作成しました。*
