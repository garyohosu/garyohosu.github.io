# CHANGELOG.md - 変更履歴

このファイルはブログの重要な変更を記録します。

---

## 2026-07-07

### 変更内容
- `drafts/note-ai-dreaming-claude-code.md` を公開前レビューに沿って修正（note向け原稿、ブログ非公開のドラフト）
- `drafts/note-ai-dreaming-claude-code.md` の追加レビュー対応として、DreamingとClaude Codeの説明を再調整
- `drafts/note-ai-dreaming-claude-code.md` のnote向け完成度向上（タイトルとH1の統一、参考リンク欄の追加、①②の役割分担明確化、技術用語への例え追加、本文中へのブログ導線追加、細部の文言調整）

### 理由
- 公開前レビューの指摘対応。(1)「このエルメスに頼む」節はnoteの静的な記事では成立しないため「普段使っているAIに頼む」に書き換え、(2) 出典のない具体的数値（1.6%/98.4%/7段階）を削除して定性的な表現に変更、(3) claude.aiのプロンプトだけで会話をまたぐ記憶が得られるように読める箇所を「同じ会話内の振り返り体験」に修正し、長期記憶はサービス・設定依存であることを明記。あわせて見出しの例え不一致、2倍ダッシュ、太字過多、署名（あなたの→garyoの）、ブログリンク（トップ→個別記事URL）を修正。
- 追加レビューの指摘対応。DreamingはClaude.ai通常チャットの正式機能ではなく、Claude Managed Agents向けの過去セッション・memory store整理の考え方として明確化。モデル本体の重み更新ではなく、学習メモ・playbook・整理済み外部記録を次回参照しやすくする仕組みとして説明し、Claude Codeの安全性・自動化の断定表現も弱めた。
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
