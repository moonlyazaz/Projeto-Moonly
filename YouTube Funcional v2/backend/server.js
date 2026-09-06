// server.js
// Backend simples em Node.js + Express que faz a ponte entre o front-end
// e a YouTube Data API v3, mantendo a chave da API em segredo (nunca
// exposta no navegador).

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
let fetch = require("node-fetch");

const play = require('play-dl');
const http = require('http');
const { Server } = require('socket.io');
 // Necessário no Node 16, que não tem fetch() nativo.

const app = express();
const PORT = process.env.PORT || 3000;
const CHAVES_DA_API = process.env.YOUTUBE_API_KEY ? process.env.YOUTUBE_API_KEY.split(',').map(k => k.trim()).filter(k => k) : [];
const CHAVE_DA_API_DO_YOUTUBE = CHAVES_DA_API[0] || "";
const URL_BASE_DA_API = "https://www.googleapis.com/youtube/v3";

let indiceChave = 0;

// Interceptador para rotacionar a chave da API automaticamente caso uma dê erro de cota
const fetchOriginal = fetch;
const fetchComRotacao = async (url, options) => {
    if (typeof url === 'string' && url.includes('googleapis.com/youtube/v3')) {
        if (CHAVES_DA_API.length > 0) {
            let urlBase = url.replace(/&key=[^&]*/g, '');
            let tentativas = 0;
            
            while (tentativas < CHAVES_DA_API.length) {
                const chaveAtual = CHAVES_DA_API[indiceChave];
                const urlCompleta = urlBase + (urlBase.includes('?') ? '&' : '?') + 'key=' + chaveAtual;
                
                const res = await fetchOriginal(urlCompleta, options);
                
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    
                    const isQuotaError = data.error && (
                        JSON.stringify(data.error).includes('quota') || 
                        JSON.stringify(data.error).includes('API_KEY_INVALID') || 
                        JSON.stringify(data.error).includes('RATE_LIMIT_EXCEEDED') ||
                        res.status === 429 || res.status === 403
                    );

                    if (isQuotaError) {
                        console.warn(`[AVISO] Chave ${chaveAtual.substring(0, 5)}... falhou ou estourou cota. Tentando próxima...`);
                        indiceChave = (indiceChave + 1) % CHAVES_DA_API.length;
                        tentativas++;
                        continue;
                    }
                    
                    // Retorna um mock do response já que consumimos o body no erro
                    return { ok: res.ok, status: res.status, json: async () => data };
                }
                
                return res; // Sucesso (200 OK), body intocado
            }
        }
    }
    return fetchOriginal(url, options);
};

// Substitui a funcão fetch pela nossa função com rotatividade
fetch = fetchComRotacao;

app.use(cors());
app.use(express.json());

if (CHAVES_DA_API.length === 0) {
    console.warn(
        "[AVISO] Nenhuma variável YOUTUBE_API_KEY encontrada. Crie um arquivo .env " +
        "com YOUTUBE_API_KEY=sua_chave_aqui (veja o .env.example)."
    );
} else if (CHAVES_DA_API.length > 1) {
    console.log(`[SISTEMA] Sistema iniciado com ${CHAVES_DA_API.length} chaves de API (Rotatividade Ativada).`);
}

/**
 * Converte a duração no formato ISO 8601 (ex: "PT5M32S") retornada pela
 * API do YouTube em um texto simples no formato "5:32".
 *
 * @param {string} duracaoIso - Duração no formato ISO 8601.
 * @returns {string} Duração formatada como "hh:mm:ss" ou "mm:ss".
 */
function formatarDuracao(duracaoIso) {
    if (!duracaoIso) return "0:00";
    const correspondencia = duracaoIso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!correspondencia) return "Ao vivo";
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
            duracao: formatarDuracao(item.contentDetails.duration),
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

// ==================== DOWNLOAD ====================
app.get('/api/download', async (req, res) => {
    const videoId = req.query.id;
    const format = req.query.format || 'mp4';
    
    if (!videoId) return res.status(400).send("ID nao fornecido");
    
    try {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const info = await play.video_info(videoUrl);
        const title = info.video_details.title.replace(/[^\w\s-]/gi, '') || "MoonlyVideo";
        
        let streamInfo;
        if (format === 'mp3') {
            res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
            // quality 2 = highest audio
            streamInfo = await play.stream(videoUrl, { quality: 2, discordPlayerCompatibility: true });
        } else {
            res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
            streamInfo = await play.stream(videoUrl);
        }
        
        streamInfo.stream.pipe(res);
        
    } catch (e) {
        console.error("Play-dl error:", e);
        res.status(500).send("Erro ao baixar o video.");
    }
});



app.get('/', (req, res) => {
    res.send("API do Projeto Moonly rodando 100%!");
});

