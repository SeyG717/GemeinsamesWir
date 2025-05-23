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
        "/icon-512.png",
        "/profil.jpg" // NEU: Profilbild hinzufügen
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  clients.claim(); // neue Version direkt aktiv
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
