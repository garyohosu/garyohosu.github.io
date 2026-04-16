#!/bin/bash
# SessionStart hook for garyohosu.github.io
# Runs on every session start (new + resume) in remote environments.
set -euo pipefail

# ローカル環境では何もしない
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# ── 1. API キーの注入 ──────────────────────────────────────────
# .claude/secrets.env が存在すれば環境変数として読み込む
SECRETS_FILE="$CLAUDE_PROJECT_DIR/.claude/secrets.env"
if [ -f "$SECRETS_FILE" ]; then
  while IFS='=' read -r key value; do
    # コメント行・空行をスキップ
    [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
    echo "export ${key}=\"${value}\"" >> "$CLAUDE_ENV_FILE"
  done < "$SECRETS_FILE"
  echo "[session-start] secrets.env を読み込みました"
else
  echo "[session-start] WARNING: .claude/secrets.env が見つかりません"
  echo "[session-start] 次のコマンドで作成してください:"
  echo "  echo 'OPENAI_API_KEY=sk-proj-...' > .claude/secrets.env"
fi

# ── 2. Ruby / Jekyll 依存関係のインストール ──────────────────
if [ -f "Gemfile" ]; then
  echo "[session-start] bundle install を実行します..."
  bundle install --quiet
  echo "[session-start] bundle install 完了"
fi
