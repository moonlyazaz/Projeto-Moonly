// server.js
// Backend simples em Node.js + Express que faz a ponte entre o front-end
// e a YouTube Data API v3, mantendo a chave da API em segredo (nunca
// exposta no navegador).

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Necessário no Node 16, que não tem fetch() nativo.

const app = express();
const PORTA = process.env.PORTA || 3000;
const CHAVE_DA_API_DO_YOUTUBE = process.env.YOUTUBE_API_KEY;
const URL_BASE_DA_API = "https://www.googleapis.com/youtube/v3";

app.use(cors());
app.use(express.json());

if (!CHAVE_DA_API_DO_YOUTUBE) {
    console.warn(
        "[AVISO] Variável YOUTUBE_API_KEY não encontrada. Crie um arquivo .env " +
        "com YOUTUBE_API_KEY=sua_chave_aqui (veja o .env.example)."
    );
}

/**
 * Converte a duração no formato ISO 8601 (ex: "PT5M32S") retornada pela
 * API do YouTube em um texto simples no formato "5:32".
 *
 * @param {string} duracaoIso - Duração no formato ISO 8601.
 * @returns {string} Duração formatada como "hh:mm:ss" ou "mm:ss".
 */
function formatarDuracao(duracaoIso) {
    const correspondencia = duracaoIso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const horas = parseInt(correspondencia[1]) || 0;
    const minutos = parseInt(correspondencia[2]) || 0;
    const segundos = parseInt(correspondencia[3]) || 0;

    const minutosTexto = horas > 0 ? String(minutos).padStart(2, "0") : String(minutos);
    const segundosTexto = String(segundos).padStart(2, "0");

    return horas > 0
        ? `${horas}:${minutosTexto}:${segundosTexto}`
        : `${minutosTexto}:${segundosTexto}`;
}

/**
 * Formata um número grande de forma abreviada, no estilo usado pelo
 * YouTube (ex: 1234567 -> "1,2 mi").
 *
 * @param {string|number} numero - Valor numérico bruto (views, likes, etc.).
 * @returns {string} Valor formatado de forma resumida.
 */
function formatarNumeroResumido(numero) {
    const valor = Number(numero) || 0;

    if (valor >= 1_000_000) {
        return `${(valor / 1_000_000).toFixed(1).replace(".", ",")} mi`;
    }
    if (valor >= 1_000) {
        return `${(valor / 1_000).toFixed(1).replace(".", ",")} mil`;
    }
    return String(valor);
}

/**
 * Rota de busca de vídeos. Recebe um termo de pesquisa e devolve uma
 * lista simplificada de vídeos encontrados, no formato já esperado
 * pelo front-end (mesmos nomes de campo usados em videosRecomendados).
 *
 * Aceita um parâmetro opcional "duracao" com valores "short" (vídeos
 * curtos, usado para a seção de Shorts), "medium" ou "long", seguindo
 * o mesmo padrão da YouTube Data API.
 *
 * Exemplos:
 *   GET /api/buscar?q=javascript
 *   GET /api/buscar?q=dança&duracao=short
 */
