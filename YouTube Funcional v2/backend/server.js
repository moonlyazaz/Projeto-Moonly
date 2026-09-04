// server.js
// Backend simples em Node.js + Express que faz a ponte entre o front-end
// e a YouTube Data API v3, mantendo a chave da API em segredo (nunca
// exposta no navegador).

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch"); // Necessário no Node 16, que não tem fetch() nativo.

const app = express();
const PORTA = process.env.PORTA || 3000;
const CHAVE_DA_API_DO_YOUTUBE = process.env.YOUTUBE_API_KEY;
const URL_BASE_DA_API = "https://www.googleapis.com/youtube/v3";
const PASTA_DO_FRONTEND = path.join(__dirname, "..", "frontend");

app.use(cors());
app.use(express.json());

// Serve os arquivos do front-end (index.html, style.css, script.js) pelo
// próprio backend. Isso é essencial: o player embutido do YouTube e o
// Login com Google só funcionam quando a página é aberta via
// http://localhost, nunca abrindo o arquivo index.html diretamente
// (file://) — por isso não abrimos mais o HTML direto no navegador.
app.use(express.static(PASTA_DO_FRONTEND));

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
 * Converte a lista bruta de itens de videos.list (contentDetails +
 * statistics + snippet) no formato simplificado usado pelo front-end.
 *
 * @param {Array} itens - Array "items" retornado por videos.list.
 * @returns {Array} Lista de vídeos no formato do front-end.
 */
async function formatarListaDeVideos(itens) {
    if (!itens || !itens.length) return [];
    
    // Extrai IDs únicos de canais
    const idsCanais = [...new Set(itens.map(item => item.snippet.channelId))];
    const mapFotos = {};
    
    try {
        const urlCanais = `${URL_BASE_DA_API}/channels?part=snippet&id=${idsCanais.join(',')}&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const resposta = await fetch(urlCanais);
        const dados = await resposta.json();
        
        if (dados.items) {
            dados.items.forEach(canal => {
                mapFotos[canal.id] = canal.snippet.thumbnails.default.url;
            });
        }
    } catch (e) {
        console.error("Erro ao buscar fotos dos canais", e);
    }

    return itens.map((item) => ({
        id: item.id,
        titulo: item.snippet.title,
        canal: item.snippet.channelTitle,
        canalId: item.snippet.channelId,
        fotoCanal: mapFotos[item.snippet.channelId] || "",
        miniatura: item.snippet.thumbnails.high.url,
        duracao: formatarDuracao(item.contentDetails.duration),
        visualizacoes: `${formatarNumeroResumido(item.statistics.viewCount)} visualizações`,
        tempoPublicacao: new Date(item.snippet.publishedAt).toLocaleDateString("pt-BR")
    }));
}

/**
 * Rota da página inicial. Devolve vídeos em alta no Brasil, exatamente
 * como a Home real do YouTube (que não é uma busca, e sim uma lista de
 * vídeos populares). Aceita um parâmetro opcional "categoria" com o ID
 * numérico de categoria da YouTube Data API (ex: 10 = Música,
 * 20 = Jogos, 17 = Esportes, 25 = Notícias, 24 = Entretenimento,
 * 23 = Comédia, 28 = Ciência e Tecnologia).
 *
 * Exemplos:
 *   GET /api/populares
 *   GET /api/populares?categoria=20
 */
app.get("/api/populares", async (req, res) => {
    const idDaCategoria = req.query.categoria;
    const parametroDeCategoria = idDaCategoria ? `&videoCategoryId=${idDaCategoria}` : "";

    try {
        const urlDePopulares =
            `${URL_BASE_DA_API}/videos?part=snippet,contentDetails,statistics` +
            `&chart=mostPopular&regionCode=BR&maxResults=24` +
            parametroDeCategoria +
            `&key=${CHAVE_DA_API_DO_YOUTUBE}`;

        const resposta = await fetch(urlDePopulares);
        const dados = await resposta.json();

        if (dados.error) {
            console.error("[Erro da API do YouTube]", JSON.stringify(dados.error, null, 2));
            return res.status(502).json({ erro: dados.error.message });
        }

        res.json(await formatarListaDeVideos(dados.items || []));
    } catch (erro) {
        console.error("Erro ao buscar vídeos populares:", erro);
        res.status(500).json({ erro: "Falha ao buscar vídeos populares." });
    }
});

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
    const idDoCanal = req.query.canalId; // Opcional: restringe a busca a um canal específico.

    if (!termoDeBusca && !idDoCanal) {
        return res.status(400).json({ erro: "Informe 'q' (termo de busca) ou 'canalId'." });
    }

    try {
        const parametroDeDuracao = filtroDeDuracao ? `&videoDuration=${filtroDeDuracao}` : "";
        const parametroDeCanal = idDoCanal ? `&channelId=${idDoCanal}&order=date` : "";
        const parametroDeTermo = termoDeBusca ? `&q=${encodeURIComponent(termoDeBusca)}` : "";

        const urlDeBusca =
            `${URL_BASE_DA_API}/search?part=snippet&type=video&maxResults=24` +
            parametroDeDuracao +
            parametroDeCanal +
            parametroDeTermo +
            `&key=${CHAVE_DA_API_DO_YOUTUBE}`;

        const respostaDaBusca = await fetch(urlDeBusca);
        const dadosDaBusca = await respostaDaBusca.json();

        if (dadosDaBusca.error) {
            console.error("[Erro da API do YouTube]", JSON.stringify(dadosDaBusca.error, null, 2));
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

        res.json(await formatarListaDeVideos(dadosDosDetalhes.items || []));
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
                id: item.snippet.channelId,
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

/**
 * Rota para buscar comentários de um vídeo.
 */
app.get("/api/comentarios/:id", async (req, res) => {
    const idDoVideo = req.params.id;

    try {
        const urlComentarios =
            `${URL_BASE_DA_API}/commentThreads?part=snippet&videoId=${idDoVideo}` +
            `&order=relevance&maxResults=20&key=${CHAVE_DA_API_DO_YOUTUBE}`;

        const resposta = await fetch(urlComentarios);
        const dados = await resposta.json();

        if (dados.error) {
            // Se os comentários estiverem desativados, a API retorna erro 403 (commentsDisabled)
            return res.status(403).json({ erro: "Comentários desativados ou erro na API.", detalhe: dados.error });
        }

        const comentariosFormatados = (dados.items || []).map(item => {
            const topLevel = item.snippet.topLevelComment.snippet;
            return {
                id: item.id,
                autor: topLevel.authorDisplayName,
                avatar: topLevel.authorProfileImageUrl,
                texto: topLevel.textDisplay,
                curtidas: formatarNumeroResumido(topLevel.likeCount || 0),
                tempoPublicacao: new Date(topLevel.publishedAt).toLocaleDateString("pt-BR")
            };
        });

        res.json(comentariosFormatados);
    } catch (erro) {
        console.error("Erro ao buscar comentários:", erro);
        res.status(500).json({ erro: "Falha ao buscar comentários." });
    }
});

// Qualquer rota que não seja da API cai no index.html (SPA simples).
app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(PASTA_DO_FRONTEND, "index.html"));
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
    console.log(`Abra http://localhost:${PORTA} no navegador (não abra o index.html direto).`);
});
