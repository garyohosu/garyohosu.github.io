---
title: "【note記事紹介】Genspark活用衁E#3: ポ�EトフォリオのチE�E��E�レをGensparkで修正した話"
date: 2025-11-16 23:00:00 +0900
categories: [Genspark, note記事紹介]
tags: [Genspark, AI活用, GitHub, ポ�Eトフォリオ, チE�E��E�レ修正, note, GitHub MCP, AI Drive, Claude Code]
image:
  path: /assets/img/2025-11-16-note-genspark-portfolio-degrade-fix.png
  alt: Genspark活用術シリーズ #3 ポ�EトフォリオのチE�E��E�レ修正
---

## note記事を公開しました

Genspark活用術シリーズの第3弾として、実践皁E�E��E�チE�E��E�レ修正作業をまとめた記事を公開しました、E

**記事タイトル**: 【Genspark活用衁E#3】�EートフォリオのチE�E��E�レをGensparkで修正した話

**記事URL**: [https://note.com/hantani/n/ne1f004f631d5](https://note.com/hantani/n/ne1f004f631d5)

---

## こ�E記事�E見どころ

### 1. 実際のチE�E��E�レ修正ワークフロー

スマ�Eでポ�Eトフォリオサイトを開いたら**真っ白**だっぁE..とぁE�E��E�実体験から始まる、リアルなトラブルシューチE�E��E�ングスト�Eリーです、E

**発見された問顁E*:
- ❁Eスマ�Eから見ると真っ白
- ❁E英語�Eり替え�Eタンが消失
- ❁Eプロフィール画像が表示されなぁE

Gensparkに「�EートフォリオのチE�E��E�レを調査して修正して」と一言伝えるだけで、どぁE�E��E�決したのか——その全プロセスを�E開してぁE�E��E�す、E

### 2. GitHub MCP、AI Drive、Claude Codeの三位一佁E

記事では、Gensparkを「アシスタント」として活用するための3つの仕絁E�E��E�を解説してぁE�E��E�す！E

**仕絁E�E��E�1: GitHub MCP接綁E*
- GitHubリポジトリの直接操佁E
- ファイルの確認、コミット履歴の参�E、修正のプッシュ
- 全てGensparkに任せられる

**仕絁E�E��E�2: AI Driveに「記�E」を保孁E*
- `/aidrv/prompt/blog.md` - GitHub MCP操作手頁E
- `/aidrv/log/todo.md` - 作業ログ
- `/aidrv/ClaudeCode/` - Claude Code用持E�E��E�書

**仕絁E�E��E�3: Claude Codeとの連携**
- GitHub MCPで対応できなぁE�E��E�きなファイル
- ローカル環墁E�E��E�クラウド�E連携
- 持E�E��E�書ベ�Eスの自動化

### 3. Git履歴からの自動修正

GensparkぁE*Git履歴を遡って、正しいコードを自動で取征E*する様子を詳しく解説してぁE�E��E�す、E

```bash
# 多言語対応�Eコードを取征E
git show 865bf70:index.html | grep -A 5 "language-toggle"

# プロフィール画像�Eコードを取征E
git show fc8d22b:index.html | grep -A 3 "profile-image"
```

Gensparkが�E刁E�E��E�「どのコミットに正しいコードがあるか」を特定してくれる——この仕絁E�E��E�が素晴らしぁE�E��E�です、E

### 4. 実践皁E�E��E�Tips

記事�E後半では、Gensparkをアシスタントとして使ぁE�E��E�めE��E実践皁E�E��E�TipsめEつ紹介してぁE�E��E�す！E

1. **GitHub MCPは設定忁E�E��E�E* - 一度設定すれ�E劁E�E��E�に楽になめE
2. **AI Driveに「記�E」を保孁E* - 毎回説明する手間を省く
3. **Claude Codeと連携する** - ローカル環墁E�E��E�の橋渡ぁE
4. **Git履歴を活用する** - チE�E��E�レが起きても復旧可能
5. **段階的にコミットすめE* - 何をめE�E��E�たか刁E�E��E�りやすい

---

## 日常皁E�E��E�Genspark活用侁E

記事では、私E��E日常皁E�E��E�Genspark活用方法も紹介してぁE�E��E�す！E

### 朁E todo.mdを確誁E
```
私E 「今日めE�E��E�ことを教えて、E
Genspark: 「今日は、E�E��E�E�E�E続きです�E。前回�E△△まで終わってぁE�E��E�す、E
```

### 作業中: チE�E��E�チE�E��E�めE�E��E�ード修正
```
私E 「�Eートフォリオが真っ白。調査して、E
Genspark: 「原因を特定しました。修正します、E
```

### 夕方: 作業ログの記録
```
私E 「今日めE�E��E�たことをtodo.mdに追記して、E
Genspark: 「記録しました。�E日は△△から始められます、E
```

こんな感じで、E*Gensparkが「外部記�E」と「実行エンジン」�E両方の役割**を果たしてくれるんです、E

---

## Genspark活用術シリーズにつぁE�E��E�

こ�Eシリーズでは、Gensparkの実践皁E�E��E�使ぁE�E��E�を解説してぁE�E��E�す、E

### 過去の記亁E

1. [Genspark AIブラウザでCloudflare PagesにチE�E�Eロイした話](https://note.com/hantani/n/na88e5ada86df)�E�E�E�E1�E�E�E�E
2. [Genspark AIブラウザは本当に私E��E画面が「見える」�Eか？](https://note.com/hantani/n/neafae1662e75)�E�E�E�E2�E�E�E�E
3. [ポ�EトフォリオのチE�E��E�レをGensparkで修正した話](https://note.com/hantani/n/ne1f004f631d5)�E�E�E�E3�E�E�E��E�E **今回**

### 今後�E予宁E

- **AI Driveの高度な活用** - ファイル管琁E�E��E�惁E��管琁E�E��E�褁E�E��E�プロジェクト管琁E
- **Claude CodeとGensparkの連携衁E* - 効果的な持E�E��E�書の書き方、大規模プロジェクト管琁E
- **GitHub MCPの応用チE�E��E�ニック** - 褁E�E��E�リポジトリ管琁E�E��E�ブランチ戦略、コードレビュー自動化

---

## 誰におすすめ�E�E�E�E

こ�E記事�E以下�Eような方におすすめです！E

- ✁EGensparkを使ぁE�E��E�めた�E�Eかりの方
- ✁EAIをもっと実務で活用したぁE�E��E�
- ✁EGitHubとAIを連携させたい方
- ✁Eポ�Eトフォリオサイトを運用してぁE�E��E�方
- ✁EチE�E��E�レ問題に悩んでぁE�E��E�方
- ✁EAI時代の新しいワークフローに興味がある方

---

## まとめE

今回の記事では、「Gensparkに任せるための仕絁E�E��E�作り」をチE�E�Eマに、実際のチE�E��E�レ修正作業を通じて、GitHub MCP、AI Drive、Claude Codeの連携ワークフローを解説しました、E

**Gensparkは単なるAIチャチE�E��E�ではなく、「アシスタント」として活用できる**——この記事を読めE��E、その具体的な方法が刁E�E��E�ります、E

ぜ�Enoteでご覧ください�E�E�E�E

**記事URL**: [https://note.com/hantani/n/ne1f004f631d5](https://note.com/hantani/n/ne1f004f631d5)

---

## 関連リンク

- [私E��Eポ�EトフォリオサイチE(https://hantani-portfolio.pages.dev/)
- [私E��Enote](https://note.com/hantani)
- [Genspark公式サイチE(https://www.genspark.ai/)
- [GitHub公式サイチE(https://github.com/)


