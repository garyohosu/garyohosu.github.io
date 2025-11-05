// AI News Bingo – client-only PWA
const WORDS_URL = './words.json';
const CATS_URL = './categories.json';
const BOARD = document.getElementById('board');
const linesEl = document.getElementById('lines');
const streakEl = document.getElementById('streak');
const dateInput = document.getElementById('seed-date');
const todayBtn = document.getElementById('today-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const shareBtn = document.getElementById('share-btn');
const installBtn = document.getElementById('install-btn');
const downloadA = document.getElementById('download');
const canvas = document.getElementById('card');

let words = [];
let cats = [];
let seed = 0;
let variant = 0; // for "another one"

// Mulberry32 PRNG
function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}

function dateToSeed(s){ // yyyy-mm-dd -> int
  return parseInt(s.replaceAll('-',''),10)||parseInt(fmtYMD(new Date()),10);
}
function fmtYMD(d){return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)}

async function loadWords(){
  if(words.length) return words;
  const res = await fetch(WORDS_URL);
  words = await res.json();
  return words;
}

async function loadCats(){
  if(cats.length) return cats;
  try{
    const res = await fetch(CATS_URL);
    cats = await res.json();
    cats.forEach(c => c._re = new RegExp(c.patterns.join('|'), 'i'));
  }catch(e){ cats = []; }
  return cats;
}

function pickBoard(n=24){ // 24 because center is FREE
  const rng = mulberry32(seed+variant);
  const pool = [...words];
  // shuffle
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(rng()* (i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]}
  return pool.slice(0,n);
}

function renderBoard(){
  BOARD.innerHTML='';
  const items = pickBoard();
  let idx=0; let checked = new Set();
  for(let r=0;r<5;r++){
    for(let c=0;c<5;c++){
      const div = document.createElement('button');
      div.className='cell';
      div.setAttribute('role','gridcell');
      div.setAttribute('aria-pressed','false');
      const key = `${r},${c}`;
      if(r===2 && c===2){
        div.classList.add('free');
        div.innerHTML = '<small>FREE</small> 今日はここで一息';
        div.dataset.free='1';
      }else{
        const word = items[idx++];
        div.textContent = word;
        // classify for category tint
        if(cats.length){
          for(let i=0;i<cats.length;i++){
            if(cats[i]._re.test(word)){ div.classList.add(`cat-${i}`); div.dataset.cat=String(i); break; }
          }
        }
      }
      div.addEventListener('click',()=>{
        const on = div.classList.toggle('checked');
        div.setAttribute('aria-pressed', on? 'true':'false');
        if(on) checked.add(key); else checked.delete(key);
        updateLines(checked);
      });
      BOARD.appendChild(div);
    }
  }
  // restore from localStorage for same seed
  const saved = JSON.parse(localStorage.getItem(saveKey())||'[]');
  if(saved.length){
    [...BOARD.children].forEach((el,i)=>{
      if(saved.includes(i)) { el.classList.add('checked'); el.setAttribute('aria-pressed','true'); }
    });
  }
  updateLines();
}

function updateLines(){
  const cells=[...BOARD.children];
  const isChecked=(r,c)=>{
    const i=r*5+c; const el=cells[i]; if(!el) return false; return el.classList.contains('checked') || el.dataset.free==='1';
  };
  let lines=0;
  for(let i=0;i<5;i++){ if([0,1,2,3,4].every(c=>isChecked(i,c))) lines++; }
  for(let j=0;j<5;j++){ if([0,1,2,3,4].every(r=>isChecked(r,j))) lines++; }
  if([0,1,2,3,4].every(i=>isChecked(i,i))) lines++;
  if([0,1,2,3,4].every(i=>isChecked(i,4-i))) lines++;
  linesEl.textContent=String(lines);
  // persist indices
  const checkedIdx = cells.map((el,i)=>el.classList.contains('checked')?i:null).filter(v=>v!==null);
  localStorage.setItem(saveKey(), JSON.stringify(checkedIdx));
}

function saveKey(){ return `bingo:${seed}:${variant}`; }

function setSeedFromDateStr(s){ seed = dateToSeed(s); dateInput.value = s; variant=0; renderBoard(); }

