/**
 * catholic-api.js
 * -----------------------------------------------------------------------
 * Busca, uma vez por dia, o Evangelho e o Santo do Dia numa API católica
 * pública e gratuita (ver CapelaConfig.apiCatolica). Também usa a cor
 * litúrgica OFICIAL retornada pela API (mais precisa que o cálculo local,
 * pois considera festas e memórias de santos) — com o cálculo local do
 * liturgy.js sempre como fallback caso a API esteja fora do ar.
 *
 * O resultado do dia fica em cache no localStorage, então a página não
 * refaz a mesma requisição toda vez que o visitante abre o site.
 * -----------------------------------------------------------------------
 */
window.CapelaCatholicAPI = (function () {
  const cfg = window.CapelaConfig.apiCatolica;
  const CACHE_PREFIX = "capela-liturgia-";

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function getCache(name) {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + name + "-" + todayKey());
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setCache(name, data) {
    try {
      localStorage.setItem(CACHE_PREFIX + name + "-" + todayKey(), JSON.stringify(data));
    } catch (e) {
      // localStorage indisponível (modo privado, por ex.) — sem problema,
      // o site continua funcionando, só perde o cache.
    }
  }

  function fetchJSON(url) {
    return fetch(url, { mode: "cors" }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
  }

  function getLiturgiaHoje() {
    const cached = getCache("liturgia");
    if (cached) return Promise.resolve(cached);
    return fetchJSON(cfg.baseUrl + cfg.endpointLiturgia).then(function (data) {
      setCache("liturgia", data);
      return data;
    });
  }

  function getSantoHoje() {
    const cached = getCache("santo");
    if (cached) return Promise.resolve(cached);
    return fetchJSON(cfg.baseUrl + cfg.endpointSanto).then(function (data) {
      setCache("santo", data);
      return data;
    });
  }

  // Catecismo do dia: 100% local e determinístico — não depende de rede.
  function getCatecismoHoje() {
    const lista = window.CapelaConfig.catecismo || [];
    if (lista.length === 0) return null;
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return lista[dayOfYear % lista.length];
  }

  const CORES_LITURGICAS = {
    "verde": { hex: "#15803D", soft: "#F0FDF4" },
    "roxo": { hex: "#6B21A8", soft: "#F3E8FF" },
    "branco": { hex: "#B68D40", soft: "#FEFCE8" },
    "vermelho": { hex: "#B91C1C", soft: "#FEF2F2" },
    "rosa": { hex: "#DB2777", soft: "#FDF2F8" }
  };

  function corLiturgicaParaTema(corApi) {
    return CORES_LITURGICAS[(corApi || "").toLowerCase()] || null;
  }

  return {
    getLiturgiaHoje: getLiturgiaHoje,
    getSantoHoje: getSantoHoje,
    getCatecismoHoje: getCatecismoHoje,
    corLiturgicaParaTema: corLiturgicaParaTema
  };
})();
