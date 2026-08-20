/**
 * gallery.js
 * -----------------------------------------------------------------------
 * Carrossel de fotos, 100% orientado por dados (CapelaConfig.galeria).
 * Não tem limite de quantidade — 1 foto ou 50 fotos formam o mesmo
 * carrossel, sem precisar mexer em nada além da lista em config.js.
 *
 * Se a lista estiver vazia (nenhuma foto publicada ainda), mostra um
 * convite elegante para seguir o Instagram, no lugar do carrossel — nunca
 * um carrossel vazio ou uma imagem quebrada.
 *
 * Técnica: scroll horizontal nativo com CSS scroll-snap (funciona com
 * gesto de arrastar no celular, sem nenhuma biblioteca), com setas e
 * bolinhas de posição controladas por um pouquinho de JS por cima.
 *
 * Para publicar fotos: salve o arquivo em img/galeria/ e adicione uma
 * linha em CapelaConfig.galeria (js/config.js). Pronto — o carrossel se
 * ajusta sozinho pra quantidade nova.
 * -----------------------------------------------------------------------
 */
window.CapelaGallery = (function () {
  const cfg = window.CapelaConfig;

  function cardFoto(item, index) {
    return (
      '<button type="button" data-gallery-abrir="' + index + '" aria-label="Ampliar foto: ' + item.titulo + '" ' +
        'class="group relative h-full w-full text-left overflow-hidden rounded-3xl cursor-pointer shadow-lg bg-gray-800 block">' +
        '<img src="' + item.arquivo + '" alt="' + item.alt + '" loading="lazy" ' +
          'onerror="this.closest(\'[data-gallery-slide]\').remove()" ' +
          'class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">' +
          '<div>' +
            '<span class="text-liturgy-primary font-bold uppercase tracking-widest text-[10px] block mb-1">' + item.categoria + '</span>' +
            '<h4 class="text-white font-display text-lg uppercase tracking-wide">' + item.titulo + '</h4>' +
          '</div>' +
        '</div>' +
        '<div class="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-dark/60 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">' +
          '<i data-lucide="expand" class="w-4 h-4 text-white"></i>' +
        '</div>' +
      '</button>'
    );
  }

  function cardConviteInstagram() {
    return (
      '<a href="' + cfg.redesSociais.instagram.url + '" target="_blank" rel="noopener" ' +
        'class="group relative h-full overflow-hidden rounded-3xl cursor-pointer shadow-lg bg-gradient-to-br from-liturgy-primary/20 to-brand-dark border border-white/10 flex flex-col items-center justify-center text-center p-6 hover:border-liturgy-primary/50 transition-colors">' +
        '<i data-lucide="instagram" class="w-8 h-8 text-liturgy-primary mb-3 group-hover:scale-110 transition-transform"></i>' +
        '<span class="text-white font-display text-base uppercase tracking-wide leading-tight">Veja mais fotos<br>no Instagram</span>' +
        '<span class="text-gray-400 text-xs mt-2">' + cfg.redesSociais.instagram.handle + '</span>' +
      '</a>'
    );
  }

  function estadoSemFotos(container) {
    container.innerHTML =
      '<div class="w-full flex flex-col items-center justify-center text-center py-16 px-6 rounded-3xl border border-white/10 bg-white/5">' +
        '<i data-lucide="camera" class="w-10 h-10 text-liturgy-primary mb-4"></i>' +
        '<h4 class="text-white font-display text-2xl uppercase mb-2">Nossa galeria está de portas abertas</h4>' +
        '<p class="text-gray-400 max-w-md mb-6">Estamos organizando o acervo de fotos da comunidade. Enquanto isso, acompanhe os registros mais recentes das nossas celebrações direto no Instagram.</p>' +
        '<a href="' + cfg.redesSociais.instagram.url + '" target="_blank" rel="noopener" class="group flex items-center gap-3 text-white uppercase tracking-widest text-[10px] font-bold px-6 py-3 border border-white/20 rounded-full hover:bg-liturgy-primary hover:border-liturgy-primary transition-all duration-300">' +
          'Seguir ' + cfg.redesSociais.instagram.handle + ' <i data-lucide="arrow-up-right" class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>' +
        '</a>' +
      '</div>';
  }

  // Calcula quantos "slides" cabem por vez, só pra saber o passo do
  // scroll ao clicar nas setas — o layout em si é 100% responsivo via
  // classes de largura (Tailwind), isso aqui só afeta o comportamento
  // do clique.
  function larguraDeUmSlide(track) {
    const primeiro = track.querySelector("[data-gallery-slide]");
    if (!primeiro) return track.clientWidth;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
    return primeiro.getBoundingClientRect().width + gap;
  }

  function atualizarBolinhas(track, dotsContainer) {
    const slides = [].slice.call(track.querySelectorAll("[data-gallery-slide]"));
    if (slides.length <= 1) { dotsContainer.innerHTML = ""; return; }

    const passo = larguraDeUmSlide(track);
    const indiceAtivo = passo > 0 ? Math.round(track.scrollLeft / passo) : 0;

    const bolinhas = slides.map(function (_, i) {
      const ativo = i === Math.min(indiceAtivo, slides.length - 1);
      return '<button data-dot-index="' + i + '" aria-label="Ir para foto ' + (i + 1) + '" class="w-2.5 h-2.5 rounded-full transition-all duration-300 ' +
        (ativo ? "bg-liturgy-primary scale-125" : "bg-white/25 hover:bg-white/40") + '"></button>';
    });
    dotsContainer.innerHTML = bolinhas.join("");
  }

  function montarCarrossel(container, fotos) {
    const slides = fotos.map(function (item, index) {
      return '<div data-gallery-slide class="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31%] h-full">' + cardFoto(item, index) + '</div>';
    });
    // Sempre fecha com um convite ao Instagram, seja qual for a
    // quantidade de fotos reais — assim a pessoa sempre tem um próximo
    // passo ao chegar ao fim do carrossel.
    slides.push('<div data-gallery-slide class="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31%] h-full">' + cardConviteInstagram() + '</div>');

    container.innerHTML =
      '<div class="relative">' +
        '<div id="galeria-track" class="flex gap-4 md:gap-6 h-[240px] md:h-[320px] overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">' +
          slides.join("") +
        '</div>' +
        '<button id="galeria-prev" aria-label="Foto anterior" class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-dark/70 hover:bg-liturgy-primary text-white items-center justify-center backdrop-blur transition-colors">' +
          '<i data-lucide="chevron-left" class="w-5 h-5"></i>' +
        '</button>' +
        '<button id="galeria-next" aria-label="Próxima foto" class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-dark/70 hover:bg-liturgy-primary text-white items-center justify-center backdrop-blur transition-colors">' +
          '<i data-lucide="chevron-right" class="w-5 h-5"></i>' +
        '</button>' +
      '</div>' +
      '<div id="galeria-dots" class="flex justify-center gap-2 mt-6"></div>';

    const track = document.getElementById("galeria-track");
    const dots = document.getElementById("galeria-dots");
    const prevBtn = document.getElementById("galeria-prev");
    const nextBtn = document.getElementById("galeria-next");

    prevBtn.addEventListener("click", function () {
      track.scrollBy({ left: -larguraDeUmSlide(track), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      track.scrollBy({ left: larguraDeUmSlide(track), behavior: "smooth" });
    });

    dots.addEventListener("click", function (event) {
      const dot = event.target.closest("[data-dot-index]");
      if (!dot) return;
      const idx = parseInt(dot.getAttribute("data-dot-index"), 10);
      track.scrollTo({ left: idx * larguraDeUmSlide(track), behavior: "smooth" });
    });

    let ticking = false;
    track.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        atualizarBolinhas(track, dots);
        ticking = false;
      });
    });

    atualizarBolinhas(track, dots);
  }

  // -----------------------------------------------------------------------
  // Lightbox: abre a foto em tela cheia ao clicar, com navegação entre as
  // fotos reais (o card de convite ao Instagram não entra aqui) por seta,
  // teclado ou clicando fora. Cria o overlay uma única vez e reaproveita.
  // -----------------------------------------------------------------------
  let lightboxEl = null;
  let fotosAtuais = [];
  let indiceAtual = 0;
  let elementoComFocoAntes = null;

  function garantirLightbox() {
    if (lightboxEl) return lightboxEl;

    const el = document.createElement("div");
    el.id = "galeria-lightbox";
    el.className = "hidden fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Foto ampliada");
    el.innerHTML =
      '<button id="lightbox-fechar" aria-label="Fechar" class="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-liturgy-primary text-white flex items-center justify-center transition-colors z-10">' +
        '<i data-lucide="x" class="w-5 h-5"></i>' +
      '</button>' +
      '<button id="lightbox-prev" aria-label="Foto anterior" class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-liturgy-primary text-white flex items-center justify-center transition-colors z-10">' +
        '<i data-lucide="chevron-left" class="w-6 h-6"></i>' +
      '</button>' +
      '<button id="lightbox-next" aria-label="Próxima foto" class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-liturgy-primary text-white flex items-center justify-center transition-colors z-10">' +
        '<i data-lucide="chevron-right" class="w-6 h-6"></i>' +
      '</button>' +
      '<div class="max-w-4xl w-full flex flex-col items-center">' +
        '<img id="lightbox-img" src="" alt="" class="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain">' +
        '<div class="text-center mt-4">' +
          '<span id="lightbox-categoria" class="text-liturgy-primary font-bold uppercase tracking-widest text-[10px] block mb-1"></span>' +
          '<h4 id="lightbox-titulo" class="text-white font-display text-xl uppercase tracking-wide"></h4>' +
          '<p id="lightbox-contador" class="text-white/40 text-xs mt-2"></p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);

    el.querySelector("#lightbox-fechar").addEventListener("click", fecharLightbox);
    el.querySelector("#lightbox-prev").addEventListener("click", function () { navegarLightbox(-1); });
    el.querySelector("#lightbox-next").addEventListener("click", function () { navegarLightbox(1); });
    el.addEventListener("click", function (event) {
      if (event.target === el) fecharLightbox();
    });
    document.addEventListener("keydown", function (event) {
      if (el.classList.contains("hidden")) return;
      if (event.key === "Escape") fecharLightbox();
      if (event.key === "ArrowLeft") navegarLightbox(-1);
      if (event.key === "ArrowRight") navegarLightbox(1);
    });

    lightboxEl = el;
    return el;
  }

  function renderizarSlideLightbox() {
    const item = fotosAtuais[indiceAtual];
    if (!item) return;
    document.getElementById("lightbox-img").setAttribute("src", item.arquivo);
    document.getElementById("lightbox-img").setAttribute("alt", item.alt);
    document.getElementById("lightbox-categoria").textContent = item.categoria;
    document.getElementById("lightbox-titulo").textContent = item.titulo;
    document.getElementById("lightbox-contador").textContent = (indiceAtual + 1) + " de " + fotosAtuais.length;

    const multiplasFotos = fotosAtuais.length > 1;
    lightboxEl.querySelector("#lightbox-prev").classList.toggle("hidden", !multiplasFotos);
    lightboxEl.querySelector("#lightbox-next").classList.toggle("hidden", !multiplasFotos);
  }

  function navegarLightbox(delta) {
    if (fotosAtuais.length <= 1) return;
    indiceAtual = (indiceAtual + delta + fotosAtuais.length) % fotosAtuais.length;
    renderizarSlideLightbox();
  }

  function abrirLightbox(fotos, index) {
    fotosAtuais = fotos;
    indiceAtual = index;
    elementoComFocoAntes = document.activeElement;

    const el = garantirLightbox();
    if (window.lucide) lucide.createIcons();
    renderizarSlideLightbox();
    el.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    el.querySelector("#lightbox-fechar").focus();
  }

  function fecharLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.add("hidden");
    document.body.style.overflow = "";
    if (elementoComFocoAntes && elementoComFocoAntes.focus) elementoComFocoAntes.focus();
  }

  function render() {
    const container = document.getElementById("galeria-grid");
    if (!container) return;

    const fotos = cfg.galeria || [];

    if (fotos.length === 0) {
      estadoSemFotos(container);
    } else {
      montarCarrossel(container, fotos);
      container.addEventListener("click", function (event) {
        const btn = event.target.closest("[data-gallery-abrir]");
        if (!btn) return;
        abrirLightbox(fotos, parseInt(btn.getAttribute("data-gallery-abrir"), 10));
      });
    }

    if (window.lucide) lucide.createIcons();
  }

  return { render: render };
})();
