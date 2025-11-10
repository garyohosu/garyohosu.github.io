---
layout: post
title: "Git Worktreeで並列開発を効率化：AIと一緒に使うワークフロー"
date: 2025-11-06 14:00:00 +0900
categories: [blog, development]
tags: [Git, Worktree, 開発効率, 並列開発, ワークフロー, AI]
description: "Git Worktreeを使うと、複数のブランチを同時に作業できます。AIコーディングと組み合わせた実用的なワークフローを紹介します。"
---

## Git Worktreeとは？

Git Worktreeは、**同じリポジトリで複数の作業フォルダを同時に持つことができる機能**です。

従来のGitの使い方：
- 1つのリポジトリ = 1つの作業フォルダ
- ブランチを切り替えるたびに、作業内容をコミット/スタッシュで保存

Git Worktreeの使い方：
- 1つのリポジトリ = **複数の作業フォルダを並列管理**
- ブランチ切り替え不要、複数タスクを同時進行可能

## なぜ今注目されている？

### 1. **AIコーディングの相性の良さ**
AIアシスタント（Claude、ChatGPT等）は複数ファイルの文脈を理解するのが得意です。Worktreeで複数ブランチを同時に確認しながら、AIに「このコードとこっちのコードの違いは？」と聞くことで、より正確な提案を受けられます。

### 2. **緊急バグ修正への即対応**
機能開発中に本番バグが報告されても、worktreeなら：
- 開発中のファイルは保持したまま
- 別フォルダでホットフィックスブランチを作成・修正
- その後も元の開発を継続

### 3. **コードレビューの効率化**
複数ファイルの変更を同時に見比べながらレビュー可能。AIにパターンの違いを分析させることもできます。

## 基本的な使い方

```bash
# 新しいブランチでworktreeを作成
git worktree add -b feature/new-feature ../new-feature-folder

# 既存ブランチをworktreeに追加
git worktree add ../hotfix-folder hotfix/urgent-bug

# 現在のworktreeをリスト表示
git worktree list

# worktreeを削除
git worktree remove ../new-feature-folder
```

## AIとの組み合わせワークフロー

### シナリオ：機能開発中にバグ報告が来た場合

1. **現在の状態を保持**
   ```bash
   # メイン開発: feature/ai-prompt-improvement ブランチで作業中
   git worktree add -b hotfix/bug-123 ../hotfix
   ```

2. **AIに状況を説明**
   ```
   「main ブランチのコードにバグがあります。
   変更内容をAIに見せて、修正パッチを生成してください。
   feature ブランチの進行状況は保持したままで。」
   ```

3. **AIが生成したコードを検証**
   - hotfix フォルダで修正を確認
   - feature フォルダで他の開発への影響を確認

4. **修正後に統合**
   ```bash
   # hotfix ブランチを main にマージ
   # feature ブランチを feature ブランチで継続
   ```

## Git Worktreeの制約と注意点

⚠️ **重要：1つのブランチは1つのworktreeでのみ使用可能**

- 同じブランチを複数のworktreeで同時に使うことはできません
- worktreeを削除する前に、別のworktreeに切り替える必要があります

## 実用的な活用場面

| 場面 | メリット |
|------|---------|
| 機能開発中の緊急バグ修正 | 開発の中断なし、スタッシュ不要 |
| 複数機能の並行開発 | ブランチ切り替えストレスなし |
| コードレビュー | 複数ファイルを同時表示・比較 |
| バージョン比較検証 | 異なるコード状態を同時に確認 |
| AIアシスタントの活用 | 複数ファイルの文脈を正確に提供 |

## AIアシスタントを最大限活用するコツ

1. **複数フォルダの差分をAIに見せる**
   ```bash
   diff -r ../folder1 ../folder2 | pbcopy
   # AIに「この2つのコードの違いは何ですか？」と質問
   ```

2. **ファイルツリーを示しながら説明**
   ```bash
   tree -L 2 > structure.txt
   # このファイル構造とコードの意図をAIに説明
   ```

3. **AIに複数worktreeの状態を把握させる**
   ```bash
   git worktree list
   # 出力をAIに見せて「今の状態をまとめてください」
   ```

## まとめ

Git Worktreeは、**AIコーディングの時代に相性の良い開発ツール**です。

- 複数タスクの並列実行で開発速度向上
- スタッシュやコミット退避が不要
- AIアシスタントとの協働がスムーズ

参考記事：[Git Worktree を使い始めた](https://zenn.dev/tmasuyama1114/articles/git_worktree_beginner)

ぜひ試してみてください！
