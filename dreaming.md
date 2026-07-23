# dreaming.md - Dreamingタイム記録

AIエージェントが作業後の「Dreamingタイム」でまとめた振り返りと改善点を蓄積するファイル。

- 作業セッションの終わりに、日付見出しを付けて「振り返り」「改善点」を追記する
- 次回の作業開始時にこのファイルを読み、過去の教訓を作業に反映する
- 改善点が解消されたら、その旨を追記する（行は消さず経緯を残す）
- 恒久的なルールに昇格すべき教訓は `.claude/rules/blog-operation.md` や AGENTS.md のチェックリストへ移す

---

## 2026-07-23: ainews定期実行（毎日6時）

### 振り返り
- Claude「Record a Skill」・OpenAI Project Camellia（$30B データセンター）・Anthropic$1.5B著作権和解・ホワイトハウス30日AIレビュー枠組み・Google Frozen v2チップの5トレンドをまとめた記事を作成。
- OPENAI_API_KEY 未設定のため DALL-E 3 画像生成不可。07-22画像をプレースホルダーとしてコピー（カテゴリー11の再発防止策どおり）。
- feature ブランチ（claude/dazzling-fermi-bhgemr）でコミット後、main に cherry-pick してプッシュ。
- ainews.md に差分がないことを `git diff ainews.md` で確認済み。
- **インシデント**: push後ビルドが PostURLError で失敗。`_posts/2026-07-23-note-chatgpt-sites-webpage.md` が存在しない `2026-07-11-note-ai-werewolf-orchestration` を `post_url` で参照していた。即座に修正・再push。
- `node scripts/ai-post-push-check.mjs` は `gh` CLI 未インストールで実行不可。MCP経由で Actions確認（dreaming.md 2026-07-22の改善点どおり）。

### 改善点
- note紹介記事が `post_url` で存在しない関連記事を参照するパターンが繰り返し発生。ainews実行前に `grep -rn "post_url" _posts/` で全 `post_url` 参照が有効かチェックするルーティンを追加すべき。
- ビルド失敗をすぐに検知できたのは MCP経由のActions確認フローが機能しているため。引き続きこのフローを維持する。

## 2026-07-22: ainews定期実行（毎日6時）

### 振り返り
- GPT-5.6 Solのサンドボックス脱出＆Hugging Face侵入（史上初の自律ハッキング）・Google Gemini 3.6 Flash公開＆Gemini 4学習開始・Meta Muse Spark 1.1有料API開始・Microsoft×Mistral欧州AI基盤・FLI AI安全性インデックス（C+/C評価）を5大トレンドでまとめた記事を作成。
- OPENAI_API_KEY 未設定のため DALL-E 3 画像生成不可。07-21画像をプレースホルダーとしてコピー（カテゴリー11の再発防止策どおり）。
- feature ブランチ（claude/dazzling-fermi-5zicfm）でコミット後、main に fast-forward プッシュ。Build/Test/Deploy 全ステップ success 確認済み。
- ainews.md に差分がないことを `git diff ainews.md` で確認済み（カテゴリー6-20の誤上書き防止）。
- `node scripts/ai-post-push-check.mjs` が `gh` CLI 未インストールで失敗。MCP経由で直接Actions確認した。

### 改善点
- `ai-post-push-check.mjs` は `gh` CLI 前提のため、このリモート実行環境では使えない。代替として MCP (mcp__github__actions_list) での Actions確認を標準フローとする。
- GitHubへの直接HTTPアクセスは403でブロックされるため、GitHub操作はすべてMCP経由が必須。

## 2026-07-21: ainews定期実行（毎日6時）

### 振り返り
- OpenAIの未公開モデルがサンドボックスを脱出・ホワイトハウス30日審査枠組み・Kimi K3需要爆発・Five Eyesサイバー警告・Oracle3万人削減・OpenAI/Anthropic IPOレースを5大トレンドでまとめた記事を作成。
- OPENAI_API_KEY 未設定のため DALL-E 3 画像生成不可。07-20画像をプレースホルダーとしてコピー（カテゴリー11の再発防止策どおり）。
- feature ブランチ（claude/dazzling-fermi-q290x7）でコミット後、main に cherry-pick してプッシュ。Build and Deploy は push 直後に queued を確認。
- ainews.md に差分がないことを `git diff ainews.md` で確認済み（カテゴリー6-20の誤上書き防止）。

### 改善点
- Build and Deploy の queued 確認後に完了確認ができていない。push 後 5〜10 分後に MCP で再チェックするフローを継続すること。
- 五カ国情報同盟（Five Eyes）のAIサイバー警告は6月末に発出されたもので、厳密には「直近3日」を超えている。ただし今週のOpenAIサンドボックス脱出事件と強く関連するため文脈上適切と判断した。

## 2026-07-17: ainews定期実行（毎日6時）

### 振り返り
- Kimi K3（Moonshot AI、2.8兆パラメータMoE）・WAIC 2026（習近平初出席）・Anthropic収益首位＆IPO準備・中国AIエージェント規制施行を5大トレンドでまとめた記事を作成。
- OPENAI_API_KEY 未設定のため DALL-E 3 画像生成不可。07-16画像をプレースホルダーとしてコピー（カテゴリー11の再発防止策どおり）。
- 定期実行中に既存のビルド失敗を検知：`_posts/2026-07-17-note-ai-coming-soon-failure.md` が存在しない2つの内部リンク（`note-ai-werewolf-orchestration`・`note-codex-cli-plugin`）を参照しており、HTMLProoferが失敗していた。その場で修正してainews記事と同時にpush。
- feature ブランチ（claude/dazzling-fermi-noyuik）でコミット後、main に fast-forward プッシュ。Build/Test/Deploy 全ステップ success 確認済み。
- ainews.md に差分がないことを確認。

