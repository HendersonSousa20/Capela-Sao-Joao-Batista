/**
 * liturgy.js
 * -----------------------------------------------------------------------
 * Tudo aqui é calculado a partir da data/hora atual do visitante.
 * Nenhuma dessas informações precisa ser atualizada manualmente —
 * elas continuam corretas para sempre, ano após ano:
 *   - Tempo litúrgico (cor + nome) via cálculo da Páscoa (algoritmo de
 *     Meeus/Jones/Butcher)
 *   - Próxima missa a partir de agora, com base em CapelaConfig.horariosMissas
 *   - Se a capela está "aberta" (dentro de uma celebração) agora
 *   - Contagem regressiva para a Festa do Padroeiro (24/06)
 * -----------------------------------------------------------------------
 */
window.CapelaLiturgy = (function () {

  function getEasterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const easterMonth = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const easterDay = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, easterMonth, easterDay);
  }

  function getLiturgicalSeason(now) {
    now = now || new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const easterDate = getEasterDate(year);

    const quaresmaStart = new Date(easterDate);
    quaresmaStart.setDate(easterDate.getDate() - 46);

    const pentecostesDate = new Date(easterDate);
    pentecostesDate.setDate(easterDate.getDate() + 50);

    const natal = new Date(year, 11, 25);
    const adventoStart = new Date(year, 11, 25);
    adventoStart.setDate(25 - (adventoStart.getDay() || 7) - 21);

    if (now >= quaresmaStart && now < easterDate) {
      return { name: "Tempo da Quaresma", color: "#6B21A8", soft: "#F3E8FF", icon: "cloud-rain" };
    } else if (now >= easterDate && now < pentecostesDate) {
      return { name: "Tempo Pascal", color: "#B68D40", soft: "#FEFCE8", icon: "sun" };
    } else if (now >= adventoStart && now < natal) {
      return { name: "Tempo do Advento", color: "#6B21A8", soft: "#F3E8FF", icon: "star" };
    } else if ((month === 11 && day >= 25) || (month === 0 && day <= 10)) {
      return { name: "Tempo do Natal", color: "#B68D40", soft: "#FEFCE8", icon: "baby" };
    } else if (now.toDateString() === pentecostesDate.toDateString()) {
      return { name: "Pentecostes", color: "#DC2626", soft: "#FEF2F2", icon: "flame" };
    }

    return { name: "Tempo Comum", color: "#15803D", soft: "#F0FDF4", icon: "leaf" };
  }

  function toMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }

  // Retorna { titulo, diaLabel, inicio, minutosAte, ehHoje } da próxima missa
  function getNextMass(now) {
    now = now || new Date();
    const horarios = (window.CapelaConfig && window.CapelaConfig.horariosMissas) || [];
    const nowMinutesOfWeek = now.getDay() * 1440 + now.getHours() * 60 + now.getMinutes();

    let best = null;
    horarios.forEach(function (h) {
      const startOfWeekMinutes = h.dia * 1440 + toMinutes(h.inicio);
      let delta = startOfWeekMinutes - nowMinutesOfWeek;
      if (delta < 0) delta += 7 * 1440; // já passou essa semana, joga pra próxima
      if (best === null || delta < best.delta) {
        best = { delta: delta, horario: h };
      }
    });

    if (!best) return null;

    return {
      titulo: best.horario.titulo,
      diaLabel: best.horario.diaLabel,
      inicio: best.horario.inicio,
      ehHoje: best.delta < 1440 && (now.getDay() === best.horario.dia)
    };
  }

  function isOpenNow(now) {
    now = now || new Date();
    const horarios = (window.CapelaConfig && window.CapelaConfig.horariosMissas) || [];
    const nowMin = now.getHours() * 60 + now.getMinutes();
    return horarios.some(function (h) {
      return h.dia === now.getDay() && nowMin >= toMinutes(h.inicio) && nowMin <= toMinutes(h.fim);
    });
  }

  // Dias até a próxima Festa do Padroeiro (24/06), sempre correto ano a ano
  function daysUntilFesta(now) {
    now = now || new Date();
    const cfg = (window.CapelaConfig && window.CapelaConfig.festaPadroeiro) || { dia: 24, mes: 6 };
    let target = new Date(now.getFullYear(), cfg.mes - 1, cfg.dia);
    target.setHours(0, 0, 0, 0);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (target < today) {
      target = new Date(now.getFullYear() + 1, cfg.mes - 1, cfg.dia);
    }
    const diffMs = target - today;
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  return {
    getLiturgicalSeason: getLiturgicalSeason,
    getNextMass: getNextMass,
    isOpenNow: isOpenNow,
    daysUntilFesta: daysUntilFesta
  };
})();
