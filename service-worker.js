// Fortgeschrittener Service Worker mit Network-first Strategie

const CACHE_NAME = "life-planner-cache-v2";
const OFFLINE_FILES = [
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
  "/urlaub.html",
  "/termine.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/profil.jpg"
];

// Installiere Service Worker und cache grundlegende Dateien
self.addEventListener("install", event => {
  self.skipWaiting(); // sofort aktiv
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_FILES);
    })
  );
});

// Aktivieren: Alte Caches löschen
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  clients.claim(); // neue Version sofort übernehmen
});

// Network-First mit Fallback auf Cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Kopiere die Antwort in den Cache (nur GET und gleiche-Origin)
        if (
          event.request.method === "GET" &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Bei Netzwerkfehler → versuche aus Cache
        return caches.match(event.request);
      })
  );
});
