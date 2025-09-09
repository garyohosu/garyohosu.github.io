# 作業ログ (TODO)

- 公開リポジトリを作成し、README.md を追加。
- ローカルへクローンして作業開始。
- Chirpy スターターを取り込み、既存リポジトリに適用。
- `_config.yml` を調整: `url: https://garyohosu.github.io`, `lang: ja-JP`, `timezone: Asia/Tokyo`, `title: garyohosu`。
- main にコミット/プッシュ → GitHub Actions（pages-deploy.yml）で Pages 公開。
- 記事追加: `_posts/2025-09-05-hello-chirpy.md`。
- 記事追加: `_posts/2025-09-05-hello-world.md`（提供本文のフロントマターをYAMLとして修正）。
- 未来日付による非表示を修正（Jekyll）：`date: 2025-09-05 00:01:00 +0900` に更新して公開。
- `git pull --ff-only` で最新を取り込み（2回）。

参考URL
- サイト: https://garyohosu.github.io/
- 投稿: https://garyohosu.github.io/posts/hello-world/

主要コマンド例
- `gh repo create garyohosu.github.io --public --add-readme`
- `gh repo clone garyohosu/garyohosu.github.io`
- `git add -A && git commit -m "chore: bootstrap Chirpy" && git push`
- `bundle exec jekyll s` （ローカル確認）
## 追記（最新作業）
- 記事追加: `_posts/2025-09-05-hello-world.md` を作成。提供フロントマターの不整合を修正。
- 公開調整: future-date 回避のため `date: 2025-09-05 00:01:00 +0900` に更新し再デプロイ成功。
- 記事追加: `_posts/2025-09-06-web-codex-vs-cli.md` を作成し、本文を段階的に追記。
  - セクション: 「できたこと」「できなかったこと」「CLI版との違い」「まとめ」を追加。
  - 要点箇条書きの挿入と、`元記事` リンク（note）を末尾に追記。
- 各コミットごとに GitHub Actions（pages-deploy.yml）が起動し、ビルド状態を確認。

## 追記（著者設定・リンク整備・公開対応）
- 著者表示: `_config.yml` の `author.name` を `hantani`、`author.bio` を設定。`social.name` も `hantani` に統一。
- 記事側の上書き: `_posts/2025-09-06-web-codex-vs-cli.md` に `author:` 行が無いことを確認（上書きなし）。
- リンク整備: `social.links` に X/GitHub/Qiita/note/はてな を追加。`github.username` と `twitter.username` を設定。
- 連絡先: `_data/contact.yml` の YAML 崩れを修正し、各サービスの URL を追記（X/GitHub/Qiita/note/はてな）。
- 未来日時対応: `_config.yml` に `future: true` を設定（未来日投稿の表示を許可）。
- 公開調整: `web-codex-vs-cli` の `date` を `2025-09-05 23:59:00 +0900` に変更して即時公開。
- CI: Pages ワークフローの失敗（contact.yml の構文エラー）を修正後、成功を確認。

## 追記（2025-09-05 GitHub CLI/環境確認）
- 実行環境: Ubuntu 24.04.1 LTS（WSL2 上）、シェル `/bin/bash`、ユーザー `garyo`。
- 作業ディレクトリ: `/mnt/c/PROJECT/blog/garyohosu.github.io`（Windows の `C:\PROJECT\blog\garyohosu.github.io` に対応）。
- GitHub CLI: v2.45.0（`/usr/bin/gh`）を確認。
- 認証状態: この環境では未認証（`gh auth status` が未ログインを報告）。
- Git: 2.43.0 を確認。
- サンドボックス/承認: workspace-write、ネットワーク制限、承認 on-request。ネットワークを伴う `gh` や `git fetch/push` は承認が必要。
- メモ: Windows 側の `gh` 認証とは別管理（WSL 側は `~/.config/gh/hosts.yml`）。
 
## 追記（2025-09-07 家のPCからの投稿）
- 記事追加: `_posts/2025-09-07-from-home-pc.md` を作成
- コミット: feat: 家のPCからブログを書いてみた
- プッシュ: origin/main ブランチへ反映
## 2025-09-06 作業ログ

- Git の状態確認と同期
  - `main` ブランチの未プッシュ 2 コミットを `origin/main` へプッシュ
  - すべてのローカルブランチとタグを `origin` に同期（更新なし／タグ 0）
- 開発環境の確認
  - OS: Microsoft Windows 10.0.26100 / PowerShell 5.1
  - ツール: git 2.47.1, node 22.14.0, npm 10.9.2, python 3.12.10
- Ruby/Jekyll 関連のセットアップ
  - RubyInstaller (DevKit 同梱) 3.3.9 を `winget` でインストール
  - Bundler 2.7.1 を `gem install bundler` で導入
  - Jekyll 4.4.1 を `gem install jekyll` で導入
- メモ
  - リポジトリ直下で `jekyll` を実行すると、`jekyll-theme-chirpy (~> 7.3)` 未導入により Bundler の解決エラー発生
  - 次のステップ: `bundle install` を実行し、`bundle exec jekyll serve` でローカル確認

