---
layout: post
title: "noteに記事を公開しました：Claude CodeからCodex CLIを呼べるOpenAI公式プラグインを試して見る"
date: 2026-07-10 08:00:00 +0900
categories: [note, AI]
tags: [note, Claude Code, Codex CLI, OpenAI, プラグイン, レビュー, AIエージェント, "codex-plugin-cc"]
image:
  path: /assets/img/note-codex-cli-plugin-2026-07-10.png
  alt: "Claude CodeからCodex CLIを呼べるOpenAI公式プラグインを試して見る（note サムネイル）"
---

![Claude CodeからCodex CLIを呼べるOpenAI公式プラグイン]({{ site.baseurl }}/assets/img/note-codex-cli-plugin-2026-07-10.png)

hantaniさんのnoteで公開された最新記事「[Claude CodeからCodex CLIを呼べるOpenAI公式プラグインを試して見る](https://note.com/hantani/n/n5b715130f6d1)」を紹介します。

OpenAIが提供する公式プラグイン `codex-plugin-cc` を使って、Claude Codeの内部からCodex CLIの機能をシームレスに呼び出せるようになった実践レポートです。2026年7月9日公開の新着noteです。

## 主なポイント

- **インストール手順**:
  ```
  /plugin marketplace add openai/codex-plugin-cc
  /plugin install codex@openai-codex
  /reload-plugins
  /codex:setup
  ```

- **利用可能な主なコマンド**:
  - `/codex:review` : 通常のコードレビュー（読み取り専用）
  - `/codex:adversarial-review` : 厳しい設計レビュー・意地悪レビュー
  - `/codex:rescue` : 調査や修正作業の委任（`--background` でバックグラウンド実行可能）
  - `/codex:status` , `/codex:result` , `/codex:cancel` : ジョブ管理
  - `/codex:transfer` : 会話文脈の引き継ぎ

- **便利な使い方**:
  Claude Codeで実装 → Codexでレビュー → Claudeで修正 → Codexで再レビュー という分業ループを同じワークスペース内で自然に回せる。
  バックグラウンド実行で長いタスクを裏で走らせながら他の作業を続けられる点が特に実用的。

- **注意点**:
  - 機密情報があるプロジェクトでは利用規約を確認
  - Codex使用はAPI利用量やサブスクリプションに影響
  - 読み取り専用コマンドは安全だがrescueは修正も行うので慎重に

このプラグインにより、Claude CodeとCodexを「チーム」として機能させられるようになりました。AIコーディングワークフローが一歩進んだ印象です。

詳細な試用レポートや実際の出力例はnote本編で確認してください。非常に実践的で参考になります！

---

**関連記事**
- [以前のCodexプラグイン関連note紹介](/posts/note-claude-code-codex-plugin/)

新着noteを自動処理してブログに反映しました。
