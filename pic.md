# pic.md - ブログ記事用 漫画イラスト生成手順

記事の冒頭に掲載する漫画風イラストを画像生成APIで生成し、配置する。

⚠️ **2026-07-30時点の注意**: `dall-e-3` モデルはOpenAI側で廃止済み（`The model 'dall-e-3' does not exist.` エラーになる）。以降は `gpt-image-1` を使用すること。モデル関連エラーが出た場合は `curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"` で現存モデル名を確認する。

---

## 1. 画像生成（gpt-image-1 API）

### MCP経由（次回セッション以降）

`dalle-image` MCPが設定済みなら `text-to-image` ツールで直接生成できる（内部モデルが廃止されていないか要確認）。

### API直接呼び出し（MCPが使えない場合）

環境変数 `OPENAI_API_KEY` が設定されていることを前提とする。
`gpt-image-1` は `response_format` パラメータを受け付けず、常に `b64_json` でレスポンスが返る点に注意。

```bash
curl -s https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "<プロンプト>",
    "n": 1,
    "size": "1536x1024",
    "quality": "high"
  }' -o /path/to/scratchpad/response.json
```

レスポンスの `data[0].b64_json` をデコードして保存（Node.jsの例）:

```bash
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/path/to/scratchpad/response.json', 'utf8'));
fs.writeFileSync('assets/img/<ファイル名>.png', Buffer.from(data.data[0].b64_json, 'base64'));
"
```

---

## 2. 標準プロンプト（漫画風サムネイル）

記事の内容に合わせて Composition セクションのキャラ設定や表情を変更する。

```
Create a professional Japanese manga-style full-color illustration.

Canvas:
16:9 horizontal, high resolution.

Art style:
Japanese shonen manga cover illustration.
Thick clean outer lineart.
Thin inner lineart.
Anime cel shading with exactly two shadow levels.
Sharp, clean, professional line quality.
Vivid colors.
Flat anime coloring.
NOT realistic.
NOT 3D.
NOT painterly.

Composition:

Left side:
Cute purple robot.
Confident expression.
Pointing pose.

Right side:
Yellow humanoid character.
Surprised and nervous expression.
Sweat drop.
Hands raised.

Speech bubbles:
Two speech bubbles.
EMPTY.
NO TEXT.

Background:
Night gradient blue to dark blue.
Subtle stars.
Manga speed lines.
Focus lines.

Important:
No text.
No letters.
No logo.
No watermark.

Professional manga quality.
Blog thumbnail quality.
```

### カスタマイズのヒント

| 変更したい要素 | プロンプト修正箇所 |
|---|---|
| キャラの表情 | Composition の expression を変更（例: excited, thoughtful, angry） |
| ポーズ | Pointing pose → Thumbs up pose, Crossed arms など |
| 背景の雰囲気 | Background セクション（例: Sunrise gradient orange to yellow） |
| キャラ数 | Composition に Center: ... を追加で3キャラ化 |
| テーマカラー | purple robot → blue robot など色名を変更 |

---

## 3. ファイル命名規則

```
assets/img/ai-news-manga-YYYY-MM-DD.png
```

---

## 4. 記事への埋め込み

記事のフロントマター直後、導入セクションの前に配置する:

```markdown
---
(フロントマター)
---

## 今週のAIニュース漫画

![今週のAIニュース漫画](/assets/img/ai-news-manga-YYYY-MM-DD.png)

---

## 導入：...
```

---

## 5. パラメータ参考

| パラメータ | 推奨値 | 備考 |
|---|---|---|
| model | `gpt-image-1` | `dall-e-3` は廃止済み（2026-07-30時点） |
| size | `1536x1024` | 16:9に近い横長、ブログサムネイルに最適 |
| quality | `high` | 詳細な線画が必要なため |
| response_format | （指定しない） | `gpt-image-1` は常に `b64_json` を返す。指定するとエラーになる |

---

## 6. 注意事項

- `gpt-image-1` のレスポンスは `b64_json`（Base64）のみ。URLダウンロードではなくデコードして保存する。
- 生成画像は 1枚あたり約 3-5MB。リポジトリサイズに注意。
- テキスト描画が苦手なモデルが多いため、テキストは `NO TEXT` で排除し、必要なら後からSVGオーバーレイで追加する。
- 1回の生成で意図通りにならない場合は、プロンプトの Composition を具体的にして再生成する。
- 画像生成モデルはOpenAI側の都合で予告なく廃止・変更されることがある。生成エラーが出たら `curl https://api.openai.com/v1/models` で現存モデルを確認してから手順を更新する。