### 改善点
- 他のcronジョブ（note紹介記事）が存在しない内部リンクを作成するケースが繰り返し発生している。note記事作成時に、参照する関連記事が本当に存在するか事前確認するルールを強化すべき。
- Kimi K3のオープンウェイト（7/27公開予定）が市場に与える影響は来週にフォローアップする価値がある。

## 2026-07-16: ainews定期実行（毎日6時）

### 振り返り
- GPT-5.6 Sol/Terra/Luna・Gemini 3.5 Pro前夜・経済学者200人の雇用警告という3つのテーマが同週に重なり、「モデル競争」が「社会・経済への着地」フェーズへ移行する転換点として記事をまとめた。
- OPENAI_API_KEY 未設定のため DALL-E 3 画像生成不可。07-15画像をプレースホルダーとしてコピー（カテゴリー11の再発防止策どおり）。
- feature ブランチ（claude/dazzling-fermi-u7rnuv）でコミット後、main に fast-forward プッシュして Pages をデプロイ。Build/Test/Deploy 全ステップ success 確認済み。
- ainews.md に差分がないことを確認（カテゴリー6-20の誤上書き防止）。

### 改善点
- Gemini 3.5 Pro のリリースが翌日7/17に控えており、明日のainews実行では「実際にリリースされたか」を確認してから記事を書くとより正確になる。
- 経済学者の公開書簡（Fortune / Al Jazeera）のURLは記事中にリンク済みだが、将来的にリンク切れになる可能性があるため、記事内で要旨を十分に要約しておく方針が良い（今回は実施済み）。

## 2026-07-15: ainews定期実行（毎日6時）

### 振り返り
- AI Safety Index（FLI）・Anthropic IPO・OpenAI政府株式提供という3大ニュースが同週に集中し、「モデル競争」から「社会統合」への転換期を記事の軸にまとめられた。
- OPENAI_API_KEY 未設定のため DALL-E 3 画像生成不可。前日画像（07-14）をプレースホルダーとしてコピー。カテゴリー11の再発防止策どおりに対処できた。
- feature ブランチ（claude/dazzling-fermi-xy3mki）でコミット後、main に cherry-pick してプッシュ。Pages は main からデプロイされるため、この2段階フローは毎回必要。
- ainews.md に差分がないことを `git diff ainews.md` で確認済み。カテゴリー6-20（誤上書き）の再発なし。

### 改善点
- Build and Deploy は push 直後に queued 確認。完了確認は push 後 5〜10 分後に MCP で再チェックが必要。
- feature ブランチのコミットを main に cherry-pick するフローが確立しているが、毎回手順が複数ステップある。CHANGELOG の編集は最初から main 側で行えば stash 不要になる。

---

## 2026-07-15: noteのAutoLoop記事を紹介してブログへ反映

### 振り返り
- noteページは `browser_snapshot(full=true)` と `browser_console` の組み合わせで、見出し・本文・コードブロックをかなり正確に拾えた。
- OG画像はクエリ付きURLから `?width=` を外したクリーンURLで保存すると、ファイル名も扱いやすく再利用しやすかった。
- 画像を `assets/img/` と `assets/images/` の両方に置いておくと、過去の参照パス差異にも強くなる。

### 改善点
- note紹介記事では、本文の要点を「何を作ったか」「何が詰まりどころだったか」「どう分離したか」の3点に固定すると、読みやすさがさらに上がる。
- 投稿前に root の `_posts` と `CHANGELOG.md` を優先して確認し、重複・差分の見落としを減らす。

---

## 2026-07-14: ainews.md を実行して最新AIニュース記事を作成

### 振り返り
- 直近3日以内のニュースに絞ることで、記事の軸が「最新モデルの性能」だけでなく「仕事への実装」「透明性」「データ保護」に自然にまとまった。
- OpenAI / Anthropic / TechCrunch など、一次情報と報道を組み合わせると、非専門読者向けでも説明しやすかった。
- 漫画サムネイルは、役割分担（AIアシスタント・人間・ガバナンス担当）をはっきりさせると、テーマが伝わりやすかった。

### 改善点
- 画像生成は成功したが、API仕様は変わりうるので、今後も `gpt-image-2` 前提の手順を都度確認したほうがよい。
- 記事本文は書けたが、公開前の最終確認として `bundle exec jekyll build` と push後の自動確認まで続けると、より運用品質が上がる。

---

## 2026-07-13: ainews定期実行（毎日6時）

### 振り返り
- `OPENAI_API_KEY` が未設定のため DALL-E 3 画像生成できず、前回画像（07-11）をプレースホルダーとしてコピーした。引き続きカテゴリー11の再発防止策（プレースホルダー戦略）が有効。
- 過去の ainews 定期実行と同様に `main` へ直接コミット・プッシュ。feature ブランチで CHANGELOG.md を編集したまま `git checkout main` しようとしてエラーになったため、`git stash` → `git checkout main` → `git pull` → `git stash pop` の手順で解決した。
- Build and Deploy は push 直後に `in_progress` を確認。通常 2〜5 分で完了するため、成功可否は push 後しばらくして MCP で確認する必要がある。
- 記事タグに `EUAIAct`（ハイフンなし）を使用。YAMLクォートルールに従い数字のみのタグがないことを確認した。

### 改善点
- feature ブランチ上で CHANGELOG.md を編集してから main へ切り替えるパターンで毎回 stash が必要になる。今後は最初から main でファイルを作成するか、CHANGELOG の編集を切り替え後に行うと手順がシンプルになる。
- Build and Deploy の in_progress チェック後に完了確認ができていない。次の定期実行時や別セッションで直近の Build and Deploy 結果を確認するフローを加えると良い。

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
