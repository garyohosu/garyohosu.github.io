#!/usr/bin/env bash
# daily-ainews.sh - 毎日6時に実行するAIニュース記事自動生成スクリプト
#
# cron設定例:
#   0 6 * * * /home/user/garyohosu.github.io/scripts/daily-ainews.sh
#
# API キーは /home/user/.env に書いておく（後述）

set -euo pipefail

REPO_DIR="/home/user/garyohosu.github.io"
LOG_DIR="$REPO_DIR/logs"
LOG_FILE="$LOG_DIR/ainews-$(date +%Y-%m-%d).log"
CLAUDE_BIN="/opt/node22/bin/claude"
NODE_BIN="/opt/node22/bin/node"

# ---- 環境変数読み込み ----
# /home/user/.env に以下を記載しておくこと:
#   ANTHROPIC_API_KEY=sk-ant-...
#   OPENAI_API_KEY=sk-...
ENV_FILE="/home/user/.env"
if [ -f "$ENV_FILE" ]; then
  # shellcheck source=/dev/null
  set -a && source "$ENV_FILE" && set +a
fi

# ---- ログ初期化 ----
mkdir -p "$LOG_DIR"
exec >> "$LOG_FILE" 2>&1

echo "============================================"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] daily-ainews 開始"
echo "============================================"

# ---- 作業ディレクトリへ移動 ----
cd "$REPO_DIR"

# ---- main ブランチに切り替えて最新を取得 ----
git checkout main
git pull --rebase origin main

# ---- API キー確認 ----
if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "[ERROR] ANTHROPIC_API_KEY が設定されていません。$ENV_FILE を確認してください。"
  exit 1
fi

# ---- ainews スキル実行（記事＋画像を生成） ----
echo "[$(date '+%H:%M:%S')] Claude Code で ainews スキルを実行中..."

"$CLAUDE_BIN" -p "/ainews. 記事作成後、必ず CHANGELOG.md にも本日分のエントリを追記すること。git操作は不要。" \
  --permission-mode bypassPermissions

echo "[$(date '+%H:%M:%S')] ainews スキル完了"

# ---- 生成されたファイルをコミット ----
git add _posts/ assets/img/ CHANGELOG.md 2>/dev/null || true

if git diff --cached --quiet; then
  echo "[$(date '+%H:%M:%S')] 新規コミット対象なし。スキップ。"
  exit 0
fi

TODAY=$(date +%Y-%m-%d)
git commit -m "auto: daily AI news $TODAY"

# ---- main へプッシュ ----
echo "[$(date '+%H:%M:%S')] origin/main へプッシュ中..."
git push -u origin main

echo "[$(date '+%H:%M:%S')] プッシュ完了 → GitHub Pages ビルド開始"

# ---- プッシュ後確認 ----
echo "[$(date '+%H:%M:%S')] プッシュ後確認を実行中..."
"$NODE_BIN" "$REPO_DIR/scripts/ai-post-push-check.mjs" || true

echo "[$(date '+%H:%M:%S')] daily-ainews 完了"
