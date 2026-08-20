/**
 * rosary.js
 * -----------------------------------------------------------------------
 * Terço Guiado interativo: conduz a pessoa passo a passo por toda a
 * oração do Rosário, já com o conjunto de mistérios certo para hoje
 * (reaproveitando CapelaLiturgy.getRosaryMysteryKey, a mesma lógica que
 * alimenta o card "Terço do Dia"). Nada de novo pra manter ano a ano —
 * quando o mistério do dia muda, o guia muda junto, sozinho.
 *
 * Arquitetura: os passos são montados uma vez, como uma lista de dados
 * simples (título, subtítulo, texto da oração, contagem de Ave-Marias
 * quando for o caso). O modal é criado uma única vez em memória e
 * reaproveitado; só o conteúdo interno é re-desenhado a cada passo — os
 * botões Voltar/Avançar e a barra de progresso ficam fixos.
 * -----------------------------------------------------------------------
 */
window.CapelaRosaryGuide = (function () {
  const cfg = window.CapelaConfig;

  let modalEl = null;
  let steps = [];
  let stepIndex = 0;
  let contador = 0;
  let elementoComFocoAntes = null;

  function construirSteps() {
    const season = CapelaLiturgy.getLiturgicalSeason();
    const chave = CapelaLiturgy.getRosaryMysteryKey(new Date(), season);
    const conjunto = (cfg.rosario || {})[chave];
    const o = cfg.oracoesTradicionais || {};
    if (!conjunto || !o.paiNosso) return [];

    const nomeCurto = conjunto.nome.replace("Mistérios ", "");
    const passos = [];

    passos.push({ titulo: "Sinal da Cruz", oracaoTexto: o.sinalDaCruz, nota: "Terço de hoje: " + conjunto.nome });
    passos.push({ titulo: "Creio (Credo dos Apóstolos)", oracaoTexto: o.credo });
    passos.push({ titulo: "Pai-Nosso", nota: "Na primeira conta, antes das três Ave-Marias", oracaoTexto: o.paiNosso });
    passos.push({ titulo: "3 Ave-Marias", nota: "Pela Fé, pela Esperança e pela Caridade", oracaoTexto: o.aveMaria, contagem: 3 });
    passos.push({ titulo: "Glória ao Pai", oracaoTexto: o.gloria });

    conjunto.misterios.forEach(function (m, i) {
      passos.push({
        titulo: (i + 1) + "º Mistério " + nomeCurto.replace(/s$/, ""),
        subtitulo: m.titulo,
        nota: "Fruto: " + m.fruto,
        oracaoLabel: "Pai-Nosso",
        oracaoTexto: o.paiNosso
      });
      passos.push({ titulo: "10 Ave-Marias", subtitulo: m.titulo, oracaoTexto: o.aveMaria, contagem: 10 });
      passos.push({
        titulo: "Glória ao Pai",
        subtitulo: m.titulo,
        oracaoTexto: o.gloria,
        extraLabel: "Oração de Fátima",
        extraTexto: o.oracaoFatima
      });
    });

    passos.push({ titulo: "Salve Rainha", oracaoTexto: o.salveRainha });
    passos.push({
      titulo: "Encerramento",
      versiculo: o.versiculoFinal,
      extraLabel: "Sinal da Cruz",
      extraTexto: o.sinalDaCruz
    });

    return passos;
  }

  function criarModal() {
    if (modalEl) return modalEl;

    const el = document.createElement("div");
    el.id = "terco-guiado-modal";
    el.className = "hidden fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center p-4";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Terço Guiado");
    el.innerHTML =
      '<div class="w-full max-w-lg bg-brand-light rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">' +
        '<div class="px-6 pt-5 pb-3 shrink-0">' +
          '<div class="flex items-center justify-between mb-3">' +
            '<span class="text-liturgy-primary transition-liturgy font-bold uppercase tracking-widest text-[10px]">Terço Guiado</span>' +
            '<button id="terco-fechar" aria-label="Fechar" class="w-9 h-9 rounded-full bg-brand-dark/5 hover:bg-liturgy-primary hover:text-white flex items-center justify-center transition-colors">' +
              '<i data-lucide="x" class="w-4 h-4"></i>' +
            '</button>' +
          '</div>' +
          '<div class="w-full h-1.5 bg-brand-dark/10 rounded-full overflow-hidden">' +
            '<div id="terco-progresso" class="h-full bg-liturgy-primary transition-liturgy transition-all duration-300" style="width:0%"></div>' +
          '</div>' +
          '<p id="terco-passo-label" class="text-gray-400 text-[10px] uppercase tracking-widest mt-2"></p>' +
        '</div>' +
        '<div id="terco-conteudo" class="px-6 py-4 overflow-y-auto grow"></div>' +
        '<div class="px-6 py-4 border-t border-brand-dark/10 flex items-center justify-between gap-3 shrink-0">' +
          '<button id="terco-voltar" class="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-brand-dark/5 transition-colors">Voltar</button>' +
          '<button id="terco-avancar" class="flex-1 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-dark text-white hover:bg-liturgy-primary transition-colors">Avançar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);

    el.querySelector("#terco-fechar").addEventListener("click", fecharModal);
    el.addEventListener("click", function (event) {
      if (event.target === el) fecharModal();
    });
    document.addEventListener("keydown", function (event) {
      if (el.classList.contains("hidden")) return;
      if (event.key === "Escape") fecharModal();
      if (event.key === "ArrowRight") irPara(stepIndex + 1);
      if (event.key === "ArrowLeft") irPara(stepIndex - 1);
    });
    el.querySelector("#terco-voltar").addEventListener("click", function () { irPara(stepIndex - 1); });
    el.querySelector("#terco-avancar").addEventListener("click", function () {
      if (stepIndex >= steps.length - 1) { fecharModal(); return; }
      irPara(stepIndex + 1);
    });

    el.querySelector("#terco-conteudo").addEventListener("click", function (event) {
      const conta = event.target.closest("[data-conta-ate]");
      if (conta) {
        contador = parseInt(conta.getAttribute("data-conta-ate"), 10);
        atualizarContador();
      }
    });

    modalEl = el;
    return el;
  }

  function beadsHTML(max) {
    let html = '<div class="flex flex-wrap gap-2 justify-center my-4" id="terco-contas">';
    for (let i = 1; i <= max; i++) {
      html += '<button type="button" data-conta-ate="' + i + '" aria-label="Marcar ' + i + ' de ' + max + '" ' +
        'class="w-6 h-6 rounded-full border-2 border-liturgy-primary transition-liturgy conta-bead" data-idx="' + i + '"></button>';
    }
    html += '</div><p id="terco-contador-label" class="text-center text-gray-400 text-xs uppercase tracking-widest"></p>';
    return html;
  }

  function atualizarContador() {
    const passo = steps[stepIndex];
    if (!passo || !passo.contagem) return;
    const beads = modalEl.querySelectorAll(".conta-bead");
    beads.forEach(function (b) {
      const idx = parseInt(b.getAttribute("data-idx"), 10);
      if (idx <= contador) {
        b.style.backgroundColor = "var(--liturgy-main)";
      } else {
        b.style.backgroundColor = "transparent";
      }
    });
    const label = document.getElementById("terco-contador-label");
    if (label) {
      label.textContent = (passo.oracaoLabel || "Ave-Maria") + " rezada: " + contador + " de " + passo.contagem;
    }
  }

  function renderStep() {
    const passo = steps[stepIndex];
    if (!passo) return;
    contador = 0;

    document.getElementById("terco-passo-label").textContent = "Passo " + (stepIndex + 1) + " de " + steps.length;
    document.getElementById("terco-progresso").style.width = Math.round(((stepIndex + 1) / steps.length) * 100) + "%";

    let html = "";
    html += '<h3 class="font-display text-2xl uppercase text-brand-dark leading-tight">' + passo.titulo + '</h3>';
    if (passo.subtitulo) html += '<p class="text-liturgy-primary transition-liturgy font-medium mt-1">' + passo.subtitulo + '</p>';
    if (passo.nota) html += '<p class="text-gray-400 text-xs uppercase tracking-widest mt-2">' + passo.nota + '</p>';

    if (passo.oracaoTexto) {
      html += '<div class="mt-5 bg-white rounded-2xl p-5 border border-brand-dark/5">';
      if (passo.oracaoLabel) html += '<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">' + passo.oracaoLabel + '</p>';
      html += '<p class="text-gray-700 leading-relaxed text-[15px]">' + passo.oracaoTexto + '</p>';
      html += '</div>';
    }

    if (passo.contagem) {
      html += beadsHTML(passo.contagem);
    }

    if (passo.extraTexto) {
      html += '<div class="mt-4 bg-white rounded-2xl p-5 border border-brand-dark/5">';
      html += '<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">' + passo.extraLabel + '</p>';
      html += '<p class="text-gray-700 leading-relaxed text-[15px]">' + passo.extraTexto + '</p>';
      html += '</div>';
    }

    if (passo.versiculo) {
      html += '<div class="mt-5 text-center">' +
        '<p class="text-gray-700 italic">V. ' + passo.versiculo.v + '</p>' +
        '<p class="text-gray-700 italic">R. ' + passo.versiculo.r + '</p>' +
        '</div>';
    }

    document.getElementById("terco-conteudo").innerHTML = html;
    if (passo.contagem) atualizarContador();

    document.getElementById("terco-voltar").classList.toggle("invisible", stepIndex === 0);
    const avancarBtn = document.getElementById("terco-avancar");
    avancarBtn.innerHTML = stepIndex >= steps.length - 1
      ? 'Concluir <i data-lucide="check" class="w-4 h-4 inline-block ml-1"></i>'
      : 'Avançar <i data-lucide="arrow-right" class="w-4 h-4 inline-block ml-1"></i>';

    if (window.lucide) lucide.createIcons();
    document.getElementById("terco-conteudo").scrollTop = 0;
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
    el.querySelector("#terco-fechar").focus();
  }

  function fecharModal() {
    if (!modalEl) return;
    modalEl.classList.add("hidden");
    document.body.style.overflow = "";
    if (elementoComFocoAntes && elementoComFocoAntes.focus) elementoComFocoAntes.focus();
  }

  function init() {
    const btn = document.getElementById("btn-abrir-terco-guiado");
    if (!btn) return;
    btn.addEventListener("click", abrirModal);
  }

  return { init: init };
})();
