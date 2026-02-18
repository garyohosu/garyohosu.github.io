# pic.md - ブログ記事用 漫画イラスト生成手順

記事の冒頭に掲載する漫画風イラストを DALL-E 3 API で生成し、配置する。

---

## 1. 画像生成（DALL-E 3 API）

### MCP経由（次回セッション以降）

`dalle-image` MCPが設定済み。`text-to-image` ツールで直接生成できる。

### API直接呼び出し（MCPが使えない場合）

環境変数 `OPENAI_API_KEY` が設定されていることを前提とする。

```bash
curl -s https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "<プロンプト>",
    "n": 1,
    "size": "1792x1024",
    "quality": "hd",
    "response_format": "url"
  }'
```

レスポンスの `data[0].url` から画像をダウンロード:

```bash
curl -sL "<生成されたURL>" -o "assets/img/<ファイル名>.png"
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
| model | `dall-e-3` | 高品質な漫画風に最適 |
| size | `1792x1024` | 16:9横長、ブログサムネイルに最適 |
| quality | `hd` | 詳細な線画が必要なため |
| response_format | `url` | URLからダウンロードする方式 |

---

## 6. 注意事項

- DALL-E 3 の URL は **2時間で失効** する。生成後すぐにダウンロードすること。
- 生成画像は 1枚あたり約 3-5MB。リポジトリサイズに注意。
- DALL-E 3 は指示に忠実だが **テキスト描画が苦手**。テキストは `NO TEXT` で排除し、必要なら後からSVGオーバーレイで追加する。
- 1回の生成で意図通りにならない場合は、プロンプトの Composition を具体的にして再生成する。
