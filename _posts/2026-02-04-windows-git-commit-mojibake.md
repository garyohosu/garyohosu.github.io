---
layout: post
title: "Windows (PowerShell) でGitコミットメッセージが文字化けする原因と対策"
date: 2026-02-04 12:00:00 +0900
categories: [Note]
tags: [git, windows, powershell, encoding, mojibake, troubleshooting]
---

CLIツールを使ってブログ記事を投稿していた際、Gitのコミットメッセージが「**蟷ｴ**」のように激しく文字化けする問題に遭遇しました。

この記事では、Windows環境（特にPowerShell）でGitを使う際に発生する文字化けの原因と、再発防止策をまとめます。

## 現象

PowerShellから以下のようなコマンドを実行してコミットを行いました。

```powershell
git commit -m "2026年2月4日のAIトレンド記事とnote記事追加"
```

しかし、GitHub上の履歴や `git log` で確認すると、メッセージが以下のように文字化けしてしまいました。

```
feat(post): 2026蟷ｴ2譛4譌･縺ｮAI繝医Ξ繝ｳ繝芽ｨ倅ｺ九→note險倅ｺ玖ｿｽ蜉
```

「年」や「月」などの日本語部分が、全く読めない文字列に変換されています。

## 原因

この問題の主な原因は、**PowerShellとGitの間での文字エンコーディングの不整合**です。

1.  **PowerShellのデフォルト**: 日本語Windows環境のPowerShellは、レガシーなShift-JIS (CP932) で動作することが多いです。
2.  **Gitの期待**: Gitは基本的にUTF-8を期待します。
3.  **不整合の発生**: PowerShellから引数として日本語文字列を渡す際、システムロケールのエンコーディング（CP932）で渡され、GitがそれをUTF-8として（あるいはその逆で）解釈しようとして失敗し、文字化けが発生します。

特に、外部ツール（CLIエージェントなど）を経由してコマンドを実行する場合、パイプやシェルの境界でエンコーディング変換が二重三重に行われ、問題が複雑化することがあります。

## 解決策と回避策

### 1. 英語のコミットメッセージを使う（推奨）

最も確実で安全な方法は、**コミットメッセージを英語で書くこと**です。ASCII文字だけであれば、エンコーディングの違いによる影響を受けません。

```powershell
git commit -m "feat(post): Add AI trends post for 2026-02-04"
```

チーム開発やOSSでは英語が標準であることが多いため、これを機に英語コミットに切り替えるのがベストプラクティスと言えます。

### 2. ファイル経由でメッセージを渡す

どうしても日本語を使いたい場合は、`-m` オプションではなく、メッセージをUTF-8で保存したテキストファイルを `-F` オプションで指定します。

```powershell
# メッセージをUTF-8でファイルに保存（PowerShell）
$bytes = [System.Text.Encoding]::UTF8.GetBytes("日本語のメッセージ")
[System.IO.File]::WriteAllBytes("commit_msg.txt", $bytes)

# ファイルを指定してコミット
git commit -F commit_msg.txt

# 一時ファイルを削除
Remove-Item commit_msg.txt
```

これなら、シェルの引数処理を経由しないため、文字化けを回避できます。

### 3. 設定でエンコーディングを固定する

Gitの設定でコミットメッセージのエンコーディングを明示する方法もありますが、CLIからの引数渡しの問題までは解決しきれないことがあります。

```bash
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8
```

また、PowerShellプロファイルの `$OutputEncoding` をUTF-8に変更する方法もありますが、他のレガシーツールに影響を与える可能性があるため注意が必要です。

## 再発防止策

今回の教訓として、プロジェクトのナレッジベース（AGENTS.md）に以下のルールを追加しました。

*   **Windows環境でのGitコミットは原則「英語」で行う**
*   **日本語が必要な場合は一時ファイル（UTF-8）を経由する**
*   **CLIツールで自動化する場合、安全側に倒して英語メッセージを生成させる**

Windows環境での開発はエンコーディングの罠が多いため、基本的にはUTF-8/ASCIIで完結させるのが無難です。