app.get("/api/buscar", async (req, res) => {
    const termoDeBusca = req.query.q;
    const filtroDeDuracao = req.query.duracao; // "short" | "medium" | "long" | undefined

    if (!termoDeBusca) {
        return res.status(400).json({ erro: "Parâmetro 'q' (termo de busca) é obrigatório." });
    }

    try {
        const parametroDeDuracao = filtroDeDuracao ? `&videoDuration=${filtroDeDuracao}` : "";

        const urlDeBusca =
            `${URL_BASE_DA_API}/search?part=snippet&type=video&maxResults=12` +
            parametroDeDuracao +
            `&q=${encodeURIComponent(termoDeBusca)}&key=${CHAVE_DA_API_DO_YOUTUBE}`;

        const respostaDaBusca = await fetch(urlDeBusca);
        const dadosDaBusca = await respostaDaBusca.json();

        if (dadosDaBusca.error) {
            return res.status(502).json({ erro: dadosDaBusca.error.message });
        }

        if (!dadosDaBusca.items || !dadosDaBusca.items.length) {
            return res.json([]);
        }

        const idsDosVideos = dadosDaBusca.items.map((item) => item.id.videoId).join(",");

        // Uma segunda chamada é necessária porque search.list não retorna
        // duração nem estatísticas (views, likes) dos vídeos.
        const urlDeDetalhes =
            `${URL_BASE_DA_API}/videos?part=contentDetails,statistics,snippet` +
            `&id=${idsDosVideos}&key=${CHAVE_DA_API_DO_YOUTUBE}`;

        const respostaDosDetalhes = await fetch(urlDeDetalhes);
        const dadosDosDetalhes = await respostaDosDetalhes.json();

        const videosFormatados = dadosDosDetalhes.items.map((item) => ({
            id: item.id,
            titulo: item.snippet.title,
            canal: item.snippet.channelTitle,
            miniatura: item.snippet.thumbnails.high.url,
            duracao: formatarDuracao(item.contentDetails.duration),
            visualizacoes: `${formatarNumeroResumido(item.statistics.viewCount)} visualizações`,
            tempoPublicacao: new Date(item.snippet.publishedAt).toLocaleDateString("pt-BR")
        }));

        res.json(videosFormatados);
    } catch (erro) {
        console.error("Erro ao buscar vídeos:", erro);
        res.status(500).json({ erro: "Falha ao buscar vídeos no YouTube." });
    }
});

/**
 * Rota de detalhes de um vídeo específico, já formatada no molde do
 * objeto videoPrincipal usado pelo front-end.
 *
 * Exemplo: GET /api/video/dQw4w9WgXcQ
 */
app.get("/api/video/:id", async (req, res) => {
    const idDoVideo = req.params.id;

    try {
        const urlDoVideo =
            `${URL_BASE_DA_API}/videos?part=snippet,statistics,contentDetails` +
            `&id=${idDoVideo}&key=${CHAVE_DA_API_DO_YOUTUBE}`;

        const urlDoCanal = async (idDoCanal) =>
            `${URL_BASE_DA_API}/channels?part=snippet,statistics&id=${idDoCanal}&key=${CHAVE_DA_API_DO_YOUTUBE}`;

        const respostaDoVideo = await fetch(urlDoVideo);
        const dadosDoVideo = await respostaDoVideo.json();

        if (dadosDoVideo.error || !dadosDoVideo.items.length) {
            return res.status(404).json({ erro: "Vídeo não encontrado." });
        }

        const item = dadosDoVideo.items[0];

        const respostaDoCanal = await fetch(await urlDoCanal(item.snippet.channelId));
        const dadosDoCanal = await respostaDoCanal.json();
        const canal = dadosDoCanal.items?.[0];

        res.json({
            id: item.id,
            titulo: item.snippet.title,
            embedUrl: `https://www.youtube.com/embed/${item.id}`,
            imagemCapa: item.snippet.thumbnails.high.url,
            canal: {
                nome: item.snippet.channelTitle,
                foto: canal?.snippet.thumbnails.default.url || "",
                inscritos: canal
                    ? `${formatarNumeroResumido(canal.statistics.subscriberCount)} inscritos`
                    : ""
            },
            visualizacoes: `${formatarNumeroResumido(item.statistics.viewCount)} visualizações`,
            dataPublicacao: new Date(item.snippet.publishedAt).toLocaleDateString("pt-BR"),
            curtidas: formatarNumeroResumido(item.statistics.likeCount || 0),
            descricao: item.snippet.description
        });
    } catch (erro) {
        console.error("Erro ao buscar detalhes do vídeo:", erro);
        res.status(500).json({ erro: "Falha ao buscar detalhes do vídeo." });
    }
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
