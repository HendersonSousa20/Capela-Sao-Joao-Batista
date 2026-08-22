/**
 * waystations.js
 * -----------------------------------------------------------------------
 * Via Sacra Guiada: mesmo padrão de modal passo a passo do Terço Guiado
 * (js/rosary.js), adaptado para uma lista linear de 14 estações — sem
 * contador de contas, cada estação é um passo só (versículo, meditação
 * e intenção). Dados 100% em config.js → viaSacra, sem nenhuma lógica de
 * data ou cálculo: a Via Sacra fica disponível o ano inteiro.
 * -----------------------------------------------------------------------
 */
window.CapelaWayStations = (function () {
  const cfg = window.CapelaConfig;

  let modalEl = null;
  let steps = [];
  let stepIndex = 0;
  let elementoComFocoAntes = null;

  function construirSteps() {
    const dados = cfg.viaSacra;
    const o = cfg.oracoesTradicionais || {};
    if (!dados || !dados.estacoes || dados.estacoes.length === 0) return [];

    const passos = [];
    passos.push({
      titulo: "Sinal da Cruz",
      oracaoTexto: o.sinalDaCruz,
      nota: "Um caminho de 14 estações pela Paixão do Senhor"
    });

    dados.estacoes.forEach(function (e) {
      passos.push({
        titulo: e.numero + "ª Estação",
        subtitulo: e.titulo,
        nota: e.base,
        versiculo: dados.versiculo,
        meditacao: e.meditacao,
        intencao: e.intencao
      });
    });

    passos.push({
      titulo: "Encerramento",
      oracaoTexto: "Senhor Jesus, que por amor a nós percorrestes o caminho da cruz até a morte, dai-nos a graça de Vos seguir fielmente, carregando com fé as cruzes da nossa vida, na esperança certa da Ressurreição. Amém.",
      extraLabel: "Sinal da Cruz",
      extraTexto: o.sinalDaCruz
    });

    return passos;
  }

  function criarModal() {
    if (modalEl) return modalEl;

    const el = document.createElement("div");
    el.id = "via-sacra-modal";
    el.className = "hidden fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center p-4";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Via Sacra Guiada");
    el.innerHTML =
      '<div class="w-full max-w-lg bg-brand-light rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">' +
        '<div class="px-6 pt-5 pb-3 shrink-0">' +
          '<div class="flex items-center justify-between mb-3">' +
            '<span class="text-liturgy-primary transition-liturgy font-bold uppercase tracking-widest text-[10px]">Via Sacra Guiada</span>' +
            '<button id="via-sacra-fechar" aria-label="Fechar" class="w-9 h-9 rounded-full bg-brand-dark/5 hover:bg-liturgy-primary hover:text-white flex items-center justify-center transition-colors">' +
              '<i data-lucide="x" class="w-4 h-4"></i>' +
            '</button>' +
          '</div>' +
          '<div class="w-full h-1.5 bg-brand-dark/10 rounded-full overflow-hidden">' +
            '<div id="via-sacra-progresso" class="h-full bg-liturgy-primary transition-liturgy transition-all duration-300" style="width:0%"></div>' +
          '</div>' +
          '<p id="via-sacra-passo-label" class="text-gray-400 text-[10px] uppercase tracking-widest mt-2"></p>' +
        '</div>' +
        '<div id="via-sacra-conteudo" class="px-6 py-4 overflow-y-auto grow"></div>' +
        '<div class="px-6 py-4 border-t border-brand-dark/10 flex items-center justify-between gap-3 shrink-0">' +
          '<button id="via-sacra-voltar" class="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-brand-dark/5 transition-colors">Voltar</button>' +
          '<button id="via-sacra-avancar" class="flex-1 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-dark text-white hover:bg-liturgy-primary transition-colors">Avançar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);

    el.querySelector("#via-sacra-fechar").addEventListener("click", fecharModal);
    el.addEventListener("click", function (event) {
      if (event.target === el) fecharModal();
    });
    document.addEventListener("keydown", function (event) {
      if (el.classList.contains("hidden")) return;
      if (event.key === "Escape") fecharModal();
      if (event.key === "ArrowRight") irPara(stepIndex + 1);
      if (event.key === "ArrowLeft") irPara(stepIndex - 1);
    });
    el.querySelector("#via-sacra-voltar").addEventListener("click", function () { irPara(stepIndex - 1); });
    el.querySelector("#via-sacra-avancar").addEventListener("click", function () {
      if (stepIndex >= steps.length - 1) { fecharModal(); return; }
      irPara(stepIndex + 1);
    });

    modalEl = el;
    return el;
  }

  function renderStep() {
    const passo = steps[stepIndex];
    if (!passo) return;

    document.getElementById("via-sacra-passo-label").textContent = "Passo " + (stepIndex + 1) + " de " + steps.length;
    document.getElementById("via-sacra-progresso").style.width = Math.round(((stepIndex + 1) / steps.length) * 100) + "%";

    let html = "";
    html += '<h3 class="font-display text-2xl uppercase text-brand-dark leading-tight">' + passo.titulo + '</h3>';
    if (passo.subtitulo) html += '<p class="text-liturgy-primary transition-liturgy font-medium mt-1">' + passo.subtitulo + '</p>';
    if (passo.nota) html += '<p class="text-gray-400 text-xs uppercase tracking-widest mt-2">' + passo.nota + '</p>';

    if (passo.versiculo) {
      html += '<div class="mt-5 text-center bg-white rounded-2xl p-5 border border-brand-dark/5">' +
        '<p class="text-gray-700 italic">V. ' + passo.versiculo.v + '</p>' +
        '<p class="text-gray-700 italic">R. ' + passo.versiculo.r + '</p>' +
        '</div>';
    }

    if (passo.meditacao) {
      html += '<p class="text-gray-600 leading-relaxed mt-4">' + passo.meditacao + '</p>';
    }

    if (passo.intencao) {
      html += '<div class="border-l-2 border-liturgy-primary transition-liturgy pl-4 mt-4">' +
        '<p class="text-[10px] uppercase tracking-widest text-liturgy-primary transition-liturgy font-bold mb-1">Intenção</p>' +
        '<p class="text-gray-700 italic">' + passo.intencao + '</p>' +
        '</div>';
    }

    if (passo.oracaoTexto) {
      html += '<div class="mt-5 bg-white rounded-2xl p-5 border border-brand-dark/5">';
      if (passo.oracaoLabel) html += '<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">' + passo.oracaoLabel + '</p>';
      html += '<p class="text-gray-700 leading-relaxed text-[15px]">' + passo.oracaoTexto + '</p>';
      html += '</div>';
    }

    if (passo.extraTexto) {
      html += '<div class="mt-4 bg-white rounded-2xl p-5 border border-brand-dark/5">' +
        '<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">' + passo.extraLabel + '</p>' +
        '<p class="text-gray-700 leading-relaxed text-[15px]">' + passo.extraTexto + '</p>' +
        '</div>';
    }

    document.getElementById("via-sacra-conteudo").innerHTML = html;

    document.getElementById("via-sacra-voltar").classList.toggle("invisible", stepIndex === 0);
    const avancarBtn = document.getElementById("via-sacra-avancar");
    avancarBtn.innerHTML = stepIndex >= steps.length - 1
      ? 'Concluir <i data-lucide="check" class="w-4 h-4 inline-block ml-1"></i>'
      : 'Próxima Estação <i data-lucide="arrow-right" class="w-4 h-4 inline-block ml-1"></i>';

    if (window.lucide) lucide.createIcons();
    document.getElementById("via-sacra-conteudo").scrollTop = 0;
  }

  function irPara(indice) {
    if (indice < 0 || indice >= steps.length) return;
    stepIndex = indice;
    renderStep();
  }

  function abrirModal() {
    steps = construirSteps();
    if (steps.length === 0) return;
    stepIndex = 0;
    elementoComFocoAntes = document.activeElement;

    const el = criarModal();
    renderStep();
    el.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    el.querySelector("#via-sacra-fechar").focus();
  }

  function fecharModal() {
    if (!modalEl) return;
    modalEl.classList.add("hidden");
    document.body.style.overflow = "";
    if (elementoComFocoAntes && elementoComFocoAntes.focus) elementoComFocoAntes.focus();
  }

  function init() {
    const btn = document.getElementById("btn-abrir-via-sacra");
    if (!btn) return;
    btn.addEventListener("click", abrirModal);
  }

  return { init: init };
})();
