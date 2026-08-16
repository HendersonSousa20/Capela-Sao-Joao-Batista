/**
 * config.js
 * -----------------------------------------------------------------------
 * FONTE ÚNICA DE DADOS DO SITE.
 * Tudo que aparece em vários lugares (telefone, endereço, horários de
 * missa, redes sociais, pastorais, FAQ...) vem DESTE arquivo.
 *
 * Quer atualizar um horário de missa, o telefone ou o Pix?
 * Mexa APENAS aqui. O resto do site se atualiza sozinho.
 * -----------------------------------------------------------------------
 */
window.CapelaConfig = {

  nome: "Capela São João Batista",
  tagline: "“Eis o Cordeiro de Deus”",
  fundacao: null, // sem data oficial confirmada — deixe null até termos a fonte certa

  endereco: {
    logradouro: "Rua Doutor Procópio, 1210",
    bairro: "Aracapé",
    cidade: "Fortaleza",
    estado: "CE",
    cep: "60764-605",
    linkMaps: "https://maps.google.com/?q=Rua+Doutor+Procópio,+1210+-+Aracapé,+Fortaleza+-+CE"
  },

  contato: {
    telefoneExibicao: "(85) 98794-0594",
    whatsapp: "5585987940594" // DDI + DDD + número, apenas dígitos
  },

  redesSociais: {
    instagram: {
      url: "https://www.instagram.com/capelasjb_/",
      handle: "@capelasjb_"
    },
    facebook: {
      url: "https://www.facebook.com/p/Capela-S%C3%A3o-Jo%C3%A3o-Batista-100068719305703/",
      nome: "Capela São João Batista"
    }
  },

  // Link oficial para quem quiser ler a liturgia completa do dia (leituras,
  // salmo, evangelho na íntegra). Fonte: Conferência Nacional dos Bispos
  // do Brasil (CNBB) — sem depender de nenhuma API de terceiros no site.
  linkLiturgiaOficial: "https://www.cnbb.org.br/liturgia-diaria/",

  // Calendário de Santos do dia, por data fixa (dia/mês). É o Calendário
  // Romano Geral da Igreja Católica — conhecimento litúrgico público,
  // roda 100% no navegador, sem internet, e por isso nunca falha.
  // Não cobre TODOS os 365 dias (memórias facultativas e datas móveis,
  // como muitos santos de outubro/novembro variam por região, ficam de
  // fora de propósito, para não arriscar exibir uma data errada) — nos
  // dias sem entrada aqui, o site mostra uma mensagem genérica e convida
  // a conferir o calendário completo no link oficial acima.
  santoral: [
    { mes: 1, dia: 1, nome: "Maria, Mãe de Deus", resumo: "Solenidade que abre o ano celebrando a maternidade divina de Maria, primeira e maior discípula de Cristo." },
    { mes: 1, dia: 17, nome: "Santo Antão", resumo: "Pai do monaquismo cristão, viveu no deserto do Egito buscando a Deus em silêncio e oração." },
    { mes: 1, dia: 20, nome: "São Sebastião", resumo: "Soldado romano e mártir, padroeiro contra epidemias, conhecido pela firmeza de sua fé até a morte." },
    { mes: 1, dia: 24, nome: "São Francisco de Sales", resumo: "Bispo e doutor da Igreja, mestre de mansidão, patrono dos jornalistas e escritores católicos." },
    { mes: 1, dia: 25, nome: "Conversão de São Paulo Apóstolo", resumo: "Celebra o encontro de Saulo com Cristo no caminho de Damasco, que o transformou no grande apóstolo dos gentios." },
    { mes: 1, dia: 28, nome: "São Tomás de Aquino", resumo: "Doutor da Igreja, uniu fé e razão em sua teologia, patrono das universidades e escolas católicas." },
    { mes: 2, dia: 2, nome: "Apresentação do Senhor", resumo: "Festa que recorda a apresentação de Jesus no Templo, também chamada de Nossa Senhora das Candeias." },
    { mes: 2, dia: 3, nome: "São Brás", resumo: "Bispo e mártir, invocado tradicionalmente pela proteção da garganta e das doenças respiratórias." },
    { mes: 2, dia: 5, nome: "Santa Águeda", resumo: "Jovem mártir siciliana, símbolo de fortaleza e fidelidade a Cristo mesmo diante do sofrimento." },
    { mes: 2, dia: 10, nome: "Santa Escolástica", resumo: "Irmã de São Bento, fundadora do monaquismo feminino beneditino, exemplo de vida contemplativa." },
    { mes: 2, dia: 11, nome: "Nossa Senhora de Lourdes", resumo: "Recorda as aparições de Maria a Santa Bernadette em Lourdes, na França — Dia Mundial do Enfermo." },
    { mes: 2, dia: 22, nome: "Cátedra de São Pedro Apóstolo", resumo: "Celebra o ministério de Pedro como fundamento visível da unidade da Igreja." },
    { mes: 3, dia: 7, nome: "Santas Perpétua e Felicidade", resumo: "Mártires africanas do século III, testemunhas de coragem e maternidade vivida em meio à perseguição." },
    { mes: 3, dia: 17, nome: "São Patrício", resumo: "Missionário que evangelizou a Irlanda, símbolo da fé que floresce mesmo em terra estranha." },
    { mes: 3, dia: 19, nome: "São José, Esposo de Maria", resumo: "Pai adotivo de Jesus e padroeiro da Igreja Universal, modelo de obediência silenciosa a Deus." },
    { mes: 3, dia: 25, nome: "Anunciação do Senhor", resumo: "Celebra o 'sim' de Maria ao anjo Gabriel, momento em que o Verbo se fez carne em seu ventre." },
    { mes: 4, dia: 23, nome: "São Jorge", resumo: "Soldado e mártir dos primeiros séculos, venerado como símbolo de coragem na defesa da fé." },
    { mes: 4, dia: 25, nome: "São Marcos Evangelista", resumo: "Autor do segundo Evangelho, discípulo de Pedro e fundador da Igreja de Alexandria." },
    { mes: 4, dia: 29, nome: "Santa Catarina de Sena", resumo: "Doutora da Igreja e mística, teve papel decisivo no retorno do papado a Roma." },
    { mes: 5, dia: 1, nome: "São José Operário", resumo: "Celebra a dignidade do trabalho humano à luz do exemplo de José, o carpinteiro de Nazaré." },
    { mes: 5, dia: 3, nome: "São Filipe e São Tiago Menor", resumo: "Apóstolos de Cristo, testemunhas diretas da pregação e ressurreição do Senhor." },
    { mes: 5, dia: 14, nome: "São Matias Apóstolo", resumo: "Escolhido pela comunidade para substituir Judas Iscariotes entre os Doze Apóstolos." },
    { mes: 5, dia: 15, nome: "Santo Isidro Lavrador", resumo: "Camponês espanhol, padroeiro dos agricultores, exemplo de santidade vivida no trabalho simples do dia a dia." },
    { mes: 5, dia: 26, nome: "São Filipe Néri", resumo: "Fundador do Oratório, conhecido por sua alegria contagiante e devoção à confissão e à Eucaristia." },
    { mes: 5, dia: 31, nome: "Visitação de Nossa Senhora", resumo: "Recorda a visita de Maria a sua prima Isabel, quando João Batista 'saltou de alegria' no ventre materno." },
    { mes: 6, dia: 3, nome: "São Carlos Lwanga e Companheiros Mártires", resumo: "Jovens mártires de Uganda, testemunhas de fidelidade a Cristo até a entrega da própria vida." },
    { mes: 6, dia: 5, nome: "São Bonifácio", resumo: "Monge inglês, apóstolo e mártir da Alemanha, conhecido como 'Apóstolo dos Germânicos'." },
    { mes: 6, dia: 11, nome: "São Barnabé Apóstolo", resumo: "Companheiro de São Paulo nas primeiras viagens missionárias, chamado 'filho da consolação'." },
    { mes: 6, dia: 13, nome: "Santo Antônio de Pádua", resumo: "Franciscano e doutor da Igreja, um dos santos mais populares do Brasil, invocado para causas perdidas." },
    { mes: 6, dia: 21, nome: "São Luís Gonzaga", resumo: "Jovem jesuíta que morreu cuidando de doentes de peste, padroeiro da juventude católica." },
    { mes: 6, dia: 24, nome: "Natividade de São João Batista", resumo: "Celebra o nascimento do precursor de Cristo — a padroeira desta capela! 'Voz que clama no deserto', preparou os caminhos do Senhor." },
    { mes: 6, dia: 29, nome: "São Pedro e São Paulo Apóstolos", resumo: "As duas grandes colunas da Igreja: Pedro, a rocha da fé; Paulo, o apóstolo dos gentios." },
    { mes: 7, dia: 3, nome: "São Tomé Apóstolo", resumo: "O apóstolo que duvidou e depois professou a fé mais explícita do Evangelho: 'Meu Senhor e meu Deus'." },
    { mes: 7, dia: 6, nome: "Santa Maria Goretti", resumo: "Jovem mártir italiana, símbolo de pureza e perdão mesmo diante da violência sofrida." },
    { mes: 7, dia: 11, nome: "São Bento", resumo: "Pai do monaquismo ocidental, padroeiro da Europa, autor da célebre Regra que guia a vida monástica até hoje." },
    { mes: 7, dia: 16, nome: "Nossa Senhora do Monte Carmelo", resumo: "Devoção mariana ligada ao escapulário, símbolo da proteção maternal de Maria sobre seus filhos." },
    { mes: 7, dia: 22, nome: "Santa Maria Madalena", resumo: "Discípula fiel de Jesus, primeira testemunha da Ressurreição, chamada 'apóstola dos apóstolos'." },
    { mes: 7, dia: 25, nome: "São Tiago Apóstolo (Maior)", resumo: "Um dos Doze, irmão de João Evangelista, seu túmulo em Santiago de Compostela é destino de peregrinação até hoje." },
    { mes: 7, dia: 26, nome: "São Joaquim e Sant'Ana", resumo: "Pais de Maria e avós de Jesus, modelo de família que transmite a fé às novas gerações." },
    { mes: 7, dia: 29, nome: "Santa Marta, São Lázaro e Santa Maria de Betânia", resumo: "Amigos de Jesus em Betânia, exemplos de acolhida, escuta e fé diante da própria dor." },
    { mes: 7, dia: 31, nome: "Santo Inácio de Loyola", resumo: "Fundador da Companhia de Jesus, autor dos Exercícios Espirituais, converteu-se após ferir-se em batalha." },
    { mes: 8, dia: 4, nome: "São João Maria Vianney", resumo: "O 'Cura d'Ars', padroeiro dos padres, dedicou a vida à confissão e à conversão dos fiéis de sua paróquia." },
    { mes: 8, dia: 6, nome: "Transfiguração do Senhor", resumo: "Celebra o momento em que Jesus revelou sua glória divina a Pedro, Tiago e João no monte Tabor." },
    { mes: 8, dia: 8, nome: "São Domingos de Gusmão", resumo: "Fundador da Ordem dos Pregadores (dominicanos), grande pregador do Rosário e da verdade da fé." },
    { mes: 8, dia: 10, nome: "São Lourenço", resumo: "Diácono e mártir romano, conhecido pela caridade aos pobres e pela coragem diante do martírio." },
    { mes: 8, dia: 11, nome: "Santa Clara de Assis", resumo: "Fundadora das Clarissas, seguiu São Francisco na pobreza radical e na contemplação eucarística." },
    { mes: 8, dia: 14, nome: "São Maximiliano Maria Kolbe", resumo: "Frade franciscano que ofereceu a própria vida em troca da de um pai de família no campo de Auschwitz." },
    { mes: 8, dia: 15, nome: "Assunção de Nossa Senhora ao Céu", resumo: "Solenidade que celebra Maria elevada, de corpo e alma, à glória celeste — Rainha do Céu e da Terra." },
    { mes: 8, dia: 20, nome: "São Bernardo de Claraval", resumo: "Doutor da Igreja, abade cisterciense, grande devoto de Maria e mestre de vida espiritual." },
    { mes: 8, dia: 24, nome: "São Bartolomeu Apóstolo", resumo: "Um dos Doze Apóstolos, tradicionalmente identificado com Natanael, testemunha fiel de Cristo." },
    { mes: 8, dia: 27, nome: "Santa Mônica", resumo: "Mãe de Santo Agostinho, símbolo da perseverança na oração pela conversão dos filhos." },
    { mes: 8, dia: 28, nome: "Santo Agostinho", resumo: "Bispo e doutor da Igreja, autor das 'Confissões', um dos maiores pensadores da fé cristã." },
    { mes: 9, dia: 8, nome: "Natividade de Nossa Senhora", resumo: "Celebra o nascimento de Maria, aurora da salvação e primeiro passo para a vinda do Salvador." },
    { mes: 9, dia: 14, nome: "Exaltação da Santa Cruz", resumo: "Celebra a Cruz não como derrota, mas como trono da vitória de Cristo sobre a morte." },
    { mes: 9, dia: 15, nome: "Nossa Senhora das Dores", resumo: "Contempla Maria unida ao sofrimento de seu Filho, mãe que permanece firme ao pé da Cruz." },
    { mes: 9, dia: 21, nome: "São Mateus Apóstolo e Evangelista", resumo: "Publicano chamado por Jesus, tornou-se apóstolo e autor do primeiro Evangelho." },
    { mes: 9, dia: 27, nome: "São Vicente de Paulo", resumo: "Padroeiro das obras de caridade, fundador de congregações dedicadas ao serviço dos pobres." },
    { mes: 9, dia: 29, nome: "São Miguel, São Gabriel e São Rafael, Arcanjos", resumo: "Os três arcanjos nomeados na Escritura: proteção, anúncio e cura enviados por Deus." },
    { mes: 9, dia: 30, nome: "São Jerônimo", resumo: "Doutor da Igreja, tradutor da Bíblia para o latim (Vulgata), padroeiro dos estudiosos das Escrituras." },
    { mes: 10, dia: 1, nome: "Santa Teresinha do Menino Jesus", resumo: "Carmelita e doutora da Igreja, ensinou o 'caminhinho' da confiança e do amor simples a Deus." },
    { mes: 10, dia: 2, nome: "Santos Anjos da Guarda", resumo: "Celebra os mensageiros de Deus que acompanham e protegem cada pessoa em sua caminhada." },
    { mes: 10, dia: 4, nome: "São Francisco de Assis", resumo: "Padroeiro da ecologia e da paz, viveu a pobreza radical e o amor fraterno por toda a criação." },
    { mes: 10, dia: 7, nome: "Nossa Senhora do Rosário", resumo: "Celebra a devoção mariana do terço, oração simples que percorre os mistérios da vida de Cristo." },
    { mes: 10, dia: 15, nome: "Santa Teresa d'Ávila", resumo: "Doutora da Igreja, reformadora do Carmelo, mestra da oração e da união mística com Deus." },
    { mes: 10, dia: 18, nome: "São Lucas Evangelista", resumo: "Médico, evangelista e companheiro de São Paulo, autor do terceiro Evangelho e de Atos dos Apóstolos." },
    { mes: 10, dia: 28, nome: "São Simão e São Judas Tadeu Apóstolos", resumo: "Dois dos Doze Apóstolos; Judas Tadeu é hoje um dos santos mais invocados nas causas difíceis." },
    { mes: 11, dia: 1, nome: "Todos os Santos", resumo: "Solenidade que celebra todos os santos do Céu, conhecidos e anônimos, que já contemplam a face de Deus." },
    { mes: 11, dia: 2, nome: "Fiéis Defuntos (Finados)", resumo: "Dia de oração por todos os que já partiram, confiando-os à misericórdia de Deus." },
    { mes: 11, dia: 9, nome: "Dedicação da Basílica de Latrão", resumo: "Celebra a catedral do Papa em Roma, sinal da unidade de todas as igrejas do mundo com a Sé de Pedro." },
    { mes: 11, dia: 11, nome: "São Martinho de Tours", resumo: "Soldado romano convertido, repartiu sua capa com um mendigo — símbolo maior da caridade cristã." },
    { mes: 11, dia: 21, nome: "Apresentação de Nossa Senhora", resumo: "Tradição que celebra a jovem Maria sendo consagrada a Deus desde a infância." },
    { mes: 11, dia: 22, nome: "Santa Cecília", resumo: "Mártir romana, padroeira da música sacra e dos músicos que servem à liturgia." },
    { mes: 11, dia: 30, nome: "Santo André Apóstolo", resumo: "Primeiro chamado entre os Doze, irmão de Pedro, levou-o ao encontro de Jesus." },
    { mes: 12, dia: 3, nome: "São Francisco Xavier", resumo: "Jesuíta missionário na Ásia, padroeiro das missões, incansável anunciador do Evangelho." },
    { mes: 12, dia: 6, nome: "São Nicolau", resumo: "Bispo generoso do século IV, origem histórica da tradição do Papai Noel pela sua caridade aos necessitados." },
    { mes: 12, dia: 7, nome: "Santo Ambrósio", resumo: "Bispo de Milão e doutor da Igreja, mestre que batizou Santo Agostinho." },
    { mes: 12, dia: 8, nome: "Imaculada Conceição de Nossa Senhora", resumo: "Solenidade que celebra Maria concebida sem pecado original, cheia de graça desde o primeiro instante." },
    { mes: 12, dia: 12, nome: "Nossa Senhora de Guadalupe", resumo: "Aparição de Maria a São Juan Diego no México, padroeira da América Latina." },
    { mes: 12, dia: 13, nome: "Santa Luzia", resumo: "Jovem mártir siciliana, invocada tradicionalmente pela proteção da visão e da luz da fé." },
    { mes: 12, dia: 14, nome: "São João da Cruz", resumo: "Doutor da Igreja e reformador do Carmelo junto com Santa Teresa d'Ávila, poeta místico da 'noite escura'." },
    { mes: 12, dia: 25, nome: "Natal do Senhor", resumo: "Solenidade que celebra o nascimento de Jesus Cristo, o Verbo de Deus feito carne entre nós." },
    { mes: 12, dia: 26, nome: "Santo Estêvão, Primeiro Mártir", resumo: "Diácono e primeiro mártir da Igreja, morreu perdoando os que o apedrejavam." },
    { mes: 12, dia: 27, nome: "São João Apóstolo e Evangelista", resumo: "O 'discípulo amado', autor do quarto Evangelho, esteve ao pé da Cruz e recebeu Maria como mãe." },
    { mes: 12, dia: 28, nome: "Santos Inocentes Mártires", resumo: "Recorda as crianças mortas por ordem de Herodes, primeiros mártires ainda que sem saber o nome de Cristo." },
    { mes: 12, dia: 31, nome: "São Silvestre I", resumo: "Papa durante a conversão do Império Romano ao cristianismo, encerra o ano civil na tradição da Igreja." }
  ],

  // dia: 0=Domingo, 1=Segunda ... 6=Sábado (mesmo padrão do JS Date)
  horariosMissas: [
    { dia: 4, diaLabel: "Quinta-feira", inicio: "19:00", fim: "20:30", titulo: "Santa Missa/Confissão" },
    { dia: 0, diaLabel: "Domingo",      inicio: "07:00", fim: "08:30", titulo: "Santa Missa" },
    { dia: 0, diaLabel: "Domingo",      inicio: "17:00", fim: "19:30", titulo: "Santa Missa" }
  ],

  festaPadroeiro: {
    dia: 24,
    mes: 6, // Junho — Natividade de São João Batista
    nome: "Festa de São João Batista"
  },

  pix: {
    // TODO (responsável pela capela): substitua pela chave Pix oficial.
    chaveConfigurada: false,
    chave: "chave-pix-a-definir",
    tipo: "A definir"
  },

  formularioInscricoes: {
    // TODO: cole aqui o link do Google Forms de inscrições quando existir.
    url: ""
  },

  pastorais: [
    { titulo: "Família", desc: "Acolhimento de casais e fortalecimento dos laços domésticos, preparando para a vivência matrimonial.", icone: "users" },
    { titulo: "Batismo", desc: "Preparação de pais e padrinhos para a inserção das crianças na vida cristã.", icone: "droplets" },
    { titulo: "Catequese", desc: "Formação de novos discípulos de todas as idades para a 1ª Eucaristia e Crisma.", icone: "book-open" },
    { titulo: "Música", desc: "Animação litúrgica e louvor através do canto, elevando as almas durante as missas.", icone: "music" },
    { titulo: "Liturgia", desc: "Zelo e organização para que as celebrações ocorram de forma bela e sagrada.", icone: "flame" },
    { titulo: "MECE", desc: "Ministros extraordinários que levam a Eucaristia aos enfermos e auxiliam no altar.", icone: "heart" },
    { titulo: "Terço dos Homens", desc: "Reunião semanal de homens fortalecidos pela oração mariana e pela fraternidade.", icone: "gem" },
    { titulo: "PASCOM", desc: "Comunicação a serviço da evangelização digital, fotos e avisos da comunidade.", icone: "share-2" },
    { titulo: "Dízimo", desc: "Conscientização sobre a importância da partilha para a manutenção do templo.", icone: "coins" },
    { titulo: "Caridade", desc: "Acolhimento e ajuda material aos mais necessitados, levando o amor de Cristo a quem mais precisa.", icone: "package" },
    { titulo: "Coroinhas e Cerimoniários", desc: "Crianças e jovens que servem ao altar, e mestres que zelam pela ordem e beleza dos ritos litúrgicos.", icone: "bell" },
    { titulo: "Pastoral da Criança", desc: "Acompanhamento de gestantes e crianças de até 6 anos, promovendo saúde, nutrição e desenvolvimento integral em famílias vulneráveis.", icone: "baby" },
    { titulo: "Legião de Maria", desc: "Apostolado mariano de oração e visitas, levando consolo e evangelização às famílias da comunidade.", icone: "flower-2" },
    { titulo: "Apostolado da Oração", desc: "Rede de oração unida ao Papa e à Igreja, oferecendo a vida diária e intercedendo pelas intenções do mundo.", icone: "hand" }
  ],

  faq: [
    {
      q: "Quais os horários de missa?",
      a: "Celebramos aos Domingos às 07h00 e às 17h00. Também há Santa Missa às Quintas-feiras às 19h00."
    },
    {
      q: "Como solicitar uma intenção de missa?",
      a: "As intenções podem ser marcadas presencialmente antes ou depois das celebrações, ou combinadas diretamente pelo telefone/WhatsApp da capela."
    },
    {
      q: "O que preciso para marcar um Batizado?",
      a: "É necessário que pais e padrinhos participem da preparação para o Batismo. Os padrinhos devem ser católicos crismados. Procure a equipe da pastoral do Batismo, presente nas celebrações, para orientações e documentos."
    },
    {
      q: "Como funcionam as inscrições para a Catequese?",
      a: "As turmas costumam abrir no início do ano. Os períodos exatos de inscrição são avisados durante as missas e em nosso Instagram — fique de olho por lá."
    },
    {
      q: "Como posso começar a ser Dizimista?",
      a: "Você pode procurar a equipe do Dízimo ao final de qualquer celebração de domingo, ou fazer sua contribuição pela chave Pix oficial informada neste site."
    },
    {
      q: "Onde fica a capela e como chegar?",
      a: "Ficamos na Rua Doutor Procópio, 1210, no bairro Aracapé, Fortaleza - CE. É possível chegar de ônibus (linhas que atendem o Aracapé) ou pela Estação Aracapé do Metrô de Fortaleza, nas proximidades."
    }
  ],

  // Catecismo do Dia: uma reflexão curta por dia, escrita a partir dos
  // grandes temas do Catecismo da Igreja Católica (CIC), em texto próprio
  // (não é cópia literal do Catecismo). js/catholic-api.js escolhe uma
  // entrada por dia do ano de forma automática e cíclica — não precisa
  // atualizar nunca; quando a lista acabar, recomeça do início.
  catecismo: [
    { tema: "O desejo de Deus", parte: "Parte I — A Profissão da Fé", texto: "Todo ser humano carrega, no fundo do coração, um desejo de Deus — mesmo sem saber nomeá-lo. A fé é a resposta livre a esse chamado que Deus mesmo colocou em nós." },
    { tema: "A Revelação", parte: "Parte I — A Profissão da Fé", texto: "Deus não permanece escondido: Ele se revela progressivamente na História, e essa revelação alcança sua plenitude em Jesus Cristo, Palavra definitiva do Pai." },
    { tema: "A Santíssima Trindade", parte: "Parte I — A Profissão da Fé", texto: "Um só Deus em três Pessoas — Pai, Filho e Espírito Santo — é o mistério central da fé cristã. Não o compreendemos por inteiro, mas o adoramos e vivemos a partir dele." },
    { tema: "A Criação", parte: "Parte I — A Profissão da Fé", texto: "O mundo não surgiu por acaso: foi criado por amor e é bom aos olhos de Deus. O ser humano, criado à imagem e semelhança divina, é o ápice dessa obra." },
    { tema: "O pecado original", parte: "Parte I — A Profissão da Fé", texto: "A ruptura entre o homem e Deus no início da história ferida a humanidade inteira, mas não apaga a esperança: onde o pecado cresceu, a graça de Cristo superabundou." },
    { tema: "A Encarnação", parte: "Parte I — A Profissão da Fé", texto: "O Filho de Deus se fez homem para nos salvar, para nos revelar o amor de Deus e para ser nosso modelo de santidade — verdadeiro Deus e verdadeiro homem." },
    { tema: "A Páscoa de Jesus", parte: "Parte I — A Profissão da Fé", texto: "A Paixão, Morte e Ressurreição de Cristo são o coração da fé cristã: Jesus venceu o pecado e a morte, abrindo para todos nós o caminho da vida eterna." },
    { tema: "O Espírito Santo", parte: "Parte I — A Profissão da Fé", texto: "O Espírito Santo é o Amor pessoal de Deus, enviado para habitar em nós, santificar a Igreja e guiar cada fiel na verdade e na caridade." },
    { tema: "A Igreja", parte: "Parte I — A Profissão da Fé", texto: "A Igreja é o Povo de Deus reunido, Corpo místico de Cristo. Nela, pecadores em caminho de conversão são chamados à santidade e à comunhão." },
    { tema: "A comunhão dos santos", parte: "Parte I — A Profissão da Fé", texto: "Os fiéis na terra, as almas do purgatório e os santos do céu formam uma só família espiritual, unidos na oração e no amor de Cristo." },
    { tema: "Maria, Mãe da Igreja", parte: "Parte I — A Profissão da Fé", texto: "Maria, a Virgem fiel, é modelo de fé e de obediência a Deus. Sua intercessão maternal acompanha a Igreja em sua caminhada até hoje." },
    { tema: "A vida eterna", parte: "Parte I — A Profissão da Fé", texto: "A morte não é o fim: cremos na ressurreição da carne e na vida eterna, destino último para o qual toda a existência cristã está orientada." },
    { tema: "Os sacramentos, em geral", parte: "Parte II — A Celebração do Mistério Cristão", texto: "Os sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja, para que a vida divina alcance concretamente a vida humana." },
    { tema: "O Batismo", parte: "Parte II — A Celebração do Mistério Cristão", texto: "Pelo Batismo somos libertados do pecado e nascemos para uma vida nova como filhos de Deus, membros de Cristo e da sua Igreja — é a porta de todos os sacramentos." },
    { tema: "A Crisma (Confirmação)", parte: "Parte II — A Celebração do Mistério Cristão", texto: "A Confirmação fortalece a graça batismal, enraizando-nos mais profundamente na filiação divina e enviando-nos como testemunhas de Cristo no mundo." },
    { tema: "A Eucaristia", parte: "Parte II — A Celebração do Mistério Cristão", texto: "A Eucaristia é fonte e ápice de toda a vida cristã: nela, o próprio Cristo se faz presente e se entrega como alimento para o caminho dos fiéis." },
    { tema: "A Reconciliação", parte: "Parte II — A Celebração do Mistério Cristão", texto: "No sacramento da Confissão, o pecador arrependido encontra a misericórdia de Deus, que perdoa, reconcilia e devolve a paz e a graça perdidas pelo pecado." },
    { tema: "A Unção dos Enfermos", parte: "Parte II — A Celebração do Mistério Cristão", texto: "Nos momentos de doença grave, a Igreja acompanha seus filhos com este sacramento de consolo, fortaleza e, quando é da vontade de Deus, também de cura." },
    { tema: "A Ordem", parte: "Parte II — A Celebração do Mistério Cristão", texto: "Pelo sacramento da Ordem, alguns homens são configurados a Cristo Sacerdote para servir o Povo de Deus através da Palavra, dos sacramentos e da caridade pastoral." },
    { tema: "O Matrimônio", parte: "Parte II — A Celebração do Mistério Cristão", texto: "O Matrimônio cristão é aliança de amor fiel e definitivo entre um homem e uma mulher, imagem viva da aliança entre Cristo e a Igreja." },
    { tema: "A dignidade da pessoa humana", parte: "Parte III — A Vida em Cristo", texto: "Criado à imagem de Deus, todo ser humano possui uma dignidade que não depende de suas capacidades ou circunstâncias — é dom recebido, e por isso inviolável." },
    { tema: "A liberdade humana", parte: "Parte III — A Vida em Cristo", texto: "A verdadeira liberdade não é fazer o que se quer, mas ter a capacidade de escolher o bem — ela amadurece quando ordenada a Deus, nosso fim último." },
    { tema: "A consciência moral", parte: "Parte III — A Vida em Cristo", texto: "A consciência é o santuário interior onde a pessoa escuta a voz de Deus. Formá-la com a Palavra e o ensino da Igreja é tarefa de toda a vida." },
    { tema: "As virtudes", parte: "Parte III — A Vida em Cristo", texto: "As virtudes são disposições estáveis para o bem. Prudência, justiça, fortaleza e temperança orientam a ação; fé, esperança e caridade são dons de Deus que a elevam." },
    { tema: "O primeiro mandamento", parte: "Parte III — Os Dez Mandamentos", texto: "'Amarás o Senhor teu Deus sobre todas as coisas' nos convida a colocar Deus verdadeiramente em primeiro lugar, sem ídolos que ocupem o centro do coração." },
    { tema: "O segundo mandamento", parte: "Parte III — Os Dez Mandamentos", texto: "Respeitar o nome de Deus é reconhecê-lo como santo, evitando usá-lo de modo vão e aprendendo a bendizê-lo em tudo o que vivemos." },
    { tema: "O terceiro mandamento", parte: "Parte III — Os Dez Mandamentos", texto: "Guardar o Dia do Senhor é reservar tempo para a adoração, o descanso e a vida em família — um respiro semanal que reordena toda a existência." },
    { tema: "O quarto mandamento", parte: "Parte III — Os Dez Mandamentos", texto: "Honrar pai e mãe funda toda a ordem social: começa em casa o aprendizado do respeito, da gratidão e do cuidado mútuo entre gerações." },
    { tema: "O quinto mandamento", parte: "Parte III — Os Dez Mandamentos", texto: "A vida humana é sagrada desde a concepção até o fim natural. Cuidar da própria vida e da vida do próximo é resposta concreta a este mandamento." },
    { tema: "O sétimo mandamento", parte: "Parte III — Os Dez Mandamentos", texto: "A justiça exige respeitar o que é do outro e usar os bens do mundo com responsabilidade, lembrando que somos administradores, não donos absolutos." },
    { tema: "O oitavo mandamento", parte: "Parte III — Os Dez Mandamentos", texto: "Viver na verdade é recusar a mentira e a maledicência, e ter a coragem de testemunhar o que é justo, mesmo quando isso custa caro." },
    { tema: "A oração, definição", parte: "Parte IV — A Oração Cristã", texto: "Orar é elevar a alma a Deus, é o coração que se volta para Ele em busca de comunhão — mais do que pedir, é aprender a permanecer em sua presença." },
    { tema: "O Pai Nosso", parte: "Parte IV — A Oração Cristã", texto: "O Pai Nosso, ensinado pelo próprio Jesus, resume todo o Evangelho: nele aprendemos a chamar Deus de Pai e a confiar nele como filhos amados." },
    { tema: "As formas de oração", parte: "Parte IV — A Oração Cristã", texto: "Adoração, súplica, intercessão, ação de graças e louvor são caminhos diferentes para o mesmo encontro: o diálogo constante entre o coração e Deus." },
    { tema: "As dificuldades na oração", parte: "Parte IV — A Oração Cristã", texto: "A distração e a secura espiritual fazem parte do caminho de oração de muitos santos — perseverar com fé, mesmo sem sentir nada, também é oração." }
  ],

  // Mistérios do Santo Terço, com o fruto espiritual de cada mistério.
  // js/liturgy.js decide qual conjunto reza-se hoje (regra tradicional:
  // cada dia da semana tem um conjunto fixo, exceto domingo, que segue o
  // tempo litúrgico corrente) — dado 100% público da tradição da Igreja,
  // não depende de nenhuma API.
  rosario: {
    gozosos: {
      nome: "Mistérios Gozosos",
      dias: "Segundas-feiras e Sábados",
      misterios: [
        { titulo: "A Anunciação do Anjo a Maria", fruto: "Humildade" },
        { titulo: "A Visitação de Maria a sua prima Isabel", fruto: "Caridade com o próximo" },
        { titulo: "O Nascimento de Jesus em Belém", fruto: "Pobreza de espírito" },
        { titulo: "A Apresentação de Jesus no Templo", fruto: "Obediência" },
        { titulo: "O Encontro do Menino Jesus no Templo", fruto: "Busca de Deus acima de tudo" }
      ]
    },
    dolorosos: {
      nome: "Mistérios Dolorosos",
      dias: "Terças-feiras e Sextas-feiras",
      misterios: [
        { titulo: "A Agonia de Jesus no Horto das Oliveiras", fruto: "Conformidade com a vontade de Deus" },
        { titulo: "A Flagelação de Jesus", fruto: "Domínio dos sentidos" },
        { titulo: "A Coroação de Espinhos", fruto: "Desprezo do mundo" },
        { titulo: "Jesus Carrega a Cruz até o Calvário", fruto: "Paciência nas provações" },
        { titulo: "A Crucificação e Morte de Jesus", fruto: "Espírito de perdão e conversão" }
      ]
    },
    gloriosos: {
      nome: "Mistérios Gloriosos",
      dias: "Quartas-feiras e Domingos",
      misterios: [
        { titulo: "A Ressurreição de Jesus", fruto: "Fé" },
        { titulo: "A Ascensão de Jesus ao Céu", fruto: "Esperança" },
        { titulo: "A Descida do Espírito Santo (Pentecostes)", fruto: "Amor de Deus" },
        { titulo: "A Assunção de Nossa Senhora ao Céu", fruto: "Devoção a Maria" },
        { titulo: "A Coroação de Nossa Senhora como Rainha", fruto: "Perseverança final" }
      ]
    },
    luminosos: {
      nome: "Mistérios Luminosos",
      dias: "Quintas-feiras",
      misterios: [
        { titulo: "O Batismo de Jesus no Rio Jordão", fruto: "Fidelidade às promessas do Batismo" },
        { titulo: "A Autorrevelação de Jesus nas Bodas de Caná", fruto: "Confiança na intercessão de Maria" },
        { titulo: "O Anúncio do Reino de Deus e o Convite à Conversão", fruto: "Desejo de santidade" },
        { titulo: "A Transfiguração de Jesus", fruto: "Coragem para seguir a cruz" },
        { titulo: "A Instituição da Eucaristia", fruto: "Adoração" }
      ]
    }
  },

  // Orações marianas do tempo litúrgico: durante o Tempo Pascal, a
  // tradição da Igreja substitui o Angelus pelo Regina Coeli. Textos
  // tradicionais de domínio público, no mesmo espírito do Catecismo do
  // Dia acima.
  oracoesMarianas: {
    angelus: {
      titulo: "Angelus",
      subtitulo: "Rezado tradicionalmente ao amanhecer, ao meio-dia e ao entardecer",
      texto: "V. O Anjo do Senhor anunciou a Maria.\nR. E ela concebeu do Espírito Santo. (Ave-Maria)\n\nV. Eis aqui a serva do Senhor.\nR. Faça-se em mim segundo a vossa palavra. (Ave-Maria)\n\nV. E o Verbo se fez carne.\nR. E habitou entre nós. (Ave-Maria)\n\nRogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo."
    },
    reginaCoeli: {
      titulo: "Regina Coeli (Rainha do Céu)",
      subtitulo: "Substitui o Angelus durante todo o Tempo Pascal",
      texto: "Rainha do Céu, alegrai-vos, aleluia.\nPorque Aquele que merecestes trazer em vosso seio, aleluia,\nressuscitou como disse, aleluia.\nRogai a Deus por nós, aleluia.\n\nExultai e alegrai-vos, Virgem Maria, aleluia,\nporque o Senhor ressuscitou verdadeiramente, aleluia."
    }
  },

  // Galeria: array vazio de propósito — sem fotos reais cedidas pela
  // comunidade ainda. Para publicar fotos: salve o arquivo em
  // img/galeria/ e adicione um objeto aqui. O site atualiza sozinho,
  // sem precisar mexer no HTML. Veja o README.md para o passo a passo.
  galeria: [
    // Exemplo de como adicionar uma foto real no futuro:
    // { arquivo: "img/galeria/festa-padroeiro-2026.jpg", categoria: "Tradição", titulo: "Festa do Padroeiro", alt: "Festa de São João Batista na capela" }
  ]
};
