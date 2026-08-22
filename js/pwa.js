/**
 * pwa.js
 * -----------------------------------------------------------------------
 * Registra o service worker (sw.js) e controla o banner "Instalar o app
 * da Capela". Duas variantes, dependendo do navegador:
 *
 * - Android/Chrome/Edge: o navegador dispara o evento
 *   "beforeinstallprompt" quando julga o site instalável. Guardamos esse
 *   evento e só o disparamos quando a pessoa toca no nosso próprio botão
 *   (em vez do banner nativo do navegador, que é menos bonito e não dá
 *   pra customizar).
 * - iOS Safari: esse navegador NUNCA dispara "beforeinstallprompt" e não
 *   tem instalação automática — só dá pra instalar manualmente por
 *   Compartilhar → Adicionar à Tela de Início. Detectamos esse caso e
 *   trocamos o texto do banner para uma instrução em vez de um botão.
 *
 * Em ambos os casos, uma vez que a pessoa fecha o banner (ou já instalou
 * o app), ele não aparece de novo — guardado em localStorage.
 * -----------------------------------------------------------------------
 */
window.CapelaPWA = (function () {
  const CHAVE_DISPENSADO = "capela-pwa-banner-dispensado";
  let eventoInstalacao = null;

  function jaEstaInstalado() {
    // "standalone" é como o navegador informa que o site já está rodando
    // como app instalado (sem barra de endereço), tanto no Android/Chrome
    // quanto no iOS Safari (via navigator.standalone).
    const modoStandalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    const iosStandalone = window.navigator.standalone === true;
    return modoStandalone || iosStandalone;
  }

  function foiDispensado() {
    try {
      return localStorage.getItem(CHAVE_DISPENSADO) === "1";
    } catch (e) {
      return false; // sem localStorage disponível: melhor mostrar do que travar
    }
  }

  function marcarComoDispensado() {
    try {
      localStorage.setItem(CHAVE_DISPENSADO, "1");
    } catch (e) {
      // Se o navegador bloquear localStorage (modo privado, etc.), o
      // banner pode reaparecer em visitas futuras — não é grave.
    }
  }

  function ehIOS() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }

  function mostrarBanner(variante) {
    const banner = document.getElementById("pwa-instalar-banner");
    if (!banner) return;

    if (variante === "ios") {
      document.getElementById("pwa-instalar-titulo").textContent = "Adicione à Tela de Início";
      document.getElementById("pwa-instalar-texto").textContent = "Toque em Compartilhar e depois em \"Adicionar à Tela de Início\" para ter o app da capela sempre à mão — funciona até sem internet.";
      document.getElementById("pwa-instalar-btn").classList.add("hidden");
    }

    banner.classList.remove("hidden");
  }

  function esconderBanner() {
    const banner = document.getElementById("pwa-instalar-banner");
    if (banner) banner.classList.add("hidden");
  }

  function initBannerInstalacao() {
    if (jaEstaInstalado() || foiDispensado()) return;

    const fecharBtn = document.getElementById("pwa-instalar-fechar");
    if (fecharBtn) {
      fecharBtn.addEventListener("click", function () {
        esconderBanner();
        marcarComoDispensado();
      });
    }

    // Caminho Android/Chrome: espera o navegador avisar que dá pra instalar
    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      eventoInstalacao = event;
      mostrarBanner("padrao");

      const instalarBtn = document.getElementById("pwa-instalar-btn");
      if (instalarBtn) {
        instalarBtn.addEventListener("click", function () {
          esconderBanner();
          marcarComoDispensado();
          if (eventoInstalacao) eventoInstalacao.prompt();
        });
      }
    });

    // Caminho iOS Safari: não existe evento nenhum, então mostramos a
    // instrução manual depois de um pequeno atraso (dá tempo da pessoa
    // ver a página antes de qualquer banner aparecer).
    if (ehIOS()) {
      setTimeout(function () { mostrarBanner("ios"); }, 4000);
    }

    // Se o app já foi instalado durante esta mesma sessão, não precisa
    // mais incomodar — esconde e marca como dispensado.
    window.addEventListener("appinstalled", function () {
      esconderBanner();
      marcarComoDispensado();
    });
  }

  function registrarServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    // Registra depois do "load" para não competir por rede com os
    // recursos da própria primeira renderização da página.
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function (erro) {
        console.warn("Capela PWA: não foi possível registrar o service worker.", erro);
      });
    });
  }

  function init() {
    registrarServiceWorker();
    initBannerInstalacao();
  }

  return { init: init };
})();