app.get("/api/sugestoes", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json([]);
    try {
        const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`;
        const response = await fetch(url);
        const data = await response.json();
        // Google's format for client=firefox is [ "query", ["sugg1", "sugg2", ...] ]
        res.json(data[1] || []);
    } catch (err) {
        console.error("Erro ao buscar sugestões:", err);
        res.status(500).json({ error: "Erro ao buscar sugestões" });
    }
});

// ==================== CANAIS ====================

app.get("/api/canal/:id", async (req, res) => {
    const idDoCanal = req.params.id;
    try {
        const url = `${URL_BASE_DA_API}/channels?part=snippet,statistics,brandingSettings&id=${idDoCanal}&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        if (dados.error || !dados.items || dados.items.length === 0) {
            return res.status(404).json({ erro: "Canal năo encontrado." });
        }
        
        const item = dados.items[0];
        res.json({
            id: item.id,
            nome: item.snippet.title,
            descricao: item.snippet.description,
            foto: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            banner: item.brandingSettings?.image?.bannerExternalUrl || null,
            inscritos: formatarNumeroResumido(item.statistics.subscriberCount),
            videos: formatarNumeroResumido(item.statistics.videoCount),
            visualizacoes: formatarNumeroResumido(item.statistics.viewCount)
        });
    } catch (erro) {
        console.error("Erro ao buscar canal:", erro);
        res.status(500).json({ erro: "Falha ao buscar detalhes do canal." });
    }
});

app.get("/api/canal/:id/videos", async (req, res) => {
    const idDoCanal = req.params.id;
    try {
        // Primeiro, encontrar a playlist de uploads do canal
        const urlCanal = `${URL_BASE_DA_API}/channels?part=contentDetails&id=${idDoCanal}&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const respostaCanal = await fetch(urlCanal);
        const dadosCanal = await respostaCanal.json();
        
        if (dadosCanal.error || !dadosCanal.items || !dadosCanal.items.length) {
            return res.status(404).json({ erro: "Canal năo encontrado." });
        }
        
        const idDaPlaylist = dadosCanal.items[0].contentDetails.relatedPlaylists.uploads;
        
        // Agora buscar os itens da playlist
        const urlVideos = `${URL_BASE_DA_API}/playlistItems?part=snippet,contentDetails&playlistId=${idDaPlaylist}&maxResults=20&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const respostaVideos = await fetch(urlVideos);
        const dadosVideos = await respostaVideos.json();
        
        if (!dadosVideos.items) {
            return res.json([]);
        }
        
        // Puxar stats (duracao e views) para esses videos
        const idsDosVideos = dadosVideos.items.map(item => item.contentDetails.videoId).join(",");
        const urlStats = `${URL_BASE_DA_API}/videos?part=snippet,statistics,contentDetails&id=${idsDosVideos}&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const respostaStats = await fetch(urlStats);
        const dadosStats = await respostaStats.json();
        
        const listaFormatada = formatarListaDeVideos(dadosStats);
        res.json(listaFormatada);
    } catch (erro) {
        console.error("Erro ao buscar videos do canal:", erro);
        res.status(500).json({ erro: "Falha ao buscar videos do canal." });
    }
});

// ==================== PLAYLISTS ====================
app.get("/api/playlist/:id", async (req, res) => {
    const idDaPlaylist = req.params.id;
    try {
        const urlVideos = `${URL_BASE_DA_API}/playlistItems?part=snippet,contentDetails&playlistId=${idDaPlaylist}&maxResults=25&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const respostaVideos = await fetch(urlVideos);
        const dadosVideos = await respostaVideos.json();
        
        if (dadosVideos.error || !dadosVideos.items) {
            return res.status(404).json({ erro: "Playlist năo encontrada." });
        }
        
        const idsDosVideos = dadosVideos.items.map(item => item.contentDetails.videoId).filter(Boolean).join(",");
        if (!idsDosVideos) return res.json({ titulo: "Playlist", videos: [] });

        const urlStats = `${URL_BASE_DA_API}/videos?part=snippet,statistics,contentDetails&id=${idsDosVideos}&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const respostaStats = await fetch(urlStats);
        const dadosStats = await respostaStats.json();
        
        const listaFormatada = formatarListaDeVideos(dadosStats);
        
        // Vamos buscar o titulo da playlist
        const urlPlay = `${URL_BASE_DA_API}/playlists?part=snippet&id=${idDaPlaylist}&key=${CHAVE_DA_API_DO_YOUTUBE}`;
        const resPlay = await fetch(urlPlay);
        const dadPlay = await resPlay.json();
        let titulo = "Fila de Reproduçăo";
        let canal = "";
        if (dadPlay.items && dadPlay.items.length > 0) {
            titulo = dadPlay.items[0].snippet.title;
            canal = dadPlay.items[0].snippet.channelTitle;
        }

        res.json({
            id: idDaPlaylist,
            titulo,
            canal,
            videos: listaFormatada
        });
    } catch (erro) {
        console.error("Erro ao buscar playlist:", erro);
        res.status(500).json({ erro: "Falha ao buscar playlist." });
    }
});

// ==================== WATCH PARTY (SOCKET.IO) ====================
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`Usuario ${socket.id} entrou na sala ${roomId}`);
        // Notifica que alguem entrou
        socket.to(roomId).emit('user-joined', socket.id);
    });

    socket.on('player-action', (data) => {
        // data: { roomId, action: 'pause' | 'play' | 'seek', time: Number }
        // Repassa para todos da sala MENOS quem enviou
        socket.to(data.roomId).emit('sync-action', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
