#!/usr/bin/env node
/**
 * Daily AI news post generator.
 * Called by .github/workflows/daily-ainews.yml every day at 6 AM JST.
 *
 * Requires:
 *   ANTHROPIC_API_KEY  – Claude API (web_search_20250305 tool)
 *   OPENAI_API_KEY     – DALL-E 3 thumbnail generation
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Helpers ─────────────────────────────────────────────────────────────────

function getJSTDateStr() {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().split("T")[0]; // YYYY-MM-DD
}

function weekLabel(dateStr) {
  const d = new Date(dateStr);
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" }).toLowerCase();
  const week = Math.ceil(d.getUTCDate() / 7);
  return { month, week };
}

// ── Article generation (Claude + web_search) ─────────────────────────────────

async function generateArticle(dateStr) {
  const ainewsPrompt = readFileSync(join(ROOT, "ainews.md"), "utf-8");
  const { month, week } = weekLabel(dateStr);
  const imgPath = `/assets/img/ai-news-manga-${dateStr}.png`;

  const instruction = `
今日の日付: ${dateStr}
対象期間: ${dateStr.slice(0, 7).replace("-", "年")}月 第${week}週

以下の形式で Jekyll ブログ用 Markdown を出力してください。
コードブロックや余分な説明は不要です。frontmatter の --- から始まり記事本文で終わる Markdown のみ出力すること。

---
title: "タイトル"
date: ${dateStr}
categories: [AI, Technology]
tags: [AI, "生成AI", タグ2, タグ3, ...]
image:
  path: ${imgPath}
  alt: "サムネイルの説明"
---

## 今週のAIニュース漫画

![今週のAIニュース漫画](${imgPath})

---

（記事本文）
`.trim();

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  console.log("[generate-ainews] Calling Claude API (web_search enabled)...");

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 8192,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    tool_choice: { type: "auto" },
    messages: [
      {
        role: "user",
        content: `${ainewsPrompt}\n\n---\n\n${instruction}`,
      },
    ],
  });

  // Collect all text blocks (web_search results are handled server-side)
  let text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  // Strip accidental code fences
  if (text.startsWith("```")) {
    text = text.replace(/^```[^\n]*\n?/, "").replace(/```\s*$/, "").trim();
  }

  return text;
}

// ── Thumbnail generation (DALL-E 3) ──────────────────────────────────────────

const THUMBNAIL_PROMPT = `Create a professional Japanese manga-style full-color illustration.

Canvas: 16:9 horizontal, high resolution.

Art style:
Japanese shonen manga cover illustration.
Thick clean outer lineart. Thin inner lineart.
Anime cel shading with exactly two shadow levels.
Sharp, clean, professional line quality. Vivid colors. Flat anime coloring.
NOT realistic. NOT 3D. NOT painterly.

Composition:
Left side: Cute purple robot. Confident expression. Pointing pose.
Right side: Yellow humanoid character. Surprised and nervous expression. Sweat drop. Hands raised.

Speech bubbles: Two speech bubbles. EMPTY. NO TEXT.

Background: Night gradient blue to dark blue. Subtle stars. Manga speed lines. Focus lines.

Important: No text. No letters. No logo. No watermark.

Professional manga quality. Blog thumbnail quality.`;

async function generateThumbnail(dateStr) {
  console.log("[generate-ainews] Generating DALL-E 3 thumbnail...");

  const genRes = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: THUMBNAIL_PROMPT,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      response_format: "url",
    }),
  });

  if (!genRes.ok) {
    const body = await genRes.text();
    throw new Error(`DALL-E API error ${genRes.status}: ${body}`);
  }

  const { data } = await genRes.json();
  const imageUrl = data[0].url;

  console.log("[generate-ainews] Downloading thumbnail...");
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download image: ${imgRes.status}`);

  const buf = Buffer.from(await imgRes.arrayBuffer());
  const dest = join(ROOT, "assets", "img", `ai-news-manga-${dateStr}.png`);
  writeFileSync(dest, buf);
  console.log(`[generate-ainews] Saved thumbnail: ${dest}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const dateStr = getJSTDateStr();
  console.log(`[generate-ainews] Target date: ${dateStr}`);

  const { month, week } = weekLabel(dateStr);
  const slug = `${dateStr}-ai-news-trends-${month}-week${week}`;
  const postPath = join(ROOT, "_posts", `${slug}.md`);

  const [articleText] = await Promise.all([
    generateArticle(dateStr),
    generateThumbnail(dateStr),
  ]);

  writeFileSync(postPath, articleText, "utf-8");
  console.log(`[generate-ainews] Saved post: ${postPath}`);
}

main().catch((err) => {
  console.error("[generate-ainews] FAILED:", err instanceof Error ? err.message : err);
  process.exit(1);
});
