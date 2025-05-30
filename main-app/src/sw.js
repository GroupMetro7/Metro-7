// Load the Workbox libraries
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Define your API base URL as a constant
const API_BASE_URL = 'http://localhost:8888/';

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting();

// cache images
workbox.routing.registerRoute(
  ({ request, sameOrigin }) => sameOrigin && request.destination === "image",
  new workbox.strategies.CacheFirst({ cacheName: "images" })
);

// cache API calls
workbox.routing.registerRoute(
  ({ request }) => request.url === API_BASE_URL + "/",
  new workbox.strategies.NetworkFirst({ cacheName: "api/fetch-tasks" })
);

// cache navigations
workbox.routing.registerRoute(
  new workbox.routing.NavigationRoute(
    new workbox.strategies.NetworkFirst({
      cacheName: "navigation",
      networkTimeoutSeconds: 3,
    })
  )
);


const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin("backgroundSyncQueue", {
  maxRetentionTime: 24 * 60,
});


// POST Request: For creating an item. 
workbox.routing.registerRoute(
  ({ request, url }) =>
    request.method === 'POST' &&
    url.pathname.startsWith('/admin'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

// PUT Request: For updating an existing item.
workbox.routing.registerRoute(
  ({ request, url }) =>
    request.method === 'PUT' &&
    url.pathname.startsWith('/admin'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PUT'
);

// DELETE Request: For deleting an item.
workbox.routing.registerRoute(
  ({ request, url }) =>
    request.method === 'DELETE' &&
    url.pathname.startsWith('/admin'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'DELETE'
);