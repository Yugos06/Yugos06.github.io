// Service Worker - Offline Support & Caching
const CACHE_NAME = 'wows-fan-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/wave.png',
  '/images/bismarck.png',
  '/images/hood.png',
  '/images/iowa.png',
  '/images/prinz_eugen.png',
  '/images/richelieu.png',
  '/images/vladivostok.png',
  '/images/yamato.png'
];

// Installation event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened, adding files...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache add error:', err))
  );
  self.skipWaiting();
});

// Activation event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response and add to cache
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // Return cached version if offline
        return caches.match(event.request)
          .then(response => {
            return response || new Response('Offline - content not available');
          });
      })
  );
});

// Background sync (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-visits') {
    event.waitUntil(
      // Sync logic here if needed
      Promise.resolve()
    );
  }
});
