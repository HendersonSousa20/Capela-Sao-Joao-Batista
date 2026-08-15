# Site da Capela São João Batista (Aracapé — Fortaleza/CE)

Site institucional em HTML/CSS/JS puro — **não precisa de programa nenhum
instalado, servidor ou build**. É só abrir/hospedar os arquivos.

## Estrutura

```
index.html          → a página em si (estrutura e textos fixos)
css/style.css        → estilos personalizados e camada de design premium
js/config.js          ⭐ TODOS os dados que mudam ficam aqui (telefone,
                          endereço, horários de missa, Pix, redes sociais,
                          lista de pastorais, perguntas do FAQ, catecismo)
js/liturgy.js        → cálculo automático do tempo litúrgico, próxima
                          missa, "aberto agora" e contagem para a festa
js/catholic-api.js    → busca o Evangelho e o Santo do Dia numa API
                          católica pública, com cache diário
js/content.js        → desenha na página os dados de config.js
js/dailyfaith.js      → desenha a seção "Palavra Viva" (Evangelho, Santo
                          e Catecismo do Dia)
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

- **Cor do site muda sozinha** conforme o tempo litúrgico (Advento, Quaresma,
  Páscoa, Natal, Pentecostes, Tempo Comum) — recalculado pela data de hoje,
  todo ano, para sempre.
- **"Próxima celebração" e "aberto agora"**, no topo da página, calculados a
  partir dos horários cadastrados em `config.js`.
- **Contagem regressiva para a Festa de São João Batista** (24 de junho),
  correta em qualquer ano.
- **Ano do rodapé** sempre atual.
- **Número de "Pastorais Ativas"** e de **"Celebrações por Semana"** contam
  sozinhos a partir de `config.js` — se adicionar/remover algo, o número
  muda junto, sem risco de ficar errado.
- **Evangelho e Santo do Dia** são buscados automaticamente todos os dias
  numa API católica pública e gratuita. Se ela ficar fora do ar, a seção
  mostra um aviso elegante com um link alternativo — nunca quebra a página.
- **Cor litúrgica oficial do dia** também vem dessa API (mais precisa que
  o cálculo local, pois conhece festas e memórias de santos específicas),
  com o cálculo local sempre como reserva se a API falhar.
- **Catecismo do Dia** roda 100% localmente (sem depender de internet),
  girando por uma lista de reflexões em `config.js`.

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

O Evangelho e o Santo do Dia vêm da API pública
[api-liturgia-diaria.vercel.app](https://api-liturgia-diaria.vercel.app/)
(fontes: sagradaliturgia.com.br e Canção Nova). É um projeto independente
e gratuito — se um dia sair do ar definitivamente, basta trocar a URL em
`apiCatolica` dentro de `js/config.js` por outra API equivalente.

## Publicando o site

Qualquer hospedagem de arquivos estáticos funciona (GitHub Pages,
Netlify, Vercel, ou uma hospedagem compartilhada comum). Basta subir a
pasta inteira mantendo a estrutura de pastas (`css/`, `js/`, `img/`).
