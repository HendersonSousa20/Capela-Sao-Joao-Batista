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
    { mes: 10, dia: 12, nome: "Nossa Senhora Aparecida", resumo: "Celebra a Padroeira do Brasil, cuja imagem foi encontrada no rio Paraíba do Sul e é venerada como sinal de fé, proteção e esperança para o povo brasileiro." },
    { mes: 10, dia: 13, nome: "São Carlo Acutis", resumo: "Celebra a vida do jovem santo italiano, conhecido por sua devoção à Eucaristia e por utilizar a tecnologia como instrumento de evangelização. No Brasil, a celebração ocorre no dia 13 de outubro, para não coincidir com Nossa Senhora Aparecida, celebrada em 12 de outubro." },
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
    { mes: 12, dia: 31, nome: "São Silvestre I", resumo: "Papa durante a conversão do Império Romano ao cristianismo, encerra o ano civil na tradição da Igreja." },

    // -----------------------------------------------------------------
    // Complemento de cobertura (adicionado para fechar o calendário):
    // demais memórias, festas e solenidades de data fixa do Calendário
    // Romano Geral, a mesma fonte já usada acima. Com isso o santoral
    // passa a cobrir a esmagadora maioria dos dias que realmente têm uma
    // celebração fixa no calendário universal da Igreja — os dias que
    // ainda ficam sem entrada são, em sua maioria, dias sem nenhuma
    // memória fixa (férias do Tempo Comum), não uma lacuna de dados.
    // -----------------------------------------------------------------
    { mes: 1, dia: 2, nome: "São Basílio Magno e São Gregório Nazianzeno", resumo: "Bispos e doutores da Igreja, grandes defensores da fé no século IV e mestres da vida monástica no Oriente." },
    { mes: 1, dia: 7, nome: "São Raimundo de Penhafort", resumo: "Dominicano espanhol, organizador do Direito Canônico, dedicou a vida à confissão e à reconciliação dos pecadores." },
    { mes: 1, dia: 13, nome: "Santo Hilário de Poitiers", resumo: "Bispo e doutor da Igreja, defensor incansável da divindade de Cristo diante da heresia ariana." },
    { mes: 1, dia: 21, nome: "Santa Inês", resumo: "Jovem mártir romana, símbolo de pureza e fidelidade a Cristo mesmo diante da morte, com apenas doze anos." },
    { mes: 1, dia: 22, nome: "São Vicente de Saragoça", resumo: "Diácono e mártir espanhol, venerado desde os primeiros séculos pela coragem no testemunho da fé." },
    { mes: 1, dia: 26, nome: "Santos Timóteo e Tito", resumo: "Discípulos e colaboradores de São Paulo, tornaram-se bispos e continuaram sua missão evangelizadora." },
    { mes: 1, dia: 27, nome: "Santa Ângela Merici", resumo: "Fundadora das Ursulinas, pioneira na educação de meninas e na vida consagrada leiga." },
    { mes: 1, dia: 31, nome: "São João Bosco", resumo: "Padre italiano, pai e mestre da juventude, fundou os Salesianos dedicados à educação dos jovens pobres." },
    { mes: 2, dia: 6, nome: "São Paulo Miki e Companheiros", resumo: "Mártires do Japão, crucificados por sua fé em Cristo, testemunhas da Igreja nascente na Ásia." },
    { mes: 2, dia: 8, nome: "Santa Josefina Bakhita", resumo: "Ex-escrava sudanesa que se tornou religiosa, símbolo de perdão e libertação pela graça de Deus." },
    { mes: 2, dia: 14, nome: "São Cirilo e São Metódio", resumo: "Irmãos missionários, evangelizadores dos povos eslavos e padroeiros da Europa." },
    { mes: 2, dia: 17, nome: "Sete Fundadores da Ordem dos Servos de Maria", resumo: "Sete leigos florentinos que deixaram tudo para viver em oração e servir a Virgem Maria." },
    { mes: 2, dia: 21, nome: "São Pedro Damião", resumo: "Bispo e doutor da Igreja, reformador do clero, dedicou-se à disciplina e à santidade eclesiástica." },
    { mes: 2, dia: 23, nome: "Santo Policarpo", resumo: "Bispo de Esmirna e mártir, discípulo do apóstolo João, testemunha da fé dos primeiros cristãos." },
    { mes: 3, dia: 4, nome: "São Casimiro", resumo: "Príncipe polonês, conhecido pela vida de oração, pureza e cuidado com os pobres apesar da nobreza." },
    { mes: 3, dia: 8, nome: "São João de Deus", resumo: "Fundador da Ordem Hospitaleira, dedicou a vida ao cuidado dos doentes e dos mais abandonados." },
    { mes: 3, dia: 9, nome: "Santa Francisca Romana", resumo: "Leiga romana que conciliou vida de família e vida religiosa, fundadora de uma comunidade de oblatas." },
    { mes: 3, dia: 18, nome: "São Cirilo de Jerusalém", resumo: "Bispo e doutor da Igreja, célebre catequista que preparava os catecúmenos para o Batismo." },
    { mes: 3, dia: 23, nome: "São Turíbio de Mogrovejo", resumo: "Bispo missionário no Peru colonial, incansável na evangelização e defesa dos povos indígenas." },
    { mes: 4, dia: 2, nome: "São Francisco de Paula", resumo: "Eremita italiano, fundador dos Mínimos, conhecido pela penitência radical e pela confiança total em Deus." },
    { mes: 4, dia: 4, nome: "Santo Isidoro de Sevilha", resumo: "Bispo e doutor da Igreja, um dos maiores eruditos de seu tempo, patrono da internet pela busca do saber." },
    { mes: 4, dia: 5, nome: "São Vicente Ferrer", resumo: "Dominicano espanhol, pregador itinerante que percorreu a Europa chamando o povo à conversão." },
    { mes: 4, dia: 7, nome: "São João Batista de La Salle", resumo: "Fundador dos Irmãos das Escolas Cristãs, pioneiro da educação popular gratuita, padroeiro dos educadores." },
    { mes: 4, dia: 11, nome: "Santo Estanislau", resumo: "Bispo polonês e mártir, defendeu a justiça diante do poder político mesmo sob risco de vida." },
    { mes: 4, dia: 21, nome: "Santo Anselmo", resumo: "Bispo e doutor da Igreja, um dos grandes pensadores da fé cristã na Idade Média." },
    { mes: 4, dia: 24, nome: "São Fidélis de Sigmaringen", resumo: "Frade capuchinho e mártir, advogado que se tornou padre e defensor dos pobres." },
    { mes: 4, dia: 28, nome: "São Pedro Chanel e São Luís Maria Grignion de Montfort", resumo: "Missionário mártir na Oceania e mestre da devoção mariana, respectivamente — dois modelos de entrega total." },
    { mes: 4, dia: 30, nome: "São Pio V", resumo: "Papa dominicano, reformador da Igreja após o Concílio de Trento, grande devoto do Rosário." },
    { mes: 5, dia: 2, nome: "Santo Atanásio", resumo: "Bispo e doutor da Igreja, defensor incansável da divindade de Cristo diante da heresia ariana." },
    { mes: 5, dia: 12, nome: "São Nereu, São Aquiles e São Pancrácio", resumo: "Mártires dos primeiros séculos de Roma, testemunhas da fé cristã nascente." },
    { mes: 5, dia: 13, nome: "Nossa Senhora de Fátima", resumo: "Recorda as aparições de Maria a três pastorinhos em Fátima, Portugal, com o chamado à oração e conversão." },
    { mes: 5, dia: 18, nome: "São João I", resumo: "Papa e mártir, morreu preso por defender a comunhão entre a Igreja de Roma e o Oriente cristão." },
    { mes: 5, dia: 20, nome: "São Bernardino de Sena", resumo: "Franciscano pregador, difundiu a devoção ao Santíssimo Nome de Jesus por toda a Itália." },
    { mes: 5, dia: 25, nome: "São Beda, o Venerável", resumo: "Monge, doutor da Igreja e historiador, dedicou a vida ao estudo das Escrituras e à narração da fé cristã." },
    { mes: 5, dia: 27, nome: "Santo Agostinho de Cantuária", resumo: "Monge beneditino enviado para evangelizar a Inglaterra, primeiro arcebispo de Cantuária." },
    { mes: 6, dia: 1, nome: "São Justino", resumo: "Filósofo e mártir do século II, um dos primeiros a explicar racionalmente a fé cristã ao mundo pagão." },
    { mes: 6, dia: 2, nome: "São Marcelino e São Pedro", resumo: "Mártires romanos dos primeiros séculos, testemunhas de fé em meio às perseguições ao cristianismo." },
    { mes: 6, dia: 6, nome: "Santo Norberto", resumo: "Bispo e fundador dos Premonstratenses, dedicou-se à reforma da vida religiosa e do clero de seu tempo." },
    { mes: 6, dia: 9, nome: "Santo Efrém", resumo: "Diácono e doutor da Igreja, poeta e teólogo sírio, conhecido como a 'harpa do Espírito Santo'." },
    { mes: 6, dia: 19, nome: "São Romualdo", resumo: "Abade e reformador monástico, fundador dos Camaldulenses, mestre de vida eremítica e contemplativa." },
    { mes: 6, dia: 22, nome: "São Tomás Morus e São João Fisher", resumo: "Leigo e bispo ingleses, mártires por permanecerem fiéis à Igreja mesmo diante do poder do rei." },
    { mes: 6, dia: 27, nome: "São Cirilo de Alexandria", resumo: "Bispo e doutor da Igreja, grande defensor da maternidade divina de Maria no Concílio de Éfeso." },
    { mes: 6, dia: 28, nome: "Santo Ireneu", resumo: "Bispo e mártir, doutor da Igreja, discípulo de discípulos dos Apóstolos, defensor da fé contra as heresias." },
    { mes: 7, dia: 4, nome: "Santa Isabel de Portugal", resumo: "Rainha conhecida pela caridade aos pobres e pelo empenho constante em construir a paz." },
    { mes: 7, dia: 5, nome: "Santo Antônio Maria Zaccaria", resumo: "Fundador dos Barnabitas, dedicou-se à renovação espiritual do povo através da pregação e dos sacramentos." },
    { mes: 7, dia: 9, nome: "São Agostinho Zhao Rong e Companheiros Mártires", resumo: "Grupo de mártires chineses, testemunhas da fé cristã ao longo de séculos de perseguição na China." },
    { mes: 7, dia: 13, nome: "Santo Henrique", resumo: "Imperador do Sacro Império, conciliou o governo com uma vida de piedade e cuidado com a Igreja." },
    { mes: 7, dia: 14, nome: "São Camilo de Lélis", resumo: "Fundador dos Camilianos, dedicou a vida ao cuidado dos doentes, padroeiro dos hospitais e enfermeiros." },
    { mes: 7, dia: 15, nome: "São Boaventura", resumo: "Bispo e doutor da Igreja, franciscano, uniu profundamente teologia e vida espiritual." },
    { mes: 7, dia: 20, nome: "Santo Apolinário", resumo: "Primeiro bispo de Ravena e mártir, evangelizador incansável nos primeiros séculos do cristianismo." },
    { mes: 7, dia: 21, nome: "São Lourenço de Brindisi", resumo: "Frade capuchinho e doutor da Igreja, pregador poliglota que percorreu a Europa anunciando o Evangelho." },
    { mes: 7, dia: 23, nome: "Santa Brígida da Suécia", resumo: "Mística e fundadora religiosa, mãe de família que depois da viuvez consagrou-se totalmente a Deus." },
    { mes: 7, dia: 30, nome: "São Pedro Crisólogo", resumo: "Bispo e doutor da Igreja, conhecido pela eloquência de suas homilias, que lhe renderam o título 'palavra de ouro'." },
    { mes: 8, dia: 1, nome: "Santo Afonso Maria de Ligório", resumo: "Bispo e doutor da Igreja, fundador dos Redentoristas, grande mestre da moral e da devoção popular." },
    { mes: 8, dia: 2, nome: "Santo Eusébio de Vercelli e São Pedro Julião Eymard", resumo: "Bispo defensor da fé e apóstolo da Eucaristia, respectivamente — dois testemunhos de firmeza na doutrina e no amor ao Santíssimo." },
    { mes: 8, dia: 5, nome: "Dedicação da Basílica de Santa Maria Maior", resumo: "Celebra a mais antiga igreja mariana do Ocidente, erguida em Roma em honra à Mãe de Deus." },
    { mes: 8, dia: 7, nome: "São Sisto II e São Caetano", resumo: "Papa mártir e fundador dos Teatinos, respectivamente — testemunhas de fidelidade em tempos diferentes da Igreja." },
    { mes: 8, dia: 9, nome: "Santa Teresa Benedita da Cruz (Edith Stein)", resumo: "Filósofa judia convertida ao catolicismo, carmelita e mártir, morta em Auschwitz por sua origem judaica." },
    { mes: 8, dia: 12, nome: "Santa Joana Francisca de Chantal", resumo: "Viúva e fundadora religiosa, colaboradora de São Francisco de Sales na vida espiritual leiga." },
    { mes: 8, dia: 13, nome: "São Ponciano e Santo Hipólito", resumo: "Papa e presbítero mártires, reconciliados no exílio após uma antiga divisão na Igreja de Roma." },
    { mes: 8, dia: 16, nome: "Santo Estêvão da Hungria", resumo: "Primeiro rei cristão da Hungria, consagrou seu reino a Nossa Senhora e evangelizou seu povo." },
    { mes: 8, dia: 19, nome: "São João Eudes", resumo: "Fundador de congregações dedicadas à formação do clero, propagou a devoção aos Sagrados Corações." },
    { mes: 8, dia: 21, nome: "São Pio X", resumo: "Papa conhecido por aproximar as crianças da Eucaristia e pela simplicidade de vida mesmo no papado." },
    { mes: 8, dia: 22, nome: "Santa Maria Rainha", resumo: "Memória que celebra Maria como Rainha do Céu e da Terra, oito dias depois da solenidade da Assunção." },
    { mes: 8, dia: 23, nome: "Santa Rosa de Lima", resumo: "Primeira santa nascida nas Américas, viveu vida de oração e penitência dedicada aos pobres de Lima." },
    { mes: 8, dia: 25, nome: "São Luís, Rei da França, e São José de Calasanz", resumo: "Rei que governou com justiça e fé, e sacerdote pioneiro da educação popular gratuita." },
    { mes: 8, dia: 29, nome: "Martírio de São João Batista", resumo: "Recorda a prisão e decapitação do Precursor, que não silenciou diante da verdade mesmo sob ameaça de morte." },
    { mes: 9, dia: 3, nome: "São Gregório Magno", resumo: "Papa e doutor da Igreja, organizador da liturgia e da ação pastoral, conhecido por sua profunda humildade." },
    { mes: 9, dia: 9, nome: "São Pedro Claver", resumo: "Jesuíta espanhol que dedicou a vida ao cuidado e à evangelização dos escravizados que chegavam à Colômbia." },
    { mes: 9, dia: 12, nome: "Santíssimo Nome de Maria", resumo: "Memória que celebra a devoção ao nome de Maria, invocado pelos fiéis em toda a tradição da Igreja." },
    { mes: 9, dia: 13, nome: "São João Crisóstomo", resumo: "Bispo e doutor da Igreja, pregador de eloquência incomparável, conhecido como 'boca de ouro'." },
    { mes: 9, dia: 16, nome: "São Cornélio e São Cipriano", resumo: "Papa e bispo mártires do século III, defenderam juntos a unidade da Igreja em tempos de perseguição." },
    { mes: 9, dia: 17, nome: "São Roberto Belarmino", resumo: "Bispo e doutor da Igreja, teólogo jesuíta que defendeu a fé católica com clareza e profundidade." },
    { mes: 9, dia: 19, nome: "São Januário", resumo: "Bispo e mártir napolitano, um dos santos mais venerados do sul da Itália." },
    { mes: 9, dia: 20, nome: "São André Kim Taegon, São Paulo Chong Hasang e Companheiros", resumo: "Mártires coreanos, testemunhas da fé cristã em um dos maiores episódios de perseguição na Ásia." },
    { mes: 9, dia: 23, nome: "São Pio de Pietrelcina (Padre Pio)", resumo: "Frade capuchinho, conhecido pela vida de oração, penitência e pela dedicação incansável ao confessionário." },
    { mes: 9, dia: 26, nome: "São Cosme e São Damião", resumo: "Irmãos médicos e mártires, atendiam gratuitamente aos doentes, muito venerados popularmente no Brasil." },
    { mes: 10, dia: 5, nome: "Santa Faustina Kowalska", resumo: "Religiosa polonesa, apóstola da Divina Misericórdia, recebeu de Jesus a missão de anunciar seu amor infinito." },
    { mes: 10, dia: 6, nome: "São Bruno", resumo: "Fundador da Ordem Cartuxa, dedicou a vida ao silêncio, à oração contemplativa e à solidão com Deus." },
    { mes: 10, dia: 9, nome: "São Dinis e Companheiros, e São João Leonardi", resumo: "Bispo mártir da Gália e fundador de congregação religiosa — dois testemunhos de fidelidade em tempos distintos." },
    { mes: 10, dia: 11, nome: "São João XXIII", resumo: "Papa que convocou o Concílio Vaticano II, conhecido pela simplicidade, bondade e abertura ao mundo." },
    { mes: 10, dia: 14, nome: "São Calisto I", resumo: "Papa e mártir, dedicou-se à acolhida dos pecadores arrependidos em tempos de rigor disciplinar." },
    { mes: 10, dia: 16, nome: "Santa Edviges e Santa Margarida Maria Alacoque", resumo: "Duquesa dedicada aos pobres e religiosa que recebeu as revelações do Sagrado Coração de Jesus." },
    { mes: 10, dia: 17, nome: "Santo Inácio de Antioquia", resumo: "Bispo e mártir dos primeiros séculos, escreveu cartas preciosas a caminho do martírio em Roma." },
    { mes: 10, dia: 19, nome: "São João de Brébeuf e Companheiros, e São Paulo da Cruz", resumo: "Missionários mártires na América do Norte e fundador dos Passionistas, devoto da Paixão de Cristo." },
    { mes: 10, dia: 22, nome: "São João Paulo II", resumo: "Papa polonês, um dos pontificados mais longos da história, incansável peregrino e defensor da dignidade humana." },
    { mes: 10, dia: 23, nome: "São João de Capistrano", resumo: "Frade franciscano, pregador que uniu profundamente vida espiritual e defesa da cristandade de seu tempo." },
    { mes: 10, dia: 24, nome: "Santo Antônio Maria Claret", resumo: "Bispo e fundador dos Claretianos, incansável pregador e confessor, dedicado à formação do clero." },
    { mes: 11, dia: 3, nome: "São Martinho de Lima (Martín de Porres)", resumo: "Religioso dominicano peruano, filho de escravizada, dedicou-se aos pobres e doentes com humildade radical." },
    { mes: 11, dia: 4, nome: "São Carlos Borromeu", resumo: "Bispo de Milão, grande reformador da Igreja após o Concílio de Trento, dedicado ao cuidado do clero e dos fiéis." },
    { mes: 11, dia: 10, nome: "São Leão Magno", resumo: "Papa e doutor da Igreja, defendeu a verdadeira fé em Cristo e negociou pessoalmente a paz de Roma." },
    { mes: 11, dia: 12, nome: "São Josafá", resumo: "Bispo e mártir, dedicou a vida à unidade entre a Igreja Oriental e Roma, morto por sua fidelidade." },
    { mes: 11, dia: 13, nome: "São Diego de Alcalá", resumo: "Frade franciscano leigo, conhecido pela simplicidade e pela caridade constante com os mais pobres." },
    { mes: 11, dia: 15, nome: "Santo Alberto Magno", resumo: "Bispo e doutor da Igreja, mestre de São Tomás de Aquino, uniu profundamente fé, filosofia e ciência." },
    { mes: 11, dia: 16, nome: "Santa Margarida da Escócia e Santa Gertrudes", resumo: "Rainha dedicada à caridade e mística beneditina, ambas mestras de oração e devoção ao Coração de Jesus." },
    { mes: 11, dia: 17, nome: "Santa Isabel da Hungria", resumo: "Princesa que dedicou sua vida e seus bens aos pobres e enfermos, padroeira das obras de caridade." },
    { mes: 11, dia: 18, nome: "Dedicação das Basílicas de São Pedro e São Paulo", resumo: "Celebra as duas grandes basílicas romanas erguidas sobre os túmulos dos apóstolos Pedro e Paulo." },
    { mes: 11, dia: 23, nome: "São Clemente I e São Columbano", resumo: "Papa mártir dos primeiros séculos e monge missionário irlandês, dois pilares da evangelização da Europa." },
    { mes: 11, dia: 24, nome: "São André Dung-Lac e Companheiros Mártires", resumo: "Mártires do Vietnã, testemunhas da fé cristã diante de séculos de perseguição naquela terra." },
    { mes: 11, dia: 25, nome: "Santa Catarina de Alexandria", resumo: "Jovem mártir conhecida por sua sabedoria e firmeza na fé diante dos sábios do império romano." },
    { mes: 12, dia: 4, nome: "São João Damasceno", resumo: "Doutor da Igreja, grande defensor da veneração das imagens sagradas e sistematizador da fé cristã oriental." },
    { mes: 12, dia: 9, nome: "São Juan Diego", resumo: "Indígena mexicano a quem Nossa Senhora de Guadalupe apareceu, testemunha simples e fiel da mensagem de Maria." },
    { mes: 12, dia: 11, nome: "São Dâmaso I", resumo: "Papa que incentivou o culto aos mártires e encomendou a Vulgata, tradução latina da Bíblia, a São Jerônimo." },
    { mes: 12, dia: 21, nome: "São Pedro Canísio", resumo: "Jesuíta e doutor da Igreja, dedicou-se ao ensino da fé através de catecismos usados por gerações." },
    { mes: 12, dia: 23, nome: "São João de Kety", resumo: "Sacerdote e professor polonês, conhecido pela caridade discreta e pela vida simples de oração e estudo." },
    { mes: 12, dia: 29, nome: "Santo Tomás Becket", resumo: "Bispo e mártir inglês, morto por defender a liberdade da Igreja diante do poder do rei." }

  ],

  // dia: 0=Domingo, 1=Segunda ... 6=Sábado (mesmo padrão do JS Date)
  horariosMissas: [
    
    { dia: 4, diaLabel: "Quinta-feira", inicio: "19:00", fim: "20:30", titulo: "Santa Missa" },
    { dia: 0, diaLabel: "Domingo",      inicio: "07:00", fim: "08:30", titulo: "Santa Missa" },
    { dia: 0, diaLabel: "Domingo",      inicio: "17:00", fim: "19:30", titulo: "Santa Missa" }
  ],

  festaPadroeiro: {
    dia: 24,
    mes: 6, // Junho — Natividade de São João Batista
    nome: "Festa de São João Batista"
  },

  // Novena de São João Batista: 9 dias de preparação para a Festa do
  // Padroeiro (24/06), um dia por vez, do Evangelho até o lema da capela.
  // js/liturgy.js calcula sozinho se hoje cai dentro dessa janela (15 a
  // 23 de junho) e qual dia da novena é — não precisa mexer em nada além
  // desta lista, ano após ano.
  novenaPadroeiro: {
    oracaoFinal: "São João Batista, arauto do Senhor e voz que clamou no deserto, alcançai para nós a graça de preparar com sinceridade o caminho de Jesus em nosso coração. Dai-nos a humildade de reconhecê-Lo em nossa vida e a coragem de anunciá-Lo com nossas palavras e atos, mesmo quando isso exigir de nós um sacrifício. Que, como vós, saibamos diminuir para que Cristo cresça em nós. Amém.",
    dias: [
      { dia: 1, titulo: "O Anúncio do Anjo", citacao: "Lucas 1, 5-17", meditacao: "Zacarias e Isabel já eram idosos e não tinham filhos, mas o anjo Gabriel anuncia o nascimento de João. Mesmo diante do que parecia impossível, Deus já preparava o precursor do Salvador.", intencao: "Peçamos a graça de confiar nas promessas de Deus, mesmo quando tudo parece impossível aos nossos olhos." },
      { dia: 2, titulo: "A Alegria da Visitação", citacao: "Lucas 1, 39-45", meditacao: "Ainda no ventre de Isabel, João salta de alegria ao sentir a presença de Jesus no ventre de Maria. Antes mesmo de nascer, já reconhecia e se alegrava com o Senhor.", intencao: "Peçamos a graça de reconhecer a presença de Cristo em nossa vida e nos alegrarmos verdadeiramente com Ele." },
      { dia: 3, titulo: "Seu Nome É João", citacao: "Lucas 1, 57-66", meditacao: "Contra o costume da família, Isabel e Zacarias insistem: o nome da criança é o que Deus escolheu. Um pequeno gesto de obediência que abre caminho para a missão de João.", intencao: "Peçamos a graça de obedecer à vontade de Deus, mesmo quando ela foge do que esperávamos." },
      { dia: 4, titulo: "A Voz no Deserto", citacao: "Marcos 1, 1-4", meditacao: "João cresce e se retira ao deserto, vivendo de forma simples e austera, preparando o coração para a missão que Deus lhe confiou.", intencao: "Peçamos a graça do silêncio e da simplicidade, para escutar mais e melhor a voz de Deus." },
      { dia: 5, titulo: "Preparai o Caminho do Senhor", citacao: "Mateus 3, 1-3", meditacao: "João começa a pregar no deserto da Judeia, chamando o povo à conversão e a preparar o coração para a chegada do Messias.", intencao: "Peçamos a graça de uma conversão sincera, que prepare de verdade o caminho do Senhor em nós." },
      { dia: 6, titulo: "Eu Não Sou Digno", citacao: "João 1, 19-27", meditacao: "Interrogado sobre quem era, João se declara indigno até de desatar as sandálias daquele que viria depois dele — o Messias já estava no meio do povo, sem ser reconhecido.", intencao: "Peçamos a graça da humildade verdadeira diante de Deus e diante dos outros." },
      { dia: 7, titulo: "Eis o Cordeiro de Deus", citacao: "João 1, 29-34", meditacao: "João batiza Jesus no rio Jordão e o reconhece publicamente: \"Eis o Cordeiro de Deus\" — a mesma frase que até hoje marca a identidade desta capela.", intencao: "Peçamos a graça de, como João, saber apontar Jesus aos outros com nossa vida." },
      { dia: 8, titulo: "Convém Que Ele Cresça", citacao: "João 3, 27-30", meditacao: "João ensina aos próprios discípulos que sua missão é diminuir para que Cristo cresça — o maior dos profetas se apaga diante do Senhor.", intencao: "Peçamos a graça de nos apagarmos um pouco mais, para que Deus apareça mais em nossa vida." },
      { dia: 9, titulo: "Fiel Até o Fim", citacao: "Marcos 6, 17-29", meditacao: "João é preso e morto por denunciar com coragem o pecado de Herodes, permanecendo fiel à verdade até o martírio.", intencao: "Peçamos a graça da coragem para viver e defender a verdade, custe o que custar." }
    ]
  },

  // Primeira Sexta-Feira / Primeiro Sábado do mês: duas devoções muito
  // praticadas no Brasil. js/liturgy.js calcula sozinho se hoje é uma
  // delas (dia do mês entre 1 e 7, caindo numa sexta ou num sábado) —
  // não precisa de nenhuma manutenção de mês a mês.
  primeirasSextasSabados: {
    sexta: {
      titulo: "Primeira Sexta-Feira",
      dedicacao: "Sagrado Coração de Jesus",
      texto: "Devoção reparadora ao Sagrado Coração de Jesus, praticada na primeira sexta-feira de cada mês há séculos na tradição da Igreja, unindo a Eucaristia à confiança nas promessas do Coração de Jesus a quem O busca com fidelidade.",
      pratica: "Participar da Santa Missa e receber a Comunhão em espírito de reparação, se possível durante nove primeiras sextas-feiras consecutivas."
    },
    sabado: {
      titulo: "Primeiro Sábado do Mês",
      dedicacao: "Imaculado Coração de Maria",
      texto: "Devoção pedida por Nossa Senhora em Fátima, unindo confissão, comunhão, terço e um momento de meditação em reparação pelas ofensas ao Imaculado Coração de Maria.",
      pratica: "Confessar-se (até 8 dias antes ou depois), comungar, rezar um terço e meditar 15 minutos sobre os mistérios do Rosário, se possível durante cinco primeiros sábados consecutivos."
    }
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

  // Textos das orações tradicionais usadas no Terço Guiado
  // (js/rosary.js). Domínio público, mesma natureza das orações
  // marianas acima — centralizados aqui para quem quiser revisar ou
  // ajustar a redação sem mexer em nenhuma linha de lógica.
  oracoesTradicionais: {
    sinalDaCruz: "Em nome do Pai, e do Filho, e do Espírito Santo. Amém.",
    credo: "Creio em Deus Pai todo-poderoso, criador do Céu e da Terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos Céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
    paiNosso: "Pai Nosso, que estais no Céu, santificado seja o vosso Nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação; mas livrai-nos do mal. Amém.",
    aveMaria: "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
    gloria: "Glória ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
    oracaoFatima: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do Inferno, levai as almas todas para o Céu, principalmente as que mais precisarem.",
    salveRainha: "Salve, Rainha, Mãe de misericórdia, vida, doçura, esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria!",
    versiculoFinal: { v: "Rogai por nós, Santa Mãe de Deus.", r: "Para que sejamos dignos das promessas de Cristo." }
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
