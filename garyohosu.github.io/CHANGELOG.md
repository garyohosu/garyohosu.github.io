# CHANGELOG.md - 変更履歴

このファイルはブログの重要な変更を記録します。

|---
|
|## 2026-07-11
|
|### 変更内容
|- 新記事追加: `_posts/2026-07-11-note-ai-werewolf-orchestration.md` （「4つのAI CLIにワンナイト人狼をさせたら、AIエージェントのオーケストレーションが見えてきた」のブログ紹介記事）
|- noteのheader画像を `assets/img/note-ai-werewolf-orchestration-2026-07-11.png` として保存・検証済み（684kB確認）
|- 重複チェック（search_filesでタイトル/note-id確認）とCHANGELOG更新を実施
|- git add/commit/push実行
|
|### 理由
|- 毎日朝8時のcronジョブで https://note.com/hantani をチェック。新着note（2026/7/10公開の「4つのAI CLIにワンナイト人狼...」）を検知し、`note-blog-intro-post-workflow` に従って自動でブログ紹介記事を作成・公開したため。未紹介のものを優先処理。
|
|## 2026-07-10
|
|### 変更内容
|- 新記事追加: `_posts/2026-07-10-note-codex-cli-plugin.md` （「Claude CodeからCodex CLIを呼べるOpenAI公式プラグインを試して見る」のブログ紹介記事）
|- noteのOG/header画像を `assets/img/note-codex-cli-plugin-2026-07-10.png` として保存・検証済み
|- CHANGELOG更新と重複チェックを実施（未紹介noteを優先）
|
|### 理由
|- 毎日朝8時のcronジョブで https://note.com/hantani をチェック。新着note（2026/7/9公開）を検知し、`note-blog-intro-post-workflow` に従って自動でブログ紹介記事を作成・公開したため。未紹介のものを優先処理。
|
|## 2026-05-27

### 変更内容
- 新記事追加: `_posts/2026-05-27-ai-from-smart-toy-to-real-work.md`（「AIってまだ「おもちゃ」だと思ってる？ 2026年は本気で「仕事に使い始めた」年になりました」）
- Xの最新動向（Pilot Purgatory、Gartner 40%予測、Suzanoの95%高速化、ClickUp 22%リストラ、Salesforceのpilot終了宣言など）を基に、非エンジニア向けに例え話（ロボット秘書チームなど）を多用してやさしく解説
- 以前のドラフトで指摘された混乱しやすい表現を修正し、客観的で読みやすい形に調整
- 画像は後ほど生成して追加予定（assets/img/ai-real-work-2026.png）

### 理由
- ユーザーのリクエストにより「AIの実務投入」テーマを非エンジニアでもわかりやすくブログで紹介するため。X検索で得たリアルな声をしっかり裏付けとして使用。

---

## 2026-05-22

### 変更内容
- 記事追加: `_posts/2026-05-22-ai-latest-trends-may-io.md`（AIニュース：「Gemini 3.5 & Omni」発表！Google I/O 2026から紐解く最新AIトレンドとセキュリティ動向）
- 記事追加: `_posts/2026-05-22-meta-8000-layoff.md`（「Metaが8000人クビ」素人向け解説記事）
- 画像追加: `assets/img/ai-news-manga-2026-05-22.png`（DALL-E 3生成漫画サムネイル）
- 画像追加: `assets/img/meta-8000-layoff-eyecatch.png`（OpenAI Codexで生成した衝撃的なアイキャッチ画像）

### 理由
- 2026年5月22日前後の最新AIニュースを定期記事として投稿
- X（旧Twitter）で話題のMeta 8000人解雇について、AIに詳しくない人でもわかるように詳しくまとめ、アイキャッチ画像も生成して公開したため

---

## 2026-05-21

### 変更内容
- 記事追加: `_posts/2026-05-21-note-antigravity-cli-hermesagent-grok-two-articles.md`（note紹介記事：noteに記事を2本公開しました（Antigravity CLI／HermesAgent・Grok））
- 記事削除: `_posts/2026-05-20-note-antigravity-cli-install.md`
- 記事削除: `_posts/2026-05-21-note-hermesagent-grok-update.md`
### 理由
- 2本のnote紹介を1記事に統合し、導線を整理したため

---

## 2026-05-20

### 変更内容
- 記事追加: `_posts/2026-05-20-note-antigravity-cli-install.md`（note紹介記事：Antigravity CLIインストールしてみる）
- 画像追加: `assets/img/2026-05-20-note-antigravity-cli-install.png`（note OGサムネイル）
- 記事追加: `_posts/2026-05-20-ai-latest-trends-may.md`（AIニュース：「AIエージェントの時代」本格到来？Googlebook・OpenAI新会社・iOS Extensionsなど最新トレンド解説）
- 画像追加: `assets/img/ai-news-manga-2026-05-20.png`（DALL-E 3生成漫画サムネイル）
### 理由
- noteに公開したAntigravity CLIのインストール・初期設定メモをブログに紹介したため
- 2026年5月中旬の最新AIニュースを定期記事として投稿（AIエージェントの本格実用化、OpenAIのデプロイ会社設立＆Tomoro買収、GoogleのGemini搭載PC『Googlebook』、AppleのiOS 27向けAI Extensions、米国CAISI安全性合意の拡大）

---