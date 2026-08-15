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

  // API pública e gratuita de liturgia diária católica (leituras, Evangelho,
  // cor litúrgica oficial do dia e Santo do Dia). Fonte: sagradaliturgia.com.br
  // e Canção Nova. Se ela cair, o site continua funcionando normalmente —
  // veja js/catholic-api.js para o tratamento de erro.
  apiCatolica: {
    baseUrl: "https://api-liturgia-diaria.vercel.app",
    endpointLiturgia: "/",
    endpointSanto: "/santo-do-dia"
  },

  // dia: 0=Domingo, 1=Segunda ... 6=Sábado (mesmo padrão do JS Date)
  horariosMissas: [
    { dia: 3, diaLabel: "Quarta-feira", inicio: "18:45", fim: "20:30", titulo: "Adoração / Novena" },
    { dia: 4, diaLabel: "Quinta-feira", inicio: "19:00", fim: "20:30", titulo: "Santa Missa" },
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
    { titulo: "Caridade", desc: "Acolhimento e ajuda material aos mais necessitados, levando o amor de Cristo a quem mais precisa.", icone: "package" }
  ],

  faq: [
    {
      q: "Quais os horários de missa?",
      a: "Celebramos aos Domingos às 07h00 e às 17h00. Também há Santa Missa às Quintas-feiras às 19h00 e Adoração/Novena às Quartas-feiras às 18h45."
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

  // Galeria: array vazio de propósito — sem fotos reais cedidas pela
  // comunidade ainda. Para publicar fotos: salve o arquivo em
  // img/galeria/ e adicione um objeto aqui. O site atualiza sozinho,
  // sem precisar mexer no HTML. Veja o README.md para o passo a passo.
  galeria: [
    // Exemplo de como adicionar uma foto real no futuro:
    // { arquivo: "img/galeria/festa-padroeiro-2026.jpg", categoria: "Tradição", titulo: "Festa do Padroeiro", alt: "Festa de São João Batista na capela" }
  ]
};
