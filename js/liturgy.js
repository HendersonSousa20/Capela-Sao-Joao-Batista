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

    const palmSunday = new Date(easterDate);
    palmSunday.setDate(easterDate.getDate() - 7);

    const holyThursday = new Date(easterDate);
    holyThursday.setDate(easterDate.getDate() - 3);

    const goodFriday = new Date(easterDate);
    goodFriday.setDate(easterDate.getDate() - 2);

    const holySaturday = new Date(easterDate);
    holySaturday.setDate(easterDate.getDate() - 1);

    const oitavaPascoaFim = new Date(easterDate);
    oitavaPascoaFim.setDate(easterDate.getDate() + 7);

    const pentecostesDate = new Date(easterDate);
    pentecostesDate.setDate(easterDate.getDate() + 49);

    const natal = new Date(year, 11, 25);
    const oitavaNatalFim = new Date(year, 11, 25);
    oitavaNatalFim.setDate(oitavaNatalFim.getDate() + 7); // 1º de janeiro seguinte

    const adventoStart = new Date(year, 11, 25);
    adventoStart.setDate(25 - (adventoStart.getDay() || 7) - 21);

    const gaudete = new Date(adventoStart);
    gaudete.setDate(adventoStart.getDate() + 14); // 3º Domingo do Advento

    const laetare = new Date(quaresmaStart);
    laetare.setDate(quaresmaStart.getDate() + 25); // 4º Domingo da Quaresma

    // Fim do Tempo do Natal: coincide exatamente com o Batismo do Senhor
    // (mesma regra de transferência da Epifania usada em getOrdinaryWeekNumber),
    // em vez de uma data fixa de 10 de janeiro.
    const hojeSemHora = new Date(year, month, day);
    const batismoDoSenhor = getBaptismOfLordSunday(year);

    const ROXO = { color: "#6B21A8", soft: "#F3E8FF" };
    const BRANCO = { color: "#B68D40", soft: "#FEFCE8" };
    const VERMELHO = { color: "#DC2626", soft: "#FEF2F2" };
    const ROSA = { color: "#F472B6", soft: "#FDF2F8" };

    // --- Tríduo Pascal: o auge do ano litúrgico, dia a dia ---
    if (hojeSemHora >= holyThursday && hojeSemHora < easterDate) {
      if (sameCalendarDate(hojeSemHora, holyThursday)) return { name: "Tríduo Pascal — Quinta-feira Santa", color: BRANCO.color, soft: BRANCO.soft, icon: "grape" };
      if (sameCalendarDate(hojeSemHora, goodFriday)) return { name: "Tríduo Pascal — Sexta-feira da Paixão", color: VERMELHO.color, soft: VERMELHO.soft, icon: "cross" };
      return { name: "Tríduo Pascal — Sábado Santo", color: ROXO.color, soft: ROXO.soft, icon: "moon" };
    }

    if (hojeSemHora >= quaresmaStart && hojeSemHora < holyThursday) {
      if (hojeSemHora >= palmSunday) return { name: "Semana Santa", color: VERMELHO.color, soft: VERMELHO.soft, icon: "palmtree" };
      if (sameCalendarDate(hojeSemHora, laetare)) return { name: "Tempo da Quaresma (Domingo Laetare)", color: ROSA.color, soft: ROSA.soft, icon: "cloud-rain" };
      return { name: "Tempo da Quaresma", color: ROXO.color, soft: ROXO.soft, icon: "cloud-rain" };
    } else if (hojeSemHora >= easterDate && hojeSemHora < pentecostesDate) {
      if (hojeSemHora <= oitavaPascoaFim) return { name: "Oitava de Páscoa", color: BRANCO.color, soft: BRANCO.soft, icon: "sun" };
      return { name: "Tempo Pascal", color: BRANCO.color, soft: BRANCO.soft, icon: "sun" };
    } else if (hojeSemHora >= adventoStart && hojeSemHora < natal) {
      if (sameCalendarDate(hojeSemHora, gaudete)) return { name: "Tempo do Advento (Domingo Gaudete)", color: ROSA.color, soft: ROSA.soft, icon: "star" };
      return { name: "Tempo do Advento", color: ROXO.color, soft: ROXO.soft, icon: "star" };
    } else if ((month === 11 && day >= 25) || (month === 0 && hojeSemHora <= batismoDoSenhor)) {
      if (hojeSemHora >= natal && hojeSemHora <= oitavaNatalFim) return { name: "Oitava de Natal", color: BRANCO.color, soft: BRANCO.soft, icon: "baby" };
      return { name: "Tempo do Natal", color: BRANCO.color, soft: BRANCO.soft, icon: "baby" };
    } else if (hojeSemHora.getTime() === pentecostesDate.getTime()) {
      return { name: "Pentecostes", color: VERMELHO.color, soft: VERMELHO.soft, icon: "flame" };
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
  // ano litúrgico corrente, Y mod 3 = 1 → A, 2 → B, 0 → C. O Ciclo Ferial
  // segue a MESMA referência Y (não o ano civil corrente): os dois ciclos
  // trocam juntos no Advento, não em 1º de janeiro — é assim que aparece
  // nos Ordos e calendários litúrgicos oficiais (ex.: durante o Advento
  // de um ano ímpar, já vale o Ciclo Ferial do ano par seguinte).
  function getLiturgicalYearCycle(now) {
    now = now || new Date();
    const adventStartThisYear = getAdventStart(now.getFullYear());
    const Y = (now >= adventStartThisYear) ? now.getFullYear() + 1 : now.getFullYear();
    const mod = Y % 3;
    const cicloDominical = mod === 1 ? "A" : (mod === 2 ? "B" : "C");
    const cicloFerial = (Y % 2 === 0) ? "II" : "I";
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

    const sagradoCoracao = addDays(easter, 68);
    const imaculadoCoracao = addDays(sagradoCoracao, 1);

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
      { d: sagradoCoracao, nome: "Sagrado Coração de Jesus", nota: "Celebração do amor misericordioso de Jesus pela humanidade." },
      { d: imaculadoCoracao, nome: "Imaculado Coração de Maria", nota: "Memória do coração de Maria, todo entregue a Deus e unido ao de seu Filho." },
      { d: addDays(adventStart, -7), nome: "Nosso Senhor Jesus Cristo, Rei do Universo", nota: "Encerramento do Ano Litúrgico, celebrando a realeza de Cristo." },
      { d: new Date(year, 0, 1), nome: "Solenidade de Maria, Mãe de Deus", nota: "Abertura do ano civil sob a maternidade divina de Maria." },
      { d: new Date(year, 7, 15), nome: "Assunção de Nossa Senhora", nota: "Maria é assunta corpo e alma ao Céu." },
      { d: new Date(year, 9, 12), nome: "Nossa Senhora Aparecida", nota: "Padroeira do Brasil — solenidade nacional, celebrando a Mãe de Deus sob esse título." },
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

  // Domingo do Batismo do Senhor: no Brasil (regra da CNBB, seguida pela
  // generalidade dos países que transferem a Epifania para o domingo), a
  // Epifania é celebrada no domingo entre 2 e 8 de janeiro. Se esse
  // domingo cair em 7 ou 8 de janeiro, o Batismo do Senhor passa para a
  // segunda-feira seguinte; caso contrário, o Batismo é no domingo
  // seguinte à Epifania. É a mesma regra usada pelo Missal Romano e pelo
  // calendário litúrgico oficial da CNBB — cálculo exato, sem aproximação.
  function getBaptismOfLordSunday(year) {
    // Domingo entre 2 e 8 de janeiro (a Epifania transferida)
    let epifania = new Date(year, 0, 2);
    while (epifania.getDay() !== 0) epifania = addDays(epifania, 1);

    if (epifania.getDate() === 7 || epifania.getDate() === 8) {
      // Batismo do Senhor cai na segunda-feira seguinte à Epifania
      return addDays(epifania, 1);
    }
    // Nos demais casos, Batismo do Senhor é o domingo seguinte à Epifania
    return addDays(epifania, 7);
  }

  // Número da semana do Tempo Comum (ex.: "8ª Semana do Tempo Comum").
  // Retorna null quando a data não está no Tempo Comum (Advento, Natal,
  // Quaresma ou Páscoa), já que nesses períodos as semanas não são
  // contadas dessa forma.
  //
  // Cálculo exato nas duas partes do ano, seguindo a regra do Missal
  // Romano: a 2ª parte (Pentecostes → véspera do Advento) é contada de
  // trás para frente a partir da 34ª semana (Cristo Rei); a 1ª parte
  // (Batismo do Senhor → véspera da Quaresma) é contada para frente a
  // partir da semana seguinte ao Batismo do Senhor — calculado com a
  // mesma regra oficial de transferência da Epifania usada pela CNBB.
  function getOrdinaryWeekNumber(now) {
    now = now || new Date();

    // Trava de consistência: a semana do Tempo Comum só é exibida quando
    // o próprio cálculo do tempo litúrgico confirma que o dia está no
    // Tempo Comum. Isso evita mostrar, por exemplo, "1ª Semana" no
    // domingo do Batismo do Senhor ou em Pentecostes — dias que
    // pertencem a outro tempo, mesmo caindo dentro do intervalo de datas
    // usado para a conta.
    const season = getLiturgicalSeason(now);
    if (season.name !== "Tempo Comum") return null;

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
      const batismoDoSenhor = getBaptismOfLordSunday(year);
      const baseDomingo = addDays(batismoDoSenhor, -batismoDoSenhor.getDay());
      const semana1Domingo = (batismoDoSenhor.getDay() === 0) ? baseDomingo : addDays(baseDomingo, 7);
      if (hoje < semana1Domingo) return null;
      const semanas = Math.round((domingoAtual - semana1Domingo) / MS_SEMANA) + 1;
      return Math.max(1, semanas);
    }

    return null;
  }

  // Mistério do Rosário do dia, segundo a tradição da Igreja: cada dia da
  // semana tem um conjunto fixo, com exceção do domingo, que segue o
  // tempo litúrgico (Advento/Natal → Gozosos, Quaresma → Dolorosos,
  // demais tempos → Gloriosos). Durante a Semana Santa e o Tríduo Pascal,
  // a tradição sobrepõe esse padrão semanal: reza-se os Mistérios
  // Dolorosos em todos os dias, por serem o coração da Paixão do Senhor.
  function getRosaryMysteryKey(now, season) {
    now = now || new Date();
    season = season || getLiturgicalSeason(now);

    if (season.name === "Semana Santa" || season.name.indexOf("Tríduo Pascal") === 0) {
      return "dolorosos";
    }
    if (season.name === "Oitava de Páscoa") {
      // Tradição devocional: a Oitava de Páscoa é celebrada como "um único
      // grande Domingo" — reza-se os Mistérios Gloriosos todos os dias.
      return "gloriosos";
    }

    const dow = now.getDay(); // 0 = domingo

    if (dow === 1 || dow === 6) return "gozosos";
    if (dow === 2 || dow === 5) return "dolorosos";
    if (dow === 4) return "luminosos";

    if (dow === 0) {
      if (season.name.indexOf("Advento") !== -1 || season.name.indexOf("Natal") !== -1) return "gozosos";
      if (season.name.indexOf("Quaresma") !== -1) return "dolorosos";
      return "gloriosos";
    }

    return "gloriosos"; // quarta-feira
  }

  // Antífona mariana do tempo: da Vigília Pascal (Sábado Santo) até o fim
  // do dia de Pentecostes, a tradição substitui o Angelus pelo Regina
  // Coeli; no restante do ano — inclusive na Quinta e Sexta-feira Santa,
  // antes da Ressurreição — reza-se o Angelus. Lista explícita em vez de
  // correspondência por trecho do nome, para não confundir "Páscoa"
  // (substantivo, usado em "Oitava de Páscoa") com "Pascal" (adjetivo).
  const NOMES_REGINA_COELI = [
    "Tríduo Pascal — Sábado Santo",
    "Oitava de Páscoa",
    "Tempo Pascal",
    "Pentecostes"
  ];

  function getMarianAntiphonKey(season) {
    season = season || getLiturgicalSeason();
    return NOMES_REGINA_COELI.indexOf(season.name) !== -1 ? "reginaCoeli" : "angelus";
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

  // Novena do Padroeiro: retorna { diaNovena (1-9), conteudo, festaEm } se
  // hoje cair dentro da janela de 9 dias antes da Festa (24/06 → novena de
  // 15 a 23/06), ou null no resto do ano. Puro cálculo de data a partir de
  // festaPadroeiro — não precisa de nenhuma manutenção de ano a ano.
  function getNovenaInfo(now) {
    now = now || new Date();
    const cfgFesta = (window.CapelaConfig && window.CapelaConfig.festaPadroeiro) || { dia: 24, mes: 6 };
    const cfgNovena = (window.CapelaConfig && window.CapelaConfig.novenaPadroeiro) || null;
    if (!cfgNovena || !cfgNovena.dias || cfgNovena.dias.length !== 9) return null;

    const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const festa = new Date(hoje.getFullYear(), cfgFesta.mes - 1, cfgFesta.dia);
    const inicioNovena = addDays(festa, -9);
    const fimNovena = addDays(festa, -1);

    if (hoje < inicioNovena || hoje > fimNovena) return null;

    const diaNovena = Math.round((hoje - inicioNovena) / (24 * 60 * 60 * 1000)) + 1; // 1..9
    const conteudo = cfgNovena.dias.find(function (d) { return d.dia === diaNovena; });
    if (!conteudo) return null;

    return { diaNovena: diaNovena, conteudo: conteudo, oracaoFinal: cfgNovena.oracaoFinal, festa: festa };
  }

  // Primeira Sexta-Feira ou Primeiro Sábado do mês: "primeira/primeiro"
  // significa a sexta ou o sábado cuja data cai entre o dia 1 e o dia 7
  // do mês — a mesma regra usada por qualquer calendário devocional.
  function getFirstFridaySaturdayInfo(now) {
    now = now || new Date();
    if (now.getDate() > 7) return null;
    if (now.getDay() === 5) return { tipo: "sexta" };
    if (now.getDay() === 6) return { tipo: "sabado" };
    return null;
  }

  return {
    getLiturgicalSeason: getLiturgicalSeason,
    getNextMass: getNextMass,
    isOpenNow: isOpenNow,
    daysUntilFesta: daysUntilFesta,
    getNovenaInfo: getNovenaInfo,
    getFirstFridaySaturdayInfo: getFirstFridaySaturdayInfo,
    getLiturgicalYearCycle: getLiturgicalYearCycle,
    getSpecialDay: getSpecialDay,
    getOrdinaryWeekNumber: getOrdinaryWeekNumber,
    getRosaryMysteryKey: getRosaryMysteryKey,
    getMarianAntiphonKey: getMarianAntiphonKey
  };
})();
