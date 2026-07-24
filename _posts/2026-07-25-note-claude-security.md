---
title: "Claude CodeのセキュリティチェックをAIがやってくれる！「Claude Security」プラグインを実際に試した結果"
date: 2026-07-25 08:00:00 +0900
categories: [note, AI]
tags: ["Claude", "Claude Code", "セキュリティ", "プラグイン", "Workflow"]
image:
  path: /assets/img/note-claude-security-2026-07-25.png
---

![Claude Security note header]({{ site.baseurl }}/assets/img/note-claude-security-2026-07-25.png)

note.com/hantaniさんの最新記事「[Claude Securityを使ってみた](https://note.com/hantani/n/ne01d8f69d015)」を紹介します（2026年7月24日公開）。

Xで話題になっていたClaude SecurityプラグインをClaude Codeで試した記録です。GitHubリポジトリのコードをAIがセキュリティスキャンしてくれる便利ツールですが、実際に動かしてみると意外な落とし穴がありました。

### 主なコマンドと手順
- `/plugin install claude-security@claude-plugins-official` でプラグインインストール
- `/reload-plugins` でリロード
- `/claude-security:claude-security` で起動
- スキャン選択：1. Scan codebase (Recommended)
- 範囲選択：Whole repository

インストール自体はスムーズでしたが、**Workflowツールがセッションに登録されていない**というエラーで本格的なスキャンが実行できませんでした。

### 得られた知見と代替策
- プラグイン定義ではWorkflowツールを使う設計なのに、実際の環境で利用不可
- 手動レビューや代替スキル（code-review, security-review）でMedium 1件、Low 3件の脆弱性を発見
- 「起動スイッチそのものが無かった」状態で、コード自体に問題があったわけではない
- 再起動や/reload-pluginsで解決する可能性あり

**メリット**: AIがコードベース全体をinventory、threat model、verificationまで多角的にチェックしてくれる可能性
**注意点**: 環境依存が強く、Workflowツール対応状況を確認する必要あり。プラグインとClaude Codeのバージョン/ビルドの相性問題に注意。

Claude Codeを使っている開発者の方は、セキュリティチェックの自動化に非常に役立つツールです。詳細とスクリーンショットは元note記事で確認してください！

**関連記事**
- [生成AIとは「緑の小人」なんです]({% post_url 2026-07-24-note-green-little-people %})
- 以前のClaude Code関連note紹介記事もチェック

このようなプラグイン活用でAI開発環境をより安全・効率的にしていきましょう。新しいAIツールの「壁打ち」としてnote記事が参考になりますよ！

---

*この記事はcronジョブ（note-blog-intro-post-workflowスキル）により自動生成・公開されました。*
