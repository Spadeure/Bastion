// Bastion · service worker: it only makes the game installable as an app (Android, PC).
// It keeps nothing in cache, so every update reaches the players at once (the game reloads itself after an update).
// It also shows the notifications sent by the server (see server/notify.js).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
// Notifications (sent by the server even when the game is closed): show them, and open the game when one is touched.
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'Bastion', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Bastion', {
    body: d.body || '', tag: d.tag || 'bastion', renotify: true, icon: d.icon || 'assets/app/icon-192.png', badge: 'assets/app/icon-192.png',
    timestamp: d.ts || Date.now(), data: { url: d.url || './?app=1' } }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
    return self.clients.openWindow(url);
  }));
});
