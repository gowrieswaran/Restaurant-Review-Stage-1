let StaticCacheName = 'restaurant-v1'

const fileToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/offline.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/register_sw.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/img/fav-icon.png',
    '/img/offline.gif'
];

/**
 * Service Worker Install
 */

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('restaurant-v1')
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(fileToCache);
            })
    );
});



/**
 * Fetch Request
 */

self.addEventListener('fetch', function (e) {
    e.respondWith(
        //try the catche
        caches.match(e.request).then(function (response) {
            //fall back to network
            return response || fetch(e.request);
        }).catch(function () {
            //generic fallback
            return caches.match('/offline.html');
        })
    )
})