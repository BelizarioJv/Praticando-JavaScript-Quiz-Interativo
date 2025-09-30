const CACHE_NAME = "quiz-pwa-v2";
const FILES_TO_CACHE = [
  "/index.html",
  "/style/style.css",
  "/engine.js",
  "/offline.html",
  "/assets/pwaImages/pwa192.png",
  "/assets/pwaImages/pwa512.png",
  "/manifest.json",
  "/sw.js"
];

// Instala e faz cache dos arquivos definidos
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // Garante que o SW seja ativado imediatamente
});

// Ativa o service worker e limpa caches antigos
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // Assume o controle das páginas
});

// Intercepta requisições e usa cache como fallback
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        return response;
      })
      .catch(() => {
        return caches.match(e.request).then(res => {
          // Se não encontrado, retorna a offline.html
          return res || caches.match("/offline.html");
        });
      })
  );
});
