var CACHE_NAME = 'caccio-site-v4';

var PRECACHE_URLS = [
  'index.html',
  'futsal.html',
  'camp.html',
  'f1.html',
  'making.html',
  'style.css',
  'lang.js',
  'scroll-animate.js',
  'theme.js',
  'nav.js',
  'gallery.js',
  'search.js',
  'sw-register.js',
  'favicon.svg',
  'manifest.json',
  'profile.JPG',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetchPromise = fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(function () {
          return cached;
        });

      return cached || fetchPromise;
    })
  );
});
