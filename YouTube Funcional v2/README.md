# Integração com a YouTube Data API v3 + Login com Google

Este pacote adiciona busca, Home com vídeos em alta, Shorts e reprodução
de vídeos **reais** do YouTube ao projeto "AULA 05 - CLONAGEM YOUTUBE
REALISTA", além de um Login com Google de verdade.

## Como funciona

- `backend/` — servidor Node.js/Express que guarda sua chave da API em
  segredo, expõe as rotas da YouTube Data API **e agora também serve o
  próprio front-end** (isso é importante — veja o aviso abaixo):
  - `GET /api/populares` — vídeos em alta no Brasil (Home)
  - `GET /api/populares?categoria=ID` — vídeos em alta filtrados por categoria
  - `GET /api/buscar?q=termo` — busca vídeos reais
  - `GET /api/buscar?q=termo&duracao=short` — busca Shorts
  - `GET /api/video/:id` — detalhes de um vídeo específico
- `frontend/` — os mesmos `index.html`, `style.css` e `script.js` da
  aula, com Home estilo YouTube (chips de categoria), busca em lista
  vertical, Shorts com barra de ações e Login com Google.

## ⚠️ Importante: sempre abra via http://localhost, nunca o arquivo direto

O player embutido do YouTube (erro 153) e o Login com Google **só
funcionam quando a página é servida por http://**, nunca abrindo o
`index.html` diretamente pelo Explorer (isso carrega a página como
`file://`, que o Google bloqueia). Por isso o backend agora serve o
front-end também — você só precisa abrir `http://localhost:3000` no
navegador.

## Passo 1 — Criar sua chave da API do YouTube

1. Acesse https://console.cloud.google.com/
2. Crie um projeto novo (ou use um existente).
3. No menu, vá em **APIs e Serviços → Biblioteca**.
4. Busque por **YouTube Data API v3** e clique em **Ativar**.
5. Vá em **APIs e Serviços → Credenciais → Criar credenciais → Chave de API**.
6. Copie a chave gerada.

> A cota gratuita é de 10.000 unidades/dia. Cada busca custa ~100
> unidades, então dá para algumas centenas de buscas por dia sem custo.

## Passo 2 — Criar o Client ID do Login com Google

1. No mesmo projeto do Google Cloud Console, vá em **APIs e Serviços → Credenciais**.
2. Clique em **Criar credenciais → ID do cliente OAuth**.
3. Se pedir para configurar a "Tela de consentimento OAuth" antes, escolha **Externo**, preencha nome do app e e-mail, e salve (não precisa publicar, "Em teste" já funciona para você mesmo).
4. Tipo de aplicativo: **Aplicativo da Web**.
5. Em **Origens JavaScript autorizadas**, adicione (digite manualmente, sem colar, para evitar espaços invisíveis):
   ```
   http://localhost:3000
   ```
6. Clique em **Criar** e copie o **Client ID** gerado (termina com `.apps.googleusercontent.com`).

## Passo 2.1 — Liberar permissão para curtir e se inscrever de verdade

Por padrão, o login só identifica quem é a pessoa (nome, e-mail, foto).
Para os botões "Curtir" e "Inscrever-se" agirem de verdade na conta
real do YouTube da pessoa, é preciso liberar um escopo (permissão)
extra:

1. No Google Cloud Console, vá em **APIs e Serviços → Tela de consentimento OAuth**.
2. Clique em **Editar app** → vá até a seção **Escopos** → **Adicionar ou remover escopos**.
3. Na busca, procure por `youtube.force-ssl` e marque o escopo:
   ```
   .../auth/youtube.force-ssl
   ```
   (Gerenciar sua conta do YouTube)
4. Salve e continue até o fim do assistente.
5. Ainda na Tela de consentimento, vá em **Público-alvo** (ou "Test users" / "Usuários de teste") e **adicione seu próprio e-mail do Google** como usuário de teste — enquanto o app estiver em modo "Em teste", só esses e-mails cadastrados conseguem usar escopos como este.

> Esse escopo (`youtube.force-ssl`) é classificado pelo Google como
> "restrito". Em modo "Em teste" funciona normalmente para até 100
> usuários de teste cadastrados manualmente (como você mesmo) — não
> precisa de verificação do Google para uso pessoal/estudo.

## Passo 3 — Configurar o backend

```bash
cd backend
npm install
cp .env.example .env
```

Abra o `.env` e cole sua chave da API do YouTube:

```
YOUTUBE_API_KEY=sua_chave_aqui
PORTA=3000
```

## Passo 4 — Configurar o Client ID do Google no front-end

Abra `frontend/index.html`, encontre esta linha perto do final do arquivo:

```js
const GOOGLE_CLIENT_ID = "COLE_AQUI_SEU_CLIENT_ID.apps.googleusercontent.com";
```

E troque pelo Client ID que você copiou no Passo 2.

## Passo 5 — Rodar

```bash
cd backend
npm start
```

Você deve ver:
```
Servidor rodando em http://localhost:3000
Abra http://localhost:3000 no navegador (não abra o index.html direto).
```

Abra **http://localhost:3000** no navegador (não dê duplo clique no
`index.html`). A partir daí:

- A **Home** carrega vídeos em alta reais, com chips de categoria.
- **Buscar** algo mostra os resultados em lista vertical, como no YouTube real.
- **Shorts** (sidebar) abre a visualização vertical com barra de curtir/comentar/compartilhar.
- **Fazer login** (canto superior direito) abre o seletor de conta do Google de verdade.

## Limitações importantes

- **O vídeo não toca no seu `<video>` customizado** — o YouTube não
  disponibiliza o arquivo bruto do vídeo para uso fora da plataforma,
  então ele sempre aparece dentro do player oficial (iframe).
- **Curtir e Inscrever-se agora são reais** — usam a YouTube Data API
  em nome da pessoa logada (com a permissão que ela concede no
  Passo 2.1). Isso realmente afeta a conta do YouTube dela.
- **Baixar vídeos não é possível e não foi implementado** — o YouTube
  não expõe nenhuma API para baixar o arquivo de vídeo, e contornar
  essa restrição violaria os Termos de Serviço da plataforma. O botão
  "Fazer download" existe só visualmente, avisando que isso não é
  permitido.
- **Nunca coloque a chave da API do YouTube no front-end** — ela é
  usada só pelo backend. Já o Client ID do Google é público por design
  (aparece no HTML mesmo), o segredo real de OAuth fica só no lado do
  Google.
- **Cota diária**: se a cota acabar, a API retorna erro 403.
- O arquivo `.env` **não deve ser commitado** no Git — já está no
  `.gitignore` do backend.

## Integrar no seu repositório aprendendo-git

```bash
cd caminho/para/aprendendo-git
git checkout unifil-intermediario
git pull origin unifil-intermediario

# Copie a pasta backend/ e substitua os arquivos da pasta frontend/
# dentro de "AULA 05 - CLONAGEM YOUTUBE REALISTA/"

git add "AULA 05 - CLONAGEM YOUTUBE REALISTA"
git commit -m "Integra o clone do YouTube com a YouTube Data API v3, Home/Shorts reais e Login com Google"
git push origin unifil-intermediario
```

Lembre-se de **não commitar o arquivo `.env`** com sua chave real —
apenas o `.env.example` deve ir para o repositório.

