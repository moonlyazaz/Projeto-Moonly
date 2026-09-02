# Integração com a YouTube Data API v3

Este pacote adiciona busca e reprodução de vídeos **reais** do YouTube ao
projeto "AULA 05 - CLONAGEM YOUTUBE REALISTA".

## Como funciona

- `backend/` — servidor Node.js/Express que guarda sua chave da API em
  segredo e expõe duas rotas simples para o front-end:
  - `GET /api/buscar?q=termo` — busca vídeos reais
  - `GET /api/video/:id` — detalhes de um vídeo específico
- `frontend/` — os mesmos `index.html`, `style.css` e `script.js` da
  aula, agora buscando dados reais em vez de objetos fixos, e tocando o
  vídeo através do **player oficial embutido do YouTube** (iframe), já
  que o YouTube não libera o arquivo de vídeo bruto para terceiros.

## Passo 1 — Criar sua chave da API

1. Acesse https://console.cloud.google.com/
2. Crie um projeto novo (ou use um existente).
3. No menu, vá em **APIs e Serviços → Biblioteca**.
4. Busque por **YouTube Data API v3** e clique em **Ativar**.
5. Vá em **APIs e Serviços → Credenciais → Criar credenciais → Chave de API**.
6. Copie a chave gerada.

> A cota gratuita é de 10.000 unidades/dia. Cada busca custa ~100
> unidades, então dá para algumas centenas de buscas por dia sem custo.

## Passo 2 — Configurar o backend

```bash
cd backend
npm install
cp .env.example .env
```

Abra o `.env` e cole sua chave:

```
YOUTUBE_API_KEY=sua_chave_aqui
```

Depois, rode o servidor:

```bash
npm start
```

Você deve ver: `Servidor rodando em http://localhost:3000`

## Passo 3 — Abrir o front-end

Com o backend rodando, abra o `frontend/index.html` no navegador
(ou sirva a pasta com a extensão "Live Server" do VS Code).

A página já abre com uma busca inicial ("javascript") e você pode
digitar qualquer termo na barra de pesquisa do topo para buscar vídeos
reais do YouTube. Clicar em um vídeo recomendado o abre como vídeo
principal, tocando através do player oficial do YouTube.

## Limitações importantes

- **O vídeo não toca no seu `<video>` customizado** — o YouTube não
  disponibiliza o arquivo bruto do vídeo para uso fora da plataforma,
  então ele sempre aparece dentro do player oficial (iframe), com a
  interface própria do YouTube.
- **Nunca coloque a chave da API diretamente no front-end** (HTML/JS
  que roda no navegador) — ela ficaria visível para qualquer pessoa e
  poderia ser roubada ou ter a cota estourada por terceiros. Por isso
  o backend existe: ele é o único lugar que conhece a chave.
- **Cota diária**: se a cota acabar, a API retorna erro 403 — o toast
  vai indicar "Não foi possível buscar vídeos agora."
- O arquivo `.env` **não deve ser commitado** no Git — ele já está no
  `.gitignore` do backend.

## Integrar no seu repositório aprendendo-git

```bash
cd caminho/para/aprendendo-git
git checkout unifil-intermediario
git pull origin unifil-intermediario

# Copie a pasta backend/ para dentro de "AULA 05 - CLONAGEM YOUTUBE REALISTA/"
# e substitua os arquivos index.html, style.css e script.js pelos da pasta frontend/

git add "AULA 05 - CLONAGEM YOUTUBE REALISTA"
git commit -m "Integra o clone do YouTube com a YouTube Data API v3 (busca real + player embed)"
git push origin unifil-intermediario
```

Lembre-se de **não commitar o arquivo `.env`** com sua chave real —
apenas o `.env.example` deve ir para o repositório.
