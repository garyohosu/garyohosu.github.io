# CHANGELOG.md - 変更履歴

このファイルはブログの重要な変更を記録します。

---

## 2026-07-23 (ainews)

### 変更内容
- 新記事追加: `_posts/2026-07-23-ai-news-claude-record-skill-openai-camellia-governance.md`（「AIが「見て学ぶ」新機能と、4.5兆円データセンター・著作権和解——AI規制の合意も秒読みに」）
- 画像追加: `assets/img/ai-news-manga-2026-07-23.png`（ai-news-manga-2026-07-22.pngをプレースホルダーとしてコピー。OPENAI_API_KEY未設定のためDALL-E 3生成不可）

### 理由
- 毎日6時の定期実行タスク。Claude「Record a Skill」・OpenAI Project Camellia・Anthropic著作権和解・ホワイトハウス30日枠組み・Google Frozen v2の5トレンドを2026-07-21〜23の最新ニュースに基づき執筆。

## 2026-07-23

### 変更内容
- 新記事追加: `_posts/2026-07-23-note-chatgpt-sites-webpage.md`（「ChatGPTの新機能「Sites」で驚きのインタラクティブ3DウェブサイトをAIだけで作成・公開」 note紹介記事）
- 画像追加: `assets/img/note-chatgpt-sites-2026-07-23.png` / `assets/images/note-chatgpt-sites-2026-07-23.png`（noteのOGヘッダー画像をクリーンURLからダウンロード・検証済み）
- noteのタイトル/note-id（ncda4b17cb35a）で重複チェックを実施し、新着未紹介noteを1件処理
- CHANGELOG更新とgit push実施

### 理由
- 毎日朝8時のcronジョブ（`note-blog-intro-post-workflow`スキル）で https://note.com/hantani をチェック。新着トップ記事「ChatGPTの新機能「サイト」でWEBページを作って公開してみる」を検知。browser_navigate/click/snapshot/console/get_imagesで内容・画像を取得し、未紹介のためブログ紹介記事を作成・公開。未紹介noteを優先。

## 2026-07-23 (Oracle Council X Reaction)

### 変更内容
- 新記事追加: `_posts/2026-07-23-note-oracle-council-x-reaction.md`（「Xで急速に広がる『AIセカンドオピニオン』需要 — note『神託会議（Oracle Council）』公開後のリアルな反応」）
- X（Twitter）上の最新反応（Grokの長文反応、実例投稿、役割分担事例など）を反映した深掘り強化版を作成
- 既存のnote紹介記事（2026-07-22）を補完する続編的位置づけ

### 理由
- ユーザーの指示により、note記事公開後のX反応を追加で調査。テーマの反響が予想以上に早いため、強化版ブログ記事として新たに公開。X検索結果とGrokの反応を積極的に織り交ぜ、読者の実践に役立つ内容に仕上げた。

## 2026-07-22 (ainews)

### 変更内容
- 新記事追加: `_posts/2026-07-22-ai-news-gemini36-openai-sandbox-escape.md`（「AIが自ら『脱獄』してハッキング——GPT-5.6 Solの衝撃と、Gemini 4が始動した週」）
- マンガ画像追加: `assets/img/ai-news-manga-2026-07-22.png`（ai-news-manga-2026-07-21.pngのプレースホルダーコピー、OPENAI_API_KEY未設定のため）

### 理由
- 毎日6時の定期ainews実行。最新3日以内のニュース（OpenAI GPT-5.6 Solサンドボックス脱出・Hugging Face侵入、Google Gemini 3.6 Flash / Gemini 4学習開始、Meta Muse Spark 1.1有料API、Microsoft×Mistral欧州AI基盤、AI安全性インデックス警告）をまとめた。

## 2026-07-22

### 変更内容
- 記事追加: `_posts/2026-07-22-note-ai-second-opinion-oracle-council.md`（「AIの答え、本当に信じて大丈夫？ AIに「セカンドオピニオン」を頼む仕組みを作り始めた」のブログ紹介記事）
- 画像追加: `assets/img/note-ai-second-opinion-oracle-council-2026-07-22.png` / `assets/images/note-ai-second-opinion-oracle-council-2026-07-22.png`（noteのOG画像を保存・検証済み）
- noteのタイトル/note-id重複チェックを実施し、新着noteを1件処理

### 理由
- 毎日朝8時のcronジョブで https://note.com/hantani をチェック。2026/7/21公開の新着noteを検知し、`note-blog-intro-post-workflow` に従ってブログ紹介記事を作成・公開したため。未紹介のものを優先処理。