## 追記（2025-09-08 VS Code からの更新）
- リポジトリ確認: ルート構成、`_config.yml`、`Gemfile`、`index.html`、Pages ワークフローを確認
- 記事追加: `_posts/2025-09-08-update-from-vscode.md` を新規作成（VS Code で編集）
- コミット: `feat: VS Codeからブログを更新してみた`
- プッシュ: `main` を `origin/main` へプッシュ（Actions により自動ビルド/デプロイ）
- 備考: サンドボックス on-request のため、ネットワーク操作（push）は承認付きで実行

## 追記（2025-09-08 Codex CLI 設定）
- Codex CLI の設定ファイルの場所を確認: `~/.codex/config.toml`（`CODEX_HOME=/home/garyo/.codex`）。
- `config.toml` を新規作成し、以下を反映:
  - projects."/mnt/c/PROJECT/blog/garyohosu.github.io" の `trust_level = "trusted"`
  - model = "gpt-5"
  - model_reasoning_effort = "high"、model_reasoning_summary = "auto"
  - hide_agent_reasoning = true、show_raw_agent_reasoning = false
  - approvals="Full Access" の意図を `approval_policy = "never"` と `sandbox_mode = "danger-full-access"` に正規化
  - [sandbox_workspace_write].network_access = true（将来 workspace-write に切替時に有効）
  - [tools].web_search = true を有効化
- MCP サーバーを追加（DALL·E / OpenAI Images 用）:
  - `[mcp_servers.dalle]` を追加し、`npx -y imagegen-mcp` で起動するよう設定
  - 利用には `OPENAI_API_KEY` が必要（環境変数で付与するのが推奨）

コミット/プッシュ:
- `git add -A && git commit -m "chore(codex): add config.toml and MCP DALL·E setup" && git push` を実行

## 追記（2025-09-08 Codex 画像生成/MCP 検証）
- 起動エラー解消: `imagegen-mcp` の起動タイムアウト原因を特定（`OPENAI_API_KEY` 未設定）。
- 秘密情報の安全化: `~/.secrets/openai.env` を作成し `OPENAI_API_KEY` を保存（600 権限）。`~/.bashrc` から自動読み込みを追加。
- Codex 認証: `codex login --api-key` を実行し、API キー方式に切替（ChatGPT ログインから移行）。
- 既定モデル修正: 非対応モデルで 400 が出ていたため `model = "o4-mini"` に更新。
- 画像MCPの整理: `~/.codex/config.toml` から旧 `[mcp_servers.dalle]` を無効化。代替として以下を追加。
  - `[mcp_servers.images]`: `mcp-gpt-image-1`（Cloudwerx 版 GPT-Image-1 MCP）。
  - ラッパー `~/.local/bin/mcp-gpt-image-1` を作成し、環境変数を安全に注入。
- MCP ツール検出: Codex から `images__create_image` / `images__create_image_edit` を確認（ツールスキーマも取得）。
- 画像生成の現状: `gpt-image-1` は組織の「確認済み」要件により 403。`dall-e-3` は API 直叩きで 200 を確認。
- 次アクション: OpenAI の組織を「確認済み」にして gpt-image-1 を有効化（反映まで最長 15 分）。
- 検証予定: 組織確認後、`~/Pictures/gpt-image-1/red-panda.png` に 1024x1024 のサンプルを生成・保存。

（記録: 最終更新: 
)

## 2025-09-08 追記（UI最小カスタム）
- UI刷新（最小カスタム）: フォント/配色/カード影/タグ/ナビを微調整（assets/css/jekyll-theme-chirpy.scss）
- 記事追加: _posts/2025-09-08-chirpy-facelift.md
- note原稿保存: drafts/note-2025-09-08-facelift.txt

## 2025-09-08 追記（faceliftまとめ）
- ブランチ作成: facelift-202509
- SCSS最小カスタム: assets/css/jekyll-theme-chirpy.scss
- ヒーロー追加: index.html（layout: home 維持）
- ビルド確認: bundle exec jekyll build 成功
- 記事追加: _posts/2025-09-08-chirpy-facelift.md
- note原稿: drafts/note-2025-09-08-facelift.txt
- プッシュ: origin/facelift-202509（PR: https://github.com/garyohosu/garyohosu.github.io/pull/new/facelift-202509）

## 2025-09-09 追記（Claude Codeによるカスタムスタイル修正）
- 問題: カスタムCSSが公開サイトに反映されない（https://garyohosu.github.io）
- 原因調査: `assets/css/jekyll-theme-chirpy.scss` がテーマのベースimportを欠如、基本スタイル未読込
- 修正内容:
  - Chirpy v7.3の正しい構造に修正（`@use 'main'` を復元）
  - テーマベースの後にカスタム override を配置する構造に変更
  - Inter + Noto Sans JP フォント、ティール配色 (#0ea5a3)、カード影等のカスタマイズ維持
- ビルド確認: `bundle exec jekyll build` 成功、カスタムCSS正常コンパイル
- コミット: `fix(ui): correct Chirpy theme CSS override to apply custom styling`
- プッシュ: main → origin/main（GitHub Actions 自動デプロイ待ち）
- 期待結果: 数分後にカスタムデザインが公開サイトに反映予定
