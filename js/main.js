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

  function applyLiturgyColor(color, soft) {
    document.documentElement.style.setProperty("--liturgy-main", color);
    document.documentElement.style.setProperty("--liturgy-soft", soft);
    document.documentElement.style.setProperty("--liturgy-main-rgb", hexToRgb(color));
  }

  // Cálculo local (instantâneo, sempre correto para o tempo litúrgico
  // "geral" do calendário). Aplicado primeiro para não haver flash sem
  // cor enquanto a API (mais precisa, considera festas específicas)
  // ainda está carregando.
  function updateLiturgyUILocal() {
    const season = CapelaLiturgy.getLiturgicalSeason();
    applyLiturgyColor(season.color, season.soft);

    const bar = document.getElementById("liturgy-bar");
    if (bar) bar.innerHTML = '<span class="opacity-80">Você está navegando no</span> <br class="md:hidden"> ' + season.name;

    const seasonName = document.getElementById("liturgy-season-name");
    if (seasonName) seasonName.innerText = season.name;

    return season;
  }

  // Refinamento com a cor litúrgica OFICIAL do dia, vinda da API católica
  // (considera festas e memórias de santos que o cálculo local não sabe).
  // Se a API falhar, o site simplesmente mantém o cálculo local — nunca
  // fica sem cor ou quebrado.
  function refineLiturgyUIFromAPI() {
    if (!window.CapelaCatholicAPI) return;
    CapelaCatholicAPI.getLiturgiaHoje().then(function (data) {
      const corInfo = data && data.today && CapelaCatholicAPI.corLiturgicaParaTema(data.today.color);
      if (!corInfo) return;
      applyLiturgyColor(corInfo.hex, corInfo.soft);

      const seasonName = document.getElementById("liturgy-season-name");
      const bar = document.getElementById("liturgy-bar");
      const titulo = data.today.entry_title;
      if (titulo) {
        if (seasonName) seasonName.innerText = titulo;
        if (bar) bar.innerHTML = '<span class="opacity-80">Hoje a liturgia celebra:</span> <br class="md:hidden"> ' + titulo;
      }
    }).catch(function () {
      // Silenciosamente mantém o cálculo local — sem erro visível ao usuário.
    });
  }

  updateLiturgyUILocal();
  refineLiturgyUIFromAPI();

  CapelaContent.renderPastorais();
  CapelaContent.renderFAQ();
  CapelaContent.renderHorariosResumo();
  CapelaContent.renderContato();
  CapelaContent.renderStatusFaixa();
  CapelaContent.renderContagemFesta();
  CapelaGallery.render();
  CapelaContact.init();
  CapelaUI.init();

  if (window.CapelaDailyFaith) CapelaDailyFaith.init();

  if (window.lucide) lucide.createIcons();

  // A experiência visual (reveal on scroll etc.) precisa rodar depois que
  // todo o conteúdo dinâmico acima já foi inserido no DOM.
  if (window.CapelaExperience) CapelaExperience.init();

  // Tempo litúrgico e status "aberto agora" são recalculados periodicamente
  // caso a aba fique aberta por muito tempo — sem precisar recarregar.
  setInterval(updateLiturgyUILocal, 1000 * 60 * 60); // a cada hora
  setInterval(function () {
    CapelaContent.renderStatusFaixa();
    CapelaContent.renderContagemFesta();
    if (window.lucide) lucide.createIcons();
  }, 1000 * 60 * 5); // a cada 5 minutos
});