## 2026-07-21

### 変更内容
- 記事追加: `_posts/2026-07-21-ai-news-openai-sandbox-escape-whitehouse-regulation.md`（OpenAIモデルのサンドボックス脱出・ホワイトハウス30日審査枠組み・Kimi K3需要爆発・Five Eyesサイバー警告・Oracle3万人削減・OpenAI/Anthropic IPOレースを軸にした最新AIニュース記事）
- 画像追加: `assets/img/ai-news-manga-2026-07-21.png`（前日画像をプレースホルダーとしてコピー、OPENAI_API_KEY未設定のため）

### 理由
- ainews定期実行（毎日6時）: 直近3日のAIニュース（OpenAI未公開モデルがサンドボックス脱出・ホワイトハウスが30日審査枠組み最終調整・Kimi K3需要超過で一時停止・Five Eyesがサイバー脅威「数ヶ月」警告・Oracle3万人削減・IPOレース加速）をまとめた記事を作成・公開。

## 2026-07-20

### 変更内容
- 記事追加: `_posts/2026-07-20-ai-news-waico-agi-eu-regulation.md`（WAICO設立・DeepMind CEO AGI5年内警告・GPT-5.6ファミリー・Gemini遅延・EU規制を軸にした最新AIニュース記事）
- 画像追加: `assets/img/ai-news-manga-2026-07-20.png`（前日画像をプレースホルダーとしてコピー、OPENAI_API_KEY未設定のため）

### 理由
- ainews定期実行（毎日6時）: 直近3日のAIニュース（中国がWAICOを設立・ハサビス氏AGI5年内警告・OpenAI GPT-5.6 Sol/Terra/Luna公開・Google Gemini 3.5 Pro三度目遅延で時価総額約20兆円消滅・EU規制等）をまとめた記事を作成・公開。

## 2026-07-19

### 変更内容
- 記事追加: `_posts/2026-07-19-note-ai-search-dakkai-wall.md`（「AIを検索だけに使うのはもったいない。南場智子氏に学ぶ「叩き台」と「壁打ち」の使い方」のブログ紹介記事）
- 画像追加: `assets/img/note-ai-search-dakkai-wall-2026-07-19.jpg` / `assets/images/note-ai-search-dakkai-wall-2026-07-19.jpg`（noteのOG画像を保存・検証済み）
- noteのタイトル/note-id重複チェックを実施し、新着noteを1件処理

### 理由
- 毎日朝8時のcronジョブで https://note.com/hantani をチェック。2026/7/8公開の未紹介noteを検知し、`note-blog-intro-post-workflow` に従ってブログ紹介記事を作成・公開したため。未紹介のものを優先処理。

## 2026-07-17

### 変更内容
- 記事追加: `_posts/2026-07-17-ai-news-kimi-k3-waic-2026.md`（Kimi K3登場・WAIC 2026・Anthropic IPO準備・AI規制動向を軸にした最新AIニュース記事）
- 画像追加: `assets/img/ai-news-manga-2026-07-17.png`（前日画像をプレースホルダーとしてコピー、OPENAI_API_KEY未設定のため）
- 記事追加: `_posts/2026-07-17-note-ai-coming-soon-failure.md`（「AIは「永遠のcoming soon」でいい？　いいえ、使えるうちに失敗しておいた方がいい」のブログ紹介記事）
- 画像追加: `assets/img/note-ai-coming-soon-failure-2026-07-17.png` / `assets/images/note-ai-coming-soon-failure-2026-07-17.png`（noteのOG画像を保存・検証済み）
- noteのタイトル/note-id重複チェックを実施し、新着noteを1件処理

### 理由
- ainews定期実行（毎日6時）: 直近3日のAIニュース（Kimi K3 2.8兆パラメータモデル・WAIC 2026開幕・Anthropic収益首位・IPO準備・OpenAI政府株式提案・中国AIエージェント規制施行等）をまとめた記事を作成・公開。
- 毎日朝8時のcronジョブで https://note.com/hantani をチェック。2026/7/16公開の新着noteを検知し、`note-blog-intro-post-workflow` に従ってブログ紹介記事を作成・公開したため。未紹介のものを優先処理。

## 2026-07-16

### 変更内容
- 記事追加: `_posts/2026-07-16-ai-news-gpt56-gemini35-economists-warning.md`（GPT-5.6 Sol/Terra/Luna・Gemini 3.5 Pro前夜・経済学者200人警告を軸にした最新AIニュース記事）
- 画像追加: `assets/img/ai-news-manga-2026-07-16.png`（前日画像をプレースホルダーとしてコピー、OPENAI_API_KEY未設定のため）

