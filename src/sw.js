importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

import { setCacheNameDetails } from 'workbox-core';
import { registerRoute } from 'workbox-routing/registerRoute';
import { NetworkFirst, CacheFirst} from 'workbox-strategies';
import {precacheAndRoute} from 'workbox-precaching';

setCacheNameDetails({
  prefix: 'my-app',
  suffix: 'v1'
});

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images',
  }),
);

registerRoute(
  /\.csv$/,
  new NetworkFirst({
    cacheName: 'csv',
  }),
);

registerRoute(/\.(?:js|css)$/, new NetworkFirst());

precacheAndRoute([
  { url: '/', revision: '383676' },
  { url: '/index.html', revision: '383676' },
]);