async function init(){
  await Promise.all([loadWords(), loadCats()]);
  const today = fmtYMD(new Date());
  dateInput.value = today;
  setSeedFromDateStr(today);
  updateStreakOnVisit(today);
  registerSW();
}

todayBtn.addEventListener('click', ()=> setSeedFromDateStr(fmtYMD(new Date())));
dateInput.addEventListener('change', (e)=> setSeedFromDateStr(e.target.value));
shuffleBtn.addEventListener('click', ()=>{ variant++; renderBoard(); });
clearBtn.addEventListener('click', ()=>{
  [...BOARD.children].forEach(el=>el.classList.remove('checked'));
  updateLines();
});

saveBtn.addEventListener('click', ()=> renderCard().then(blob=>{
  const url = URL.createObjectURL(blob);
  downloadA.href = url; downloadA.download = `ai-news-bingo-${seed}-${variant}.png`; downloadA.click();
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
}));

shareBtn.addEventListener('click', async()=>{
  try{
    const blob = await renderCard();
    const file = new File([blob], `bingo-${seed}.png`, {type:'image/png'});
    if(navigator.share && navigator.canShare && navigator.canShare({files:[file]})){
      await navigator.share({
        title: 'AIニュースBingo',
        text: `今日のAIニュースBingo（${seed}） #AINews #Bingo`,
        files:[file]
      });
    }else{
      const url = URL.createObjectURL(blob);
      downloadA.href=url; downloadA.download = `ai-news-bingo-${seed}.png`; downloadA.click();
      setTimeout(()=>URL.revokeObjectURL(url), 4000);
      alert('共有に未対応のため画像を保存しました。Xで画像を添付して投稿してください。');
    }
  }catch(e){ console.error(e); alert('画像生成に失敗しました'); }
});

async function renderCard(){
  const W=1200,H=675, PAD=40; const cw=canvas; cw.width=W; cw.height=H; const ctx=cw.getContext('2d');
  // bg
  const grad=ctx.createLinearGradient(0,0,W,H); grad.addColorStop(0,'#0f172a'); grad.addColorStop(1,'#1e293b');
  ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);
  // title
  ctx.fillStyle='#93c5fd'; ctx.font='28px \\"Segoe UI\\", Roboto, \\"Noto Sans JP\\", sans-serif';
  ctx.fillText('AIニュースBingo', PAD, PAD+8);
  ctx.fillStyle='#fff'; ctx.font='bold 48px \\"Segoe UI\\", Roboto, \\"Noto Sans JP\\", sans-serif';
  ctx.fillText(`${seed} の盤面`, PAD, PAD+56);
  // grid
  const GX=PAD, GY=120, CELL= (W-PAD*2-8*4)/5, GAP=8;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  for(let r=0;r<5;r++){
    for(let c=0;c<5;c++){
      const x=GX+c*(CELL+GAP), y=GY+r*(CELL+GAP);
      ctx.fillStyle='#111827'; ctx.strokeStyle='#1f2937'; ctx.lineWidth=2; ctx.fillRect(x,y,CELL,CELL); ctx.strokeRect(x,y,CELL,CELL);
    }
  }
  // words from DOM
  const cells=[...BOARD.children].map(el=>({text:el.textContent, free:el.dataset.free==='1', on:el.classList.contains('checked'), cat: el.dataset.cat? parseInt(el.dataset.cat,10):-1 }));
  const wrap=(s,max)=>{const out=[]; let cur=''; for(const ch of s){ if(ctx.measureText(cur+ch).width<max) cur+=ch; else {out.push(cur); cur=ch;} } if(cur) out.push(cur); return out; };
  for(let i=0;i<25;i++){
    const r=Math.floor(i/5), c=i%5; const x=GX+c*(CELL+GAP), y=GY+r*(CELL+GAP);
    const {text,free,on,cat}=cells[i];
    if(free){ ctx.fillStyle='#172554'; ctx.fillRect(x,y,CELL,CELL); }
    if(!free && cat>=0){
      // top bar tint by category
      ctx.fillStyle = (cats[cat] && cats[cat].color) ? cats[cat].color : '#334155';
      ctx.globalAlpha=.9; ctx.fillRect(x,y,CELL,6); ctx.globalAlpha=1;
    }
    if(on){ ctx.strokeStyle='#10b981'; ctx.lineWidth=6; ctx.strokeRect(x+3,y+3,CELL-6,CELL-6); }
    ctx.fillStyle= '#e5e7eb'; ctx.font='700 22px \\"Segoe UI\\", Roboto, \\"Noto Sans JP\\", sans-serif';
    const lines=free? ['FREE']: wrap(text, CELL-16);
    const lh=26; const sy=y+CELL/2 - (lines.length-1)*lh/2;
    lines.forEach((ln,k)=> ctx.fillText(ln, x+CELL/2, sy+k*lh));
  }
  // footer
  ctx.fillStyle='#94a3b8'; ctx.font='20px \\"Segoe UI\\", Roboto, \\"Noto Sans JP\\", sans-serif';
  ctx.fillText('garyohosu.github.io/apps/ai-news-bingo', PAD, H-PAD/2);
  // streak badge
  const s = getStreak();
  if(s.current>0){
    const b = getBadge(s.current);
    const btxt = `${b.label}  ·  ${s.current}d  (Best ${s.best}d)`;
    const bx = W-PAD-380, by = H-PAD-16;
    ctx.fillStyle=b.bg; ctx.fillRect(bx, by-28, 360, 40);
    ctx.fillStyle=b.fg; ctx.font='bold 22px "Segoe UI", Roboto, "Noto Sans JP", sans-serif';
    ctx.textAlign='right'; ctx.fillText(btxt, W-PAD, H-PAD-8);
    ctx.textAlign='left';
  }
  return new Promise(res=> cw.toBlob(b=>res(b),'image/png'));
}