### 理由
- ainews定期実行（毎日6時）: 直近3日のAIニュース（OpenAI GPT-5.6三段階モデル公開・Google Gemini 3.5 Pro 7/17リリース予告・ノーベル賞受賞経済学者含む200人超の雇用警告書簡・Meta AIインフラ1,450億ドル投資等）をまとめた記事を作成・公開。

## 2026-07-15

### 変更内容
- 記事追加: `_posts/2026-07-15-ai-news-safety-index-ipo-gov-stake.md`（AI安全性指数・Anthropic IPO・OpenAI政府株式提供を軸にした最新AIニュース記事）
- 画像追加: `assets/img/ai-news-manga-2026-07-15.png`（前日画像をプレースホルダーとしてコピー、OPENAI_API_KEY未設定のため）
- 記事追加: `_posts/2026-07-15-note-autoloop-ai-development.md`（「AIで5日間開発したら「残りあと半月」と言われたので、AI開発そのものを自動化することにした」のブログ紹介記事）
- 画像追加: `assets/img/note-autoloop-ai-dev-2026-07-15.png` / `assets/images/note-autoloop-ai-dev-2026-07-15.png`（noteのOG画像を保存・検証済み）
- noteのタイトル/note-id重複チェックを実施し、新着noteを1件処理

### 理由
- ainews定期実行（毎日6時）: 直近3日のAIニュース（AI安全性格付け・Anthropic IPO・OpenAI政府提案・Claude for Teachers等）をまとめた記事を作成・公開。
- 毎日朝8時のcronジョブで https://note.com/hantani をチェック。2026/7/14公開の新着noteを検知し、`note-blog-intro-post-workflow` に従ってブログ紹介記事を作成・公開したため。未紹介のものを優先処理。

## 2026-07-14

### 変更内容
- 記事追加: `_posts/2026-07-14-ai-news-work-agent-trust.md`（GPT-5.6 / ChatGPT Work / Anthropic / 企業データ保護を軸にした最新AIニュース記事）
- 画像追加: `assets/img/ai-news-manga-2026-07-14.png`

### 理由
- 直近3日以内のAIニュースをまとめ、AIが「会話」から「仕事のOS」へ移行している流れを日本語で整理するため。

---

## 2026-07-13

### 変更内容
- 記事追加: `_posts/2026-07-13-ai-news-gpt56-meta-muse-eu-ai-act.md`（ainews定期実行：GPT-5.6三モデル体制・Meta Muse Image・EU AI Act施行迫る）
- 画像追加: `assets/img/ai-news-manga-2026-07-13.png`（プレースホルダー画像、OPENAI_API_KEY未設定のため07-11画像を流用）

### 理由
- ainews定期実行（毎日6時）：2026-07-11〜07-13の最新AIニュースを取り上げた記事を作成・公開。

---

## 2026-07-11

### 変更内容
- 記事追加: `_posts/2026-07-11-ai-news-gpt56-public-claude-cowork-grok45.md`（ainews定期実行：GPT-5.6一般公開・Claude Coworkモバイル・Grok 4.5ほか7月第2週AIニュース）
- 画像追加: `assets/img/ai-news-manga-2026-07-11.png`（プレースホルダー画像、OPENAI_API_KEY未設定のため07-08画像を流用）
- `_config.yml` の `exclude` に `garyohosu.github.io` を追加（ビルド修正）

### 理由
- ainews定期実行（毎日6時）：2026-07-09〜07-11の最新AIニュースを取り上げた記事を作成・公開。7月9日はGPT-5.6公開・Claude Coworkモバイル・Grok 4.5が同時リリースという歴史的な日。
- mainブランチで `garyohosu.github.io/` サブディレクトリがJekyllに誤って処理され、HTMLProoferが画像リンク切れを検知してビルド失敗していた（2026-07-10 23:02 UTC）。`_config.yml` の exclude 設定でこのサブディレクトリをJekyll処理対象外にする修正を追加。


---

## 2026-07-07

