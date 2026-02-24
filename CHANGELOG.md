# CHANGELOG.md - 変更履歴

このファイルはブログの重要な変更を記録します。

---

## 2026-02-24

### 変更内容
- 記事修正: `_posts/2026-02-20-chatgpt-vs-claude-comparison-2026.md` の `image` をローカル画像パスに変更
- 画像追加: `assets/img/2026-02-20-chatgpt-vs-claude-comparison-2026.svg` を追加
- 記事修正: `_posts/2026-02-18-ai-news-trends-february-week3-update.md` のタイトル引用符を修正（YAMLエラー解消）
- 記事追加: `_posts/2026-02-24-fix-github-actions-htmlproofer-missing-image-yaml-quote.md`（障害原因と対策まとめ）
- 画像追加: `assets/img/2026-02-24-fix-github-actions-htmlproofer-missing-image-yaml-quote.svg`（記事サムネイル）
- `AGENTS.md` にインシデント記録と再発防止チェックを追記

### 理由
- GitHub Actions の `Build and Deploy` における `htmlproofer` 失敗（存在しない内部画像リンク）を解消するため
- 併発していた YAML フロントマター引用符エラーを解消し、再発防止ナレッジを更新するため

---

## 2026-02-19 (2)

### 変更内容
- 記事追加: `2026-02-19-note-github-agentic-workflows-auto-blog.md`（note記事の紹介）
- 画像追加: `assets/img/2026-02-19-note-github-agentic-workflows-auto-blog.png`（note OG画像）

### 理由
- noteで公開した「GitHub Agentic Workflowsによる全自動ブログを作った」を既存ブログでも紹介し、導線を作るため

---

## 2026-02-19

### 変更内容
- 記事追加: `2026-02-19-auto-ai-blog-introduction.md`（auto-ai-blog の紹介記事）
- 画像追加: `assets/img/2026-02-19-auto-ai-blog-launch.svg`（記事サムネイル）

### 理由
- 新規公開した `https://garyohosu.github.io/auto-ai-blog/` の内容と導線を既存ブログ側で案内するため

---

## 2026-02-18

### 変更内容
- 記事追加: `2026-02-18-ai-news-trends-february-week3-update.md`（直近3日のAI最新トレンドまとめ）
- 画像追加: `assets/img/ai-news-trends-2026-02-18.svg`（記事サムネイル）

### 理由
- 2026/02/16〜02/18（JST）の英語ニュースをもとに、Anthropic Sonnet 4.6・Gemini 3 Deep Think・MiniMax M2.5・NVIDIA Vera Rubin・OpenAI IPO動向などをまとめるため

---

## 2026-02-16 (2)

### 変更内容
- 記事追加: `2026-02-16-note-claude-cowork-5min.md`（note記事の紹介）
- 画像追加: `assets/img/2026-02-16-note-claude-cowork-5min.png`（note OG画像）

### 理由
- noteで公開した「Claude Coworkを実際に使ってみた：非エンジニアでも5分で体感できるAIの本気」をブログで紹介するため

---

## 2026-02-16

### 変更内容
- 記事追加: `2026-02-16-ai-news-trends-february-week3.md`（直近3日のAI最新トレンドまとめ）
- 画像追加: `assets/img/ai-news-trends-2026-02-16.svg`（記事サムネイル）

### 理由
- 2026/02/13〜02/16（JST）の英語ニュース・論文をもとに、生成AI/マルチモーダル/AIエージェント/世界モデル/動画生成/安全性のトレンドを整理するため

---

## 2026-02-11 (2)

### 変更内容
- 記事追加: `2026-02-11-magicboxai-launch.md`（MagicBoxAIのリリース告知・宣伝記事）
- 画像追加: `assets/img/2026-02-11-magicboxai-launch.png`

### 理由
- 新規事業「MagicBoxAI」の価値提案と導線をブログ上で明確に伝えるため

---

## 2026-02-11

### 変更内容
- 記事追加: `2026-02-11-note-magicboxai-save-publish.md`（note記事の紹介）
- 画像追加: `assets/img/2026-02-11-note-magicboxai-save-publish.png`

### 理由
- noteで公開した「MagicBoxAIを作った理由：初心者が詰むのは保存と公開だった」をブログに掲載するため

---

## 2026-02-04 (3)

### 変更内容
- 記事追加: `2026-02-04-jekyll-integer-tag-build-error.md` (数値タグによるビルドエラー対策)
- AGENTS.md更新: チェックリストの運用ルールを厳格化（未チェック戻し・都度チェック）

### 理由
- 数値タグによるビルド失敗の原因と対策を周知するため
- 再発防止策（プッシュ後のActions確認）を形骸化させないため

---

## 2026-02-04 (2)

### 変更内容
- 記事修正: `2026-02-03-note-sakura-cgi-github-pages.md` のタグ `403` を文字列 `"403"` に修正
- AGENTS.md更新: 数値タグによるビルドエラーのインシデントと対策を追記

### 理由
- GitHub Actionsで `undefined method 'gsub' for an instance of Integer` エラーが発生し、ビルドが失敗していたため

---

## 2026-02-04

### 変更内容
- 記事追加: `2026-02-04-windows-git-commit-mojibake.md` (Gitコミット文字化け対策)
- AGENTS.md更新: Windows環境でのGitコミット文字化けインシデントと対策を追記

### 理由
- Windows PowerShell環境でのGitコミット時に発生した文字化け問題の原因と対策を記録・共有するため

---

## 2026-02-03

### 変更内容
- 記事追加: `2026-02-03-note-sakura-cgi-github-pages.md`（note記事の紹介）
- 画像追加: `assets/img/2026-02-02-note-sakura-cgi-github-pages.png`

