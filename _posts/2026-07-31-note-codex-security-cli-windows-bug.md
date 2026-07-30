---
layout: post
title: "noteに記事を公開しました：Codex Security CLIを試したらWindows版の落とし穴に当たった"
date: 2026-07-31 08:00:00 +0900
categories: [note, AI]
tags: [note, Codex, Security, Windows, Node.js]
description: noteで公開した「Codex Security CLIを使ってみる」の紹介です。Windows環境での注意点もまとめました。
permalink: /posts/note-codex-security-cli-windows-bug-2026-07-31/
image:
  path: /assets/img/note-codex-security-cli-2026-07-31.png
  alt: Codex Security CLIを使ってみる（note サムネイル）
---

![Codex Security CLIを使ってみる（note サムネイル）]({{ site.baseurl }}/assets/img/note-codex-security-cli-2026-07-31.png)

2026-07-30 に、noteで以下の記事を公開しました。

- 外部リンク（note）：[Codex Security CLIを使ってみる](https://note.com/hantani/n/na1347737a92d)

### このnoteの主なポイント
- OpenAIがセキュリティ解析用ツール「Codex Security CLI」をOSSとして公開
- `npx @openai/codex-security --version` から試せて、`login` や `scan . --dry-run` で流れを確認できる
- 実スキャンの `npx @openai/codex-security scan . --auth chatgpt` では、Windows環境で `Invalid Codex plugin directory` エラーに遭遇
- 原因は Windows + Node.js v22.14.0 と `@openai/codex-security 0.1.4` の相性問題っぽく、WSL（Linux）での実行が無難
- セキュリティレビューをAIに任せられる可能性は魅力的だが、環境依存の落とし穴も要注意

### 試したコマンド
```text
npx @openai/codex-security --version
npm install @openai/codex-security
npx @openai/codex-security login
npx @openai/codex-security scan . --dry-run
npx @openai/codex-security scan . --auth chatgpt
```

### こんな人におすすめ
- Claude Code や Codex 系のCLIを触っている人
- リポジトリのセキュリティチェックをAIで効率化したい人
- Windows環境でCLIツールを試すときの落とし穴を先に知っておきたい人

### ひとこと
「便利そう！」で終わらず、実際に動かしてエラーまで確認しているので、導入前の参考にしやすい内容です。

**元noteはこちら**：https://note.com/hantani/n/na1347737a92d

---

*この記事はnote記事の紹介として作成しました。*
