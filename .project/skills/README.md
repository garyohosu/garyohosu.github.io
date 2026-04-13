# Project Skills

このディレクトリはプロジェクトローカルのスキル定義を管理します。

## スキル一覧

### `ainews`

`ainews.md` を読み込み、AIニュースのブログ記事を作成します。

**使い方:**

```
/ainews
```

詳細ロジック（記事構成・Web調査・画像生成など）はすべて `ainews.md` を参照します。

---

### `note`

note のURLを受け取り、ブログ向けの紹介記事を作成します。

**使い方:**

```
/note https://note.com/hantani/n/xxxxxxxx
```

URLを渡すと、記事内容を読み取り、ブログ掲載用の紹介文・フロントマター付きMarkdownを生成します。
生成物は `note_intro.md` に保存され、そのまま `_posts/` に追加できます。

## ファイル構成

```
.project/skills/
├── README.md          # このファイル
├── ainews/
│   └── SKILL.md       # ainews スキル定義
└── note/
    └── SKILL.md       # note スキル定義
```
