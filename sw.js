self.addEventListener('fetch', (event) => {
  // This is a minimal service worker.  It doesn't do any caching.
  // It's just enough to satisfy the installability requirements.
  event.respondWith(fetch(event.request));
});