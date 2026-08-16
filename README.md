# Site da Capela São João Batista (Aracapé — Fortaleza/CE)

Site institucional em HTML/CSS/JS puro — **não precisa de programa nenhum
instalado, servidor, build ou API externa**. É só abrir/hospedar os
arquivos. Tudo que o site calcula (cor litúrgica, horários, Santo do Dia,
Catecismo do Dia) roda direto no navegador da pessoa, sem depender de
nenhum serviço de terceiros — por isso nunca fica fora do ar.

## Estrutura

```
index.html          → a página em si (estrutura e textos fixos)
css/style.css        → estilos personalizados e camada de design premium
js/config.js          ⭐ TODOS os dados que mudam ficam aqui (telefone,
                          endereço, horários de missa, Pix, redes sociais,
                          pastorais, FAQ, catecismo, calendário de santos)
js/liturgy.js        → cálculo automático do tempo litúrgico, Ano/Ciclo
                          litúrgico (A/B/C + I/II), semana do Tempo Comum,
                          solenidades especiais, mistério do Terço do dia,
                          próxima missa, "aberto agora" e contagem da festa
js/content.js        → desenha na página os dados de config.js
js/dailyfaith.js      → desenha a seção "Palavra Viva" (Liturgia de Hoje,
                          Santo do Dia, Terço do Dia, Oração Mariana do
                          Tempo e Catecismo do Dia) — 100% local
js/gallery.js        → desenha a galeria de fotos
js/contact.js        → botão "Enviar Mensagem" → WhatsApp
js/ui.js              → menu mobile, rolagem do topo, abrir/fechar FAQ
js/experience.js      → animações de entrada, barra de progresso, botão
                          "voltar ao topo", brilho no cursor do hero
js/main.js            → liga tudo isso quando a página carrega
img/                  → fotos do site
img/galeria/          → pasta para colocar fotos da galeria (veja abaixo)
```

## O que já funciona sozinho (automações), sem precisar mexer no site

Tudo abaixo roda **100% no navegador, sem internet e sem API nenhuma** —
foi escolhido de propósito assim, para nunca depender de um serviço de
terceiros que pode sair do ar ou bloquear o acesso (como aconteceu na
primeira versão, que usava uma API externa e caía por bloqueio de CORS).

- **Cor do site muda sozinha** conforme o tempo litúrgico (Advento, Quaresma,
  Páscoa, Natal, Pentecostes, Tempo Comum) — recalculado pela data de hoje,
  usando um algoritmo matemático (cálculo da Páscoa). Nunca falha.
- **"Próxima celebração" e "aberto agora"**, no topo da página, calculados a
  partir dos horários cadastrados em `config.js`.
- **Contagem regressiva para a Festa de São João Batista** (24 de junho),
  correta em qualquer ano.
- **Ano do rodapé** sempre atual.
- **Número de "Pastorais Ativas"** e de **"Celebrações por Semana"** contam
  sozinhos a partir de `config.js` — se adicionar/remover algo, o número
  muda junto, sem risco de ficar errado.
- **Liturgia de Hoje**: mostra a data de hoje, o tempo litúrgico atual, o
  **Ano/Ciclo litúrgico** (Ano A/B/C das leituras dominicais + Ciclo I/II
  das leituras de semana) e, quando aplicável, a **semana do Tempo Comum**
  (ex.: "20ª Semana do Tempo Comum") — tudo por cálculo local, sem API.
  Também tem um link direto para o site oficial da CNBB, para quem quiser
  ler as leituras completas do dia.
- **Faixa de solenidade especial**: quando o dia coincide com uma festa
  maior (Cinzas, Ramos, Tríduo Pascal, Ascensão, Pentecostes, Trindade,
  Corpo de Cristo, Sagrado Coração, Cristo Rei, Todos os Santos, Finados,
  Imaculada Conceição, Natal, etc.), aparece um destaque no topo da seção
  — todas essas datas são calculadas a partir da Páscoa ou de datas fixas,
  ano após ano, sem manutenção.
- **Santo do Dia**: consulta um calendário de datas fixas dos santos mais
  conhecidos da Igreja (Calendário Romano Geral), cadastrado em
  `config.js → santoral`. Nos dias sem uma entrada cadastrada, mostra uma
  mensagem genérica e convida a conferir o calendário completo no link
  oficial — nunca mostra uma informação inventada.
