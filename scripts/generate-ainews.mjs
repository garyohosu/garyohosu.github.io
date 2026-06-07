#!/usr/bin/env node
/**
 * Daily AI news article generator
 * Calls Anthropic Claude API (with web search) and saves a Jekyll post to _posts/
 */
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';

const client = new Anthropic();

function getTodayJST() {
  const now = new Date();
  // JST = UTC+9
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const date = jst.toISOString().slice(0, 10); // YYYY-MM-DD
  return { date, datetime: `${date} 06:00:00 +0900` };
}

function alreadyGenerated(date) {
  if (!existsSync('_posts')) return false;
  return readdirSync('_posts').some(f => f.startsWith(`${date}-ai-news-daily`));
}

function extractArticle(raw) {
  // Remove leading prose before frontmatter
  const start = raw.indexOf('---');
  const text = start > 0 ? raw.slice(start) : raw;
  // Remove trailing code fence if accidentally included
  return text.replace(/```\s*$/, '').trim() + '\n';
}

async function callClaude(prompt, useWebSearch) {
  const baseParams = {
    model: 'claude-sonnet-4-6',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  };

  if (useWebSearch) {
    baseParams.tools = [{ type: 'web_search_20250305', name: 'web_search', max_uses: 10 }];
  }

  // For server-side tools the response may loop through tool_use/tool_result rounds
  // Keep sending until stop_reason is end_turn
  let messages = [...baseParams.messages];
  let fullText = '';

  for (let round = 0; round < 20; round++) {
    const res = await client.messages.create({ ...baseParams, messages });

    for (const block of res.content) {
      if (block.type === 'text') fullText += block.text;
    }

    if (res.stop_reason !== 'tool_use') break;

    // Pass tool results back (client-side fallback for server tools that still surface tool_use)
    messages.push({ role: 'assistant', content: res.content });
    const results = res.content
      .filter(b => b.type === 'tool_use')
      .map(b => ({ type: 'tool_result', tool_use_id: b.id, content: '[]' }));
    messages.push({ role: 'user', content: results });
  }

  return fullText;
}

async function generate() {
  const { date, datetime } = getTodayJST();

  if (alreadyGenerated(date)) {
    console.log(`AI news article for ${date} already exists — skipping.`);
    return;
  }

  const template = readFileSync('ainews.md', 'utf-8');

  const prompt = `あなたは日本語ブログのAIニュース記者です。

以下のテンプレート記事を参考に、今日（${date}）の最新AIニュース記事を作成してください。
Web検索を使って直近1週間のAI関連ニュースを調査してから記事を書いてください。

【テンプレート（形式・スタイルの参考）】
${template}

【要件】
1. Jekyll向けfrontmatterを以下の形式で必ず含める（imageフィールドは不要）:
---
title: "（今日のAIニュースを反映した具体的なタイトル）"
date: ${datetime}
categories: [AIニュース]
tags: [（関連タグ 3〜6個）]
---

2. 記事のスタイル:
- 非エンジニア向けにやさしく、具体例を使って解説
- 直近（1週間前後）の実際のAIニュースを5〜6項目取り上げる
- 各トピックに「何が起きている？」「なぜ重要？」「活用例」の構成
- 末尾に参考ニュースのリスト

3. 出力形式:
- frontmatterから始まる完全なMarkdownファイルの内容のみ出力
- コードブロック（\`\`\`）で囲まない
- 余分な説明・前置き・後書きは不要`;

  console.log(`Generating AI news for ${date} ...`);

  let text = '';
  try {
    text = await callClaude(prompt, true);
    console.log('Generated with web search.');
  } catch (err) {
    console.warn(`Web search unavailable (${err.message}), retrying without ...`);
    text = await callClaude(prompt, false);
    console.log('Generated without web search.');
  }

  const article = extractArticle(text);
  const outputPath = `_posts/${date}-ai-news-daily.md`;
  writeFileSync(outputPath, article, 'utf-8');
  console.log(`Saved: ${outputPath}`);
}

generate().catch(err => {
  console.error('generate-ainews failed:', err.message);
  process.exit(1);
});
