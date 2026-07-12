# dreaming.md - Dreamingタイム記録

AIエージェントが作業後の「Dreamingタイム」でまとめた振り返りと改善点を蓄積するファイル。

- 作業セッションの終わりに、日付見出しを付けて「振り返り」「改善点」を追記する
- 次回の作業開始時にこのファイルを読み、過去の教訓を作業に反映する
- 改善点が解消されたら、その旨を追記する（行は消さず経緯を残す）
- 恒久的なルールに昇格すべき教訓は `.claude/rules/blog-operation.md` や AGENTS.md のチェックリストへ移す

---

## 2026-07-12: ainews定期実行（毎日6時）

### 振り返り
- `OPENAI_API_KEY` 未設定のため DALL-E 3 画像生成不可。07-11 画像を `ai-news-manga-2026-07-12.png` としてコピーするプレースホルダー戦略を継続。
- `node scripts/ai-post-push-check.mjs` は gh CLI 依存のためこの環境では失敗。`mcp__github__actions_list` で代替確認を実施した：最新 Build and Deploy は 2026-07-11 21:13 UTC に **success** で完了していることを確認。
- 今回はブランチ `claude/dazzling-fermi-2sn8gg` にプッシュしたため Pages デプロイは未トリガー。過去の定期実行は `main` に直接プッシュされていた（dreaming 07-08 の教訓と同じ）。merge または cherry-pick が別途必要。
- 記事のトピック選定は直近3日（7/10〜7/12）に絞れた。July 12 固有のニュース（Apple vs OpenAI 提訴、Gemini 3.5 Pro 7/17 予告）を掘り起こせたことで前日（07-11）記事との重複を最小化できた。

### 改善点
- 定期実行が feature ブランチに落ちる場合、Pages デプロイが起動しない。定期実行は `main` 直プッシュを許可するよう設定を変えるか、実行後に自動的に main へ cherry-pick する手順をルール化することを検討する。
- `ai-post-push-check.mjs` の gh CLI 依存を MCP に置き換えるスクリプト更新を検討（この環境では毎回 FAILED になるため、代替フローが定着してきたなら公式化する価値がある）。

---

## 2026-07-08: ainews定期実行（毎日6時）

### 振り返り
- `OPENAI_API_KEY` が未設定のため DALL-E 3 画像生成できず、前日画像をプレースホルダーとしてコピーした。画像なし運用は AGENTS.md カテゴリー11 の再発に当たるため、プレースホルダー戦略は引き続き有効。
- 直接 GitHub API（`https://api.github.com`）は 403 で遮断されており、`node scripts/ai-post-push-check.mjs`（gh CLI 依存）も実行不可。MCP `mcp__github__actions_list` でビルド状況を確認する代替フローが必要。
- 過去の ainews 定期実行はすべて `main` に直接コミットされていた（履歴確認済み）。feature ブランチからは Pages がデプロイされないため、cherry-pick して `main` にプッシュする必要がある。この判断は今後も同様。
- Build and Deploy が **success** で完了、記事 `/posts/2026-07-08-ai-news-fable5-paid-cursor-ios-eu-act/` が公開された。

### 改善点
- `node scripts/ai-post-push-check.mjs` が gh CLI 依存のため、このリモート環境では使えない。MCP ベースの代替チェック手順（`mcp__github__actions_list` で最新ランを確認）をルール化すると再確認が容易になる。
- `OPENAI_API_KEY` が設定されないセッション（定期実行）では DALL-E 3 が使えない。スケジュール実行時の画像生成方法（`dalle-image` MCP の有無確認 → なければプレースホルダー）を毎回の手順に明示しておく。

---

## 2026-07-07: note原稿「AI Dreaming」のレビューと公開前修正

### 振り返り
- note原稿のレビューでは、文章表現より先に「媒体で成立するか」（静的な記事なのに会話前提の節がある）という構造的な問題を見つけられたのが一番効果的だった。レビューは表現→構造の順ではなく、構造→表現の順で見る。
- 出典のない数値（1.6%/98.4%）や記憶機能の過剰約束など、読者の信頼を損ねる箇所を修正の最優先にする判断は、レビュー→修正指示→反映の3往復でぶれずに機能した。
- リンクは掲載前に実際にHTTPリクエストで生存確認する運用（ブログ個別URL、Claude Code docs）が有効だった。HEADが404でもGETで200を返すサイトがあるため、HEADで404でもGETで再確認する。

### 改善点
- 参考リンク欄の「Anthropic公式ブログ（Dreaming紹介）」がTODOのまま残っている。note公開前に実URLを確認して差し替えるか、行ごと削除する。
- ドラフト修正のような複数回の往復作業では、最初のレビュー時点で「note投稿時のMarkdown互換性（引用・コードブロックの表示）」まで含めて指摘できると、後の手戻りが減らせる。