### 理由
- noteで公開した「GitHub Pages内だけで完結する「さくらCGI」呼び出し術（403問題回避版）」をブログに掲載するため

---

## 2026-02-02

### 変更内容
- 記事追加: `2026-02-02-ai-news-trends-february-week1.md`（直近3日のAIトレンドまとめ）
- 画像追加: `assets/img/ai-news-trends-2026-02-02.svg`（サムネイル）

### 理由
- 2026/01/30〜02/02の英語ニュースを基に、最新AIトレンドを整理

---

## 2026-02-01

### 変更内容
- 記事追加: `2026-02-01-ai-trends-february-week1.md`（2026年2月最新AIトレンド）
- 画像追加: `assets/img/2026-02-01-ai-trends-february-week1.png`（1.4MB、AI生成）

### 理由
- 2026年2月の最新3日間のAIニュースをまとめた記事を追加
- トピック: AlphaGenome（ゲノムAI）、Project Genie（世界生成AI）、AIエージェント、動画生成AI、OpenAIモデル刷新
- 英語ニュースソース（Google DeepMind、OpenAI、CNBC、BBC、Guardianなど）を日本語で分かりやすく解説

---

## 2026-01-30

### 変更内容
- 記事追加: `2026-01-30-ai-trends-january-final.md`（1月AIトレンド総括）

### 理由
- 2026年1月の重大AIニュースを総括する記事を追加（Apple×Google提携、ChatGPT広告、中国AI躍進など）

---

## 2026-01-28 (4)

### 変更内容
- 記事追加: `2026-01-28-fix-htmlproofer-https-error.md`（トラブルシューティング記事）
- AGENTS.md更新: HTTPSチェックを再発防止リストとインシデント記録に追加

### 理由
- HTML-Prooferの「is not an HTTPS link」エラーの原因・解決・再発防止を記録

---

## 2026-01-28 (3)

### 変更内容
- 記事追加: `2026-01-28-note-google-gemini-subscription.md`（note記事の紹介）
- 画像追加: `assets/img/2026-01-28-note-google-gemini-subscription.png`

### 理由
- noteで公開した「Googleから月1200円のGeminiサブスクが登場した」をブログに掲載するため

---

## 2026-01-28 (2)

### 変更内容
- 記事追加: `2026-01-28-ai-trends-january-week5.md`（AIトレンド週間まとめ）

### 理由
- 2026年1月第5週のAI最新ニュースをまとめた記事を追加

---

## 2026-01-28

### 変更内容
- 記事追加: `2026-01-28-mcp-apps-introduction.md`（MCP Appsの紹介記事）

### 理由
- Model Context Protocolの新拡張機能「MCP Apps」について解説する技術記事を追加

---

## 2026-01-27

### 変更内容
- 記事追加: `2026-01-27-note-github-pages-sakura-cgi-cors.md`（note記事の紹介）
- 画像追加: `assets/img/2026-01-27-note-github-pages-sakura-cgi-cors.png`

### 理由
- noteで公開した「GitHub Pages + さくらCGIでCORS問題を解決」をブログに掲載するため

---

## 2026-01-26 (5)

### 変更内容
- 記事追加: `2026-01-26-note-claude-code-codex-skills.md`（note記事の紹介）
- 画像追加: `assets/img/2026-01-26-note-claude-code-codex-skills.png`

### 理由
- noteで公開した「Claude CodeからSkillsでCodexを使う」をブログに掲載するため

---

## 2026-01-26 (4)

### 変更内容
- 記事追加: `2026-01-26-ai-cli-shared-knowledge-base.md`（共通ナレッジベース運用方法の解説）

### 理由
- AGENTS.mdを共通ナレッジベースとして運用する方法をブログ記事として公開

---

## 2026-01-26 (3)

### 変更内容
- AGENTS.md: 共通ナレッジベース化（プロジェクト概要・コマンドを追加）
- CLAUDE.md: シンプル化（AGENTS.mdを読むように指示するだけに変更）

### 理由
- Claude Code / Codex CLI / Gemini CLIで共通のナレッジベースを使用するため
- CLAUDE.mdはClaude Code専用、AGENTS.mdは全CLI共通

---

## 2026-01-26 (2)

### 変更内容
- AGENTS.md: 過去の全インシデント（14件）の原因と再発防止策を追加
- AGENTS.md: 問題発生時の対応ルールを冒頭に追加
- AGENTS.md: 変更時のCHANGELOG.md追記ルールを追加
- CHANGELOG.md: 新規作成

### 理由
- 過去の問題から学び、同じ問題の再発を防止するため
- 変更履歴を追跡可能にするため

---

## 2026-01-26

### 変更内容
- 記事追加: `2026-01-26-jekyll-url-slug-collision.md`（URLスラッグ衝突問題の解説）
- 記事追加: `2026-01-26-ai-trends-january-week4.md`（AIトレンド記事）
- ファイルリネーム: `2026-01-26-ai-trends-2026.md` → `2026-01-26-ai-trends-january-week4.md`
- CLAUDE.md: 新規作成
- AGENTS.md: 新規作成

### 理由
- URLスラッグの衝突を解消するためファイル名を変更
- 問題の原因と対策をブログ記事として公開
- AIエージェント向けの運用ルールを整備

---

## 変更履歴の書き方

新しい変更は**ファイルの先頭**に追加してください。

```markdown
## YYYY-MM-DD

### 変更内容
- 変更1の概要
- 変更2の概要

### 理由
- なぜこの変更を行ったか
```
