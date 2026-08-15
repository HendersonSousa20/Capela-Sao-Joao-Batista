/**
 * dailyfaith.js
 * -----------------------------------------------------------------------
 * Preenche a seção "Palavra Viva" (Evangelho, Santo e Catecismo do Dia).
 *
 * Cuidado de segurança: todo texto que vem da API externa é inserido via
 * textContent (nunca innerHTML), então mesmo que a API de terceiros um
 * dia devolva algo inesperado, não há risco de injeção de HTML/script no
 * site.
 * -----------------------------------------------------------------------
 */
window.CapelaDailyFaith = (function () {

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function showState(prefix, state) {
    // state: 'loading' | 'ready' | 'error'
    ["loading", "ready", "error"].forEach(function (s) {
      const el = document.getElementById(prefix + "-" + s);
      if (el) el.classList.toggle("hidden", s !== state);
    });
  }

  function renderEvangelho() {
    showState("evangelho", "loading");
    CapelaCatholicAPI.getLiturgiaHoje().then(function (data) {
      const t = data && data.today;
      const gospel = t && t.readings && t.readings.gospel;
      if (!t || !gospel) throw new Error("Formato inesperado");

      setText("evangelho-referencia", (gospel.head_title || "Evangelho do Dia").replace("Evangelho de Jesus Cristo segundo ", ""));
      setText("evangelho-titulo-liturgico", t.entry_title || "");
      setText("evangelho-texto", gospel.text || "");

      const dataEl = document.getElementById("evangelho-data");
      if (dataEl) dataEl.textContent = t.date || "";

      showState("evangelho", "ready");
    }).catch(function () {
      showState("evangelho", "error");
    });
  }

  function renderSanto() {
    showState("santo", "loading");
    CapelaCatholicAPI.getSantoHoje().then(function (data) {
      const t = data && data.today;
      if (!t || !t.title) throw new Error("Formato inesperado");

      setText("santo-nome", t.title);

      // full_text costuma ser longo — mostramos só o primeiro parágrafo
      // como resumo, com opção de expandir.
      const paragrafos = (t.full_text || "").split(/\n+/).map(function (p) { return p.trim(); }).filter(Boolean);
      const resumo = paragrafos.slice(0, 2).join(" ");
      const completo = paragrafos.join("\n\n");

      setText("santo-resumo", resumo || "Sem biografia disponível para hoje.");

      const completoEl = document.getElementById("santo-completo");
      if (completoEl) completoEl.textContent = completo;

      const btn = document.getElementById("santo-expandir-btn");
      const wrapCompleto = document.getElementById("santo-completo-wrap");
      if (btn && wrapCompleto && paragrafos.length > 2) {
        btn.classList.remove("hidden");
        btn.addEventListener("click", function () {
          const aberto = !wrapCompleto.classList.contains("hidden");
          wrapCompleto.classList.toggle("hidden", aberto);
          btn.textContent = aberto ? "Ler biografia completa" : "Recolher";
        });
      }

      showState("santo", "ready");
    }).catch(function () {
      showState("santo", "error");
    });
  }

  function renderCatecismo() {
    const item = CapelaCatholicAPI.getCatecismoHoje();
    if (!item) {
      showState("catecismo", "error");
      return;
    }
    setText("catecismo-parte", item.parte);
    setText("catecismo-tema", item.tema);
    setText("catecismo-texto", item.texto);
    showState("catecismo", "ready");
  }

  function init() {
    renderEvangelho();
    renderSanto();
    renderCatecismo();
  }

  return { init: init };
})();
