#!/usr/bin/env node
/**
 * Daily AI News post generator
 * Fetches recent AI news via RSS, calls Claude API to write a blog post,
 * and saves it to _posts/.
 */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// JST date
const now = new Date();
const jstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
const dateStr = jstDate.toISOString().split('T')[0];

// Skip if today's AI news post already exists
const postsDir = path.join(rootDir, '_posts');
const existing = fs.readdirSync(postsDir).filter(
  f => f.startsWith(dateStr) && f.includes('ai-news')
);
if (existing.length > 0) {
  console.log(`Today's AI news post already exists: ${existing[0]}`);
  process.exit(0);
}

async function fetchRSSItems(url, maxItems = 6) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const items = [];
    const itemRe = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = itemRe.exec(text)) !== null && items.length < maxItems) {
      const block = m[1];
      const title = (/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/.exec(block)?.[1] ?? '').trim();
      const desc  = (/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/.exec(block)?.[1] ?? '')
                      .replace(/<[^>]+>/g, '').trim().slice(0, 300);
      const link  = (/<link>(https?:[^<]+)<\/link>/.exec(block) ?? /<link>(.*?)<\/link>/.exec(block))?.[1]?.trim() ?? '';
      if (title) items.push({ title, desc, link });
    }
    return items;
  } catch (e) {
    console.warn(`RSS fetch failed (${url}): ${e.message}`);
    return [];
  }
}

const RSS_FEEDS = [
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://venturebeat.com/ai/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://feeds.feedburner.com/bdtechtalks',
];

const allItems = [];
for (const feed of RSS_FEEDS) {
  const items = await fetchRSSItems(feed, 5);
  allItems.push(...items);
}
console.log(`Fetched ${allItems.length} news items from RSS.`);

const newsContext = allItems.slice(0, 15)
  .map((it, i) => `[${i + 1}] ${it.title}\n${it.desc}\n${it.link}`)
  .join('\n\n');

const ainewsTemplate = fs.readFileSync(path.join(rootDir, 'ainews.md'), 'utf-8');

const prompt = `以下はAIニュースブログ記事のフォーマット例です。このフォーマット（構成・文体・セクション構造）を参考にして、今日（${dateStr}）付けの新しいAIニュース記事を作成してください。

---フォーマット例 (内容は古い例なので流用しないこと)---
${ainewsTemplate}
---フォーマット例ここまで---

---参考ニュース情報 (今日時点の最新情報)---
${newsContext}
---参考ニュース情報ここまで---

作成ルール:
- YAMLフロントマターを含む完全なMarkdown形式で出力すること
- layoutは含めない (Jekyllテーマのデフォルトを使う)
- title: 今日の主要AIトレンドを反映した魅力的な日本語タイトル
- date: ${dateStr} 06:00:00 +0900
- categories: [AI, トレンド]
- tags: 記事内容に合わせて5〜8個（日本語・英語混在OK、数字のみのタグは "403" のようにダブルクォートで囲む）
- imageは含めない (image行を削除)
- 5つのトレンドトピックを選んで解説
- 各トピックに「何が起きている？」「なぜ重要？」「活用例」を含める
- まとめセクションあり
- 参考ニュースセクションあり (外部URLは https:// から始めること)
- 全て日本語で書く

記事のMarkdown本文のみを出力してください（説明文や前置きは不要）。`;

const client = new Anthropic();
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 4096,
  messages: [{ role: 'user', content: prompt }],
});

let content = response.content[0].text.trim();

// Strip accidental code fences
if (content.startsWith('```')) {
  content = content.replace(/^```[^\n]*\n/, '').replace(/\n```$/, '').trim();
}

const outputPath = path.join(postsDir, `${dateStr}-ai-news-daily.md`);
fs.writeFileSync(outputPath, content + '\n');
console.log(`Created: ${outputPath}`);
