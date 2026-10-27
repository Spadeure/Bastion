// Bastion · service worker: it only makes the game installable as an app (Android, PC).
// It keeps nothing in cache, so every update reaches the players at once (the game reloads itself after an update).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
