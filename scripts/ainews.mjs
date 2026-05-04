#!/usr/bin/env node
/**
 * scripts/ainews.mjs
 * Daily AI news post generator.
 * Reads ainews.md as the prompt, calls Claude (with web search) to write the article,
 * generates a DALL-E 3 manga thumbnail, then writes the Jekyll post file.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *   OPENAI_API_KEY
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/** Returns YYYY-MM-DD in JST (UTC+9). */
function getJSTDateStr() {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

/**
 * Calls Claude with the web_search tool enabled and returns the final text.
 * Handles the tool-use loop until stop_reason is 'end_turn'.
 */
async function generateWithWebSearch(userPrompt) {
  const messages = [{ role: 'user', content: userPrompt }];

  for (let i = 0; i < 20; i++) {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 10000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages,
    });

    if (response.stop_reason === 'end_turn') {
      return response.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('');
    }

    if (response.stop_reason === 'tool_use') {
      messages.push({ role: 'assistant', content: response.content });
      const toolResults = response.content
        .filter((b) => b.type === 'tool_use')
        .map((b) => ({ type: 'tool_result', tool_use_id: b.id, content: '' }));
      messages.push({ role: 'user', content: toolResults });
      continue;
    }

    // Unexpected stop_reason — return whatever text is available
    return response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');
  }

  throw new Error('generateWithWebSearch: exceeded max iterations');
}

/** Generates a DALL-E 3 manga thumbnail and saves it locally. */
async function generateAndSaveImage(dateStr) {
  const dallePrompt = `Create a professional Japanese manga-style full-color illustration.

Canvas: 16:9 horizontal, high resolution.

Art style: Japanese shonen manga cover illustration. Thick clean outer lineart. Thin inner lineart. Anime cel shading with exactly two shadow levels. Sharp, clean, professional line quality. Vivid colors. Flat anime coloring. NOT realistic. NOT 3D. NOT painterly.

Composition:
Left side: Cute purple robot. Confident expression. Pointing pose.
Right side: Yellow humanoid character. Surprised and nervous expression. Sweat drop. Hands raised.

Speech bubbles: Two speech bubbles. EMPTY. NO TEXT.

Background: Night gradient blue to dark blue. Subtle stars. Manga speed lines. Focus lines.

Important: No text. No letters. No logo. No watermark. Professional manga quality. Blog thumbnail quality.`;

  const resp = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: dallePrompt,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      response_format: 'url',
    }),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`DALL-E API error ${resp.status}: ${body}`);
  }

  const data = await resp.json();
  const imageUrl = data.data[0].url;

  const imgResp = await fetch(imageUrl);
  if (!imgResp.ok) throw new Error(`Failed to download image: ${imgResp.status}`);

  const buffer = await imgResp.arrayBuffer();
  const imagePath = `assets/img/ai-news-manga-${dateStr}.png`;
  writeFileSync(imagePath, Buffer.from(buffer));
  console.log(`[ainews] Image saved: ${imagePath}`);
  return imagePath;
}

/** Converts a comma-separated tag string into a YAML array literal. */
function buildTagsYaml(tagsRaw) {
  return tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `"${t.replace(/"/g, '\\"')}"`)
    .join(', ');
}

async function main() {
  const dateStr = getJSTDateStr();
  const postPath = `_posts/${dateStr}-ai-news-daily.md`;

  if (existsSync(postPath)) {
    console.log(`[ainews] Post already exists for ${dateStr}, skipping.`);
    return;
  }

  const ainewsPrompt = readFileSync('ainews.md', 'utf-8');

  const prompt = `${ainewsPrompt}

---

## 出力フォーマット（必ず従うこと）

以下のXML形式で出力してください。XMLタグ以外の余分なテキストは含めないこと：

<title>記事タイトル（日本語、キャッチー）</title>
<tags>AI, 生成AI, OpenAI, Anthropic</tags>
<body>
## 今週のAIニュース漫画

![今週のAIニュース漫画](/assets/img/ai-news-manga-${dateStr}.png)

---

（記事本文をここに Markdown 形式で記述。導入、トレンド解説、結論を含めること）
</body>

注意：
- pic.md の画像生成手順は不要（画像は別途自動生成されます）
- 数字のみのタグはダブルクォートで囲む（例: "2024"）
- 外部リンクは https:// で始まるURLのみ使用`;

  console.log(`[ainews] Generating article for ${dateStr}...`);

  // Run article generation and image generation in parallel
  const [articleText, imagePath] = await Promise.all([
    generateWithWebSearch(prompt),
    generateAndSaveImage(dateStr),
  ]);

  // Parse structured output
  const titleMatch = articleText.match(/<title>([\s\S]*?)<\/title>/);
  const tagsMatch = articleText.match(/<tags>([\s\S]*?)<\/tags>/);
  const bodyMatch = articleText.match(/<body>([\s\S]*?)<\/body>/);

  if (!titleMatch || !tagsMatch || !bodyMatch) {
    console.error('[ainews] Parse error. Raw output (first 1000 chars):');
    console.error(articleText.slice(0, 1000));
    throw new Error('Failed to parse article output');
  }

  const title = titleMatch[1].trim().replace(/"/g, '\\"');
  const tagsYaml = buildTagsYaml(tagsMatch[1]);
  const body = bodyMatch[1].trim();

  const frontmatter = `---
layout: post
title: "${title}"
date: ${dateStr}
categories: [AI, Technology]
tags: [${tagsYaml}]
image:
  path: /assets/img/ai-news-manga-${dateStr}.png
  alt: "${dateStr} AIニュース漫画サムネイル"
---`;

  const fullPost = `${frontmatter}\n\n${body}\n`;
  writeFileSync(postPath, fullPost, 'utf-8');
  console.log(`[ainews] Post created: ${postPath}`);
  console.log(`[ainews] Image:        ${imagePath}`);
}

main().catch((err) => {
  console.error('[ainews] FAILED:', err);
  process.exit(1);
});