function registerSW(){
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js').catch(()=>{}); }
}

init();

// ---- Streak (連続日数) ----
function getStreak(){
  const rec = JSON.parse(localStorage.getItem('bingo:streak')||'{}');
  return {current: rec.current||0, best: rec.best||0, last: rec.last||null};
}
function setStreak(obj){ localStorage.setItem('bingo:streak', JSON.stringify(obj)); }
function daysBetween(a,b){
  const ad=new Date(a+'T00:00:00'), bd=new Date(b+'T00:00:00');
  return Math.round((bd-ad)/86400000);
}
function updateStreakOnVisit(todayStr){
  const s = getStreak();
  if(!s.last){ s.current=1; s.best=1; s.last=todayStr; }
  else {
    const diff = daysBetween(s.last, todayStr);
    if(diff===0){ /* same day */ }
    else if(diff===1){ s.current = (s.current||0)+1; s.best=Math.max(s.best||0, s.current); s.last=todayStr; }
    else if(diff>1){ s.current=1; s.last=todayStr; s.best=Math.max(s.best||0, s.current); }
  }
  setStreak(s); renderStreak();
}
function renderStreak(){
  const s=getStreak();
  if(streakEl){
    streakEl.textContent = `連続: ${s.current}日（最高 ${s.best}日）`;
    const b = getBadge(s.current);
    const badgeEl = document.getElementById('badge');
    if(badgeEl){ badgeEl.textContent = b.label; badgeEl.style.background=b.bg; badgeEl.style.color=b.fg; }
  }
}
renderStreak();

// Badge colors by streak days
function getBadge(days){
  if(days>=30) return {label:'STREAK MASTER', bg:'rgba(168,85,247,.25)', fg:'#c084fc'};
  if(days>=14) return {label:'POWER USER', bg:'rgba(59,130,246,.25)', fg:'#93c5fd'};
  if(days>=7)  return {label:'REGULAR', bg:'rgba(16,185,129,.20)', fg:'#34d399'};
  if(days>=3)  return {label:'ROOKIE', bg:'rgba(245,158,11,.20)', fg:'#fbbf24'};
  return {label:'', bg:'transparent', fg:'#e5e7eb'};
}

// Install prompt handling
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; if(installBtn) installBtn.hidden=false; });
installBtn?.addEventListener('click', async()=>{ if(!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; installBtn.hidden=true; });
