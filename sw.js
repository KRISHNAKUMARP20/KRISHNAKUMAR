const CACHE_NAME = 'kk-portfolio-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/assets/logo.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
