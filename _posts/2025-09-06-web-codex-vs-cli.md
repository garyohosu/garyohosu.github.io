---
layout: post
title: "Web版CodexはGitHubと連携できるけど、自動更新はできない話"
date: 2025-09-05 23:59:00 +0900
categories: [blog]
tags: [Codex, GitHub Pages, Web版, CLI版]
---

## はじめに

前回、ChatGPT + Codex CLI + gh を使って GitHub Pages にブログを自動構築しました。
では「Web版のCodex」なら、ブラウザだけで更新できるのでしょうか？
実際に試してみた結果をまとめます。

## 実験してみた

Web版Codexには GitHub リポジトリを連携できる機能があります。
自分のリポジトリ（garyohosu.github.io）を選び、コードを読ませることができました。

## できたこと

- リポジトリ内のファイルを参照して解説してもらう
- 改善案やリファクタリングの提案を受ける
- 差分を作ってプルリクエスト候補を出す

## できなかったこと

## CLI版との違い
- **CLI版 Codex** →実行環境を持ち、`gh` や `git` を叩いて直接更新できる  
- **Web版 Codex** →提案やレビュー専門、実行はできない  

この違いを知らないと「Web版で全部できるはず」と勘違いしてしまいます。
## まとめ

- **CLI版 Codex** →実行環境を持ち、`gh` や `git` を叩いて直接更新できる  
- **Web版 Codex** →提案やレビュー専門、実行はできない  

この違いを知らないと「Web版で全部できるはず」と勘違いしてしまいます。

---

元記事: [note版はこちら](https://note.com/hantani/n/nd2d90b090f27)