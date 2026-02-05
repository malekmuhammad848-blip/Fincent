// Service Worker for Cent Music App
const CACHE_NAME = 'cent-music-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Background sync for offline support
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync
      Promise.resolve()
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New music available!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'play', title: 'Play' },
      { action: 'close', title: 'Close' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Cent Music', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'play') {
    // Open app and play
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
