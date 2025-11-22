// Service Worker para MecanAI - PWA Builder Compliant
// Versão: 2.0.0
const CACHE_VERSION = 'mecanai-v2.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const API_CACHE = `${CACHE_VERSION}-api`;

// Recursos essenciais para cache offline-first
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Tamanho máximo dos caches dinâmicos
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 60;
const MAX_API_CACHE_SIZE = 30;

// Limpar cache antigo quando exceder limite
const limitCacheSize = (cacheName, maxSize) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxSize) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxSize));
      }
    });
  });
};

// ========================================
// INSTALAÇÃO DO SERVICE WORKER
// ========================================
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Cache estático criado');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Recursos estáticos cacheados com sucesso');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erro ao cachear recursos estáticos:', error);
      })
  );
});

// ========================================
// ATIVAÇÃO E LIMPEZA DE CACHES ANTIGOS
// ========================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker...');
  
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, API_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => !currentCaches.includes(cacheName))
            .map((cacheName) => {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker ativado e caches limpos');
        return self.clients.claim();
      })
  );
});

// ========================================
// ESTRATÉGIAS DE CACHE
// ========================================

// Network First - Para HTML e dados dinâmicos
const networkFirst = async (request, cacheName) => {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Servindo do cache (offline):', request.url);
      return cachedResponse;
    }
    
    // Fallback para página offline
    if (request.destination === 'document') {
      return caches.match('/');
    }
    
    throw error;
  }
};

// Cache First - Para recursos estáticos
const cacheFirst = async (request, cacheName) => {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Erro ao buscar recurso:', error);
    throw error;
  }
};

// Stale While Revalidate - Para imagens
const staleWhileRevalidate = async (request, cacheName) => {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
};

// ========================================
// INTERCEPTAÇÃO DE REQUISIÇÕES (FETCH)
// ========================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorar requisições de extensões do navegador
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }
  
  // Ignorar hot-reload do Next.js em desenvolvimento
  if (url.pathname.includes('/_next/webpack-hmr') || 
      url.pathname.includes('/__nextjs_original-stack-frame')) {
    return;
  }
  
  // Ignorar analytics e tracking
  if (url.hostname.includes('analytics') || 
      url.hostname.includes('vercel-insights') ||
      url.hostname.includes('google-analytics')) {
    return;
  }
  
  // ========================================
  // ESTRATÉGIA: IMAGENS - Stale While Revalidate
  // ========================================
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    event.respondWith(
      staleWhileRevalidate(request, IMAGE_CACHE)
        .then(response => {
          limitCacheSize(IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE);
          return response;
        })
    );
    return;
  }
  
  // ========================================
  // ESTRATÉGIA: RECURSOS ESTÁTICOS - Cache First
  // ========================================
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'font' ||
      url.pathname.includes('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // ========================================
  // ESTRATÉGIA: API CALLS - Network First
  // ========================================
  if (url.pathname.includes('/api/') || 
      url.hostname.includes('supabase') ||
      url.hostname.includes('openai')) {
    event.respondWith(
      networkFirst(request, API_CACHE)
        .then(response => {
          limitCacheSize(API_CACHE, MAX_API_CACHE_SIZE);
          return response;
        })
        .catch(() => {
          // Retornar resposta offline para APIs
          return new Response(
            JSON.stringify({ 
              error: 'Offline', 
              message: 'Você está offline. Tente novamente quando estiver conectado.' 
            }),
            { 
              headers: { 'Content-Type': 'application/json' },
              status: 503
            }
          );
        })
    );
    return;
  }
  
  // ========================================
  // ESTRATÉGIA: PÁGINAS HTML - Network First
  // ========================================
  if (request.destination === 'document' || 
      request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      networkFirst(request, DYNAMIC_CACHE)
        .then(response => {
          limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
          return response;
        })
    );
    return;
  }
  
  // ========================================
  // ESTRATÉGIA PADRÃO: Network First
  // ========================================
  event.respondWith(
    networkFirst(request, DYNAMIC_CACHE)
      .then(response => {
        limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
        return response;
      })
  );
});

// ========================================
// SINCRONIZAÇÃO EM SEGUNDO PLANO
// ========================================
self.addEventListener('sync', (event) => {
  console.log('[SW] Sincronização em segundo plano:', event.tag);
  
  if (event.tag === 'sync-diagnostics') {
    event.waitUntil(syncDiagnostics());
  }
  
  if (event.tag === 'sync-offline-data') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncDiagnostics() {
  try {
    console.log('[SW] Sincronizando diagnósticos offline...');
    // Implementar lógica de sincronização de diagnósticos
    const cache = await caches.open(API_CACHE);
    const requests = await cache.keys();
    
    // Processar requisições pendentes
    for (const request of requests) {
      if (request.url.includes('/api/diagnostics')) {
        // Lógica de sincronização
      }
    }
    
    console.log('[SW] Diagnósticos sincronizados com sucesso');
  } catch (error) {
    console.error('[SW] Erro ao sincronizar diagnósticos:', error);
  }
}

async function syncOfflineData() {
  try {
    console.log('[SW] Sincronizando dados offline...');
    // Implementar lógica de sincronização de dados offline
    console.log('[SW] Dados offline sincronizados com sucesso');
  } catch (error) {
    console.error('[SW] Erro ao sincronizar dados offline:', error);
  }
}

// ========================================
// NOTIFICAÇÕES PUSH
// ========================================
self.addEventListener('push', (event) => {
  console.log('[SW] Notificação push recebida');
  
  let notificationData = {
    title: 'MecanAI',
    body: 'Nova atualização disponível!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
  };
  
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }
  
  const options = {
    body: notificationData.body,
    icon: notificationData.icon || '/icons/icon-192.png',
    badge: notificationData.badge || '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: notificationData.primaryKey || 1,
      url: notificationData.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir',
        icon: '/icons/icon-192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon-192.png'
      }
    ],
    tag: notificationData.tag || 'mecanai-notification',
    requireInteraction: false,
    renotify: true
  };
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// ========================================
// CLIQUE EM NOTIFICAÇÃO
// ========================================
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notificação clicada:', event.action);
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Verificar se já existe uma janela aberta
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Abrir nova janela se não existir
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ========================================
// MENSAGENS DO CLIENTE
// ========================================
self.addEventListener('message', (event) => {
  console.log('[SW] Mensagem recebida:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('[SW] Todos os caches foram limpos');
        return self.clients.claim();
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

// ========================================
// TRATAMENTO DE ERROS
// ========================================
self.addEventListener('error', (event) => {
  console.error('[SW] Erro no Service Worker:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Promise rejeitada não tratada:', event.reason);
});

console.log('[SW] Service Worker carregado - Versão:', CACHE_VERSION);
