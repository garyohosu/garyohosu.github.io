// Update words.json by combining existing base list, extras, and repo-derived tags/keywords
// Usage: node scripts/update_bingo_words.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const basePath = path.join(root, 'apps/ai-news-bingo/words.json');
const extraPath = path.join(root, 'apps/ai-news-bingo/words-extra.json');

function readJSON(p){ return JSON.parse(fs.readFileSync(p, 'utf8')); }

function* walk(dir){
  for(const entry of fs.readdirSync(dir, {withFileTypes:true})){
    const p = path.join(dir, entry.name);
    if(entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function extractFrontmatterTags(md){
  const m = md.match(/^---([\s\S]*?)---/);
  if(!m) return [];
  const yml = m[1];
  const tagsLine = yml.match(/tags:\s*\[([^\]]*)\]/);
  if(!tagsLine) return [];
  return tagsLine[1].split(',').map(s=>s.trim().replace(/^['"]|['"]$/g,'')).filter(Boolean);
}

function extractKeywords(text){
  // crude: keep capitalized tokens, tech terms, alnum with - or +
  const words = text.match(/[A-Za-z][A-Za-z0-9+\-.]{1,29}/g) || [];
  const stop = new Set(['The','This','That','With','From','Into','Your','And','For','You','Are','Will','Have','Has','Was','Our','News','Post','Blog','Feat','Chore','Docs']);
  return words.filter(w=>!stop.has(w) && /[A-Za-z]/.test(w)).map(w=>w.replace(/[,.;:]+$/,''));
}

function uniq(arr){ return [...new Set(arr)]; }

function main(){
  const base = readJSON(basePath);
  const extras = fs.existsSync(extraPath) ? readJSON(extraPath) : [];
  // collect from posts
  const postsDir = path.join(root, '_posts');
  let tags=[], kws=[];
  for(const p of walk(postsDir)){
    if(!p.endsWith('.md')) continue;
    const text = fs.readFileSync(p,'utf8');
    tags.push(...extractFrontmatterTags(text));
    kws.push(...extractKeywords(text));
  }
  const freq = new Map();
  function addAll(list, weight=1){ for(const t of list){ const k=t.trim(); if(!k) continue; freq.set(k,(freq.get(k)||0)+weight); } }
  addAll(base, 2); // keep existing terms with weight
  addAll(extras, 3);
  addAll(tags, 4);
  addAll(kws, 1);
  // sort by score and trim
  const merged = [...freq.entries()]
    .sort((a,b)=> b[1]-a[1] || a[0].localeCompare(b[0]))
    .map(([k])=>k)
    .filter(w=>w.length>=2 && w.length<=30)
    .slice(0,400);
  // Write
  const out = JSON.stringify(merged, null, 2) + '\n';
  const prev = fs.readFileSync(basePath,'utf8');
  if(prev !== out){
    fs.writeFileSync(basePath, out, 'utf8');
    console.log('words.json updated. size=', merged.length);
    process.exitCode = 0;
  } else {
    console.log('words.json unchanged');
  }
}

main();

