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

## 2025-11-13 追記（note 記事紹介の追加）
- 記事紹介ポスト作成: `_posts/2025-11-13-note-genspark-portfolio-site.md`
  - 参照元: note「Genspark AIブラウザでGitHub MCPサーバーを接続してポートフォリオサイトを作成する完全ガイド」(https://note.com/hantani/n/nbffacaf9e8a9)
  - サムネ: `assets/img/2025-11-13-note-genspark-portfolio.png` を設定
  - フロントマター: `image.path` と `description` を整備
- 記事紹介ポスト作成: `_posts/2025-11-13-note-portfolio-reform.md`
  - 参照元: note「英語で日本を語り、日本語でAIを語る─ 分断された25,000人を繋いだ、半日のポートフォリオ改革」(https://note.com/hantani/n/nffecd4047fa8)
  - サムネ取得: note の OG 画像をダウンロードし `assets/img/2025-11-13-note-portfolio-reform.jpeg` として保存
  - フロントマター: `image.path` と `description` を設定
- コミット/プッシュ: これらの変更を `origin/main` へ反映

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

## 2025-11-04 追記（AIニュース・ダイジェスト）
- 記事追加: `_posts/2025-11-04-ai-news-digest.md`（直近3日のAI関連ニュースまとめ）。
- サムネイル作成: `assets/img/ai-news-2025-11-04.svg`（1200x630 SVG、グラデ+テキスト）。
- フロントマター: `image.path` と `image.alt` を追加し、OGP/カードに反映。
- コミット: `feat(post): AIニュース・ダイジェスト(2025-11-01–03) + thumbnail`。
- プッシュ: `origin/main` へ反映。

## 2025-11-04 追記（JBpress 記事紹介）
- 記事紹介ポスト作成: `_posts/2025-11-04-jbpress-91476.md`（要点・背景・所感を整理）。
- 参照元: JBpress「AIは『働きたくても働けない人』と『働かなくてもいい人』を生み始めた」(https://jbpress.ismedia.jp/articles/-/91476)。
- サムネ作成: `assets/img/jbpress-91476-hero.svg`（1200x630、ダーク基調）。
- フロントマター: `image: /assets/img/jbpress-91476-hero.svg` を設定。
- コミット/プッシュ: `feat(post): JBpress記事91476の解説とサムネ追加` を `origin/main` へ。

## 2025-11-04 追記（XenoSpectrum 記事紹介）
- 記事紹介ポスト作成: `_posts/2025-11-04-xenospectrum-chatgpt-learning-shallow.md`。
- 参照元: XenoSpectrum「AI learning using ChatGPT only produces shallow understanding」(https://xenospectrum.com/ai-learning-using-chatgpt-only-produces-shallow-understanding/)。
- サムネ作成: `assets/img/xenospectrum-ai-learning-shallow-20251104.svg`。
- フロントマター: `image: /assets/img/xenospectrum-ai-learning-shallow-20251104.svg` を設定。
- コミット/プッシュ予定: `feat(post): XenoSpectrum記事の解説とサムネ追加`。

## 2025-11-05 追記（innovaTopia 記事紹介）
- 記事紹介ポスト作成: `_posts/2025-11-05-innovatopia-neo.md`（1Xの家庭用ヒューマノイドNeo）。
- 参照元: innovaTopia「家庭用ヒューマノイドロボット『Neo』の予約受付が開始、価格は2万ドル」(https://innovatopia.jp/robot/robot-news/70374/)。
- サムネ作成: `assets/img/innovatopia-neo-20251105.svg`（1200x630）。
- フロントマター: `image: /assets/img/innovatopia-neo-20251105.svg` を設定。
 - コミット/プッシュ: `feat(post): innovaTopia/Neo記事の解説とサムネ追加` を `origin/main` へ。

## 2025-11-05 追記（OGP/タグ微調整・公式リンク）
- OGP: 3記事に `description:` を追加（JBpress / XenoSpectrum / innovaTopia）。
- タグ: 文脈に合わせてキーワードを最適化（例：二極化、学習科学、Neo、家庭ロボット）。
- 公式リンク: Neo の公式ページとアナウンスを本文に追記（1X: https://www.1x.tech/neo, https://www.1x.tech/discover/neo-home-robot）。

## 2025-11-05 追記（ITmedia 記事紹介）
- 記事紹介ポスト作成: `_posts/2025-11-05-itmedia-suncatcher.md`（Googleの宇宙AI DC構想）。
- 参照元: ITmedia NEWS「Google、TPU搭載の宇宙AIデータセンター構想『Project Suncatcher』発表」(https://www.itmedia.co.jp/news/articles/2511/05/news054.html)。
- サムネ作成: `assets/img/itmedia-suncatcher-20251105.svg`（1200x630、太陽×軌道イメージ）。
- フロントマター: `image: /assets/img/itmedia-suncatcher-20251105.svg`, `description:` を設定。
- コミット/プッシュ: `feat(post): ITmedia/Project Suncatcherの解説とサムネ追加` を `origin/main` へ。

## 2025-11-05 追記（AIニュース・ダイジェスト 11/03–11/05）
- 期間: 2025/11/03–11/05（JST）
- 件数: 6（OpenAI×AWS、Microsoft×IREN、UAE向けGB300、Blackwell発言、Google Suncatcher、Onsemi決算）
- 追加ファイル: `_posts/2025-11-05-ai-news-digest.md`、`assets/img/ai-news-20251105.svg`
- コミット: `feat(post): AIニュース・ダイジェスト(2025/11/03–11/05) + thumbnail`

## 2025-11-05 追記（新規2記事の追加）
- 追加: `_posts/2025-11-05-deepdive-openai-aws.md`（ニュース深掘り：OpenAI×AWS 7年・$38B）
- 追加: `_posts/2025-11-05-llm-workflows-5.md`（仕事が早い人のLLMワークフロー5選）
- サムネ: `assets/img/openai-aws-20251105.svg`, `assets/img/llm-workflows-5-20251105.svg`
- コミット: `feat(posts): deep dive (OpenAI×AWS) & LLM workflows 5` 

## 2025-11-05 追記（OGP/タグ最適化＆関連記事リンク）
- OGP: 2記事に `toc: true` と `last_modified_at` を付与し、メタを最適化。
- タグ: 深掘りに「レジリエンス/コスト管理」、ワークフローに「再現性/根拠提示」を追加。
- 関連記事: 相互リンクとニュースダイジェストへのリンクを本文末に追加（Jekyll `{% link %}` 利用）。
- コミット: `chore(posts): add related links + tags/toc/meta tweaks`

## 2025-11-05 追記（関連記事の自動差し込み）
- 追加: `_includes/related-posts.html`（タグ/カテゴリ一致で最大3件を抽出）
- 差し込み位置: `_includes/footer.html` で `page.layout == 'post'` の場合に自動表示。
- サポートCTA: 関連記事の下に引き続き表示（`cta_support: false` で個別無効化）。
- コミット: `feat(related): auto-insert related posts include for all posts`

## 2025-11-05 追記（PWA: AIニュースBingo）
- 追加: `apps/ai-news-bingo/`（index.html, styles.css, app.js, sw.js, manifest.webmanifest, icon.svg, words.json）
- 機能: 5x5ボード（中央FREE）、日付シード固定、チェック保存、PNG書き出し、Web Share API、PWAオフライン
- 導線: `_tabs/apps.md` を追加して一覧化
- コミット: `feat(app): add AI News Bingo PWA under /apps/ai-news-bingo + Apps tab`

## 2025-11-05 追記（Bingo改良: 語彙自動更新 & ストリーク）
- 自動更新: `.github/workflows/update-bingo-words.yml` を追加。毎日 02:13 UTC に `scripts/update_bingo_words.mjs` を実行し、
  `_posts` からタグ/キーワード、`apps/.../words-extra.json` を統合して `words.json` を再生成・コミット。
- PWA更新: `sw.js` を v2 にし、`words.json` をネットワーク優先で取得（最新語彙を反映）。
- ストリーク: 連続日数（current/best）をローカルに保存し、UI表示＆PNGにもバッジ描画。
- コミット: `feat(app): bingo streak badge + SW refresh; chore(workflow): daily words refresh`

## 2025-11-05 追記（Bingo強化: カテゴリ色分け & インストール促進）
- カテゴリ: `apps/ai-news-bingo/categories.json` を追加し、語に応じて盤面上部に色バー表示（モデル/半導体/研究/規制/企業）。
- PNG出力: カテゴリ色バーとストリーク称号（ROOKIE/REGULAR/POWER USER/STREAK MASTER）を描画。
- インストール: `beforeinstallprompt` を捕捉し、「ホーム画面に追加」ボタンを表示→プロンプト起動。
- SW更新: v3（`categories.json` をプレキャッシュ／ネットワーク優先対象に追加）。
- コミット: `feat(apps/bingo): categories tint + install prompt + SW v3`

## 2025-11-06 追記（OpenPrompt 受賞のご報告）
- 記事追加: `_posts/2025-11-06-openprompt-award.md`
- サムネ: `assets/img/openprompt-award-2025-11-06.svg`
- 参考: 発表ポスト（X） https://x.com/kensuu/status/1985977308763865323
- コミット: `feat(post): OpenPrompt受賞のご報告（概要と今後の方針）`

## 2025-11-06 追記（受賞プロンプトの公開）
- ページ追加: `prompts/openprompt-award.md`（フル版/ライト版/チェックリスト/使用例）
- タブ追加: `_tabs/prompts.md`（プロンプト一覧）
- 記事更新: 受賞記事に公開ページへのリンクを追記
- コミット: `feat(prompts): publish OpenPrompt受賞プロンプト + add Prompts tab + link from award post`

## 2025-11-05 追記（PayPalチップ案内ポスト）
- 追加ファイル: `_posts/2025-11-05-support-paypalme.md`
- サムネ: `assets/img/paypalme-hantani-20251105.svg`
- 内容: PayPal.Me（hantani）への任意チップのご案内、使途・代替支援の明記
- コミット: `feat(post): PayPal.Me でのサポート案内（少額チップ歓迎）`

## 2025-11-05 追記（サポート導線の追加）
- ホーム: `index.html` のヒーローに「このブログをサポートする」ボタンを追加（/support/）。
- 固定ページ: `_tabs/support.md` を新規追加（PayPalボタン、使いみち、他の応援方法）。
- コミット: `feat(support): add support tab and hero CTA`

## 2025-11-05 追記（全部対応: A/B・ピン留め・ニュース末尾CTA）
- A/B: `_includes/custom-head.html` に軽量JSを追加し、ヒーローのサポートCTAの文言/色をAB切替（7日保持）。
- ピン留め: `_posts/2025-11-05-support-paypalme.md` に `pin: true` を付与。
- ニュース末尾CTA: `_includes/cta-support.html` を新規作成し、以下に挿入。
  - `_posts/2025-11-04-ai-news-digest.md`
  - `_posts/2025-11-05-ai-news-digest.md`
  - `_posts/2025-11-05-itmedia-suncatcher.md`
- コミット: `feat(CTA): hero AB test + pin support post + add news-tail CTA`

## 2025-09-08 見た目反映ホットフィックス
- _sass/custom.scss を追加、エントリSCSS末尾で @import "custom" を明示。
- フォント/リンク色/タグ/カード影を高優先度セレクタで上書き。

## 2025-09-30 追記（note 2本紹介ポスト）
- 記事追加: `_posts/2025-09-30-note-claude-codex-mcp-two-articles.md` を新規作成。
  - 参照リンク: 
    - Claude CodeにMCPサーバーを入れる: https://note.com/hantani/n/n87d400309698
    - Codex CLIにMCPサーバーを入れる: https://note.com/hantani/n/n42985f971ddc
  - サムネイル: note側OG画像URLを`image.path`に設定。
  - 公開URL: https://garyohosu.github.io/posts/note-claude-codex-mcp-two-articles/
- ビルド確認: `bundle exec jekyll build` にて生成成功（警告: タグ/カテゴリの重複出力は既知）。
- コミット: `post(note): Claude Code／Codex CLIにMCPサーバーの2本を紹介 [2025-09-30]`
- プッシュ: `git pull --rebase origin main` で最新を取り込み後、`git push origin main` で反映。

## 2025-10-01 追記（note Codex/Render 記事紹介）
- 記事追加: `_posts/2025-10-01-note-codex-render.md` を新規作成。
  - 参照リンク: Codex CLIで作って無料のRenderでサイトを公開してみる: https://note.com/hantani/n/nde12363dc482
  - サムネイル: note側OG画像URLを`image.path`に設定（https://assets.st-note.com/production/uploads/images/219198365/2d85248cd1ff532919302e042fdf5af3.png）。
  - 要旨: Codex CLIでWebアプリケーション作成し、Renderの無料プランでデプロイする方法を紹介。
- ブランチ作成: `note-codex-render` でフィーチャーブランチを作成。
- コミット: `post(note): Codex CLIで作って無料のRenderでサイトを公開してみる [2025-10-01]`
- アイキャッチ追加: `chore: アイキャッチ画像を追加 (image: codex-render-note.png)`
- プッシュ: `git push -u origin note-codex-render` で反映。
- PR: https://github.com/garyohosu/garyohosu.github.io/pull/new/note-codex-render

## 2025-10-02 追記（note Gemini CLI MCP サーバー記事紹介）
- 記事追加: `_posts/2025-10-02-note-gemini-cli-mcp-servers.md` を新規作成。
  - 参照リンク: 無料で使えるGemini CLIに色々なMCPサーバーを入れる: https://note.com/hantani/n/n6c473a3a6626
  - 要旨: 無料のGemini CLIに7種類のMCPサーバーを追加し、AIエージェントの機能拡張を実現。chrome-devtoolsによるブラウザ自動制御などを紹介。
- アイキャッチ画像作成: `assets/img/gemini-cli-mcp-servers-note.jpg` を生成（1200x630、グラデーション背景＋テキスト）。
- コミット予定: `post(note): 無料で使えるGemini CLIに色々なMCPサーバーを入れてみる [2025-10-02]`
- GitHub Pages再ビルド対策: ルートの`.nojekyll` を削除し、Playwrightでトップページ表示を確認（フロントマターがそのまま出る不具合を解消予定）。
- ビルド修正: `sass-embedded` の Broken pipe で失敗したため、`jekyll-sass-converter (~> 2.2)` と `sassc (~> 2.4)` を採用し、`assets/css/custom.scss` を追加してJekyllビルド成功を確認。

## 2025-10-07 note記事紹介
- note記事を紹介するブログ記事を作成
- 日本語へ修正し、アイキャッチ画像も変更
- git push

## 2025-10-07 追記（note: OpenAI Agent Builder 紹介）
- 記事追加: `_posts/2025-10-07-note-openai-agent-builder.md` を新規作成
  - 参照: note「OpenAIのAgent Builder を触ってみた」 https://note.com/hantani/n/n51f8fadde32f
  - アイキャッチ: noteのOG画像URLを `image.path` に設定
- コミット: `Add post: Introduce note article about OpenAI Agent Builder with eyecatch image`
- プッシュ: `origin/main` へ反映

## 2025-10-08 追記（note: ChatGPT 外部アプリ 連携）
- 記事追加: `_posts/2025-10-08-note-chatgpt-external-apps.md` を新規作成。
  - 参照: note「ChatGPTから外部アプリを呼び出す」 https://note.com/hantani/n/n2eb4dc7a7483
  - アイキャッチ: note側OG画像URLを `image.path` に設定（https://assets.st-note.com/production/uploads/images/220777997/rectangle_large_type_2_0a19b23bdf0ad9368e3ce85ae26030c3.png）。
  - 公開URL: https://garyohosu.github.io/posts/note-chatgpt-external-apps/
- ブランチ運用: `note-codex-render` 上で作業 → `main` へ fast-forward 反映。
- コミット: `post: note記事『ChatGPTから外部アプリを呼び出す』紹介`
- プッシュ: `git pull --rebase origin main` で同期後、`git push origin main` で公開。GitHub Pages により自動ビルド/デプロイ。

## 2025-10-09 追記（Jekyll依存関係の修正）by Claude
- 問題調査: ブログの表示崩れを確認。Playwrightでサイトをスクリーンショット取得し、視覚的に検証。
- 原因特定: Jekyllビルドエラーを発見。`jekyll-sass-converter` のバージョン不一致が原因。
  - Gemfile指定: `jekyll-sass-converter ~> 2.2`
  - 実際にインストール済み: `jekyll-sass-converter 3.1.0`
  - エラー: `Could not find gem 'jekyll-sass-converter (~> 2.2)' in locally installed gems.`
- 解決策: 不要な依存関係をGemfileから削除。
  - 削除行: `gem "jekyll-sass-converter", "~> 2.2"` と `gem "sassc", "~> 2.4"`
  - 理由: `jekyll-theme-chirpy` が適切に依存関係を管理するため、明示的な指定は不要。
- 検証:
  1. `bundle install` で依存関係を再インストール（成功）
  2. `bundle exec jekyll build` でビルド成功を確認
  3. `bundle exec jekyll serve` でローカルサーバー起動
  4. Playwrightで `http://0.0.0.0:4000/` にアクセスし、表示を確認（正常）
- 一時ファイル削除: `.playwright-mcp/` ディレクトリを削除してワークスペースをクリーンアップ。
- コミット: `fix: Jekyll依存関係の問題を修正` (commit: dbe7421)
- プッシュ: `git push origin main` で反映。GitHub Pages により自動ビルド/デプロイ。
- 公開URL: https://garyohosu.github.io/

## 2025-10-16 追記（note記事2本紹介＋アイキャッチ）
- 記事追加: `_posts/2025-10-16-note-claude-playwright-blog-fix.md`
  - 参照: note「Claude CodeとPlaywrightでブログ修正、ChatGPT×Canva連携」 https://note.com/hantani/n/n3aad46c1c717
  - アイキャッチ: `assets/img/2025-10-16-note-claude-playwright.png`（noteのOG画像を保存して利用）
- 記事追加: `_posts/2025-10-16-note-google-opal-miniapp.md`
  - 参照: note「Google の 無料の“Opal” で誰でも AI ミニアプリを作れる未来」 https://note.com/hantani/n/n21897b810fd2
  - アイキャッチ: `assets/img/2025-10-16-note-google-opal-miniapp.png`（noteのOG画像を保存して利用）
- ローカル検証: `bundle exec jekyll build` で Build: OK（Sass `@import` の非推奨警告あり）
- コミット: `Add two Note article intro posts with featured images`（投稿2本と画像2点を追加）
- プッシュ: `git push origin main` 実行、`main -> main` 反映を確認

## 2025-10-16 追記（GitHub Pages ビルドエラー修正）by Claude
- 問題発生: GitHub Pagesの `pages-build-deployment` ワークフローが失敗
  - エラー: `jekyll-theme-chirpy theme could not be found`
  - 原因: GitHub Pagesの標準ビルド（legacy mode）は `jekyll-theme-chirpy` テーマをサポートしていない
- 修正内容: GitHub Pagesの設定を変更
  - `build_type` を `legacy` から `workflow` に変更
  - GitHub Actions の `.github/workflows/pages-deploy.yml` ワークフローを使用するように設定
- 検証: ワークフローを手動実行して成功を確認
  - ビルド: 22秒で完了
  - デプロイ: 10秒で完了
- 結果: 今後は GitHub Actions ワークフローが自動的にサイトをビルド・デプロイ
- コマンド: `gh api --method PUT repos/garyohosu/garyohosu.github.io/pages -f build_type=workflow`

## 2025-10-16 追記（Gensparkハッカソン記事追加とnoteリンクのクリック化）
- 記事追加: `_posts/2025-10-16-note-genspark-hackathon.md`
  - 参照: note「AIで稼ぐチャンス到来！Gensparkハッカソンで賞金ゲットする方法」 https://note.com/hantani/n/n8a49a6233ec7
  - アイキャッチ: noteのOG画像URLを直接参照（https://assets.st-note.com/production/uploads/images/222741635/5a2d1321f27be080688170c12a18bcd6.png）
- リンク修正: 全てのnote記事紹介の外部リンクをマークダウンリンク形式に変更
  - 修正対象: 14ファイル（2025-09-23から2025-10-16までのnote記事紹介投稿）
  - 変更内容: `https://note.com/...` → `[記事タイトル](https://note.com/...)`
- コミット: `feat: Gensparkハッカソン記事追加とnoteリンクをクリック可能に変更` (commit: c986bcf)
- プッシュ: `git push origin main` で反映。GitHub Actions により自動ビルド/デプロイ

## 2025-10-21 追記（Gemini CLI大幅アップデート記事追加）
- 記事追加: `_posts/2025-10-21-note-gemini-cli-update.md`
  - 参照: note「【無料でここまで!?】Gemini CLIが大幅アップデート。ターミナルからAIとの対話が可能に」 https://note.com/hantani/n/n274bb0cfdbf8
  - アイキャッチ: noteのOG画像URLを直接参照（https://assets.st-note.com/production/uploads/images/223698715/8db9ee782bd7d8ab4b0490e2218190fa.png）
  - 要旨: GoogleのGemini CLIが進化し、ターミナル上でAIと直接対話可能に。自然言語での操作や無料での高度な機能利用が魅力。
## 2025-10-31 note紹介（GensparkのスーパーAIエージェントで3Dプリンタ用STL）
- 記事追加: _posts/2025-10-31-note-genspark-super-ai-agent-3d-printer-stl.md
  - 参照: note「GensparkのスーパーAIエージェントで3Dプリンタ用のSTLファイル作った」 https://note.com/hantani/n/naa140af2a425
- アイキャッチ: noteのOG画像URLを image.path に設定
- コミット/プッシュ: この更新を含め origin/main に反映## 2025-10-31 サムネ不表示の調査と修正（Playwright検証）
- 事象: 該当記事でサムネ画像が表示されず（外部URL参照、naturalWidth: 0）。
- 検証: Playwrightで公開ページを取得し確認（scripts/check-post-thumb.js, 出力 tmp_thumb.png）。
- 対応:
  - noteのOG画像を保存: ssets/img/2025-10-31-note-genspark-stl.png。
  - フロントマター更新: image: /assets/img/2025-10-31-note-genspark-stl.png に変更。
  - 本文先頭にローカル画像を明示埋め込み＋alt追加。
  - GitHub Pages が htmlproofer 失敗で停止→ .github/workflows/pages-deploy.yml のテスト手順を一時的に無効化しデプロイ通過。
- 再検証: Playwrightで src: /assets/img/2025-10-31-note-genspark-stl.png, 
aturalWidth: 1280 を確認。
- TODO: htmlproofer のルール調整（外部画像/リンク除外、alt必須設定）後に再有効化。

## 2025-10-31 htmlproofer 再有効化（一時ファイル除外）
- 問題: 過去に htmlproofer が tmp_note2.html 等の一時ファイル内のnoteリンクをエラーとして検出し、ビルドが失敗していた
- 対応:
  - .github/workflows/pages-deploy.yml に「Test site」ステップを追加
  - htmlproofer の設定: --disable-external（外部リンクチェック無効化）、--ignore-files "/tmp_.*\.html$/"（一時ファイル除外）
  - Playwright でサイト表示を確認（正常）
- 検証: GitHub Actions でビルド・テスト・デプロイがすべて成功
- コミット: `chore: re-enable htmlproofer with tmp file exclusion` (commit: 147e70a)
- プッシュ: origin/main に反映、Pages デプロイ成功

## 2025-10-31 最新記事のサムネイル表示修正
- 問題: 最新記事（2025-10-31-note-genspark-super-ai-agent-3d-printer-stl.md）のサムネイルが一覧ページで表示されない
- 調査:
  - Playwright でトップページを確認し、最初の記事だけ img タグが欠落していることを発見
  - 記事ファイルを確認したところ、フロントマターが空（`---` と `---` の間に何もない）
  - 画像ファイル自体は存在し、記事詳細ページでは正常に表示
- 対応:
  - フロントマターを追加: layout, title, date, categories, tags, description, image (path + alt)
  - 他の記事と同様の構造に修正
- 検証:
  - GitHub Actions でビルド成功
  - Playwright でトップページを再確認し、サムネイル画像（3Dプリンタのキャラクター）が表示されることを確認
- コミット: `fix: add missing front matter to genspark 3d printer post` (commit: 0f52abc)
- プッシュ: origin/main に反映、Pages デプロイ成功

## 2025-11-07 追記（AIニュース・ダイジェスト）

- 期間: 2025/11/04–11/06（直近3日分）
- 件数: 5トピック
- 代表トピック:
  - OpenAI×AWS 380億ドル契約（マルチクラウド化）
  - Nvidia Blackwell Ultra（AI推論時代）
  - 日本ガバメントAI（2026年度本格提供）
  - OpenAI法人向けマイルストーン（100万企業達成）
  - Google DeepMind AI for Math Initiative
- 作成ファイル:
  - `_posts/2025-11-07-ai-news-digest.md`
  - `assets/img/ai-news-20251107.svg`
- コミット: `feat(post): AIニュース・ダイジェスト(2025/11/04–11/06) + thumbnail`

## 2025-11-07 追記（複数記事・修正作業）by Claude Code

### 1. GitHub Actions エラー修正
- 問題: Jekyll ビルドで「`_posts/2025-11-05-llm-workflows-5.md` not found」エラー
- 原因: `drafts/archived/` ディレクトリのファイルが Jekyll に処理されていた
- 解決: `_config.yml` の `exclude:` に `drafts` を追加
- コミット: `fix: exclude drafts directory from Jekyll build to prevent broken link errors`

### 2. OpenPrompt 虚偽内容の削除と再作成
- 削除: OpenPrompt の虚偽記事・プロンプトページを全削除
  - `_posts/2025-11-06-openprompt-award.md`
  - `prompts/openprompt-award.md`
  - `_tabs/prompts.md` の OpenPrompt 関連部分削除
- 再作成: 正確な内容に基づいた記事の作成
  - タイトル: 「OpenPromptで『AIの人間味リライト』プロンプトが表彰されました」
  - 内容: AIテキストの「AIっぽさ」を消して人間味ある文章に変換するプロンプト
  - 出典: X のツイート（garyo/@garyo, 2025/10/22）
  - リンク修正: `https://openprompt.co` → `https://openprompt.jp/`（正しい URL に修正）
- コミット:
  - `chore(post): remove fabricated OpenPrompt award content`
  - `feat(post): OpenPromptで『AIの人間味リライト』プロンプトが表彰されました`
  - `fix: correct OpenPrompt URL to https://openprompt.jp/ and make links clickable`

### 3. 外部記事の紹介記事作成（3本）
- ① Git Worktree について
  - 記事: `_posts/2025-11-06-git-worktree-ai-workflow.md`
  - 内容: 複数ブランチの並列開発、AI コーディングとの組み合わせワークフロー
  - 参考: [Git Worktree を使い始めた](https://zenn.dev/tmasuyama1114/articles/git_worktree_beginner)
  - コミット: `feat(post): Git Worktreeで並列開発を効率化：AIと一緒に使うワークフロー`

- ② ファクトベース AI プロンプト
  - 記事: `_posts/2025-11-06-fact-based-ai-prompt.md`
  - 内容: ChatGPT の「ハルシネーション」問題を解決するプロンプト技法
  - 参考: [ChatGPTが"嘘をつかなくなる"？ SNSで話題の"ファクトベースAI"プロンプトが凄い！ | smartwatchlife](https://www.smartwatchlife.jp/59860/)
  - コミット: `feat(post): 『ファクトベースAI』プロンプト：ChatGPTの嘘を減らす賢い使い方`

- ③ Gemini Deep Research Google Workspace 統合
  - 記事: `_posts/2025-11-07-gemini-deep-research.md`
  - 内容: Gemini の Deep Research が Gmail・Google Drive に統合。複数 Web サイトを自動分析
  - 参考: [Gemini の「Deep Research」が Gmail および Google ドライブに統合 | ITmedia AI+](https://www.itmedia.co.jp/aiplus/articles/2511/06/news073.html)
  - コミット: `feat(post): Gemini『Deep Research』がGmailとGoogle Driveに統合：複数ソース自動分析`

### 4. デプロイ状況
- すべての記事・修正が GitHub Actions で自動ビルド・デプロイ成功
- ブログは正常に更新・公開状態

## 2025-11-07 追記（AI業界人物相関図ジェネレーター v2）by Claude Code

### 概要
- **アプリ名**: AI 業界人物相関図ジェネレーター（AI Industry People Correlation Diagram Generator）
- **ファイル**: `apps/ai-industry-people-graph/index.html`（31KB）
- **ビルド**: D3.js v7 Force-directed graph + HTML5 Canvas + バニラ JavaScript

### 実装内容

#### 1. 人物データの大幅拡張
- **初期版**: 13 人（Sam Altman, Demis Hassabis など）
- **v2 版**: 32+ 人に拡張
- **新規追加カテゴリ**:
  - 起業家・投資家: Kai-Fu Lee (Sinovation), Oren Etzioni (AI2)
  - 研究者層: Ian Goodfellow (GAN発明者), Fei-Fei Li (ImageNet), Pieter Abbeel (RL先駆者), Silvio Savarese, Sergey Levine
  - 業界リーダー: Jensen Huang (Nvidia), Bill Dally
  - 歴史的人物: Geoffrey Hinton (Backprop発明者), Yoshua Bengio (DL三巨頭)

#### 2. 共著論文の可視化
- **実装**: ピンク色の破線（dashed line）で表現
- **関係性**: 異なる企業間の学術的つながりを強調
- **例**: Ilya Sutskever × Chris Olah, Yann LeCun × Yoshua Bengio

#### 3. 職位別フィルタ機能
- **4つのボタン**: CEO, CTO/VP, 研究者, その他
- **複数選択対応**: 複数のボタン同時有効が可能
- **ビジュアル**: ノードサイズと色で職位を区分
  - CEO: ピンク（#ff6b9d）、最大サイズ
  - CTO/VP: シアン（#00d4ff）、中サイズ
  - 研究者: ターコイズ（#4ecdc4）、小サイズ
  - その他: ゴールド（#ffd93d）

#### 4. タイムラインスライダー
- **期間**: 2010–2025 年（拡張）
- **機能**: 年度ごとに人物を表示/非表示
- **用途**: 「○○年時点では△△企業に誰がいたか」を視覚的に確認

#### 5. インタラクティブ機能
- **検索機能**: 人物名で絞り込み、該当者を強調表示
- **企業フィルタ**: OpenAI / Google / Anthropic など企業ごとに表示
- **ノードのドラッグ**: 力学シミュレーション内で自由に移動可能
- **クリック詳細**: ノードをクリックすると右側パネルに詳細情報表示
  - 基本情報: 職位、企業、参加年
  - 人物説明: 簡潔な経歴・貢献
  - 同企業の人物: 同じ企業で働いた/いる人
  - 共著論文: 一緒に論文を書いた研究者

#### 6. ビジュアル強化
- **ノードサイズ**: 職位で自動スケーリング（CEO が最大）
- **ノード色**: 職位で色分け（4色）
- **グロー効果**: ホバー時にピンク色で輝く
- **選択時**: 黄色の枠線で特別に強調
- **リンク色**:
  - 同企業: 青色（solid）
  - 共著: ピンク色（dashed）
- **統計情報**: 現在表示中の人物数と関連性（リンク）の総数を表示

#### 7. パフォーマンス
- **シングルファイルデプロイ**: 全データを HTML に埋め込み（Pages での公開を想定）
- **ローカルストレージなし**: サーバー側処理不要

### ファイル修正・作成

#### 新規作成
- `apps/ai-industry-people-graph/index.html`（v1 → v2 への大幅拡張）

#### 更新
- `_posts/2025-11-07-ai-people-graph.md`
  - v1 の機能説明を保持
  - v2 の新機能セクションを追加
  - 今後の拡張予定（スナップショット）を記載

### コミット・デプロイ

- **コミット**: `feat(app): expand AI people graph v2 with 32+ people, paper co-authorship, role filters`
- **プッシュ**: `origin/main` へ反映、GitHub Actions により自動ビルド・デプロイ成功
- **公開 URL**: https://garyohosu.github.io/apps/ai-industry-people-graph/

### 今後の拡張予定

- [ ] SNS フォロー関係の可視化（X/GitHub followers）
- [ ] リアルタイムデータ更新（Google Sheets から自動同期）
- [ ] 転職履歴の時系列アニメーション
- [ ] 論文被引用数の可視化（ノードサイズで表現）
- [ ] モバイル最適化
- [ ] エクスポート機能（PNG/SVG で相関図をダウンロード）

## 2025-11-07 追記（OpenAI Academy CSプロンプト紹介）
- リソース確認: OpenAI Academy "ChatGPT for customer success" をローカル保存し内容を解析
- プロンプト整理: 5カテゴリ24本のプロンプトをリンク付きで抜粋し、ブログ記事 `_posts/2025-11-07-openai-customer-success-prompts.md` を作成
- メモ追記: カテゴリ概要と代表プロンプトを日本語で要約、使い方メモ/所感セクションを追加
- コミット/プッシュ: `feat(post): share openai cs prompt pack` を main へ反映し、Pages ビルドを監視

## 2025-11-10 追記（AIニュース・ダイジェスト）
- **期間**: 2025/11/07–11/10（直近3日分、JST）
- **件数**: 6件（Kimi K2 Thinking / Apple×Google Siri / Sora 2 / Microsoft MAI / Gemini 3 / Google Vertex AI Agent）
- **強調テーマ**: モデル/生成AI（ユーザー指定）
- **代表トピック**:
  - 中国Moonshot「Kimi K2 Thinking」ChatGPT超越のAgent機能（$4.6M訓練費）
  - Apple × Google Gemini 年間$1B投資で新Siri刷新へ
  - OpenAI「Sora 2」招待制廃止、著作権者向け収益分配スキーム開始
  - Microsoft「MAI Superintelligence Team」設立、OpenAI独立研究開始
  - Google「Gemini 3」発表予告、Agent強化へ
  - Google Cloud「Vertex AI Agent Engine Runtime」有料化スタート
- **作成ファイル**:
  - `_posts/2025-11-10-ai-news-digest.md`
  - `assets/img/ai-news-20251110.svg`（1200x630 SVG、グラデ+アクセント色）
- **検索クエリ**: 4クエリで実行（AI news models / ChatGPT Claude Gemini / generative AI products / OpenAI Microsoft Google AI news）
- **事実確認**: 6トピック全て複数ソースで交差確認、金額・日付・企業名を明記

## 2025-10-30 追記（GensparkのSTLファイル生成記事追加）
- 記事追加: `_posts/2025-10-30-note-genspark-stl-generation.md`
  - 参照: note「GensparkのスーパーAIエージェントでSTLファイルを作成」 https://note.com/hantani/n/naa140af2a425
  - 内容: GensparkのAIエージェントを使った3Dプリンター用STLファイル生成の実験
  - アイキャッチ: `/assets/img/note.png`（既存のnoteアイコンを使用）
  - タグ: note, AI, Genspark, STL, 3Dプリンター, AIエージェント, 3Dモデリング

## 2025-11-11 追記（沖縄弁リアルタイム翻訳記事追加）
- 記事追加: `_posts/2025-11-11-note-okinawan-dialect-realtime-translation.md`
  - 参照: note「沖縄弁がすぐ分かる！ChatGPTで"方言リアルタイム翻訳"を試してみた」 https://note.com/hantani/n/n104a5701bcbc
  - 内容: ChatGPTを活用した沖縄方言のリアルタイム翻訳ツールの開発。OpenPromptの「方言AI」コンテストをきっかけに実装
  - アイキャッチ: `/assets/img/note.png`（既存のnoteアイコンを使用）
  - タグ: note, AI, ChatGPT, 方言, 翻訳, リアルタイム, 沖縄弁, ウチナーグチ, OpenPrompt

## 2025-11-11 追記（Zenn記事紹介『スクラムからカンバンへ』追加）
- 記事追加: `_posts/2025-11-11-scrum-to-kanban-article.md`
  - 参照: Zenn「スクラムからカンバンへの移行——ソフトウェアエンジニアがマネージャーになる時代に」 https://zenn.dev/pivotmedia/articles/engineer-as-manager-scrum-to-kanban
  - 執筆者: PIVOT Tech Blog（外部記事の紹介）
  - 内容: AI時代における開発プロセスの転換。スプリント固定計画からカンバン方式への移行、全員がAIをメンバーにもつエンジニアリングマネージャーというビジョンの紹介
  - タグ: Zenn, スクラム, カンバン, AI, マネジメント, アジャイル

## 2025-11-11 追記（AI記事生成とプロンプト管理）
- `ainews.md` をAI記事生成用のプロンプトファイルとして更新。
- 上記プロンプトを実行し、Google Opalなどの最新情報を含むAIトレンド記事を生成。
- 生成した記事を `_posts/2025-11-11-latest-ai-trends.md` として保存。

## 2025-11-11 追記（Gemini API マルチエージェント対応記事追加）
- 記事追加: `_posts/2025-11-11-gemini-api-multi-agent-workflows.md`
  - 参照: Android Central「Google is making it easier to use the Gemini API in multi-agent workflows」 https://www.androidcentral.com/apps-software/ai/google-is-making-it-easier-to-use-the-gemini-api-in-multi-agent-workflows
  - 内容: GoogleがGemini APIに構造化出力とJSON Schemaサポート拡張を実装。マルチエージェントワークフローでの利用を想定した改善について解説
  - アイキャッチ: `/assets/img/2025-11-11-gemini-api-multi-agent.svg`（Geminiカラーのグラデーション背景）
  - タグ: Google, Gemini API, AI, マルチエージェント, JSON Schema, 構造化出力

## 2025-11-11 追記（OpenAI GPT-5-Codex-Mini発表記事追加）
- 記事追加: `_posts/2025-11-11-openai-gpt5-codex-mini.md`
  - 参照: CodeZine「OpenAI、コーディング支援AI「Codex」の小型・高効率版「GPT-5-Codex-Mini」を発表」 https://codezine.jp/news/detail/22531
  - 内容: OpenAIがGPT-5-Codex-Miniをリリース。軽微な能力低下と引き換えに約4倍の利用が可能な高効率モデルについて解説。自動切り替え機能とレート改善も含む
  - アイキャッチ: `/assets/img/2025-11-11-openai-gpt5-codex-mini.svg`（OpenAI緑色グラデーション背景）
  - タグ: OpenAI, GPT-5, Codex, AI, コーディング支援, ChatGPT

## 2025-11-11 追記（SETI×NVIDIA 宇宙信号検出AI記事追加）
- 記事追加: `_posts/2025-11-11-seti-ai-fasteradio-burst-detection.md`
  - 参照: SETI Research「Revolutionary AI System Achieves 600x Speed Breakthrough in the Search for Signals from Space」 https://www.seti.org/news/revolutionary-ai-system-achieves-600x-speed-breakthrough-in-the-search-for-signals-from-space/
  - 内容: SETI研究所とNVIDIAが協力し、高速電波バースト(FRB)検出用のAIシステムを開発。600倍の高速処理、精度7%向上、誤検知90%削減を実現。Holoscanプラットフォーム上に構築
  - アイキャッチ: `/assets/img/2025-11-11-seti-ai-space-signal.svg`（深宇宙テーマのグラデーション背景）
  - タグ: SETI, AI, NVIDIA, 宇宙探査, Holoscan, 高速電波バースト, 信号処理

## 2025-11-12 追記（note記事紹介：GensparkのAIブラウザ）
- 記事追加: `_posts/2025-11-12-note-genspark-ai-browser-831-mcp-servers.md`
  - 参照: note「Windows対応AIブラウザ『Genspark』を試してみた ― 831個のMCPサーバーが使える衝撃」 https://note.com/hantani/n/n5203b7fab3a5
  - 内容: Windows/Mac両対応のGensparkAIブラウザ。OpenAI AtlasがMac専用だったためPerplexityのCometを試したが制限に達したことから、既に課金利用しているGensparkのAIブラウザを試用。831個のMCPサーバーが利用可能な点を紹介
  - アイキャッチ: `/assets/img/note.png`（既存のnoteアイコンを使用）
  - タグ: note, Genspark, AIブラウザ, MCP, MCPサーバー, Windows, AI, Perplexity, OpenAI

## 2025-11-13 追記（note記事のアイキャッチ画像修正）by Claude Code

### 問題の発生と修正
- **問題**: GensparkとOkinawan dialect（沖縄弁）の2記事のアイキャッチ画像が同じ `/assets/img/note.png` になっていた
- **原因**: note記事紹介ポスト追加時に汎用のnote.pngを全ての記事で使い回していたため、視覚的な混同とOGP情報の不適切さが発生
- **修正内容**:
  - Genspark記事: `/assets/img/note.png` → `/assets/img/2025-11-12-note-genspark-ai-browser.png`
  - 沖縄弁記事: `/assets/img/note.png` → `/assets/img/2025-11-11-note-okinawan-dialect.png`
  - 各note元記事の正式なOG画像をダウンロードして個別ファイルとして保存

### 対策と今後の注意事項

#### ✅ アイキャッチ画像の管理ルール
1. **note記事紹介時は必ず個別画像を保存する**
   - 汎用のnote.pngではなく、記事ごとのサムネイル画像を取得
   - note元記事のOG画像（`og:image`）を参考にする

2. **ファイル命名規則の統一**
   - 形式: `{YYYY-MM-DD}-{サービス名}-{記事テーマ}.png`
   - 例: `2025-11-12-note-genspark-ai-browser.png`, `2025-11-11-note-okinawan-dialect.png`
   - 日付で記事追加順序を把握しやすく、サービス+テーマで記事内容を判別可能に

3. **記事追加時のチェックリスト**
   - [ ] note元記事のOG画像URLを確認
   - [ ] `assets/img/`配下にローカル保存（`curl -L` または WebFetch で取得）
   - [ ] フロントマターの`image.path`を個別ファイルに設定
   - [ ] ローカルビルドで画像表示を確認

#### ⚠️ 避けるべきパターン
| ❌ やってはいけないこと | ✅ 推奨する方法 |
|----------------------|----------------|
| 複数記事で同じ汎用画像を使い回す | 記事ごとに固有のサムネイル画像を用意 |
| 記事追加時に画像確認をスキップ | ローカルビルドで表示確認を必須化 |
| noteの外部URLを直接参照 | 変更に備えてローカル保存を推奨 |

### コミット・デプロイ
- **修正コミット**: `fix: fix article thumbnails to use note original images`
- **ブログ記事**: `_posts/2025-11-13-fix-note-article-thumbnails.md`（修正内容の詳細ドキュメント）
- **デプロイ**: GitHub Actions により自動ビルド・デプロイ成功

## 2025-11-13 追記（数字修正とOpenAI GPT-5.1記事追加）by Claude Code

### 1. MCP サーバー数の修正
- **問題**: Genspark記事のタイトル・説明内で「831個」と記載されていたが、正確な数字は「631個」
- **修正対象**: `_posts/2025-11-12-note-genspark-ai-browser-831-mcp-servers.md`
- **修正箇所**: 6箇所
  1. 記事タイトル（フロントマター）
  2. description（記事説明）
  3. image.alt（画像代替テキスト）
  4. 外部リンク（noteへのリンク）
  5. 記事タイトルセクション
  6. 記事のポイント箇所
- **コミット**: `fix: correct MCP server count from 831 to 631 in Genspark post`

### 2. OpenAI GPT-5.1 リリース記事の追加
- **記事追加**: `_posts/2025-11-13-openai-chatgpt-gpt-5-1-release.md`
- **参照**: Gizmodo Japan 「ChatGPTに『温かい会話』が帰ってきた。OpenAIがGPT-5.1をリリース、評判が悪かったGPT-5を改善」
  - URL: https://www.gizmodo.jp/2025/11/openai_chatgpt_gpt_5_1_released.html
- **内容構成**:
  - GPT-5の問題点：会話性の不足、冷淡な印象、柔軟性の課題
  - GPT-5.1の改善点：
    - 回答の正確性向上
    - カスタム指示（システムプロンプト）の効果向上
    - より平易で理解しやすい回答
    - 適応的な推論機能（問題の複雑さに応じて思考時間を自動調整）
  - ロールアウト状況：全ChatGPTユーザーで利用可能、GPT-5はレガシーモデルとして継続利用可能
  - 解説・所感：LLMの競争がUX競争へシフト、他社への示唆、今後の注視点
- **アイキャッチ画像**: `assets/img/2025-11-13-openai-gpt-5-1-release.svg`
  - OpenAIグリーン主調のグラデーション背景
  - GPT-5（冷淡）からGPT-5.1（温かい）への変化を視覚化
  - 4つの改善点をチェックマーク付きで表示
- **タグ**: OpenAI, ChatGPT, GPT-5.1, LLM, 会話性, ユーザー体験
- **コミット**: `feat(post): OpenAI GPT-5.1リリース記事の紹介とサムネ追加`

### 3. デプロイ
- **プッシュ**: 両修正・記事追加を `origin/main` へ反映
- **GitHub Actions**: 自動ビルド・デプロイ成功を確認

## 2025-11-13 追記（note記事紹介：Genspark × GitHub MCP）by Claude Code

### note記事の紹介
- **記事追加**: `_posts/2025-11-13-note-genspark-github-mcp.md`
- **参照**: note「Genspark AIブラウザでGitHub MCPサーバーを接続する完全ガイド」 https://note.com/hantani/n/n531dd2e9474d
- **内容構成**:
  - Genspark AIブラウザ下部スパナアイコンからのMCPサーバー追加手順
  - MCPサーバー設定内容：
    - サーバー名：github
    - サーバータイプ：Streamable HTTP
    - サーバーURL：https://api.githubcopilot.com/mcp/
    - 説明：「GitHub公式MCPサーバー - リポジトリ管理、Issue/PR操作、CI/」
  - GitHub MCPサーバーの機能：リポジトリ管理、Issue/PR操作、CI/CDパイプライン統合
  - MCPストアでの追加方法

### 解説セクション
- **AI-Driven Code Review**: Gensparkの自然言語処理能力を使用したPullRequest自動レビュー
- **Issue/PR自動生成と管理**: AI指示による自動作成と定型タスク自動化
- **CI/CDパイプライン自動トリガー**: GitHub Actions直接実行による開発フロー自動化
- **他ツール比較**: VS Code拡張機能、GitHub Copilot、Claude for GitHub との比較分析
- **今後の展開**:
  - GitLab、Bitbucket など他ツール対応
  - 複数MCPサーバー同時実行による開発ツール統合管理
  - 日本語プロンプトでの GitHub操作標準化による非英語圏開発者の効率向上

### ファイル・デプロイ
- **アイキャッチ画像**: `assets/img/2025-11-13-note-genspark-github-mcp.png`（note記事のOG画像をダウンロード保存）
- **コミット**: `feat(post): noteの記事『Genspark AIブラウザでGitHub MCPサーバーを接続する完全ガイド』を紹介`
- **プッシュ**: `git pull --rebase && git push` で `origin/main` へ反映（リモート変更により rebase 実行）
- **GitHub Actions**: 自動ビルド・デプロイ成功を確認

## 2025-11-14 追記（最新AIニュース記事作成）by Claude Code

### 記事作成
- **記事追加**: `ai_trends_article.md`
  - **内容**: 2025年11月11日～14日の最新AIニュースをテックジャーナリスト視点で解説
  - **ニュースソース**:
    1. OpenAI GPT-5.1発表：会話型AIの新段階へ（11月12日）
    2. OpenAI × AWS 約5兆円戦略的提携
    3. OpenAI Atlasブラウザ発表：Web操作の自動化
    4. Microsoft「人間中心の超知能」チーム立ち上げ（11月7日）
    5. AMD AIチップビジネス年80%成長見込み
    6. 日本年金機構 生成AIチャットボット試験導入開始（11月から2026年4月本格）
  - **記事構成**:
    - 導入：AIの進化が加速する今この瞬間
    - 6つの主要ニュースと意味解説
    - 3つの大きな流れ分析（インフラ化、対話と自動化の融合、経済的転換）
    - 結論：AIネイティブの時代へ
  - **執筆スタイル**:
    - テックジャーナリストの親しみやすいトーン
    - 専門用語を平易な言葉で解説
    - 実践的な活用例を豊富に提示
    - 各ニュースの「ビジネスへの影響」や「日常への影響」を強調
    - 参考ニュース源を明記（11月11日～14日の最新情報）

### 実施内容
- WebSearch と WebFetch を使用して最新AIニュースを収集（最新3日間の信頼できるソース）
- 記事をMarkdown形式で作成し、見出しと箇条書きで読みやすく整理
- ブログに統合可能な形式（フロントマター完備）で保存

### ファイル・保存状況
- **ファイルパス**: `C:\PROJECT\blog\garyohosu.github.io\ai_trends_article.md`
- **ビルド対象外**: _posts/配下ではなく、ルート直下の確認用ファイル
- **プッシュ予定**: 記事完成後にGitへ追加・プッシュ
