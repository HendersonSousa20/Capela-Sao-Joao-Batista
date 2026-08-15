/**
 * ui.js
 * -----------------------------------------------------------------------
 * Interações puramente visuais: menu mobile, encolher o header ao rolar,
 * abrir/fechar respostas do FAQ, e o ano do rodapé (sempre atual,
 * nunca mais precisa ser editado a cada virada de ano).
 * -----------------------------------------------------------------------
 */
window.CapelaUI = (function () {

  function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!menuBtn || !closeMenuBtn || !mobileMenu) return;

    const mobileLinks = document.querySelectorAll(".mobile-link");

    function toggleMenu() {
      const isClosed = mobileMenu.classList.contains("opacity-0");
      if (isClosed) {
        mobileMenu.classList.remove("opacity-0", "pointer-events-none");
        document.body.style.overflow = "hidden";
      } else {
        mobileMenu.classList.add("opacity-0", "pointer-events-none");
        document.body.style.overflow = "";
      }
    }

    menuBtn.addEventListener("click", toggleMenu);
    closeMenuBtn.addEventListener("click", toggleMenu);
    mobileLinks.forEach(function (link) { link.addEventListener("click", toggleMenu); });
  }

  function initNavbarScroll() {
    const header = document.getElementById("main-header");
    if (!header) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("py-2", "shadow-md");
        header.classList.remove("py-4");
      } else {
        header.classList.remove("py-2", "shadow-md");
        header.classList.add("py-4");
      }
    });
  }

  function initFaqToggle() {
    // Delegação de evento: funciona mesmo que o FAQ seja re-renderizado
    document.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-faq-toggle]");
      if (!btn) return;

      const index = btn.getAttribute("data-faq-toggle");
      const ans = document.getElementById("ans-" + index);
      const icon = document.getElementById("icon-" + index);
      if (!ans || !icon) return;

      if (ans.style.maxHeight) {
        ans.style.maxHeight = null;
        icon.classList.remove("rotate-180");
      } else {
        document.querySelectorAll('[id^="ans-"]').forEach(function (el) { el.style.maxHeight = null; });
        document.querySelectorAll('[id^="icon-"]').forEach(function (el) { el.classList.remove("rotate-180"); });
        ans.style.maxHeight = ans.scrollHeight + "px";
        icon.classList.add("rotate-180");
      }
    });
  }

  function setCurrentYear() {
    const el = document.getElementById("current-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    initMobileMenu();
    initNavbarScroll();
    initFaqToggle();
    setCurrentYear();
  }

  return { init: init };
})();
