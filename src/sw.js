// src/sw.js
/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute }        from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';

// Precache built assets
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache API calls for orders & rider updates
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/rider'),
  new NetworkFirst({ cacheName: 'rider-api-cache' })
);

// Cache static assets (images, fonts)
registerRoute(
  /\.(?:png|jpg|jpeg|svg|woff2?)$/,
  new CacheFirst({ cacheName: 'static-assets' })
);

self.addEventListener('activate', () =>
  self.clients.claim()
);
