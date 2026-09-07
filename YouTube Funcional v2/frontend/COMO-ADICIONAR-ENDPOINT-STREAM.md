# Player HTML5 nativo — endpoint de stream no backend

Depois da migração, o **frontend usa uma tag `<video>` nativa** em vez do
iframe/`YT.Player`. Agora quem precisa prover o arquivo `.mp4` é o **backend**.

## Como o frontend escolhe a fonte

Em `script.js`, a função `carregarStreamNoVideo()` monta a lista de fontes na
seguinte ordem:

1. **`{URL_DO_BACKEND}/api/stream/:id`** — fonte preferida (proxy próprio).
2. Instâncias públicas de Invidious — fallback automático usado só se a 1.ª falhar.

> Resumo: se você criar o endpoint `/api/stream/:id` no seu backend Node,
> o player HTML5 funciona sozinho e nem chega a usar o Invidious.

## Endpoint recomendado (proxy com yt-dlp)

Crie uma rota em `server.js` (Express) que baixa o áudio+vídeo e devolve os
bytes ao navegador **com cabeçalhos CORS abertos**. Assim o `<video>` toca sem
bloqueio de origem.

```js
const { execFile } = require('child_process');

// GET /api/stream/:id
app.get('/api/stream/:id', async (req, res) => {
  const id = String(req.params.id || '').replace(/[^\w-]/g, '');
  if (!id) return res.status(400).json({ erro: 'ID inválido' });

  // CORS aberto (necessário se página e backend forem domínios diferentes)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'video/mp4');

  // O yt-dlp resolve a melhor URL de transmissão (formato combinado mp4).
  // A flag -o - manda para o stdout e o Node repassa byte a byte.
  const ytdlp = execFile(
    'yt-dlp',
    ['-f', 'best[ext=mp4]', '-o', '-', `https://www.youtube.com/watch?v=${id}`]
  );

  ytdlp.stdout.pipe(res);

  ytdlp.on('error', () => { if (!res.headersSent) res.status(502).end(); });
  ytdlp.on('close', () => res.end());
});
```

Requisitos:
- Instalar o binário `yt-dlp` no servidor (ou usar uma instância Invidious do seu
  back). Precisa também do `ffmpeg` caso queira mesclar formatos separados.
- Para **ao vivo (live)**, o yt-dlp costuma retornar HLS (`.m3u8`), que uma tag
  `<video>` não reproduz sozinha — exigiria `hls.js`. Por enquanto, vídeos VOD
  caem bem; o player mostra "Ao vivo" apenas como rótulo.

## Alternativa sem depender de ffmpeg/yt-dlp no servidor

Se preferir apenas **encaminhar** a URL encontrada, faça o backend consultar uma
instância Invidious e responder com **redirecionamento** para a URL final
(ao vivo não). Nesse caso o player ainda funciona:

```js
app.get('/api/stream/:id', async (req, res) => {
  const base = 'https://inv.nadeko.net'; // troque pela sua instância
  try {
    const r = await fetch(`${base}/api/v1/videos/${req.params.id}?fields=formatStreams`);
    const json = await r.json();
    const itens = (json.formatStreams || []).filter(f => f.url && /video\/mp4/.test(f.type));
    if (!itens.length) return res.status(404).json({ erro: 'sem stream' });
    res.redirect(itens.sort((a, b) => b.bitrate - a.bitrate)[0].url);
  } catch (e) {
    res.status(502).json({ erro: 'falha no upstream' });
  }
});
```

## Ajustes opcionais no front

- Se ainda não criou o endpoint e quiser testar só o front, já há o fallback
  automático para Invidious.
- Para mudar a preferência de qualidade/áudio, edite os filtros em
  `obterUrlStreamInvidious()` (o front já ordena por bitrate e pega `mp4`
  combinado, que já contém áudio).

## Lembretes rápidos

| Item | Valor |
|---|---|
| Rota preferida no front | `GET {URL_DO_BACKEND}/api/stream/:id` |
| CORS necessário | `Access-Control-Allow-Origin: *` na resposta do stream |
| Conteúdo esperado | arquivo `video/mp4` (ou redirecionamento para um `.mp4`) |
| Ao vivo / livestream | envolve HLS — fora do escopo atual do `<video>` nativo |
