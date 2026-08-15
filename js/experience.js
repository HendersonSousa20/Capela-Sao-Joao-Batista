/**
 * experience.js
 * -----------------------------------------------------------------------
 * Camada de polimento visual "de nível mundial": animações de entrada
 * suaves conforme o visitante rola a página, barra de progresso de
 * leitura, botão flutuante de voltar ao topo, e um brilho sutil que seR
 * segue o cursor no hero. Tudo em CSS/JS puro, sem bibliotecas externas.
 * -----------------------------------------------------------------------
 */
window.CapelaExperience = (function () {

  function initScrollReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  function initAutoRevealGroups() {
    // Aplica data-reveal automaticamente a filhos diretos de containers
    // marcados com data-reveal-group, com atraso escalonado (stagger),
    // sem precisar anotar cada card manualmente no HTML.
    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.setAttribute("data-reveal", "");
        child.style.transitionDelay = Math.min(i * 80, 480) + "ms";
      });
    });
  }

  function initReadingProgress() {
    const bar = document.getElementById("reading-progress");
    if (!bar) return;
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("opacity-0", window.scrollY < 600);
      btn.classList.toggle("pointer-events-none", window.scrollY < 600);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initHeroGlow() {
    const hero = document.getElementById("home");
    if (!hero || window.matchMedia("(pointer: coarse)").matches) return; // pula em telas de toque
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--glow-x", x + "%");
      hero.style.setProperty("--glow-y", y + "%");
    });
  }

  function init() {
    initAutoRevealGroups();
    initScrollReveal();
    initReadingProgress();
    initBackToTop();
    initHeroGlow();
  }

  return { init: init };
})();
