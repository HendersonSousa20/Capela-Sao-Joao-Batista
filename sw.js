/**
 * sw.js — Service Worker da Capela São João Batista
 * -----------------------------------------------------------------------
 * Faz o site funcionar como PWA instalável e 100% funcional offline
 * depois da primeira visita — inclusive a Liturgia de Hoje, o Santo do
 * Dia, o Terço Guiado e a Via Sacra, já que tudo isso é calculado local-
 * mente (ver js/liturgy.js). O service worker só cuida de ENTREGAR os
 * arquivos sem precisar de rede; a lógica do dia continua sendo 100% do
 * navegador da pessoa, com ou sem internet.
 *
 * IMPORTANTE PARA QUEM FOR MANTER ESTE ARQUIVO NO FUTURO:
 * Sempre que qualquer arquivo do site mudar (HTML, CSS ou JS), aumente
 * o número em CACHE_VERSION abaixo. Isso cria um cache novo e descarta
 * o antigo — sem isso, quem já instalou o app poderia ficar preso numa
 * versão desatualizada do site por tempo indefinido.
 * -----------------------------------------------------------------------
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = "capela-sjb-" + CACHE_VERSION;

// Arquivos do próprio site: sempre existem e sempre têm o mesmo endereço,
// então podem ser guardados assim que o service worker é instalado.
const ARQUIVOS_PROPRIOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/config.js",
  "./js/liturgy.js",
  "./js/content.js",
  "./js/dailyfaith.js",
  "./js/rosary.js",
  "./js/waystations.js",
  "./js/gallery.js",
  "./js/contact.js",
  "./js/ui.js",
  "./js/experience.js",
  "./js/main.js",
  "./img/logo capela.jpg",
  "./img/foto-da-capela.jpg",
  "./img/icons/icon-192.png",
  "./img/icons/icon-512.png",
  "./img/icons/icon-maskable-512.png",
  "./img/icons/apple-touch-icon.png",
  "./favicon.ico"
];

// Bibliotecas externas usadas pelo site (Tailwind gera todo o CSS em
// tempo real, então sem isso em cache o site abriria offline sem
// nenhum estilo). São endereços fixos, então também dá pra pré-cachear.
const ARQUIVOS_EXTERNOS = [
  "https://cdn.tailwindcss.com",
  "https://unpkg.com/lucide@latest",
  "https://fonts.googleapis.com/css2?family=Anton+SC&family=Montserrat:wght@300;400;500;600;700&display=swap"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // Os arquivos externos usam "no-cors" propositalmente: como vêm de
      // outro domínio, o navegador não deixa o service worker ler se
      // deram certo ou não (resposta "opaca"), mas ainda consegue
      // guardá-los e servi-los depois — o bastante para funcionar offline.
      const externos = ARQUIVOS_EXTERNOS.map(function (url) {
        return new Request(url, { mode: "no-cors" });
      });
      return cache.addAll(ARQUIVOS_PROPRIOS.concat(externos)).catch(function (erro) {
        // Nunca deixa a instalação inteira falhar por causa de UM arquivo
        // externo que porventura esteja fora do ar no momento da instalação
        // (ex.: a fonte não carregou agora); o site continua funcionando,
        // só sem cache prévio daquele item específico.
        console.warn("Capela SW: alguns arquivos não foram pré-cacheados.", erro);
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (nomesCaches) {
      return Promise.all(
        nomesCaches
          .filter(function (nome) { return nome.indexOf("capela-sjb-") === 0 && nome !== CACHE_NAME; })
          .map(function (nome) { return caches.delete(nome); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  const req = event.request;

  // Nunca interceptar métodos que não sejam leitura (ex.: nenhum POST
  // acontece neste site, mas é uma proteção barata de se ter).
  if (req.method !== "GET") return;

  // Navegação (o próprio index.html sendo carregado): tenta a rede
  // primeiro, pra sempre entregar a versão mais nova pra quem está
  // online, e só cai pro cache quando estiver realmente offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(function () {
        return caches.match("./index.html");
      })
    );
    return;
  }

  // Todo o resto (CSS, JS, imagens, fontes, Tailwind, Lucide): serve do
  // cache na hora, se existir (site abre instantaneamente), e atualiza o
  // cache por trás das cenas para a próxima visita — o clássico
  // "stale-while-revalidate". Se ainda não tiver em cache, busca da rede
  // e guarda para as próximas vezes.
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(req).then(function (respostaEmCache) {
        const buscaDaRede = fetch(req).then(function (respostaDaRede) {
          cache.put(req, respostaDaRede.clone());
          return respostaDaRede;
        }).catch(function () {
          // Sem rede e sem essa resposta em cache: não tem o que fazer
          // para este item específico (ex.: uma foto da galeria nunca
          // visitada antes) — o site continua funcionando no restante.
          return respostaEmCache;
        });

        return respostaEmCache || buscaDaRede;
      });
    })
  );
});