- **Terço do Dia**: mostra o conjunto de mistérios (Gozosos, Dolorosos,
  Luminosos ou Gloriosos) que a tradição da Igreja indica para cada dia da
  semana — aos domingos, o conjunto também respeita o tempo litúrgico
  (Gozosos no Advento/Natal, Dolorosos na Quaresma, Gloriosos no resto do
  ano). Lista completa em `config.js → rosario`.
- **Oração Mariana do Tempo**: exibe o Angelus na maior parte do ano e o
  Regina Coeli automaticamente durante todo o Tempo Pascal, como manda a
  tradição litúrgica. Textos em `config.js → oracoesMarianas`.
- **Catecismo do Dia** gira por uma lista de reflexões próprias (não é
  cópia do Catecismo oficial) em `config.js → catecismo`, uma por dia,
  reiniciando quando a lista acaba.
- **Compartilhar a Palavra de hoje**: botão que monta um resumo do dia
  (tempo litúrgico, ano/ciclo e mistério do Terço) e abre o WhatsApp para
  a pessoa enviar a quem quiser — sem número fixo, é um compartilhamento
  genérico.

## Tarefas comuns (o que editar em `js/config.js`)

Abra `js/config.js` em qualquer editor de texto simples e altere apenas os
valores entre aspas — não precisa entender programação para isso.

- **Mudar telefone/WhatsApp:** campo `contato.whatsapp` (só números, com
  DDI 55 e DDD) e `contato.telefoneExibicao` (o texto que aparece no site).
- **Mudar horário de missa:** dentro de `horariosMissas`, edite `dia`
  (0=domingo, 1=segunda... 6=sábado), `inicio`, `fim` e `titulo`.
- **Cadastrar a chave Pix oficial:** em `pix`, troque `chaveConfigurada`
  para `true` e preencha `chave` com a chave real. Enquanto isso não for
  feito, o site mostra "Chave a ser divulgada em breve" em vez de um
  valor inventado.
- **Colocar o link do formulário de inscrições** (Google Forms, por
  exemplo): cole a URL em `formularioInscricoes.url`.
- **Adicionar/editar uma pastoral:** adicione um item na lista
  `pastorais`, com `titulo`, `desc` e um `icone` (nomes de ícones em
  https://lucide.dev/icons).
- **Adicionar/editar uma pergunta do FAQ:** adicione um item em `faq`.
- **Adicionar um santo ao calendário:** adicione um item em `santoral`,
  com `mes` (1-12), `dia`, `nome` e `resumo`.

## Como publicar fotos na galeria

1. Salve a foto dentro da pasta `img/galeria/`.
2. Em `js/config.js`, adicione uma linha no array `galeria`, por exemplo:
   ```js
   { arquivo: "img/galeria/festa-padroeiro-2026.jpg", categoria: "Tradição", titulo: "Festa do Padroeiro", alt: "Festa de São João Batista" }
   ```
3. Pronto — a foto aparece na galeria automaticamente. Se o arquivo não
   existir por engano, o card correspondente some sozinho em vez de
   mostrar um ícone de imagem quebrada.

> Como o Instagram bloqueia a cópia automática de fotos, não foi possível
> puxar as imagens do perfil **@capelasjb_** direto para o site. Baixe as
> fotos que a comunidade quiser publicar direto do Instagram (ou peça o
> arquivo original a quem tirou a foto) e siga os passos acima.

## Onde os dados reais deste site vieram

Endereço, telefone e horários foram conferidos no Google Maps ("Igreja de
São João Batista - Aracapé") e no Instagram
[@capelasjb_](https://www.instagram.com/capelasjb_/). Bairro Aracapé,
Fortaleza - CE. Vale confirmar periodicamente com a secretaria/pastoral se
os horários continuam os mesmos, já que celebrações podem mudar.

O calendário de santos (`santoral`) segue o Calendário Romano Geral da
Igreja Católica — cobre as datas fixas mais conhecidas (cerca de 85 dias
do ano); memórias facultativas e datas que variam por região ficaram de
fora de propósito, para não arriscar exibir uma informação errada. O
Catecismo do Dia é uma elaboração própria inspirada nos grandes temas do
CIC, não uma cópia do texto oficial.

## Publicando o site

Qualquer hospedagem de arquivos estáticos funciona (GitHub Pages,
Netlify, Vercel, ou uma hospedagem compartilhada comum). Basta subir a
pasta inteira mantendo a estrutura de pastas (`css/`, `js/`, `img/`).
