#!/usr/bin/env node
// Daily AI news article generator
// Fetches recent AI news from RSS feeds, generates an article via Claude API,
// creates a manga-style thumbnail via DALL-E 3, and writes the post to _posts/.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const RSS_FEEDS = [
  'https://techcrunch.com/tag/artificial-intelligence/feed/',
  'https://venturebeat.com/category/ai/feed/',
  'https://feeds.arstechnica.com/arstechnica/technology-lab',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
];

// Returns today's date in JST (UTC+9) as YYYY-MM-DD
function getJSTDate() {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, '0');
  const d = String(jst.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// e.g. "2026-05-07" -> "may-7"
function monthDaySlug(dateStr) {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ];
  const [, mm, dd] = dateStr.split('-');
  return `${months[parseInt(mm, 10) - 1]}-${parseInt(dd, 10)}`;
}

async function fetchRSS(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; garyohosu-ainews-bot/1.0)' },
      signal: AbortSignal.timeout(15_000),
    });
    return res.ok ? res.text() : '';
  } catch {
    return '';
  }
}

function parseItems(xml, maxItems = 8) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const get = (chunk, tag) => {
    const m = new RegExp(
      `<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i',
    ).exec(chunk);
    return m ? m[1].trim() : '';
  };

  let m;
  while ((m = re.exec(xml)) !== null && items.length < maxItems) {
    const chunk = m[1];
    const pubDate = get(chunk, 'pubDate');
    if (pubDate && new Date(pubDate).getTime() < sevenDaysAgo) continue;
    const title = get(chunk, 'title');
    if (!title) continue;
    const link = get(chunk, 'link') || get(chunk, 'guid');
    const desc = get(chunk, 'description').replace(/<[^>]+>/g, '').trim().slice(0, 250);
    items.push({ title, link, desc, pubDate });
  }
  return items;
}

async function fetchNewsContext() {
  const lines = [];
  for (const url of RSS_FEEDS) {
    const xml = await fetchRSS(url);
    if (!xml) {
      console.warn(`RSS fetch failed: ${url}`);
      continue;
    }
    const host = new URL(url).hostname.replace(/^(?:www|feeds)\./, '');
    for (const item of parseItems(xml)) {
      lines.push(`[${host}] ${item.title}\n  URL: ${item.link}\n  ${item.desc}`);
    }
  }
  return lines.length > 0
    ? lines.join('\n\n')
    : '（RSS取得失敗 — モデルの知識から直近のAIトレンドを執筆してください）';
}

async function callClaude(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-7',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content.filter(b => b.type === 'text').map(b => b.text).join('');
}

async function generateImage(dateStr) {
  const prompt = `Create a professional Japanese manga-style full-color illustration.

Canvas: 16:9 horizontal, high resolution.

Art style:
Japanese shonen manga cover illustration.
Thick clean outer lineart. Thin inner lineart.
Anime cel shading with exactly two shadow levels.
Sharp, clean, professional line quality.
Vivid colors. Flat anime coloring.
NOT realistic. NOT 3D. NOT painterly.

Composition:
Left side: Cute purple robot. Confident expression. Pointing pose.
Right side: Yellow humanoid character. Surprised and nervous expression. Sweat drop. Hands raised.

Speech bubbles: Two speech bubbles. EMPTY. NO TEXT.

Background: Night gradient blue to dark blue. Subtle stars. Manga speed lines. Focus lines.

Important: No text. No letters. No logo. No watermark.
Professional manga quality. Blog thumbnail quality.`;

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      response_format: 'url',
    }),
  });
  if (!res.ok) throw new Error(`DALL-E 3 ${res.status}: ${await res.text()}`);

  const { data } = await res.json();
  const imageUrl = data[0].url;

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error('Image download failed');

  const fileName = `ai-news-manga-${dateStr}.png`;
  fs.writeFileSync(
    path.join(ROOT, 'assets', 'img', fileName),
    Buffer.from(await imgRes.arrayBuffer()),
  );
  console.log(`Image saved: assets/img/${fileName}`);
  return fileName;
}

async function main() {
  if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');
  if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not set');

  const dateStr = getJSTDate();
  const slug = monthDaySlug(dateStr);
  const postFile = `${dateStr}-ai-news-trends-${slug}.md`;
  const postPath = path.join(ROOT, '_posts', postFile);

  if (fs.existsSync(postPath)) {
    console.log(`Post already exists: ${postFile} — skipping.`);
    return;
  }

  console.log(`Date (JST): ${dateStr}`);

  console.log('Fetching RSS feeds...');
  const newsContext = await fetchNewsContext();

  const prompt = `あなたはAI分野を専門とするテックジャーナリストです。今日は${dateStr}です。

以下の最新AIニュース（RSS取得・過去7日以内）を参考に、AIに詳しくない日本語読者向けの分かりやすいブログ記事を書いてください。

## 最新ニュースソース
${newsContext}

## 出力フォーマット（この形式を厳守してください）

TITLE: [キャッチーな日本語タイトル。「${dateStr}のAIニュース：」で始める]
TAGS: [AI, "生成AI", "LLM", "テクノロジー", ...]

---

## 今週のAIニュース漫画

![今週のAIニュース漫画](/assets/img/ai-news-manga-${dateStr}.png)

---

## 導入：[サブタイトル]

[導入文 2〜3段落]

---

## 1. [トレンド名]

### どんな出来事？
[説明]

### なぜ重要？
[理由]

### 具体的な影響
- [箇条書き]

---

[2〜5のトレンドを同じ形式で続ける。最低5つ]

---

## まとめ

[締めくくりの展望]

## ルール
- 外部URLはすべてhttps://で始まること（http://は不可）
- タグに数字のみの文字列を入れないこと
- 引用符のネストに注意（YAML内では " の代わりに 「」 を使う）
- 記事本文にフロントマターを含めないこと`;

  console.log('Generating article via Claude...');
  const raw = await callClaude(prompt);

  const titleMatch = raw.match(/^TITLE:\s*(.+)$/m);
  const tagsMatch = raw.match(/^TAGS:\s*(\[.+\]|\S.+)$/m);

  const title = (titleMatch ? titleMatch[1].trim() : `${dateStr}のAIニュース：最新AIトレンドまとめ`)
    .replace(/"/g, '「').replace(/"/g, '」');
  const tagsRaw = tagsMatch ? tagsMatch[1].trim() : 'AI, "生成AI", "LLM", "テクノロジー"';

  // Remove the TITLE:/TAGS: header lines; keep the rest as post body
  const body = raw
    .replace(/^TITLE:.*$/m, '')
    .replace(/^TAGS:.*$/m, '')
    .replace(/^\n+/, '')
    .trimEnd();

  console.log('Generating thumbnail via DALL-E 3...');
  const imageFile = await generateImage(dateStr);

  const frontmatter = `---
layout: post
title: "${title}"
date: ${dateStr}
categories: [AI, Technology]
tags: ${tagsRaw}
image:
  path: /assets/img/${imageFile}
  alt: "${dateStr} AIニュース漫画サムネイル"
---`;

  fs.writeFileSync(postPath, `${frontmatter}\n\n${body}\n`, 'utf-8');
  console.log(`Post saved: _posts/${postFile}`);
}

main().catch(err => {
  console.error('[ainews-generate] FAILED:', err.message);
  process.exit(1);
});
