# CHANGELOG.md - 変更履歴

このファイルはブログの重要な変更を記録します。

---

## 2026-07-09 (ainews 定期実行)

### 変更内容
- 記事追加: `_posts/2026-07-09-ai-news-gpt56-grok45-jspace.md`（AIニュース: GPT-5.6全公開・Grok 4.5・AnthropicのJ-space発見・中国AIシェア）
- 画像追加: `assets/img/ai-news-manga-2026-07-09.png`（直近画像をプレースホルダーとしてコピー。OPENAI_API_KEY 未設定のため）

### 理由
- 毎日6時の定期実行 ainews ルーティン。2026-07-09 は AI 史上初の複数フロンティアモデル同日公開日のため特筆すべき内容が多い。

---

## 2026-07-09 (note記事)

### 変更内容
- 記事追加: `_posts/2026-07-09-ai-namba-5-practical-methods.md`（非エンジニア向けに@masaki_aihack氏のX記事を基にした「AIを最強の判断相棒に変える5つの実践法」。プロンプト例を豊富に、超わかりやすい説明と今日から試せるTipsを追加。アイキャッチ画像生成・配置）
- 画像追加: `assets/img/ai-namba-5-methods.png`

### 理由
- Xで数百万ビューを記録した南場智子氏のAI活用論を、ユーザーの好みに合わせて「非エンジニアでも実践可能・プロンプト例満載」に翻訳。Hermes Agentとしてブログ運用を一気通貫（画像生成→執筆→差分確認→コミット）で実施するため。

---

## 2026-07-08

### 変更内容
- 記事追加: `_posts/2026-07-08-note-mugen-loop.md`（note紹介記事：私は何もしないループエンジニアになりたい。Claude Codeで「mugen-loop」を作る実験）
- 画像追加: `assets/img/note-mugen-loop-2026-07-08.png`（note OG/header画像）
- 記事追加: `_posts/2026-07-08-ai-news-fable5-paid-cursor-ios-eu-act.md`（ainews定期実行：Claude Fable 5有料化・Cursor iOS・EU AI Act施行間近ほか7月第2週AIニュース）
- 画像追加: `assets/img/ai-news-manga-2026-07-08.png`（プレースホルダー画像、OPENAI_API_KEY未設定のため前日画像を流用）

### 理由
- note.com/hantani に新着記事が公開されたため、ブログで紹介。未紹介の最新noteを優先して処理。mugen-loopの設計思想とreceipts（不作為ログ）の重要性、バーチャルカンパニー標準化の取り組みを広く共有するため。
- ainews定期実行（毎日6時）：2026-07-05〜07-08の最新AIニュースを取り上げた週次まとめ記事を作成・公開。

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
