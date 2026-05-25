#!/usr/bin/env python3
"""Generate daily AI news blog post using Claude API and RSS feeds."""

import anthropic
import feedparser
import datetime
import glob
import os
import sys

JST = datetime.timezone(datetime.timedelta(hours=9))

FEEDS = [
    ("TechCrunch AI", "https://techcrunch.com/category/artificial-intelligence/feed/"),
    ("The Verge AI", "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml"),
    ("MIT Technology Review", "https://www.technologyreview.com/feed/"),
    ("VentureBeat AI", "https://venturebeat.com/category/ai/feed/"),
    ("Wired AI", "https://www.wired.com/feed/tag/artificial-intelligence/rss"),
]

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; ainews-bot/1.0)"}


def fetch_news():
    items = []
    for source, url in FEEDS:
        try:
            feed = feedparser.parse(url, request_headers=HEADERS)
            for entry in feed.entries[:5]:
                summary = getattr(entry, "summary", "")[:200].replace("\n", " ")
                items.append(
                    f"[{source}] {entry.title}\nURL: {entry.link}\n概要: {summary}\n"
                )
        except Exception as e:
            print(f"Warning: {source}: {e}", file=sys.stderr)
    return "\n".join(items[:15])


def generate_post(news_items, today_str):
    client = anthropic.Anthropic()

    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    with open(os.path.join(repo_root, "ainews.md"), encoding="utf-8") as f:
        template = f.read()

    prompt = f"""以下の最新AIニュース({today_str})をもとに、Jekyllブログ（Chirpyテーマ）向けの日本語AI解説記事を作成してください。

## 最新ニュース一覧
{news_items}

## フォーマット参考（ainews.md）
{template}

## 作成ルール
1. 日本語で書く（一般の読者向けにわかりやすく）
2. 5〜6トピックを取り上げる
3. 各トピックに「何が起きている？」「なぜ重要？」「活用例」を含める
4. YAMLフロントマターから始める（imageは含めない）
5. frontmatterのdate: {today_str} 06:00:00 +0900
6. categories: [AI]
7. tagsは今日のトピックに合わせて設定（4〜6個、数字だけのタグは"403"のようにクォートする）
8. 末尾に「## 参考ニュース」セクションで出典URLを記載
9. 記事本文のみ出力（前後の説明文・コードブロック記号不要）

出力はYAMLフロントマター（---で開始）から始めてください。"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text.strip()


def create_post_file(content, today_str, repo_root):
    slug = f"ai-news-daily-{today_str}"
    posts_dir = os.path.join(repo_root, "_posts")
    filename = os.path.join(posts_dir, f"{today_str}-{slug}.md")

    existing = glob.glob(os.path.join(posts_dir, f"{today_str}-ai-news-*.md"))
    if existing:
        print(f"Post already exists for {today_str}: {existing[0]}")
        sys.exit(0)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Created: {filename}")
    return filename


if __name__ == "__main__":
    today = datetime.datetime.now(JST)
    today_str = today.strftime("%Y-%m-%d")
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    print(f"Fetching news for {today_str}...")
    news_items = fetch_news()

    if not news_items:
        print("No news items fetched", file=sys.stderr)
        sys.exit(1)

    print("Generating post with Claude...")
    content = generate_post(news_items, today_str)

    create_post_file(content, today_str, repo_root)
