/**
 * gallery.js
 * -----------------------------------------------------------------------
 * A galeria é 100% orientada por dados (CapelaConfig.galeria).
 * Hoje o array está vazio porque ainda não recebemos fotos oficiais da
 * comunidade para publicar — em vez de mostrar imagens quebradas
 * (como acontecia antes, apontando para arquivos que não existiam),
 * o site mostra um convite elegante para seguir o Instagram.
 *
 * Para publicar fotos no futuro: salve o arquivo em img/galeria/ e
 * adicione uma linha em CapelaConfig.galeria (js/config.js). Pronto —
 * nenhuma outra alteração é necessária.
 * -----------------------------------------------------------------------
 */
window.CapelaGallery = (function () {
  const cfg = window.CapelaConfig;

  function cardFoto(item) {
    return (
      '<div class="group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg bg-gray-800">' +
        '<img src="' + item.arquivo + '" alt="' + item.alt + '" loading="lazy" ' +
          'onerror="this.closest(\'[data-gallery-card]\').remove()" ' +
          'class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">' +
          '<div>' +
            '<span class="text-liturgy-primary font-bold uppercase tracking-widest text-[10px] block mb-1">' + item.categoria + '</span>' +
            '<h4 class="text-white font-display text-lg uppercase tracking-wide">' + item.titulo + '</h4>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function cardConviteInstagram() {
    return (
      '<a href="' + cfg.redesSociais.instagram.url + '" target="_blank" rel="noopener" ' +
        'class="group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg bg-gradient-to-br from-liturgy-primary/20 to-brand-dark border border-white/10 flex flex-col items-center justify-center text-center p-6 hover:border-liturgy-primary/50 transition-colors">' +
        '<i data-lucide="instagram" class="w-8 h-8 text-liturgy-primary mb-3 group-hover:scale-110 transition-transform"></i>' +
        '<span class="text-white font-display text-base uppercase tracking-wide leading-tight">Veja mais fotos<br>no Instagram</span>' +
        '<span class="text-gray-400 text-xs mt-2">' + cfg.redesSociais.instagram.handle + '</span>' +
      '</a>'
    );
  }

  function render() {
    const container = document.getElementById("galeria-grid");
    if (!container) return;

    const fotos = (cfg.galeria || []).slice(0, 7);

    if (fotos.length === 0) {
      // Estado sem fotos: convite grande e acolhedor para o Instagram,
      // sem nenhum link ou imagem quebrada.
      container.innerHTML =
        '<div class="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center text-center py-16 px-6 rounded-3xl border border-white/10 bg-white/5">' +
          '<i data-lucide="camera" class="w-10 h-10 text-liturgy-primary mb-4"></i>' +
          '<h4 class="text-white font-display text-2xl uppercase mb-2">Nossa galeria está de portas abertas</h4>' +
          '<p class="text-gray-400 max-w-md mb-6">Estamos organizando o acervo de fotos da comunidade. Enquanto isso, acompanhe os registros mais recentes das nossas celebrações direto no Instagram.</p>' +
          '<a href="' + cfg.redesSociais.instagram.url + '" target="_blank" rel="noopener" class="group flex items-center gap-3 text-white uppercase tracking-widest text-[10px] font-bold px-6 py-3 border border-white/20 rounded-full hover:bg-liturgy-primary hover:border-liturgy-primary transition-all duration-300">' +
            'Seguir ' + cfg.redesSociais.instagram.handle + ' <i data-lucide="arrow-up-right" class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>' +
          '</a>' +
        '</div>';
      if (window.lucide) lucide.createIcons();
      return;
    }

    const cards = fotos.map(function (item, idx) {
      const spanClass = (idx === 0 || idx === fotos.length - 1) ? " md:col-span-2" : "";
      return '<div data-gallery-card class="' + spanClass.trim() + '">' + cardFoto(item) + '</div>';
    });

    // Preenche o resto do bento grid com convites ao Instagram
    while (cards.length < 4) cards.push('<div data-gallery-card>' + cardConviteInstagram() + '</div>');

    container.innerHTML = cards.join("");
    if (window.lucide) lucide.createIcons();
  }

  return { render: render };
})();
