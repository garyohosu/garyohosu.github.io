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
