const CACHE_NAME = 'Green Area v-1';
debugger;

const urlsToCache = [
];

// const self= this;

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(urlsToCache))
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => response || fetch(event.request)).catch(() => caches.match('/src/Offline.html'))
//   );
// });

// self.addEventListener('fetch', event => {
//   if (navigator.onLine) {
//     console.log('Online mode');
//   } else {
//     console.log('Offline mode');
//   }
// });

// self.addEventListener('activate', event => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys()
//       .then(keyList => Promise.all(keyList.map(key => {
//         if (!cacheWhitelist.includes(key)) {
//           return caches.delete(key);
//         }
//       })))
//   );
// });
