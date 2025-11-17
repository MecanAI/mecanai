// Service Worker completo com todas as funcionalidades PWA
const CACHE_NAME = 'mecanai-v1';
const RUNTIME_CACHE = 'mecanai-runtime';

// Recursos essenciais para cache offline
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Instalação - cachear recursos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Ativação - limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - estratégia Network First com fallback para cache
self.addEventListener('fetch', (event) => {
  // Ignorar requisições não-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          // Cachear resposta válida
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // Fallback para cache se offline
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Retornar página offline se disponível
            return caches.match('/');
          });
        });
    })
  );
});

// Background Sync - sincronização em segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-diagnostics') {
    event.waitUntil(syncDiagnostics());
  }
});

async function syncDiagnostics() {
  try {
    // Lógica de sincronização de diagnósticos
    console.log('Sincronizando diagnósticos em segundo plano...');
    // Aqui você pode adicionar lógica para sincronizar dados pendentes
    return Promise.resolve();
  } catch (error) {
    console.error('Erro na sincronização:', error);
    return Promise.reject(error);
  }
}

// Push Notifications - suporte a notificações push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver agora',
        icon: '/icons/icon-192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MecanAI', options)
  );
});

// Notification Click - ação ao clicar na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic Background Sync - sincronização periódica
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-diagnostics') {
    event.waitUntil(updateDiagnostics());
  }
});

async function updateDiagnostics() {
  try {
    console.log('Atualizando diagnósticos periodicamente...');
    // Lógica de atualização periódica
    return Promise.resolve();
  } catch (error) {
    console.error('Erro na atualização periódica:', error);
    return Promise.reject(error);
  }
}

// Message - comunicação com o cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
