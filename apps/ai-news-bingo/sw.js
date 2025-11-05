const CACHE = 'ai-bingo-v3';
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest', './icon.svg', './words.json', './categories.json'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k))))); self.clients.claim();
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if(url.origin !== location.origin) return; // ignore cross-origin
  if(url.pathname.endsWith('/words.json') || url.pathname.endsWith('/categories.json')){
    // network-first to keep vocab fresh
    e.respondWith(
      fetch(e.request).then(resp=>{
        const copy = resp.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)); return resp;
      }).catch(()=> caches.match(e.request))
    );
  } else {
    e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
  }
});
