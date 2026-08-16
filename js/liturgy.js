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

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function sameCalendarDate(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  // Primeiro domingo do Advento do ano informado (sempre o 4º domingo
  // antes do Natal). Extraído da mesma conta já usada em
  // getLiturgicalSeason, para ser reaproveitado pelas funções abaixo.
  function getAdventStart(year) {
    const d = new Date(year, 11, 25);
    d.setDate(25 - (d.getDay() || 7) - 21);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // Ano/Ciclo litúrgico: Ciclo Dominical (A/B/C, leituras de domingo) e
  // Ciclo Ferial (I/II, 1ª leitura da missa dos dias de semana).
  // Regra oficial: tomando Y como o ano civil em que cai a maior parte do
  // ano litúrgico corrente, Y mod 3 = 1 → A, 2 → B, 0 → C.
  function getLiturgicalYearCycle(now) {
    now = now || new Date();
    const adventStartThisYear = getAdventStart(now.getFullYear());
    const Y = (now >= adventStartThisYear) ? now.getFullYear() + 1 : now.getFullYear();
    const mod = Y % 3;
    const cicloDominical = mod === 1 ? "A" : (mod === 2 ? "B" : "C");
    const cicloFerial = (now.getFullYear() % 2 === 0) ? "II" : "I";
    return { cicloDominical: cicloDominical, cicloFerial: cicloFerial, anoReferencia: Y };
  }

  // Solenidades e festas de data certa (fixa ou móvel a partir da Páscoa),
  // calculadas ano após ano sem precisar de nenhuma manutenção. Cobre as
  // datas mais relevantes do calendário litúrgico vivido pela comunidade;
  // datas móveis regionais (memórias facultativas) ficam de fora de
  // propósito, como já ocorre no santoral.
  function getSpecialDay(now) {
    now = now || new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const year = now.getFullYear();
    const easter = getEasterDate(year);
    const adventStart = getAdventStart(year);

    const candidatos = [
      { d: addDays(easter, -46), nome: "Quarta-feira de Cinzas", nota: "Início da Quaresma: caminho de oração, jejum e partilha com os pobres." },
      { d: addDays(easter, -7), nome: "Domingo de Ramos", nota: "Entrada de Jesus em Jerusalém e abertura da Semana Santa." },
      { d: addDays(easter, -3), nome: "Quinta-feira Santa", nota: "Instituição da Eucaristia e do Sacerdócio, na Última Ceia do Senhor." },
      { d: addDays(easter, -2), nome: "Sexta-feira da Paixão", nota: "Memória da Paixão e Morte de Jesus na Cruz." },
      { d: addDays(easter, -1), nome: "Sábado Santo", nota: "Dia de silêncio e vigília junto ao túmulo, na espera da Ressurreição." },
      { d: easter, nome: "Domingo de Páscoa", nota: "Solenidade da Ressurreição do Senhor — o centro de toda a fé cristã." },
      { d: addDays(easter, 42), nome: "Ascensão do Senhor", nota: "Jesus ressuscitado sobe ao Céu e promete o dom do Espírito Santo." },
      { d: addDays(easter, 49), nome: "Pentecostes", nota: "Descida do Espírito Santo sobre os Apóstolos: nascimento da Igreja." },
      { d: addDays(easter, 56), nome: "Santíssima Trindade", nota: "Solenidade de Deus Pai, Filho e Espírito Santo." },
      { d: addDays(easter, 60), nome: "Corpo e Sangue de Cristo", nota: "Solenidade da Eucaristia, presença real de Cristo entre nós." },
      { d: addDays(easter, 68), nome: "Sagrado Coração de Jesus", nota: "Celebração do amor misericordioso de Jesus pela humanidade." },
      { d: addDays(adventStart, -7), nome: "Nosso Senhor Jesus Cristo, Rei do Universo", nota: "Encerramento do Ano Litúrgico, celebrando a realeza de Cristo." },
      { d: new Date(year, 0, 1), nome: "Solenidade de Maria, Mãe de Deus", nota: "Abertura do ano civil sob a maternidade divina de Maria." },
      { d: new Date(year, 7, 15), nome: "Assunção de Nossa Senhora", nota: "Maria é assunta corpo e alma ao Céu." },
      { d: new Date(year, 10, 1), nome: "Todos os Santos", nota: "Memória de todos os que já contemplam a face de Deus." },
      { d: new Date(year, 10, 2), nome: "Finados", nota: "Dia de oração por todos os fiéis defuntos." },
      { d: new Date(year, 11, 8), nome: "Imaculada Conceição de Maria", nota: "Maria foi concebida sem pecado original, cheia de graça." },
      { d: new Date(year, 11, 25), nome: "Natal do Senhor", nota: "Nascimento de Jesus Cristo, o Verbo que se fez carne." }
    ];

    for (let i = 0; i < candidatos.length; i++) {
      if (sameCalendarDate(today, candidatos[i].d)) {
        return { nome: candidatos[i].nome, nota: candidatos[i].nota };
      }
    }
    return null;
  }

  // Número da semana do Tempo Comum (ex.: "8ª Semana do Tempo Comum").
  // Retorna null quando a data não está no Tempo Comum (Advento, Natal,
  // Quaresma ou Páscoa), já que nesses períodos as semanas não são
  // contadas dessa forma.
  //
  // A 2ª parte do ano (Pentecostes → véspera do Advento) é calculada de
  // trás para frente a partir da 34ª semana (Cristo Rei) — forma exata,
  // sem depender de nenhuma data móvel adicional. A 1ª parte (Batismo do
  // Senhor → véspera da Quaresma) é uma aproximação a partir do domingo
  // seguinte a 6 de janeiro; pode variar ±1 semana em relação ao Missal
  // conforme o país transfira ou não a Epifania para o domingo.
  function getOrdinaryWeekNumber(now) {
    now = now || new Date();
    const year = now.getFullYear();
    const easter = getEasterDate(year);
    const quaresmaStart = addDays(easter, -46);
    const pentecostes = addDays(easter, 49);
    const adventStart = getAdventStart(year);
    const cristoRei = addDays(adventStart, -7);
    const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const domingoAtual = addDays(hoje, -now.getDay());
    const MS_SEMANA = 7 * 24 * 60 * 60 * 1000;

    if (hoje >= pentecostes && hoje <= cristoRei) {
      const domingoCristoRei = addDays(cristoRei, -cristoRei.getDay());
      const semanasAteFim = Math.round((domingoCristoRei - domingoAtual) / MS_SEMANA);
      return Math.max(1, 34 - semanasAteFim);
    }

    if (hoje < quaresmaStart) {
      const epifania = new Date(year, 0, 6);
      const offsetParaDomingo = (7 - epifania.getDay()) % 7 || 7;
      const domingoBatismo = addDays(epifania, offsetParaDomingo);
      const semana1Domingo = addDays(domingoBatismo, 7);
      if (hoje < semana1Domingo) return null;
      const semanas = Math.round((domingoAtual - semana1Domingo) / MS_SEMANA) + 1;
      return Math.max(1, semanas);
    }

    return null;
  }

  // Mistério do Rosário do dia, segundo a tradição da Igreja: cada dia da
  // semana tem um conjunto fixo, com exceção do domingo, que segue o
  // tempo litúrgico (Advento/Natal → Gozosos, Quaresma → Dolorosos,
  // demais tempos → Gloriosos).
  function getRosaryMysteryKey(now, season) {
    now = now || new Date();
    const dow = now.getDay(); // 0 = domingo

    if (dow === 1 || dow === 6) return "gozosos";
    if (dow === 2 || dow === 5) return "dolorosos";
    if (dow === 4) return "luminosos";

    if (dow === 0) {
      season = season || getLiturgicalSeason(now);
      if (season.name.indexOf("Advento") !== -1 || season.name.indexOf("Natal") !== -1) return "gozosos";
      if (season.name.indexOf("Quaresma") !== -1) return "dolorosos";
      return "gloriosos";
    }

    return "gloriosos"; // quarta-feira
  }

  // Antífona mariana do tempo: durante todo o Tempo Pascal a tradição
  // substitui o Angelus pelo Regina Coeli; no restante do ano, reza-se o
  // Angelus.
  function getMarianAntiphonKey(season) {
    season = season || getLiturgicalSeason();
    return season.name === "Tempo Pascal" ? "reginaCoeli" : "angelus";
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
    daysUntilFesta: daysUntilFesta,
    getLiturgicalYearCycle: getLiturgicalYearCycle,
    getSpecialDay: getSpecialDay,
    getOrdinaryWeekNumber: getOrdinaryWeekNumber,
    getRosaryMysteryKey: getRosaryMysteryKey,
    getMarianAntiphonKey: getMarianAntiphonKey
  };
})();
