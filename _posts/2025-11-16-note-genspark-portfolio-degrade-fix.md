---
title: "【note記事紹介】Genspark活用術 #3: ポートフォリオのデグレをGensparkで修正した話"
date: 2025-11-16 23:00:00 +0900
categories: [Genspark, note記事紹介]
tags: [Genspark, AI活用, GitHub, ポートフォリオ, デグレ修正, note, GitHub MCP, AI Drive, Claude Code]
image:
  path: https://assets.st-note.com/img/1731765600000-xXMqGy9J0G.png
  alt: Genspark活用術シリーズ #3 ポートフォリオのデグレ修正
---

## note記事を公開しました

Genspark活用術シリーズの第3弾として、実践的なデグレ修正作業をまとめた記事を公開しました。

**記事タイトル**: 【Genspark活用術 #3】ポートフォリオのデグレをGensparkで修正した話

**記事URL**: [https://note.com/hantani/n/ne1f004f631d5](https://note.com/hantani/n/ne1f004f631d5)

---

## この記事の見どころ

### 1. 実際のデグレ修正ワークフロー

スマホでポートフォリオサイトを開いたら**真っ白**だった...という実体験から始まる、リアルなトラブルシューティングストーリーです。

**発見された問題**:
- ❌ スマホから見ると真っ白
- ❌ 英語切り替えボタンが消失
- ❌ プロフィール画像が表示されない

Gensparkに「ポートフォリオのデグレを調査して修正して」と一言伝えるだけで、どう解決したのか——その全プロセスを公開しています。

### 2. GitHub MCP、AI Drive、Claude Codeの三位一体

記事では、Gensparkを「アシスタント」として活用するための3つの仕組みを解説しています：

**仕組み1: GitHub MCP接続**
- GitHubリポジトリの直接操作
- ファイルの確認、コミット履歴の参照、修正のプッシュ
- 全てGensparkに任せられる

**仕組み2: AI Driveに「記憶」を保存**
- `/aidrv/prompt/blog.md` - GitHub MCP操作手順
- `/aidrv/log/todo.md` - 作業ログ
- `/aidrv/ClaudeCode/` - Claude Code用指示書

**仕組み3: Claude Codeとの連携**
- GitHub MCPで対応できない大きなファイル
- ローカル環境とクラウドの連携
- 指示書ベースの自動化

### 3. Git履歴からの自動修正

Gensparkが**Git履歴を遡って、正しいコードを自動で取得**する様子を詳しく解説しています。

```bash
# 多言語対応のコードを取得
git show 865bf70:index.html | grep -A 5 "language-toggle"

# プロフィール画像のコードを取得
git show fc8d22b:index.html | grep -A 3 "profile-image"
```

Gensparkが自分で「どのコミットに正しいコードがあるか」を特定してくれる——この仕組みが素晴らしいんです。

### 4. 実践的なTips

記事の後半では、Gensparkをアシスタントとして使うための実践的なTipsを5つ紹介しています：

1. **GitHub MCPは設定必須** - 一度設定すれば劇的に楽になる
2. **AI Driveに「記憶」を保存** - 毎回説明する手間を省く
3. **Claude Codeと連携する** - ローカル環境との橋渡し
4. **Git履歴を活用する** - デグレが起きても復旧可能
5. **段階的にコミットする** - 何をやったか分かりやすい

---

## 日常的なGenspark活用例

記事では、私の日常的なGenspark活用方法も紹介しています：

### 朝: todo.mdを確認
```
私: 「今日やることを教えて」
Genspark: 「今日は〇〇の続きですね。前回は△△まで終わっています」
```

### 作業中: デバッグやコード修正
```
私: 「ポートフォリオが真っ白。調査して」
Genspark: 「原因を特定しました。修正します」
```

### 夕方: 作業ログの記録
```
私: 「今日やったことをtodo.mdに追記して」
Genspark: 「記録しました。明日は△△から始められます」
```

こんな感じで、**Gensparkが「外部記憶」と「実行エンジン」の両方の役割**を果たしてくれるんです。

---

## Genspark活用術シリーズについて

このシリーズでは、Gensparkの実践的な使い方を解説しています。

### 過去の記事

1. [Genspark AIブラウザでCloudflare Pagesにデプロイした話](https://note.com/hantani/n/na88e5ada86df)（#1）
2. [Genspark AIブラウザは本当に私の画面が「見える」のか？](https://note.com/hantani/n/neafae1662e75)（#2）
3. [ポートフォリオのデグレをGensparkで修正した話](https://note.com/hantani/n/ne1f004f631d5)（#3）← **今回**

### 今後の予定

- **AI Driveの高度な活用** - ファイル管理、情報管理、複数プロジェクト管理
- **Claude CodeとGensparkの連携術** - 効果的な指示書の書き方、大規模プロジェクト管理
- **GitHub MCPの応用テクニック** - 複数リポジトリ管理、ブランチ戦略、コードレビュー自動化

---

## 誰におすすめ？

この記事は以下のような方におすすめです：

- ✅ Gensparkを使い始めたばかりの方
- ✅ AIをもっと実務で活用したい方
- ✅ GitHubとAIを連携させたい方
- ✅ ポートフォリオサイトを運用している方
- ✅ デグレ問題に悩んでいる方
- ✅ AI時代の新しいワークフローに興味がある方

---

## まとめ

今回の記事では、「Gensparkに任せるための仕組み作り」をテーマに、実際のデグレ修正作業を通じて、GitHub MCP、AI Drive、Claude Codeの連携ワークフローを解説しました。

**Gensparkは単なるAIチャットではなく、「アシスタント」として活用できる**——この記事を読めば、その具体的な方法が分かります。

ぜひnoteでご覧ください！

**記事URL**: [https://note.com/hantani/n/ne1f004f631d5](https://note.com/hantani/n/ne1f004f631d5)

---

## 関連リンク

- [私のポートフォリオサイト](https://hantani-portfolio.pages.dev/)
- [私のnote](https://note.com/hantani)
- [Genspark公式サイト](https://www.genspark.ai/)
- [GitHub公式サイト](https://github.com/)
