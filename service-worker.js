// Service Worker – automatische Aktualisierung aktiviert

self.addEventListener("install", function (e) {
  self.skipWaiting(); // sofort aktiv
  e.waitUntil(
    caches.open("life-planner-cache").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/einkauf.html",
        "/ausgaben.html",
        "/ziele.html",
        "/wohnung.html",
        "/lebensmittel.html",
        "/drogerie.html",
        "/termine.html",
        "/manifest.json",
        "/icon-192.png",
        "/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  clients.claim(); // sorgt dafür, dass sofort neue Version aktiv wird
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
