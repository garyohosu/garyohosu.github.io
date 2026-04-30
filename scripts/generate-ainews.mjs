#!/usr/bin/env node
/**
 * generate-ainews.mjs
 * 毎日6時（JST）に実行されるAIニュース記事自動生成スクリプト。
 * GitHub Actions の daily-ainews.yml から呼び出す。
 *
 * 必要な環境変数:
 *   ANTHROPIC_API_KEY  (必須) Claude API キー
 *   OPENAI_API_KEY     (任意) DALL-E 3 画像生成キー
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

// ---- 日付ユーティリティ ----

function getJSTDate() {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return [
    jst.getUTCFullYear(),
    String(jst.getUTCMonth() + 1).padStart(2, '0'),
    String(jst.getUTCDate()).padStart(2, '0'),
  ].join('-');
}

// ---- RSS 取得・パース ----

async function fetchRSS(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 AINewsBot/1.0' },
      signal: AbortSignal.timeout(12000),
    });
    return res.ok ? await res.text() : '';
  } catch {
    return '';
  }
}

function extractItems(xml, max = 5) {
  const items = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const s = m[1];
    const title = (
      s.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
      s.match(/<title>([\s\S]*?)<\/title>/)
    )?.[1]?.trim();
    const desc = (
      s.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
      s.match(/<description>([\s\S]*?)<\/description>/)
    )?.[1];
    const link = (
      s.match(/<link>(https?:\/\/[^\s<]+)<\/link>/) ||
      s.match(/<link href="(https?:\/\/[^"]+)"/)
    )?.[1]?.trim();

    if (title) {
      items.push({
        title,
        description: desc?.replace(/<[^>]+>/g, '').trim().slice(0, 200) ?? '',
        link: link ?? '',
      });
      if (items.length >= max) break;
    }
  }
  return items;
}

// ---- Claude API 呼び出し ----

async function callClaude(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Claude API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');
}

// ---- DALL-E 3 画像生成 ----

async function generateImage(dateStr) {
  if (!process.env.OPENAI_API_KEY) {
    console.log('OPENAI_API_KEY not set — skipping image generation.');
    return false;
  }

  console.log('Generating manga thumbnail with DALL-E 3...');

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt:
        'Create a professional Japanese manga-style full-color illustration. ' +
        '16:9 horizontal high-resolution canvas. ' +
        'Japanese shonen manga art style. Thick clean outer lineart. Thin inner lineart. ' +
        'Anime cel shading with two shadow levels. Vivid flat colors. NOT realistic. NOT 3D. ' +
        'Left side: cute purple robot with confident expression and pointing pose. ' +
        'Right side: yellow humanoid character with surprised nervous expression and sweat drop, hands raised. ' +
        'Two empty speech bubbles with NO TEXT. ' +
        'Background: night gradient blue to dark blue, subtle stars, manga speed lines. ' +
        'No text, no letters, no logo, no watermark. Professional manga blog thumbnail quality.',
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      response_format: 'url',
    }),
  });

  if (!res.ok) {
    console.error('Image generation failed:', await res.text());
    return false;
  }

  const { data } = await res.json();
  const imgRes = await fetch(data[0].url);
  const buf = Buffer.from(await imgRes.arrayBuffer());

  mkdirSync('assets/img', { recursive: true });
  writeFileSync(`assets/img/ai-news-manga-${dateStr}.png`, buf);
  console.log(`Image saved: assets/img/ai-news-manga-${dateStr}.png`);
  return true;
}

// ---- メイン ----

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is required');
  }

  const dateStr = getJSTDate();
  const postFile = `_posts/${dateStr}-ai-news-trends.md`;

  if (existsSync(postFile)) {
    console.log(`Already exists: ${postFile} — nothing to do.`);
    return;
  }

  console.log(`=== Generating AI news article for ${dateStr} ===`);

  // RSS フィードから最新ニュースを収集
  const feeds = [
    ['TechCrunch AI', 'https://techcrunch.com/category/artificial-intelligence/feed/'],
    ['The Verge AI', 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'],
    ['VentureBeat AI', 'https://venturebeat.com/category/ai/feed/'],
    ['MIT Technology Review', 'https://feeds.technologyreview.com/mit-technology-review/feed/'],
  ];

  let newsContext = '';
  for (const [name, url] of feeds) {
    const xml = await fetchRSS(url);
    const items = xml ? extractItems(xml) : [];
    console.log(`${name}: ${items.length} items fetched`);
    if (items.length > 0) {
      newsContext += `\n### ${name}\n`;
      for (const item of items) {
        newsContext += `- **${item.title}**\n`;
        if (item.description) newsContext += `  ${item.description}\n`;
        if (item.link) newsContext += `  ${item.link}\n`;
      }
    }
  }

  if (!newsContext) {
    newsContext = '（RSSフィードの取得に失敗しました。知識ベースから最新トレンドを使用してください）';
  }

  // 画像生成
  const imageGenerated = await generateImage(dateStr).catch((err) => {
    console.error('Image error:', err.message);
    return false;
  });

  const imageFrontmatter = imageGenerated
    ? `image:\n  path: /assets/img/ai-news-manga-${dateStr}.png\n  alt: "${dateStr} AIニュース漫画サムネイル"`
    : '';

  const imageSection = imageGenerated
    ? `## 今日のAIニュース漫画\n\n![今日のAIニュース漫画](/assets/img/ai-news-manga-${dateStr}.png)\n\n---\n\n`
    : '';

  // ainews.md のプロンプトを読み込む
  const ainewsPrompt = readFileSync('ainews.md', 'utf-8');

  const prompt = `${ainewsPrompt}

---

今日の日付: ${dateStr}

以下は本日収集した最新AIニュースのヘッドラインです。これらを最優先で使用して記事を作成してください：

${newsContext}

---

【出力形式（厳守）】
Jekyllブログ記事をそのまま出力してください。前置きや後書きは不要です。

フロントマター（必須フィールド）:
\`\`\`
---
layout: post
title: "（読者の興味を引くキャッチーな日本語タイトル）"
date: ${dateStr}
categories: [AI, Technology]
tags: [AI, "生成AI", ...]
${imageFrontmatter}
---
\`\`\`

フロントマター直後に以下をそのまま挿入:
${imageSection}その後、記事本文（導入・5つ以上のトレンド解説・結論）を続けること。
pic.md の画像生成手順は省略してください（画像は既に生成済み）。`;

  console.log('Calling Claude API...');
  const raw = await callClaude(prompt);

  // フロントマター開始位置を特定
  const match = raw.match(/^---[\s\S]+/m);
  if (!match) {
    throw new Error('Jekyll frontmatter not found in Claude response');
  }

  writeFileSync(postFile, match[0], 'utf-8');
  console.log(`✓ Article saved: ${postFile}`);
}

main().catch((err) => {
  console.error('FAILED:', err.message || err);
  process.exit(1);
});
