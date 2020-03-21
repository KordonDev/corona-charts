importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

import {setCacheNameDetails} from 'workbox-core';
import {registerRoute} from 'workbox-routing/registerRoute';
import {CacheFirst } from 'workbox-strategies/CacheFirst';
import { NetworkFirst } from 'workbox-strategies/NetworkFirst';

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