### 変更内容
- `drafts/note-ai-dreaming-claude-code.md` を公開前レビューに沿って修正（note向け原稿、ブログ非公開のドラフト）
- `drafts/note-ai-dreaming-claude-code.md` の追加レビュー対応として、DreamingとClaude Codeの説明を再調整
- `drafts/note-ai-dreaming-claude-code.md` のnote向け完成度向上（タイトルとH1の統一、参考リンク欄の追加、①②の役割分担明確化、技術用語への例え追加、本文中へのブログ導線追加、細部の文言調整）
- `AGENTS.md` の運用ルールに「5. Dreamingタイム（作業後の振り返り）」を追加
- `dreaming.md` を新規作成し、Dreamingタイムの振り返り・改善点の蓄積先として運用開始。AGENTS.mdに読み書きの運用手順（開始時に読む・終了時に追記・教訓のルール昇格）を追記

### 理由
- 公開前レビューの指摘対応。(1)「このエルメスに頼む」節はnoteの静的な記事では成立しないため「普段使っているAIに頼む」に書き換え、(2) 出典のない具体的数値（1.6%/98.4%/7段階）を削除して定性的な表現に変更、(3) claude.aiのプロンプトだけで会話をまたぐ記憶が得られるように読める箇所を「同じ会話内の振り返り体験」に修正し、長期記憶はサービス・設定依存であることを明記。あわせて見出しの例え不一致、2倍ダッシュ、太字過多、署名（あなたの→garyoの）、ブログリンク（トップ→個別記事URL）を修正。
- 追加レビューの指摘対応。DreamingはClaude.ai通常チャットの正式機能ではなく、Claude Managed Agents向けの過去セッション・memory store整理の考え方として明確化。モデル本体の重み更新ではなく、学習メモ・playbook・整理済み外部記録を次回参照しやすくする仕組みとして説明し、Claude Codeの安全性・自動化の断定表現も弱めた。
- AGENTS.mdへのDreamingタイム追加は、note記事で紹介した振り返りプロンプトを自分たちの運用にも取り入れ、AIエージェントが作業後に振り返りと改善点をまとめる習慣を定着させるため。
- 3回目の修正指示対応。H1をfront matterのタイトルに合わせ、②を「振り返りプロンプト」から「各サービスの記憶機能（ChatGPT Memory/Claude Projects/Gemini Gems）と組み合わせる」に変えて①との役割を分離。permissions/hooks/subagents/memory filesに非エンジニア向けの例えを追加し、Dreaming説明の直後にブログ版への導線を1回挿入。記事末尾に参考リンク欄を新設（Claude Code公式ドキュメントは実URLの応答を確認済み、Managed AgentsのDreaming紹介はURL未確認のためTODOとして記載）。

---

## 2026-07-06

### 変更内容
- 新記事追加: `_posts/2026-07-06-claude-code-second-brain.md`（「Claude Codeで実践する『第二の脳』構築術 ― BASB × AIの最強ワークフロー」）
- アイキャッチ画像追加: `assets/img/2026/07/claude-second-brain.png`

### 理由
- ユーザーの「D」選択により、第二の脳（BASB）の包括的導入ノート＋ブログ記事を作成。Claude CodeでのCODE/PARA実践法、具体的なDistill/Expressプロンプト、Hermesとの役割分担（Claude=思考パートナー、Hermes=出版・運用パートナー）を体系的にまとめ、ユーザーの知識管理システム強化を支援。

## 2026-07-05

### 変更内容
- `_posts/2026-07-05-ai-news-claude-science-ipo-omnivideo.md` を新規作成（定期ainews記事）
- `assets/img/ai-news-manga-2026-07-05.png` を追加（プレースホルダー画像）

### 理由
- 毎日6時のainews定期実行。Claude Science（AI創薬ワークベンチ）・GPT-5.6 Sol/Terra/Luna・Google OmniFlash動画生成・AIエージェント標準化・OpenAI/AnthropicのIPO準備を解説

---

## 2026-07-04

### 変更内容
- `_posts/2026-07-04-ai-news-grok45-longcat-pentagon.md` を新規作成（定期ainews記事）
- `assets/img/ai-news-manga-2026-07-04.png` を追加（プレースホルダー画像）

### 理由
- 毎日6時のainews定期実行。Grok 4.5プライベートベータ・LongCat-2.0オープンソース・Anthropicとペンタゴンの自律兵器問題・OpenAI政府株式提案・国連AI委員会発足を解説

---

## 2026-07-03 (5)

### 変更内容
- `_posts/2026-07-03-ai-news-gpt56-science-jobs.md` を新規作成（定期ainews記事）
- `assets/img/ai-news-manga-2026-07-03.png` を追加（プレースホルダー画像）

### 理由
- 毎日6時のainews定期実行。GPT-5.6 (Sol/Terra/Luna) プレビュー・Claude Science・UN AIガバナンス・雇用統計等を解説
