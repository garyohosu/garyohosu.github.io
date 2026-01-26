# CLAUDE.md - プロジェクト設定

このファイルはClaude Codeがこのリポジトリで作業する際のガイダンスを提供します。

## 起動時の必読ファイル

**重要**: 作業開始前に必ず以下のファイルを読み込んでください：

1. **AGENTS.md** - ブログ運用ルールと過去の問題から学んだ再発防止策
2. **CHANGELOG.md** - 変更履歴（何が変更されたか確認）

## プロジェクト概要

- **種別**: Jekyll静的ブログサイト（Chirpyテーマ）
- **ホスティング**: GitHub Pages
- **URL**: https://garyohosu.github.io/

## 必須ルール

### 1. 問題発生時

問題が発生し解決した場合は、**必ずAGENTS.mdに追記**すること。

### 2. 変更時

何か変更を行った場合は、**必ずCHANGELOG.mdに追記**すること。

### 3. 記事作成前

- `ls _posts/ | grep "<キーワード>"` で類似ファイル名を確認
- ファイル名のスラッグ部分が一意か確認

詳細なチェックリストは `AGENTS.md` を参照。

## よく使うコマンド

```bash
# 記事のプッシュ
git -C "C:\PROJECT\blog\garyohosu.github.io" add <file>
git -C "C:\PROJECT\blog\garyohosu.github.io" commit -m "メッセージ"
git -C "C:\PROJECT\blog\garyohosu.github.io" push

# リモートとの同期
git -C "C:\PROJECT\blog\garyohosu.github.io" pull --rebase

# 類似ファイル名の確認
ls _posts/ | grep -i "<キーワード>"

# ローカルビルド（推奨）
bundle exec jekyll build
```

## ファイル構成

```
├── CLAUDE.md       # このファイル（プロジェクト設定）
├── AGENTS.md       # 運用ルールと再発防止策
├── CHANGELOG.md    # 変更履歴
├── _posts/         # ブログ記事
├── assets/img/     # 画像ファイル
└── _config.yml     # Jekyll設定（変更注意）
```
