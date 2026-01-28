---
title: "GitHub Actions HTML-Prooferエラー「is not an HTTPS link」の原因と解決方法"
date: 2026-01-28 22:00:00 +0900
categories: [Dev, Troubleshooting]
tags: [GitHub Actions, HTML-Proofer, Jekyll, GitHub Pages, HTTPS, セキュリティ, トラブルシューティング]
description: GitHub ActionsでのビルドでHTML-Prooferが「is not an HTTPS link」エラーを出す原因と解決方法。HTTPリンクがなぜ問題なのか、再発防止策まで詳しく解説。
---

## はじめに

GitHub PagesでJekyllブログを運用していると、意外なところでビルドが失敗することがあります。今回、`HTML-Proofer`による以下のエラーに遭遇しました：

```
http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/ is not an HTTPS link
```

一見すると「HTTPでも動くのになぜ？」と思いますが、これには明確な理由があります。

---

## エラーの全容

### 発生した状況

- **タイミング**: 新しいブログ記事を3件プッシュ後
- **場所**: GitHub Actions のビルドプロセス
- **エラー内容**: HTML-ProoferによるHTTPSチェックの失敗

### エラーログの詳細

```
Running 3 checks (Images, Links, Scripts) in ["_site"] on *.html files ...

Checking 1106 internal links
Checking internal link hashes in 86 files
Ran on 401 files!

For the Links check, the following failures were found:

* At _site/posts/ai-trends-january-week5/index.html:1:
  http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/ is not an HTTPS link

* At _site/posts/mcp-apps-introduction/index.html:29:
  http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/ is not an HTTPS link

HTML-Proofer found 3 failures!
Process completed with exit code 1.
```

### 影響範囲

- **ビルド失敗**: 3回連続でデプロイがストップ
- **複数ファイルに影響**: 2つの記事で同じURLを使用
- **参照回数**: 合計3箇所でHTTPリンクを検出

---

## 原因の特定

### なぜHTTPリンクがエラーになるのか

HTML-Prooferは、セキュリティのベストプラクティスとして**HTTPSリンクの使用を強制**しています。

| プロトコル | セキュリティ | HTML-Proofer |
|-----------|-------------|--------------|
| **HTTPS** | 暗号化通信 | ✅ 許可 |
| **HTTP** | 平文通信 | ❌ エラー |

### HTTPの問題点

1. **通信内容が傍受可能**: 第三者に読み取られるリスク
2. **改ざんの危険性**: 中間者攻撃（MITM）に脆弱
3. **ブラウザ警告**: 多くのブラウザがHTTPサイトに警告を表示
4. **SEOへの影響**: GoogleはHTTPSサイトを優遇

### 今回の根本原因

Web検索結果から取得したURLが`http://`で始まっていたことが原因です：

```markdown
<!-- 問題のあったURL -->
[MCP Apps](http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
```

実際にはこのサイトはHTTPSに対応していますが、検索結果のURLがHTTPだったため、そのまま記事に使用してしまいました。

---

## 解決策

### 修正内容

HTTPをHTTPSに変更するだけで解決します：

```markdown
<!-- 修正前 -->
[MCP Apps](http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)

<!-- 修正後 -->
[MCP Apps](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
```

### 実際の修正手順

```bash
# 対象ファイルの修正
# 2026-01-28-ai-trends-january-week5.md
# 2026-01-28-mcp-apps-introduction.md

# 全てのhttp://を一括でhttps://に置換
sed -i 's|http://blog.modelcontextprotocol.io|https://blog.modelcontextprotocol.io|g' ファイル名

# コミット＆プッシュ
git add .
git commit -m "fix: Change HTTP links to HTTPS for MCP blog"
git push
```

### 修正結果

```
completed  success  fix: Change HTTP links to HTTPS for MCP blog
Build and Deploy  main  push  52s
```

---

## 再発防止策

### 1. URL取得時の確認ルール

外部URLを記事に追加する際は、以下を確認：

| チェック項目 | 確認方法 |
|-------------|---------|
| **HTTPS対応** | URLの先頭が`https://`か確認 |
| **リダイレクト** | HTTPでアクセスした時にHTTPSにリダイレクトされるか |
| **有効性** | リンク先が実際に存在するか |

### 2. 記事作成時のチェックリスト

記事のプッシュ前に確認すべき項目を追加：

```markdown
### プッシュ前チェックリスト
- [ ] 全ての外部URLが`https://`で始まっているか確認
- [ ] `http://`を含むURLがないかgrepで検索
```

検索コマンド：

```bash
# 記事内のHTTPリンクを検索
grep -n "http://" _posts/2026-01-28-*.md
```

### 3. AGENTS.mdへの追記

今回の教訓を再発防止チェックリストに追加しました：

```markdown
### 記事作成時
- [ ] 外部URLが全て`https://`で始まっているか確認
- [ ] `http://`リンクは`https://`に変換（対応している場合）
```

### 4. なぜHTTPがURLに含まれていたか

Web検索APIの結果には、サイトの実際のプロトコル設定に関わらず、`http://`で始まるURLが含まれることがあります。

**対策**: 検索結果から取得したURLは、必ず`https://`に変換するか、実際にアクセスして正しいURLを確認する。

---

## HTML-Prooferの設定について

### 現在の設定

```yaml
# .github/workflows/pages-deploy.yml
- name: Test site
  run: |
    bundle exec htmlproofer _site \
      --disable-external \
      --ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/"
```

### HTTPチェックを無効にする方法（非推奨）

どうしてもHTTPリンクを許可したい場合は、`--allow-hash-href`や`--enforce-https`オプションを調整できますが、**セキュリティ上の理由から推奨しません**。

正しいアプローチは、HTTPリンクをHTTPSに変換することです。

---

## 学んだこと

### 1. セキュリティファーストの考え方

HTML-ProoferがHTTPリンクをエラーにするのは、ユーザーを保護するためです。

- HTTPSは現代のWeb標準
- 外部サービスへのリンクも暗号化通信であるべき
- CI/CDでのチェックは品質とセキュリティの両方を担保

### 2. 自動取得データの検証

Web検索やAPIから取得したデータは、そのまま使わずに検証が必要：

```
取得データ → 検証 → 必要に応じて修正 → 使用
```

### 3. CI/CDの価値

ローカルでは気づかない問題を、CI/CDパイプラインが検出してくれました：

```
ローカル: 記事作成 → プレビュー → 問題なし？
CI/CD: ビルド → HTML-Proofer → HTTPエラー検出！
```

---

## まとめ

| 項目 | 内容 |
|------|------|
| **エラー** | `is not an HTTPS link` |
| **原因** | Web検索結果のURLがHTTPだった |
| **解決** | `http://`を`https://`に変換 |
| **再発防止** | URLのプロトコル確認をチェックリストに追加 |

### 今後の対策

1. **記事作成時**: 外部URLは必ずHTTPS確認
2. **プッシュ前**: `grep "http://"` で検索
3. **CI/CD**: HTML-Prooferの警告を真摯に受け止める

セキュリティは細部に宿ります。小さな`s`の違いが、ユーザーの安全を守ります。

---

## 参考リンク

- [HTML-Proofer公式ドキュメント](https://github.com/gjtorikian/html-proofer)
- [Why HTTPS Matters - Google](https://web.dev/why-https-matters/)
- [Jekyll公式サイト](https://jekyllrb.com/)
