// sw.js
self.addEventListener('install', function(event) {
    // Cache essential files for offline use
    event.waitUntil(
        caches.open('my-pwa-cache-v1').then(function(cache) {
            return cache.addAll([
                '/', // Cache the root URL
                '/index.html',
                '/main.js', // Cache your JavaScript file
                '/styles.css', // Cache your CSS file
                '/fontawesome.min.css',  // If you have a local copy
                '/icon-192x192.png', // Cache your icons
                '/icon-512x512.png'
                // Add any other essential files here
            ]);
        })
    );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});


