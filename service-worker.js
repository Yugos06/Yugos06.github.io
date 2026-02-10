
const CACHE_NAME = 'wows-fan-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/wave.webp',
  '/images/bismarck.webp',
  '/images/hood.webp',
  '/images/iowa.webp',
  '/images/prinz_eugen.webp',
  '/images/richelieu.webp',
  '/images/vladivostok.webp',
  '/images/yamato.webp',
  '/images/port-amsterdam.jpg'
];


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


self.addEventListener('fetch', event => {
 
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
     
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
       
        return caches.match(event.request)
          .then(response => {
            return response || new Response('Offline - content not available');
          });
      })
  );
});


self.addEventListener('sync', event => {
  if (event.tag === 'sync-visits') {
    event.waitUntil(
      
      Promise.resolve() 
    );
  }
});
