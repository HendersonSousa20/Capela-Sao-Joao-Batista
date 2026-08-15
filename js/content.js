/**
 * content.js
 * -----------------------------------------------------------------------
 * Preenche o HTML com dados de CapelaConfig. Como tudo aqui lê do
 * config, adicionar uma pastoral nova ou mudar um horário em config.js
 * é o suficiente — não é preciso tocar no HTML.
 * -----------------------------------------------------------------------
 */
window.CapelaContent = (function () {
  const cfg = window.CapelaConfig;

  function renderPastorais() {
    const container = document.getElementById("pastorais-grid");
    if (!container) return;
    container.innerHTML = cfg.pastorais.map(function (p) {
      return (
        '<div class="bento-card group border-2 border-transparent hover:border-liturgy-primary/20 cursor-pointer">' +
          '<div class="w-14 h-14 bg-liturgy-soft text-liturgy-primary rounded-2xl flex items-center justify-center mb-6 transition-liturgy group-hover:bg-liturgy-primary group-hover:text-white group-hover:rotate-6">' +
            '<i data-lucide="' + p.icone + '" class="w-6 h-6"></i>' +
          '</div>' +
          '<h4 class="font-display text-2xl uppercase mb-3 text-brand-dark group-hover:text-liturgy-primary transition-colors">' + p.titulo + '</h4>' +
          '<p class="text-gray-500 text-sm leading-relaxed">' + p.desc + '</p>' +
        '</div>'
      );
    }).join("");

    // Atualiza o número de "Pastorais Ativas" automaticamente, sem risco
    // de ficar desatualizado se a lista mudar em config.js
    const countEl = document.getElementById("pastorais-count");
    if (countEl) countEl.textContent = cfg.pastorais.length + "+";
  }

  function renderFAQ() {
    const container = document.getElementById("faq-container");
    if (!container) return;
    container.innerHTML = cfg.faq.map(function (f, i) {
      return (
        '<div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">' +
          '<button type="button" class="w-full text-left p-6 flex justify-between items-center group bg-white focus:outline-none" data-faq-toggle="' + i + '">' +
            '<span class="text-lg font-bold text-brand-dark group-hover:text-liturgy-primary transition-colors">' + f.q + '</span>' +
            '<div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-liturgy-soft text-gray-400 group-hover:text-liturgy-primary transition-colors">' +
              '<i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300" id="icon-' + i + '"></i>' +
            '</div>' +
          '</button>' +
          '<div class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out" id="ans-' + i + '">' +
            '<div class="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50">' + f.a + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  function renderHorariosResumo() {
    // Faixa de horários no topo (era hardcoded e batia errado com a
    // realidade; agora vem sempre do config)
    const missasDom = cfg.horariosMissas.filter(function (h) { return h.dia === 0; });
    const outras = cfg.horariosMissas.filter(function (h) { return h.dia !== 0; });

    const domEl = document.getElementById("horarios-domingo");
    if (domEl) domEl.textContent = missasDom.map(function (h) { return h.inicio.replace(":", "h"); }).join(" • ");

    const semanaEl = document.getElementById("horarios-semana");
    if (semanaEl) {
      semanaEl.textContent = outras.map(function (h) {
        return h.diaLabel.substring(0, 3) + " " + h.inicio.replace(":", "h");
      }).join(" • ");
    }
  }

  function renderContato() {
    document.querySelectorAll("[data-config='telefone']").forEach(function (el) {
      el.textContent = cfg.contato.telefoneExibicao;
    });
    document.querySelectorAll("[data-config='endereco-curto']").forEach(function (el) {
      el.textContent = cfg.endereco.logradouro + " - Bairro " + cfg.endereco.bairro;
    });
    document.querySelectorAll("[data-config='endereco-completo']").forEach(function (el) {
      el.innerHTML = cfg.endereco.logradouro + "<br>Bairro " + cfg.endereco.bairro + "<br>" + cfg.endereco.cidade + " - " + cfg.endereco.estado;
    });
    document.querySelectorAll("[data-config='maps-link']").forEach(function (el) {
      el.setAttribute("href", cfg.endereco.linkMaps);
    });
    document.querySelectorAll("[data-config='instagram-link']").forEach(function (el) {
      el.setAttribute("href", cfg.redesSociais.instagram.url);
    });
    document.querySelectorAll("[data-config='facebook-link']").forEach(function (el) {
      el.setAttribute("href", cfg.redesSociais.facebook.url);
    });
    document.querySelectorAll("[data-config='instagram-handle']").forEach(function (el) {
      el.textContent = cfg.redesSociais.instagram.handle;
    });

    // Número de celebrações por semana: conta sozinho quantos horários
    // existem em config.js, nunca fica desatualizado.
    document.querySelectorAll("[data-config='missas-por-semana']").forEach(function (el) {
      el.textContent = cfg.horariosMissas.length;
    });

    // Pix: se a chave ainda não foi configurada, avisa com clareza em vez
    // de mostrar um valor falso/placeholder para o fiel
    const pixKeyEl = document.getElementById("pix-chave");
    const pixBtn = document.getElementById("pix-copiar-btn");
    if (pixKeyEl && pixBtn) {
      if (cfg.pix.chaveConfigurada) {
        pixKeyEl.textContent = cfg.pix.chave;
        pixBtn.disabled = false;
        pixBtn.addEventListener("click", function () {
          navigator.clipboard.writeText(cfg.pix.chave);
          alert("Chave Pix copiada! Que Deus abençoe sua generosidade.");
        });
      } else {
        pixKeyEl.textContent = "Chave a ser divulgada em breve";
        pixBtn.textContent = "Fale com a equipe do Dízimo";
        pixBtn.addEventListener("click", function () {
          window.open(CapelaContact.getWhatsAppLink("Olá! Gostaria de saber como me tornar dizimista da capela."), "_blank");
        });
      }
    }

    // Formulário de inscrições: some com o iframe quebrado quando não há
    // link real configurado, mostrando uma alternativa por WhatsApp
    const formWrap = document.getElementById("form-inscricoes-wrap");
    const formFallback = document.getElementById("form-inscricoes-fallback");
    if (formWrap && formFallback) {
      if (cfg.formularioInscricoes.url) {
        formWrap.innerHTML = '<iframe src="' + cfg.formularioInscricoes.url + '" width="100%" height="700" frameborder="0" class="w-full">Carregando formulário...</iframe>';
        formFallback.classList.add("hidden");
      } else {
        formWrap.classList.add("hidden");
        formFallback.classList.remove("hidden");
      }
    }
  }

  function renderStatusFaixa() {
    const badge = document.getElementById("status-agora");
    if (!badge) return;

    const aberta = CapelaLiturgy.isOpenNow();
    const proxima = CapelaLiturgy.getNextMass();

    if (aberta) {
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Celebração acontecendo agora';
    } else if (proxima) {
      const quando = proxima.ehHoje ? "hoje" : proxima.diaLabel;
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-liturgy-primary animate-ping"></span> Próxima celebração: ' + quando + ' às ' + proxima.inicio.replace(":", "h");
    }
  }

  function renderContagemFesta() {
    const el = document.getElementById("contagem-festa");
    if (!el) return;
    const dias = CapelaLiturgy.daysUntilFesta();
    if (dias === 0) {
      el.textContent = "É hoje! Feliz Festa de São João Batista! 🎉";
    } else {
      el.textContent = "Faltam " + dias + " dia" + (dias === 1 ? "" : "s") + " para a Festa de São João Batista (24/06)";
    }
  }

  return {
    renderPastorais: renderPastorais,
    renderFAQ: renderFAQ,
    renderHorariosResumo: renderHorariosResumo,
    renderContato: renderContato,
    renderStatusFaixa: renderStatusFaixa,
    renderContagemFesta: renderContagemFesta
  };
})();
