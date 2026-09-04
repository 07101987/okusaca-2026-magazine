const CACHE='okusaca-2026-v76';
self.addEventListener('install',event=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(u.origin===location.origin && /^\/okusaca-2026-magazine\/pages\/page-\d{3}\.jpg$/.test(u.pathname)){
    event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request).then(hit=>hit||fetch(event.request).then(r=>{if(r.ok)cache.put(event.request,r.clone());return r}))));
  }
});
