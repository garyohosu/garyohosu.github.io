---
layout: post
title: "noteに記事を公開しました：4つのAI CLIにワンナイト人狼をさせたら、AIエージェントのオーケストレーションが見えてきた"
date: 2026-07-11 08:00:00 +0900
categories: [note, AI]
tags: [note, AIエージェント, オーケストレーション, ワンナイト人狼, Claude, Codex, Grok, agy, シミュレーター, "AI CLI"]
image:
  path: /assets/img/note-ai-werewolf-orchestration-2026-07-11.png
  alt: "4つのAI CLIにワンナイト人狼をさせたら、AIエージェントのオーケストレーションが見えてきた（note サムネイル）"
---

![4つのAI CLIにワンナイト人狼をさせたら、AIエージェントのオーケストレーションが見えてきた]({{ site.baseurl }}/assets/img/note-ai-werewolf-orchestration-2026-07-11.png)

hantaniさんのnoteで公開された最新記事「[4つのAI CLIにワンナイト人狼をさせたら、AIエージェントのオーケストレーションが見えてきた](https://note.com/hantani/n/n4948074946b4)」を紹介します。

2026年7月10日公開の新着noteです。この記事では、Claude Codeをゲームマスターとして、Claude / Codex / Grok / agy の4つのAI CLIエージェントにワンナイト人狼をプレイさせるPythonシミュレーターを作成した実験が詳述されています。単なるゲームではなく、**AIエージェントのオーケストレーション**の本質を探る内容となっています。

## 主なポイント

- **作ったもの**: PythonベースのAI版ワンナイト人狼シミュレーター（役職: 人狼1、占い師1、村人2）
- **主要コマンド**:
  ```bash
  python scripts/run_game.py --games 1 --use-real-agents --agent-timeout 120
  python scripts/analyze_results.py --logs-root logs/games
  ```
- **オーケストレーションの核心**:
  - 各AIの呼び出し方と安全な隔離方法
  - ログの残し方、失敗の吸収方法
  - 情報非対称性を保つための設計（完全なgame_stateを渡さない）
  - Claude CodeがGMとして発言収集・集計・判定を担当

- **学び**:
  - 人狼ゲームはAIの推理力、非対称情報処理、説得力、嘘の扱いをテストする優れたベンチマーク
  - AI同士の会話ログからオーケストレーションのパターンが浮かび上がる
  - 各AIの個性（Claudeの慎重さ、Grokの論理的整理など）がゲームに反映される

- **メリット**: 複雑なマルチエージェント協調をシンプルなコマンドで再現可能。ログが詳細に残るので分析しやすい。
- **注意点 (Pitfalls)**:
  - agent-timeoutの適切な設定が必要（長すぎるとコスト増）
  - 各AIのAPIキー管理とレート制限に注意
  - ログ解析スクリプトのカスタマイズが必要な場合あり
  - 本番的な大規模オーケストレーションにはさらに堅牢なエラー処理が必要

この実験は「AIエージェントの本質はwhileループ」という著者の他の記事とも繋がり、非常に示唆に富んでいます。AI同士を競わせることで見えてくるオーケストレーションの課題は、今後のエージェント開発に大いに参考になります。

詳細なログ例やコードの解説、考察はnote本編でぜひご確認ください！

---

**関連記事**
- [私は何もしないループエンジニアになりたい。Claude Codeで「mugen-loop」を作る実験](/posts/2026-07-08-note-mugen-loop/)
- [AIエージェントの本質は「whileループ」だった](/posts/note-ai-agent-while-loop/) （仮リンク、実際の投稿に応じて調整）

新着noteを自動処理してブログに反映しました。
