# MoonTube — Frontend

Clone funcional do YouTube (interface do assinante). Este diretório contém o
**frontend estático** do projeto, que consome o backend situado na pasta
`../backend` (pasta irmã dentro de `YouTube Funcional v2`).

## Stack

- `index.html` — estrutura, SEO/meta tags, carregamento do Google Identity
  Services (Google Sign-In) e da API de iframe do YouTube.
- `style.css` — estilos (variáveis CSS, tema claro/escuro, responsividade).
- `script.js` — toda a lógica do player (único arquivo, não-modular; veja o
  cabeçalho do arquivo para o índice de seções).
- Backend consumido: `../backend` (Node + Express) expõe a API e o proxy de
  streaming.
- Dependências externas: Font Awesome (ícones), Google Sign-In, YouTube IFrame
  API e Socket.IO (modo "party", vindo do backend).

## Como rodar

O frontend é **100% estático** — basta servir a pasta via qualquer servidor
estático:

```bash
# Opção simples (a partir da pasta deste README):
python -m http.server 5500
# ou (Node):
npx serve .
```

Abra no navegador o endereço indicado (ex.: `http://localhost:5500`).

> O player carrega vídeos reais por meio do backend. Se o backend não estiver
> no ar/acessível, a busca e a reprodução ficam limitadas.

## Configuração da URL do backend

A URL usada para chamar a API é definida **inline no `index.html`**, na
constante:

```js
const URL_DO_BACKEND = "https://projeto-moonly.onrender.com";
```

Todos os `fetch` do `script.js` usam essa constante. Se você rodar o backend
localmente, troque-a pelo endereço local do servidor, ex.:

```js
const URL_DO_BACKEND = "http://localhost:3000";
```

### Endpoints usados pelo frontend

| Recurso            | Endpoint                                 | Notas                                  |
| ------------------ | ---------------------------------------- | -------------------------------------- |
| Populares (Home)   | `GET /api/populares`                     | Aceita `?categoria=`                   |
| Busca              | `GET /api/buscar`                        | Aceita `?q=` e `?duracao=`             |
| Detalhes do vídeo  | `GET /api/video/:id`                     | Título, canal, curtidas, etc.          |
| Comentários        | `GET /api/comentarios/:id`               |                                        |
| Sugestões (busca)  | `GET /api/sugestoes?q=`                  |                                        |
| Vídeos de canal    | `GET /api/buscar?canalId=...`            |                                        |
| Stream de vídeo    | `GET /api/stream/:id`                    | Fonte preferida de reprodução (MP4)    |

### Fallback de streaming (Invidious)

Se o proxy de stream do backend falhar (por exemplo, IP de datacenter
bloqueado pelo YouTube), o `script.js` tenta instâncias públicas de Invidious
definidas na constante `INSTANCIAS_INVIDIOUS`:

```js
const INSTANCIAS_INVIDIOUS = [
  "https://inv.nadeko.net",
  "https://invidious.nerdvpn.de",
  "https://yewtu.be",
];
```

## Recursos implementados

- Pesquisa e navegação por categorias (chips).
- Player próprio com controles (play/pause/mudo/tela cheia/barra de progresso).
- Vídeos e Shorts.
- Autenticação com conta Google (OAuth via GSI + validação do token no backend).
- Inscrever-se em canais, curtir vídeos e deixar salvo.
- Comentários com respostas.
- Histórico e listas ("assistir mais tarde" / "gostei").
- Modo "party" em tempo real (Socket.IO) e extras (snake/tema).

## Estrutura de pastas do projeto (visão geral)

```
YouTube Funcional v2/
├─ backend/   # Node/Express — YouTube Data API v3 + proxy de stream
├─ frontend/  # esta pasta (HTML/CSS/JS estáticos)
└─ docs       # arquivos de apoio (ex.: COMO-ADICIONAR-ENDPOINT-STREAM.md)
```

Veja também o `README.md` na raiz de `YouTube Funcional v2` para a visão geral
do projeto e os passos de configuração do backend.
