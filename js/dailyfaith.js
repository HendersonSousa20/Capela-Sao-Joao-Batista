/**
 * dailyfaith.js
 * -----------------------------------------------------------------------
 * Preenche a seção "Palavra Viva": Liturgia de Hoje (com Ano/Ciclo
 * litúrgico, semana do Tempo Comum e solenidades especiais), Santo do
 * Dia, Terço do Dia, Oração Mariana do Tempo e Catecismo do Dia.
 *
 * Arquitetura: cada bloco tem uma função "renderX" independente — se um
 * dado faltar (ex.: dia sem santo cadastrado), só aquele cartão cai no
 * seu próprio estado de fallback, sem quebrar os demais. TUDO é
 * calculado localmente (datas, Páscoa, ciclos, mistério do dia); não há
 * nenhuma chamada de rede nesta seção, então ela nunca fica em estado de
 * erro, nunca demora para carregar e funciona até sem internet.
 * -----------------------------------------------------------------------
 */
window.CapelaDailyFaith = (function () {
  const cfg = window.CapelaConfig;

  const MESES = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];
  const DIAS_SEMANA = [
    "domingo", "segunda-feira", "terça-feira", "quarta-feira",
    "quinta-feira", "sexta-feira", "sábado"
  ];
  const ORDINAIS = [
    "1ª", "2ª", "3ª", "4ª", "5ª", "6ª", "7ª", "8ª", "9ª", "10ª",
    "11ª", "12ª", "13ª", "14ª", "15ª", "16ª", "17ª", "18ª", "19ª", "20ª",
    "21ª", "22ª", "23ª", "24ª", "25ª", "26ª", "27ª", "28ª", "29ª", "30ª",
    "31ª", "32ª", "33ª", "34ª"
  ];

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function show(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
  }

  function hide(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  }

  function formatarDataHoje() {
    const d = new Date();
    return DIAS_SEMANA[d.getDay()] + ", " + d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear();
  }

  // ---------------------------------------------------------------------
  // Faixa de destaque: solenidades e festas especiais calculadas a partir
  // da Páscoa e de datas fixas (ver CapelaLiturgy.getSpecialDay).
  // ---------------------------------------------------------------------
  function renderDiaEspecial() {
    const especial = CapelaLiturgy.getSpecialDay();
    const banner = document.getElementById("dia-especial-banner");
    if (!banner) return;

    if (especial) {
      setText("dia-especial-nome", especial.nome);
      setText("dia-especial-nota", especial.nota);
      banner.classList.remove("hidden");
    } else {
      banner.classList.add("hidden");
    }
  }

  // ---------------------------------------------------------------------
  // Novena de São João Batista: só aparece nos 9 dias antes da Festa do
  // Padroeiro (15 a 23/06). Fora dessa janela, o banner fica escondido —
  // não há nenhum estado "quase lá" ou "faltam X dias" aqui, isso já é
  // coberto pelo contador no topo da página.
  // ---------------------------------------------------------------------
  function renderNovena() {
    const banner = document.getElementById("novena-banner");
    if (!banner) return;

    const info = CapelaLiturgy.getNovenaInfo();
    if (!info) {
      banner.classList.add("hidden");
      return;
    }

    const c = info.conteudo;
    setText("novena-dia", (info.diaNovena) + "º dia da Novena");
    setText("novena-titulo", c.titulo);
    setText("novena-citacao", c.citacao);
    setText("novena-meditacao", c.meditacao);
    setText("novena-intencao", c.intencao);
    setText("novena-oracao", info.oracaoFinal);

    const pontos = document.getElementById("novena-pontos");
    if (pontos) {
      let html = "";
      for (let i = 1; i <= 9; i++) {
        const ativo = i === info.diaNovena;
        const feito = i < info.diaNovena;
        html += '<span class="w-2.5 h-2.5 rounded-full ' +
          (ativo ? "bg-brand-gold scale-125" : feito ? "bg-brand-gold/50" : "bg-white/20") +
          ' transition-all duration-300"></span>';
      }
      pontos.innerHTML = html;
    }

    banner.classList.remove("hidden");
  }

  // ---------------------------------------------------------------------
  // Liturgia de Hoje: tempo litúrgico, Ano/Ciclo (A/B/C + I/II) e, quando
  // aplicável, a semana do Tempo Comum.
  // ---------------------------------------------------------------------
  function renderLiturgiaDoDia() {
    const season = CapelaLiturgy.getLiturgicalSeason();
    const proxima = CapelaLiturgy.getNextMass();
    const ciclo = CapelaLiturgy.getLiturgicalYearCycle();
    const semana = CapelaLiturgy.getOrdinaryWeekNumber();

    setText("liturgia-data-hoje", formatarDataHoje());
    setText("liturgia-tempo-nome", season.name);
    setText("liturgia-ciclo", "Ano " + ciclo.cicloDominical + " · Ciclo Ferial " + ciclo.cicloFerial);

    const semanaEl = document.getElementById("liturgia-semana");
    if (semanaEl) {
      if (semana && semana >= 1 && semana <= 34) {
        semanaEl.textContent = (ORDINAIS[semana - 1] || (semana + "ª")) + " Semana do Tempo Comum";
        semanaEl.classList.remove("hidden");
      } else {
        semanaEl.classList.add("hidden");
      }
    }

    const badge = document.getElementById("liturgia-cor-badge");
    if (badge) badge.style.backgroundColor = season.color;

    const proximaEl = document.getElementById("liturgia-proxima-celebracao");
    if (proximaEl && proxima) {
      const quando = proxima.ehHoje ? "hoje" : proxima.diaLabel;
      proximaEl.textContent = "Próxima celebração aqui na capela: " + quando + " às " + proxima.inicio.replace(":", "h");
    }

    const linkEl = document.getElementById("liturgia-link-oficial");
    if (linkEl) linkEl.setAttribute("href", cfg.linkLiturgiaOficial);
  }

  // ---------------------------------------------------------------------
  // Santo do Dia
  // ---------------------------------------------------------------------
  function renderSantoDoDia() {
    const hoje = new Date();
    const mes = hoje.getMonth() + 1;
    const dia = hoje.getDate();

    const santo = (cfg.santoral || []).find(function (s) { return s.mes === mes && s.dia === dia; });

    if (santo) {
      setText("santo-nome", santo.nome);
      setText("santo-resumo", santo.resumo);
      show("santo-encontrado");
      hide("santo-nao-encontrado");
    } else {
      hide("santo-encontrado");
      show("santo-nao-encontrado");
    }
  }

  // ---------------------------------------------------------------------
  // Terço do Dia: mistério calculado pelo dia da semana (e, aos domingos,
  // pelo tempo litúrgico corrente — ver CapelaLiturgy.getRosaryMysteryKey).
  // ---------------------------------------------------------------------
  function renderTercoDoDia() {
    const season = CapelaLiturgy.getLiturgicalSeason();
    const chave = CapelaLiturgy.getRosaryMysteryKey(new Date(), season);
    const conjunto = (cfg.rosario || {})[chave];
    if (!conjunto) return;

    setText("rosario-nome", conjunto.nome);
    setText("rosario-dias", conjunto.dias);

    const lista = conjunto.misterios.map(function (m, i) {
      return '<li class="flex gap-3">' +
        '<span class="shrink-0 w-6 h-6 rounded-full bg-liturgy-soft text-liturgy-primary transition-liturgy text-[11px] font-bold flex items-center justify-center mt-0.5">' + (i + 1) + '</span>' +
        '<span><span class="text-brand-dark font-medium">' + m.titulo + '</span>' +
        '<span class="block text-xs text-gray-400 uppercase tracking-widest mt-0.5">Fruto: ' + m.fruto + '</span></span>' +
        '</li>';
    }).join("");

    setHTML("rosario-lista", lista);
  }

  // ---------------------------------------------------------------------
  // Oração Mariana do Tempo: Angelus, exceto no Tempo Pascal, quando a
  // tradição da Igreja substitui pelo Regina Coeli.
  // ---------------------------------------------------------------------
  function renderOracaoDoTempo() {
    const season = CapelaLiturgy.getLiturgicalSeason();
    const chave = CapelaLiturgy.getMarianAntiphonKey(season);
    const oracao = (cfg.oracoesMarianas || {})[chave];
    if (!oracao) return;

    setText("oracao-titulo", oracao.titulo);
    setText("oracao-subtitulo", oracao.subtitulo);
    setHTML("oracao-texto", oracao.texto.split("\n\n").map(function (bloco) {
      return "<p class=\"mb-3 last:mb-0\">" + bloco.replace(/\n/g, "<br>") + "</p>";
    }).join(""));
  }

  // ---------------------------------------------------------------------
  // Catecismo do Dia
  // ---------------------------------------------------------------------
  function renderCatecismoDoDia() {
    const lista = cfg.catecismo || [];
    if (lista.length === 0) return;

    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const item = lista[dayOfYear % lista.length];

    setText("catecismo-parte", item.parte);
    setText("catecismo-tema", item.tema);
    setText("catecismo-texto", item.texto);
  }

  // ---------------------------------------------------------------------
  // Compartilhar o resumo do dia via WhatsApp (share genérico, sem número
  // fixo — abre o seletor de contatos do próprio usuário).
  // ---------------------------------------------------------------------
  function montarResumoParaCompartilhar() {
    const season = CapelaLiturgy.getLiturgicalSeason();
    const ciclo = CapelaLiturgy.getLiturgicalYearCycle();
    const chaveTerco = CapelaLiturgy.getRosaryMysteryKey(new Date(), season);
    const terco = (cfg.rosario || {})[chaveTerco];
    const novena = CapelaLiturgy.getNovenaInfo();

    let texto = "*Palavra Viva — " + cfg.nome + "*\n";
    texto += formatarDataHoje() + "\n\n";
    if (novena) {
      texto += "🕯️ " + novena.diaNovena + "º dia da Novena de São João Batista: " + novena.conteudo.titulo + "\n";
      texto += "\"" + novena.conteudo.intencao + "\"\n\n";
    }
    texto += "🕊️ " + season.name + " (Ano " + ciclo.cicloDominical + ")\n";
    if (terco) texto += "📿 Terço de hoje: " + terco.nome + "\n";
    texto += "\nConfira a liturgia completa e a vida da nossa comunidade:\n" + window.location.href.split("#")[0] + "#palavra-viva";

    return texto;
  }

  // Delegação de evento (registrada uma única vez): funciona mesmo que o
  // conteúdo do dia seja recalculado depois, sem nunca duplicar o listener.
  function initCompartilhar() {
    document.addEventListener("click", function (event) {
      const btn = event.target.closest("#btn-compartilhar-palavra");
      if (!btn) return;
      const texto = montarResumoParaCompartilhar();
      const link = "https://api.whatsapp.com/send?text=" + encodeURIComponent(texto);
      window.open(link, "_blank");
    });
  }

  function renderConteudoDoDia() {
    renderNovena();
    renderDiaEspecial();
    renderLiturgiaDoDia();
    renderSantoDoDia();
    renderTercoDoDia();
    renderOracaoDoTempo();
    renderCatecismoDoDia();
  }

  function init() {
    renderConteudoDoDia();
    initCompartilhar();
  }

  return { init: init, refresh: renderConteudoDoDia };
})();
