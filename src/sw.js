/**
 * apps.nektro.net Service Worker
 */
const APPROVED_DOMAINS = [
    'unpkg.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    's3.amazonaws.com',
    'cdn.rawgit.com'
];

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            const requestUrl = new URL(event.request.url);
            if (navigator.onLine === true) {
                if (location.host === requestUrl.host || APPROVED_DOMAINS.includes(requestUrl.host)) {
                    caches.open('static-v1').then(cache => {
                        fetch(event.request).then(response2 => {
                            cache.put(event.request, response2);
                        });
                    });
                }
            }
            return response || fetch(event.request);
        })
    );
});
