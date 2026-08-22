/**
 * main.js
 * -----------------------------------------------------------------------
 * Orquestra a inicialização de todos os módulos. Este é o único script
 * que "faz" alguma coisa sozinho — todos os outros só definem funções.
 * -----------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", function () {

  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? (parseInt(m[1], 16) + ", " + parseInt(m[2], 16) + ", " + parseInt(m[3], 16)) : "45, 90, 39";
  }

  // A cor litúrgica do site vem SEMPRE do algoritmo local (cálculo da
  // Páscoa em js/liturgy.js) — é 100% matemático, não depende de internet
  // nem de nenhuma API, e por isso nunca falha. De propósito, nenhuma
  // API externa participa dessa decisão.
  function updateLiturgyUI() {
    const season = CapelaLiturgy.getLiturgicalSeason();

    document.documentElement.style.setProperty("--liturgy-main", season.color);
    document.documentElement.style.setProperty("--liturgy-soft", season.soft);
    document.documentElement.style.setProperty("--liturgy-main-rgb", hexToRgb(season.color));

    const bar = document.getElementById("liturgy-bar");
    if (bar) bar.innerHTML = '<span class="opacity-80">Você está navegando no</span> <br class="md:hidden"> ' + season.name;

    const seasonName = document.getElementById("liturgy-season-name");
    if (seasonName) seasonName.innerText = season.name;
  }

  updateLiturgyUI();

  CapelaContent.renderPastorais();
  CapelaContent.renderFAQ();
  CapelaContent.renderHorariosResumo();
  CapelaContent.renderContato();
  CapelaContent.renderStatusFaixa();
  CapelaContent.renderContagemFesta();
  CapelaGallery.render();
  CapelaContact.init();
  CapelaUI.init();

  // Conteúdo do dia (Liturgia, Santo, Terço, Catecismo): tudo calculado
  // localmente em js/liturgy.js + js/dailyfaith.js — sem chamada de rede,
  // então nunca fica em estado de erro nem trava o resto da página.
  if (window.CapelaDailyFaith) CapelaDailyFaith.init();
  if (window.CapelaRosaryGuide) CapelaRosaryGuide.init();
  if (window.CapelaWayStations) CapelaWayStations.init();
  if (window.CapelaPWA) CapelaPWA.init();

  if (window.lucide) lucide.createIcons();

  // A experiência visual (reveal on scroll etc.) precisa rodar depois que
  // todo o conteúdo dinâmico acima já foi inserido no DOM.
  if (window.CapelaExperience) CapelaExperience.init();

  // Tempo litúrgico e status "aberto agora" são recalculados periodicamente
  // caso a aba fique aberta por muito tempo — sem precisar recarregar.
  setInterval(function () {
    updateLiturgyUI();
    // Recalcula Palavra Viva também, para o caso raro de a aba ficar
    // aberta atravessando a meia-noite (troca de dia, santo, mistério...).
    if (window.CapelaDailyFaith) CapelaDailyFaith.refresh();
    if (window.lucide) lucide.createIcons();
  }, 1000 * 60 * 60); // a cada hora
  setInterval(function () {
    CapelaContent.renderStatusFaixa();
    CapelaContent.renderContagemFesta();
    if (window.lucide) lucide.createIcons();
  }, 1000 * 60 * 5); // a cada 5 minutos
});
