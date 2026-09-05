/**
 * Monta e insere na página todo o bloco do vídeo que está sendo assistido:
 * player, título, dados do canal, botões de ação e descrição.
 *
 * Dados esperados (exemplo):
 * {
 *     "titulo": "Aprendendo HTML, CSS e JavaScript do zero",
 *     "arquivoVideo": "videos/aula.mp4",
 *     "imagemCapa": "https://exemplo.com/capa.jpg",
 *     "canal": {
 *         "nome": "Canal da Aula",
 *         "foto": "https://exemplo.com/canal.jpg",
 *         "inscritos": "1,2 mi de inscritos"
 *     },
 *     "visualizacoes": "342 mil visualizações",
 *     "dataPublicacao": "há 3 dias",
 *     "curtidas": "18 mil",
 *     "descricao": "Nesta aula construímos uma cópia da interface do YouTube."
 * }
 *
 * @param {Object} dadosDoVideoPrincipal - Objeto com todas as informações do vídeo aberto.
 */
function renderizarVideoPrincipal(dadosDoVideoPrincipal) {
    const elementoDaAreaDoPlayer = document.getElementById("areaPlayer");

    const loginSalvo = localStorage.getItem("usuarioLogadoComGoogle");
    let fotoDoUsuario = "";
    if (loginSalvo) {
        try { fotoDoUsuario = JSON.parse(loginSalvo).picture; } catch(e){}
    }

    elementoDaAreaDoPlayer.innerHTML = `
        <div class="media-view-box" id="main-player-container">
            <iframe
                id="main-video-iframe"
                class="media-view-box__video"
                src="https://www.youtube.com/embed/${dadosDoVideoPrincipal.id}?autoplay=1&controls=0&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <div class="media-view-box__overlay" id="main-video-overlay"></div>
            <div class="media-view-box__controls">
                <div class="media-view-box__progress-container" id="main-progress-container">
                    <div class="media-view-box__progress-bar" id="main-progress-bar"></div>
                </div>
                <div class="media-view-box__controls-buttons">
                    <button class="media-view-box__btn" id="main-play-btn"><i class="fa-solid fa-play" id="main-play-icon"></i></button>
                    <button class="media-view-box__btn" id="main-mute-btn"><i class="fa-solid fa-volume-high" id="main-mute-icon"></i></button>
                    <span class="media-view-box__time" id="main-time-display">0:00 / 0:00</span>
                    <div class="media-view-box__spacer"></div>
                    <button class="media-view-box__btn" id="main-fullscreen-btn"><i class="fa-solid fa-expand"></i></button>
                </div>
            </div>
        </div>

        <h1 class="video-titulo">${dadosDoVideoPrincipal.titulo}</h1>

        <div class="barra-canal">
            <div class="canal">
                <span
                    class="canal__foto"
                    style="background-image: url('${dadosDoVideoPrincipal.canal.foto}')"
                ></span>
                <span class="canal__informacoes">
                    <span class="canal__nome">${dadosDoVideoPrincipal.canal.nome}</span>
                    <span class="canal__inscritos">${dadosDoVideoPrincipal.canal.inscritos}</span>
                </span>
                <button class="botao-inscrever" type="button" data-acao="inscrever" data-canal-id="${dadosDoVideoPrincipal.canal.id}">Inscrever-se</button>
            </div>

            <div class="acoes-video">
                <div class="acao-grupo">
                    <button class="acao acao-esquerda" type="button" data-acao="curtir" data-video-id="${dadosDoVideoPrincipal.id}">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span>${dadosDoVideoPrincipal.curtidas}</span>
                    </button>
                    <div class="acao-separador"></div>
                    <button class="acao acao-direita" type="button" data-toast="Obrigado pelo feedback.">
                        <i class="fa-regular fa-thumbs-down"></i>
                    </button>
                </div>
                <button class="acao" data-toast="Link copiado para a área de transferência.">
                    <i class="fa-solid fa-share"></i>
                    <span>Compartilhar</span>
                </button>
                <button class="acao" data-toast="O YouTube não permite baixar vídeos por fora do app oficial.">
                    <i class="fa-solid fa-download"></i>
                    <span>Download</span>
                </button>
                <button class="acao" data-toast="Mais opções em breve.">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
        </div>

        <div class="descricao" data-toast="Mostrar mais (em breve)">
            <div class="descricao__estatisticas">
                <span>${dadosDoVideoPrincipal.visualizacoes}</span> • <span>${dadosDoVideoPrincipal.dataPublicacao}</span>
            </div>
            <p class="descricao__texto">${dadosDoVideoPrincipal.descricao}</p>
        </div>
        
        <div class="comentarios-secao">
            <h3 id="contador-comentarios">Carregando comentários...</h3>
            <div class="comentario-input-area">
                ${fotoDoUsuario 
                    ? `<img class="comentario-avatar-img" src="${fotoDoUsuario}">` 
                    : `<div class="comentario-avatar" style="display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-user" style="color:#fff;"></i></div>`
                }
                <div class="comentario-input-container" style="flex:1;">
                    <input type="text" placeholder="Adicione um comentário..." class="comentario-input" id="comentario-input-box">
                    <div class="comentario-acoes" id="comentario-acoes" style="display: none; justify-content: flex-end; gap: 8px; margin-top: 8px;">
                        <button class="comentario-btn-cancelar" id="btn-cancelar-comentario" style="background: none; border: none; color: #fff; padding: 8px 16px; border-radius: 18px; cursor: pointer; font-weight: 500;">Cancelar</button>
                        <button class="comentario-btn-enviar" id="btn-enviar-comentario" disabled style="background-color: #272727; color: #717171; border: none; padding: 8px 16px; border-radius: 18px; font-weight: 500; cursor: default; transition: background-color 0.2s;">Comentar</button>
                    </div>
                </div>
            </div>
            <div id="lista-de-comentarios" class="lista-de-comentarios">
            </div>
        </div>
    `;
}

/**
 * Monta o HTML de um card de vídeo da barra lateral de recomendações.
 *
 * Dados esperados (exemplo):
 * {
 *     "titulo": "Flexbox na prática",
 *     "canal": "Front-end Descomplicado",
 *     "visualizacoes": "120 mil visualizações",
 *     "tempoPublicacao": "há 2 semanas",
 *     "duracao": "14:32",
 *     "miniatura": "https://exemplo.com/miniatura.jpg"
 * }
 *
 * @param {Object} dadosDoVideoRecomendado - Informações de um vídeo recomendado.
 * @returns {string} HTML do card pronto para ser inserido na página.
 */
function montarVideoRecomendado(dadosDoVideoRecomendado) {
    return `
        <div class="video-recomendado" data-id-do-video="${dadosDoVideoRecomendado.id}">
            <div
                class="video-recomendado__miniatura"
                style="background-image: url('${dadosDoVideoRecomendado.miniatura}')"
            >
                <span class="video-recomendado__duracao">${dadosDoVideoRecomendado.duracao}</span>
            </div>
            <div class="video-recomendado__body">
                <div class="video-recomendado__informacoes">
                    <span class="video-recomendado__titulo">${dadosDoVideoRecomendado.titulo}</span>
                    <span class="video-recomendado__canal">${dadosDoVideoRecomendado.canal}</span>
                    <span class="video-recomendado__dados">
                        <span>${dadosDoVideoRecomendado.visualizacoes}</span>
                        <span>•</span>
                        <span>${dadosDoVideoRecomendado.tempoPublicacao}</span>
                    </span>
                </div>
                <button class="video-recomendado__menu" type="button" data-toast="Mais opções para este vídeo em breve.">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Percorre o array de vídeos recomendados e escreve todos os cards dentro do
 * elemento de id "recomendacoes" do index.html.
 *
 * @param {Array} listaDeVideosRecomendados - Array de objetos de vídeo.
 */
function renderizarVideosRecomendados(listaDeVideosRecomendados) {
    const elementoDasRecomendacoes = document.getElementById("recomendacoes");
    let htmlDasRecomendacoes = "";

    for (const dadosDoVideoRecomendado of listaDeVideosRecomendados) {
        htmlDasRecomendacoes = htmlDasRecomendacoes + montarVideoRecomendado(dadosDoVideoRecomendado);
    }

    elementoDasRecomendacoes.innerHTML = htmlDasRecomendacoes;
}

/**
 * Alterna qual área principal fica visível: grade de resultados (Início
 * e pesquisa), tela de assistir (player + recomendados) ou Shorts.
 * Apenas uma fica visível por vez.
 *
 * @param {"resultados"|"assistir"|"shorts"} nomeDaView - View a ser exibida.
 */
function mostrarView(nomeDaView) {
    document.getElementById("areaInicio").style.display = nomeDaView === "inicio" ? "flex" : "none";
    document.getElementById("areaAssistir").style.display = nomeDaView === "assistir" ? "flex" : "none";
    document.getElementById("areaShorts").style.display = nomeDaView === "shorts" ? "flex" : "none";
    const areaHistorico = document.getElementById("areaHistorico");
    if (areaHistorico) areaHistorico.style.display = nomeDaView === "historico" ? "block" : "none";
    const areaVoce = document.getElementById("areaVoce");
    if (areaVoce) areaVoce.style.display = nomeDaView === "voce" ? "block" : "none";

    // No YouTube real, a página de Shorts usa quase toda a altura da tela,
    // com bem pouco respiro ao redor do player — bem menos que as outras views.
    document.querySelector(".area-principal").classList.toggle("modo-shorts", nomeDaView === "shorts");
}

/**
 * Monta o HTML de um card de resultado (usado na grade de Início e de
 * pesquisa), no formato de grade parecido com a home real do YouTube.
 *
 * @param {Object} video - Objeto de vídeo retornado por /api/buscar.
 */
function montarCardDeResultado(video) {
    const inicialDoCanal = video.canal ? video.canal.charAt(0).toUpperCase() : "?";

    return `
        <div class="card-resultado" data-id-do-video="${video.id}">
            <div class="card-resultado__miniatura-wrapper">
                <img class="card-resultado__miniatura" src="${video.miniatura}" alt="${video.titulo}" loading="lazy">
                <span class="card-resultado__duracao">${video.duracao}</span>
            </div>
            <div class="card-resultado__corpo">
                ${video.fotoCanal 
                    ? `<div class="card-resultado__avatar" style="background-image: url('${video.fotoCanal}'); background-size: cover; background-position: center; color: transparent;"></div>`
                    : `<div class="card-resultado__avatar">${inicialDoCanal}</div>`
                }
                <div class="card-resultado__informacoes">
                    <span class="card-resultado__titulo">${video.titulo}</span>
                    <span class="card-resultado__canal">${video.canal}</span>
                    <span class="card-resultado__dados">${video.visualizacoes} • ${video.tempoPublicacao}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renderiza a grade (ou lista) de vídeos e muda para a view "Início".
 *
 * @param {Array} videos - Lista de vídeos a exibir.
 * @param {boolean} [mostrarChips=true] - Se falso, esconde a barra de
 *   categorias (usado durante uma busca por texto, que no YouTube real
 *   não mostra as mesmas chips de categoria da Home).
 * @param {"grid"|"lista"} [modo="grid"] - "grid" para a grade de cards da
 *   Home; "lista" para os resultados de pesquisa (vídeos empilhados
 *   verticalmente, um embaixo do outro, igual ao YouTube real).
 */
function renderizarResultados(videos, mostrarChips = true, modo = "grid") {
    const areaDeResultados = document.getElementById("areaResultados");
    const areaDeChips = document.getElementById("chipsCategorias");

    areaDeChips.style.display = mostrarChips ? "flex" : "none";
    areaDeResultados.classList.toggle("lista", modo === "lista");

    if (!videos.length) {
        areaDeResultados.innerHTML = `<p class="mensagem-vazia">Nenhum vídeo encontrado para essa busca.</p>`;
    } else {
        areaDeResultados.innerHTML = videos.map(montarCardDeResultado).join("");
    }

    mostrarView("inicio");
}

/**
 * Monta o HTML de um item de Shorts: player em formato vertical (9:16)
 * com autoplay e loop, mais a barra lateral de ações (curtir, não
 * curtir, comentar, compartilhar) igual à interface real do YouTube
 * Shorts.
 *
 * @param {Object} video - Objeto de vídeo retornado por /api/buscar.
 */
function montarShort(video) {
    const inicialDoCanal = video.canal ? video.canal.charAt(0).toUpperCase() : "?";

    return `
        <div class="short-item">
            <div class="short-item__player-wrapper">
                <iframe
                    id="short-iframe-${video.id}"
                    class="short-item__iframe"
                    src="https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1&controls=0&playsinline=1&enablejsapi=1&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3&origin=${encodeURIComponent(window.location.origin)}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <div class="short-item__overlay" data-video-id="${video.id}"></div>
                <div class="short-item__info">
                    <p class="short-item__canal">
                        ${video.fotoCanal 
                            ? `<span class="short-item__avatar" style="background-image: url('${video.fotoCanal}'); background-size: cover; background-position: center; color: transparent;"></span>`
                            : `<span class="short-item__avatar">${inicialDoCanal}</span>`
                        }
                        ${video.canal}
                        <button class="short-item__inscrever" type="button" data-acao="inscrever" data-canal-id="${video.canalId}">Inscrever-se</button>
                    </p>
                    <p class="short-item__titulo">${video.titulo}</p>
                    <div class="short-item__progress-container">
                        <div class="short-item__progress-bar" id="short-progress-${video.id}"></div>
                    </div>
                </div>
            </div>
            <div class="short-item__acoes">
                <button type="button" class="short-item__acao" data-acao="curtir" data-video-id="${video.id}">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>Curtir</span>
                </button>
                <button type="button" class="short-item__acao" data-toast="Obrigado pelo feedback.">
                    <i class="fa-solid fa-thumbs-down"></i>
                    <span>Não curtir</span>
                </button>
                <button type="button" class="short-item__acao" data-toast="Comentários em breve.">
                    <i class="fa-solid fa-comment"></i>
                    <span>Comentar</span>
                </button>
                <button type="button" class="short-item__acao" data-toast="Link copiado.">
                    <i class="fa-solid fa-share"></i>
                    <span>Compartilhar</span>
                </button>
                <button type="button" class="short-item__acao" data-toast="Mais opções em breve.">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Rola a lista de Shorts para o próximo (ou anterior) item, imitando a
 * navegação por swipe/scroll do YouTube Shorts real.
 *
 * @param {1|-1} direcao - 1 para o próximo Short, -1 para o anterior.
 */
function navegarShorts(direcao) {
    const lista = document.querySelector(".shorts-lista");
    if (!lista) return;
    lista.scrollBy({ top: direcao * lista.clientHeight, behavior: "smooth" });
}

let playersDeShorts = {};
let intervaloDeProgressoDeShorts = null;

function inicializarPlayersDeShorts(videos) {
    if (intervaloDeProgressoDeShorts) {
        clearInterval(intervaloDeProgressoDeShorts);
    }
    
    videos.forEach(video => {
        playersDeShorts[video.id] = new YT.Player(`short-iframe-${video.id}`, {
            events: {
                'onReady': (e) => { e.target.playVideo(); }, 
                'onStateChange': (evento) => {
                    if (evento.data === 0) { // ENDED
                        evento.target.seekTo(0);
                        evento.target.playVideo();
                    }
                }
            }
        });
    });

    const observerDeShorts = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            const id = entrada.target.dataset.videoId;
            const player = playersDeShorts[id];
            if (player && typeof player.playVideo === 'function' && typeof player.pauseVideo === 'function') {
                if (entrada.isIntersecting) {
                    player.playVideo();
                } else {
                    player.pauseVideo();
                }
            }
        });
    }, { threshold: 0.6 });

    intervaloDeProgressoDeShorts = setInterval(() => {
        videos.forEach(video => {
            const player = playersDeShorts[video.id];
            if (player && typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
                const tempo = player.getCurrentTime();
                const duracao = player.getDuration();
                if (duracao > 0) {
                    const porcentagem = (tempo / duracao) * 100;
                    const barra = document.getElementById(`short-progress-${video.id}`);
                    if (barra) barra.style.width = `${porcentagem}%`;
                }
            }
        });
    }, 100);

    document.querySelectorAll('.short-item__overlay').forEach(overlay => {
        observerDeShorts.observe(overlay);
        overlay.addEventListener('click', (e) => {
            const id = e.target.dataset.videoId;
            const player = playersDeShorts[id];
            if (player && typeof player.getPlayerState === 'function') {
                const estado = player.getPlayerState();
                if (estado === 1 || estado === 3) {
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            }
        });
    });
}

/**
 * Renderiza a lista vertical de Shorts (rolagem com "encaixe" tipo
 * TikTok/Shorts real) e muda para essa view.
 *
 * @param {Array} videos - Lista de vídeos curtos retornados por /api/buscar.
 */
function renderizarShorts(videos) {
    const areaDeShorts = document.getElementById("areaShorts");

    if (!videos.length) {
        areaDeShorts.innerHTML = `<p class="mensagem-vazia">Nenhum Short encontrado.</p>`;
    } else {
        areaDeShorts.innerHTML = `
            <div class="shorts-navegacao">
                <button type="button" class="shorts-navegacao__botao" id="botaoShortAnterior" title="Short anterior">
                    <i class="fa-solid fa-chevron-up"></i>
                </button>
                <div class="shorts-lista">${videos.map(montarShort).join("")}</div>
                <button type="button" class="shorts-navegacao__botao" id="botaoShortProximo" title="Próximo Short">
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>
        `;
        document.getElementById("botaoShortAnterior").addEventListener("click", () => navegarShorts(-1));
        document.getElementById("botaoShortProximo").addEventListener("click", () => navegarShorts(1));

        if (window.YT && window.YT.Player) {
            inicializarPlayersDeShorts(videos);
        } else {
            window.onYouTubeIframeAPIReady = () => inicializarPlayersDeShorts(videos);
        }
    }

    mostrarView("shorts");
}

let playerPrincipal = null;
let intervaloDeProgressoPrincipal = null;

function formatarTempo(segundos) {
    if (isNaN(segundos)) return "0:00";
    const m = Math.floor(segundos / 60);
    const s = Math.floor(segundos % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function inicializarPlayerPrincipal() {
    if (intervaloDeProgressoPrincipal) clearInterval(intervaloDeProgressoPrincipal);
    
    const iniciarControles = () => {
        playerPrincipal = new YT.Player('main-video-iframe', {
            events: {
                'onReady': (e) => { e.target.playVideo(); }, 
                'onStateChange': (e) => {
                    const icone = document.getElementById('main-play-icon');
                    if (e.data === 1) { // PLAYING
                        if(icone) { icone.classList.remove('fa-play'); icone.classList.add('fa-pause'); }
                    } else {
                        if(icone) { icone.classList.remove('fa-pause'); icone.classList.add('fa-play'); }
                    }
                }
            }
        });

        const alternarPlay = () => {
            if (!playerPrincipal || !playerPrincipal.getPlayerState) return;
            const estado = playerPrincipal.getPlayerState();
            if (estado === 1) playerPrincipal.pauseVideo();
            else playerPrincipal.playVideo();
        };

        const btnPlay = document.getElementById('main-play-btn');
        if (btnPlay) btnPlay.addEventListener('click', alternarPlay);
        
        const overlay = document.getElementById('main-video-overlay');
        if (overlay) overlay.addEventListener('click', alternarPlay);

        const btnMute = document.getElementById('main-mute-btn');
        if (btnMute) btnMute.addEventListener('click', () => {
            if (!playerPrincipal || !playerPrincipal.isMuted) return;
            const icon = document.getElementById('main-mute-icon');
            if (playerPrincipal.isMuted()) {
                playerPrincipal.unMute();
                if(icon) { icon.classList.remove('fa-volume-xmark'); icon.classList.add('fa-volume-high'); }
            } else {
                playerPrincipal.mute();
                if(icon) { icon.classList.remove('fa-volume-high'); icon.classList.add('fa-volume-xmark'); }
            }
        });

        const btnFullscreen = document.getElementById('main-fullscreen-btn');
        if (btnFullscreen) btnFullscreen.addEventListener('click', () => {
            const container = document.getElementById('main-player-container');
            if (!document.fullscreenElement) {
                container.requestFullscreen().catch(err => {});
            } else {
                document.exitFullscreen();
            }
        });

        const progressContainer = document.getElementById('main-progress-container');
        if (progressContainer) progressContainer.addEventListener('click', (e) => {
            if (!playerPrincipal || !playerPrincipal.getDuration) return;
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            playerPrincipal.seekTo(pos * playerPrincipal.getDuration());
        });

        intervaloDeProgressoPrincipal = setInterval(() => {
            if (playerPrincipal && typeof playerPrincipal.getCurrentTime === 'function' && typeof playerPrincipal.getDuration === 'function') {
                const tempo = playerPrincipal.getCurrentTime();
                const duracao = playerPrincipal.getDuration();
                if (duracao > 0) {
                    const porcentagem = (tempo / duracao) * 100;
                    const barra = document.getElementById('main-progress-bar');
                    if (barra) barra.style.width = `${porcentagem}%`;
                    
                    const display = document.getElementById('main-time-display');
                    if (display) display.textContent = `${formatarTempo(tempo)} / ${formatarTempo(duracao)}`;
                }
            }
        }, 100);
    };

    if (window.YT && window.YT.Player) {
        iniciarControles();
    } else {
        const oldCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (oldCallback) oldCallback();
            iniciarControles();
        };
    }
}

/**
 * Busca no backend os detalhes de um vídeo específico e o exibe na
 * view de "assistir" (player principal + recomendados).
 *
 * @param {string} idDoVideo - ID do vídeo no YouTube (ex: "dQw4w9WgXcQ").
 */
async function abrirVideo(idDoVideo) {
    iniciarCarregamento();
    try {
        const resposta = await fetch(`${URL_DO_BACKEND}/api/video/${idDoVideo}`);
        if (!resposta.ok) {
            mostrarToast("Não foi possível carregar este vídeo.");
            return;
        }
        const dadosDoVideo = await resposta.json();
        renderizarVideoPrincipal(dadosDoVideo);
        mostrarView("assistir");
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        inicializarPlayerPrincipal();
        inicializarEventosDeComentario(dadosDoVideo.id);
        finalizarCarregamento();
        
        adicionarAoHistorico(dadosDoVideo);
        verificarEstadoDoVideo(dadosDoVideo.id, dadosDoVideo.canal.id);

        fetch(`${URL_DO_BACKEND}/api/comentarios/${idDoVideo}`)
            .then(res => res.json())
            .then(comentarios => {
                const lista = document.getElementById("lista-de-comentarios");
                const contador = document.getElementById("contador-comentarios");
                if (lista && contador) {
                    if (comentarios.erro || !Array.isArray(comentarios)) {
                        contador.textContent = "Comentários desativados";
                        lista.innerHTML = "";
                        return;
                    }
                    contador.textContent = `${comentarios.length} Comentários`;
                    lista.innerHTML = comentarios.map(c => `
                        <div class="comentario-item">
                            <div class="comentario-item__avatar" style="background-image: url('${c.avatar}')"></div>
                            <div class="comentario-item__conteudo">
                                <div class="comentario-item__cabecalho">
                                    <span class="comentario-item__autor">${c.autor.startsWith('@') ? c.autor : '@' + c.autor}</span>
                                    <span class="comentario-item__tempo">${c.tempoPublicacao}</span>
                                </div>
                                <div class="comentario-item__texto">${c.texto}</div>
                                <div class="comentario-item__acoes">
                                    <button class="comentario-item__acao"><i class="fa-regular fa-thumbs-up"></i> ${c.curtidas > 0 ? c.curtidas : ''}</button>
                                    <button class="comentario-item__acao"><i class="fa-regular fa-thumbs-down"></i></button>
                                    <span class="btn-responder-comentario" data-comment-id="${c.id}" style="font-weight: 500; cursor: pointer; color: #fff; font-size: 13px; margin-left: 12px;">Responder</span>
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            })
            .catch(err => {
                const contador = document.getElementById("contador-comentarios");
                if(contador) contador.textContent = "Erro ao carregar comentários";
            });

        // Busca vídeos parecidos com o título para popular os recomendados.
        const primeiraPalavra = dadosDoVideo.titulo.split(" ").slice(0, 3).join(" ");
        const respostaDosRecomendados = await fetch(
            `${URL_DO_BACKEND}/api/buscar?q=${encodeURIComponent(primeiraPalavra)}`
        );
        if (respostaDosRecomendados.ok) {
            const recomendados = await respostaDosRecomendados.json();
            renderizarVideosRecomendados(recomendados.filter((v) => v.id !== idDoVideo));
        }
    } catch (erro) {
        avisarSobreErroDeConexao(erro);
    }
}

/**
 * Busca no backend uma lista de vídeos reais pelo termo digitado e
 * mostra como grade de resultados (esconde as chips de categoria, já
 * que no YouTube real a busca por texto não usa as mesmas categorias
 * da Home), a menos que seja uma busca de Shorts.
 *
 * @param {string} termoDeBusca - Texto digitado na barra de pesquisa.
 * @param {string} [filtroDeDuracao] - "short" para a seção de Shorts;
 *   deixe vazio para busca normal.
 */
async function buscarVideos(termoDeBusca, filtroDeDuracao = "") {
    iniciarCarregamento();
    try {
        const parametroDeDuracao = filtroDeDuracao ? `&duracao=${filtroDeDuracao}` : "";
        const resposta = await fetch(
            `${URL_DO_BACKEND}/api/buscar?q=${encodeURIComponent(termoDeBusca)}${parametroDeDuracao}`
        );

        if (!resposta.ok) {
            finalizarCarregamento();
            mostrarToast("Não foi possível buscar vídeos agora.");
            return;
        }
        const videosEncontrados = await resposta.json();

        if (filtroDeDuracao === "short") {
            renderizarShorts(videosEncontrados);
        } else {
            renderizarResultados(videosEncontrados, false, "lista");
        }
        finalizarCarregamento();
    } catch (erro) {
        finalizarCarregamento();
        avisarSobreErroDeConexao(erro);
    }
}

/**
 * Busca os vídeos em alta no Brasil (Home real do YouTube não é uma
 * busca por termo, e sim uma lista de vídeos populares) e os exibe na
 * grade, com as chips de categoria visíveis.
 *
 * @param {string} [idDaCategoria] - ID numérico de categoria da YouTube
 *   Data API (ex: "10" para Música). Vazio traz todas as categorias.
 */
async function buscarPopulares(idDaCategoria = "") {
    iniciarCarregamento();
    try {
        const parametroDeCategoria = idDaCategoria ? `?categoria=${idDaCategoria}` : "";
        const resposta = await fetch(`${URL_DO_BACKEND}/api/populares${parametroDeCategoria}`);

        if (!resposta.ok) {
            finalizarCarregamento();
            mostrarToast("Não foi possível carregar os vídeos em alta agora.");
            return;
        }
        const videosEncontrados = await resposta.json();
        renderizarResultados(videosEncontrados, true, "grid");
        finalizarCarregamento();
    } catch (erro) {
        finalizarCarregamento();
        avisarSobreErroDeConexao(erro);
    }
}

/**
 * Centraliza o aviso de falha de conexão com o backend, deixando claro
 * para quem está estudando que o servidor Node precisa estar rodando.
 *
 * @param {Error} erro - Erro capturado no fetch.
 */
function avisarSobreErroDeConexao(erro) {
    console.error("Erro ao conectar com o backend:", erro);
    mostrarToast("Servidor offline. Rode \"npm start\" na pasta backend e recarregue a página.");
}

/**
 * Marca visualmente qual item da sidebar está ativo no momento.
 *
 * @param {HTMLElement} itemClicado - Elemento <a> da sidebar que foi clicado.
 */
function marcarItemAtivoNaSidebar(itemClicado) {
    document.querySelectorAll(".sidebar-item.ativo").forEach((item) => item.classList.remove("ativo"));
    itemClicado.classList.add("ativo");
}

/**
 * Liga o formulário de busca do cabeçalho à função buscarVideos, o
 * clique em qualquer card de resultado ou de vídeo recomendado para
 * abri-lo, e a navegação da sidebar (Início, Shorts, Música, Filmes e
 * os demais itens, que mostram um toast explicativo por dependerem de
 * login).
 */
function configurarBuscaEClique() {
    const formularioDeBusca = document.getElementById("formulario-de-busca");
    if (formularioDeBusca) {
        formularioDeBusca.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const termoDigitado = document.getElementById("search-input").value.trim();
            if (termoDigitado) {
                marcarItemAtivoNaSidebar(document.querySelector('[data-secao="inicio"]'));
                buscarVideos(termoDigitado);
            }
        });
    }

    // Clique em um card da grade de resultados abre o vídeo (view "assistir").
    document.getElementById("areaResultados").addEventListener("click", (evento) => {
        const card = evento.target.closest("[data-id-do-video]");
        if (card) {
            abrirVideo(card.dataset.idDoVideo);
        }
    });

    // Clique em um vídeo recomendado, dentro da view "assistir", abre outro vídeo.
    document.getElementById("recomendacoes").addEventListener("click", (evento) => {
        // Ignora o clique se foi no botão de menu (⋮), que já tem sua própria ação.
        if (evento.target.closest(".video-recomendado__menu")) return;

        const card = evento.target.closest("[data-id-do-video]");
        if (card) {
            abrirVideo(card.dataset.idDoVideo);
        }
    });
    
    // Clique na logo volta para a Home
    const logo = document.querySelector('.logotipo');
    if (logo) {
        logo.addEventListener('click', (evento) => {
            evento.preventDefault();
            document.querySelector('.sidebar-item[data-secao="inicio"]').click();
        });
        logo.style.cursor = 'pointer';
    }

    // Clique no menu hamburger para recolher a sidebar
    const menuHamburger = document.querySelector('.fa-bars');
    if (menuHamburger) {
        menuHamburger.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('recolhida');
        });
        menuHamburger.style.cursor = 'pointer';
    }

    // Clique em uma chip de categoria filtra a Home por aquela categoria.
    document.getElementById("chipsCategorias").addEventListener("click", (evento) => {
        const chip = evento.target.closest(".chip");
        if (!chip) return;

        document.querySelectorAll(".chip.ativo").forEach((c) => c.classList.remove("ativo"));
        chip.classList.add("ativo");
        buscarPopulares(chip.dataset.categoria);
    });

    document.querySelectorAll(".sidebar-item[data-secao]").forEach((item) => {
        item.addEventListener("click", (evento) => {
            evento.preventDefault();
            marcarItemAtivoNaSidebar(item);

            const secao = item.dataset.secao;
            document.getElementById("search-input").value = "";

            if (secao === "inicio") {
                document.querySelectorAll(".chip.ativo").forEach((c) => c.classList.remove("ativo"));
                document.querySelector('.chip[data-categoria=""]').classList.add("ativo");
                buscarPopulares();
            } else if (secao === "shorts") {
                buscarVideos("shorts", "short");
            } else if (secao === "busca") {
                buscarVideos(item.dataset.termo);
            } else if (secao === "inscricoes") {
                abrirInscricoesReais();
            } else if (secao === "historico") {
                renderizarHistorico();
                mostrarView("historico");
            } else if (secao === "voce") {
                const logado = localStorage.getItem('usuarioLogadoComGoogle');
                if (!logado) {
                    mostrarToast("Faça login para acessar seu canal.");
                } else {
                    carregarCanalDoUsuario();
                    mostrarView("voce");
                }
            }
        });
    });
}

configurarBuscaEClique();

// Carrega a Home com vídeos em alta reais, igual à Home de verdade do YouTube.

/**
 * Decodifica a parte "payload" de um token JWT (usado pelo Google
 * Identity Services) sem precisar de nenhuma biblioteca externa.
 *
 * @param {string} tokenJwt - Token no formato "cabecalho.payload.assinatura".
 * @returns {Object} Dados do usuário (nome, e-mail, foto, etc.).
 */
function decodificarTokenJwt(tokenJwt) {
    const payloadBase64 = tokenJwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payloadBase64));
}

/**
 * Atualiza a interface para o estado "logado": mostra o avatar no
 * cabeçalho, esconde os botões de login e guarda os dados no
 * localStorage para persistir entre recarregamentos da página.
 *
 * @param {Object} dadosDoUsuario - Payload decodificado do token do Google.
 */
function aplicarUsuarioLogado(dadosDoUsuario) {
    localStorage.setItem("usuarioLogadoComGoogle", JSON.stringify(dadosDoUsuario));

    document.getElementById("containerLoginGoogle").style.display = "none";
    document.getElementById("sidebarLogin").style.display = "none";

    const containerDoUsuario = document.getElementById("containerUsuarioLogado");
    containerDoUsuario.style.display = "flex";

    const imagemDoAvatar = document.getElementById("avatarDoUsuario");
    const avatarAlternativo = document.getElementById("avatarDoUsuarioFallback");

    const iconeVoce = document.getElementById('icone-sidebar-voce');
    if (iconeVoce) {
        const novoAvatar = document.createElement('img');
        novoAvatar.src = dadosDoUsuario.picture;
        novoAvatar.className = "sidebar-avatar";
        novoAvatar.id = "icone-sidebar-voce";
        iconeVoce.parentNode.replaceChild(novoAvatar, iconeVoce);
    }

    avatarAlternativo.textContent = (dadosDoUsuario.given_name || dadosDoUsuario.name || "?").charAt(0).toUpperCase();

    // Algumas fotos do Google falham ao carregar (política de referrer);
    // nesse caso, mostra um avatar com a inicial do nome no lugar.
    imagemDoAvatar.style.display = "block";
    avatarAlternativo.style.display = "none";
    imagemDoAvatar.onerror = () => {
        imagemDoAvatar.style.display = "none";
        avatarAlternativo.style.display = "flex";
    };
    imagemDoAvatar.src = dadosDoUsuario.picture;

    document.getElementById("nomeDoUsuario").textContent = dadosDoUsuario.name;
    document.getElementById("emailDoUsuario").textContent = dadosDoUsuario.email;
}

/**
 * Reverte a interface para o estado "deslogado": some com o avatar e
 * volta a mostrar os botões de login (cabeçalho e sidebar).
 */
function aplicarUsuarioDeslogado() {
    localStorage.removeItem("usuarioLogadoComGoogle");
    localStorage.removeItem("youtube_access_token");
    localStorage.removeItem("youtube_token_expires_at");
    tokenDeAcessoDoYoutube = null;

    document.getElementById("containerLoginGoogle").style.display = "block";
    document.getElementById("sidebarLogin").style.display = "block";
    document.getElementById("containerUsuarioLogado").style.display = "none";
    document.getElementById("containerUsuarioLogado").classList.remove("aberto");
}

/**
 * Callback chamado pelo Google Identity Services quando o login é
 * concluído com sucesso.
 *
 * @param {Object} respostaDoGoogle - Objeto com o campo "credential" (JWT).
 */
function fazerLoginCompleto() {
    if (GOOGLE_CLIENT_ID.startsWith("COLE_AQUI")) {
        alert("Configure o GOOGLE_CLIENT_ID no index.html primeiro!");
        return;
    }
    
    // Usa a mesma função que já pede o token pro YouTube,
    // mas como o escopo agora tem userinfo, vamos pegar o perfil também!
    obterTokenDeAcessoDoYoutube().then(token => {
        // Agora que temos o token unificado (permissões + identidade)
        // Vamos buscar quem é o usuário
        return fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    })
    .then(res => res.json())
    .then(dadosDoUsuario => {
        if (dadosDoUsuario.error) {
            console.error("Erro ao buscar perfil:", dadosDoUsuario.error);
            return;
        }
        
        aplicarUsuarioLogado(dadosDoUsuario);
        mostrarToast(`Login realizado como ${dadosDoUsuario.given_name || dadosDoUsuario.name}.`);
    })
    .catch(err => {
        console.error("Erro no login completo:", err);
    });
}

// Se já existir um login salvo no localStorage (de uma visita anterior), aplica direto
const loginSalvo = localStorage.getItem("usuarioLogadoComGoogle");
if (loginSalvo) {
    aplicarUsuarioLogado(JSON.parse(loginSalvo));
}

// ===== Ações reais na conta do YouTube (curtir, inscrever, inscrições) =====
// Usam um token OAuth separado do login (que só identifica quem é a
// pessoa). Esse token só é pedido na hora em que a pessoa realmente
// tenta curtir/inscrever, e o Google mostra uma tela de permissão.
const ESCOPOS_DO_YOUTUBE = "https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
let clienteDeTokenDoYoutube = null;
let tokenDeAcessoDoYoutube = null;
const CHAVE_TOKEN_YT = "youtube_access_token";
const CHAVE_EXPIRACAO_YT = "youtube_token_expires_at";

/**
 * Garante que exista um token de acesso válido para chamar a YouTube
 * Data API em nome da pessoa logada (curtir, inscrever, listar
 * inscrições). Pede permissão pelo popup do Google na primeira vez;
 * chamadas seguintes reaproveitam o token enquanto ele durar.
 *
 * @returns {Promise<string>} O token de acesso.
 */
function obterTokenDeAcessoDoYoutube() {
    return new Promise((resolver, rejeitar) => {
        if (tokenDeAcessoDoYoutube) {
            resolver(tokenDeAcessoDoYoutube);
            return;
        }

        const tokenSalvo = localStorage.getItem(CHAVE_TOKEN_YT);
        const expiracaoSalva = localStorage.getItem(CHAVE_EXPIRACAO_YT);
        if (tokenSalvo && expiracaoSalva && Date.now() < parseInt(expiracaoSalva)) {
            tokenDeAcessoDoYoutube = tokenSalvo;
            const tempoRestante = parseInt(expiracaoSalva) - Date.now();
            setTimeout(() => { 
                tokenDeAcessoDoYoutube = null; 
                localStorage.removeItem(CHAVE_TOKEN_YT);
                localStorage.removeItem(CHAVE_EXPIRACAO_YT);
            }, Math.max(0, tempoRestante - 60000));
            resolver(tokenDeAcessoDoYoutube);
            return;
        }

        if (GOOGLE_CLIENT_ID.startsWith("COLE_AQUI")) {
            rejeitar(new Error("Client ID do Google não configurado."));
            return;
        }

        if (!clienteDeTokenDoYoutube) {
            clienteDeTokenDoYoutube = google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: ESCOPOS_DO_YOUTUBE,
                callback: (resposta) => {
                    if (resposta.error) {
                        rejeitar(new Error(resposta.error));
                        return;
                    }
                    tokenDeAcessoDoYoutube = resposta.access_token;
                    localStorage.setItem(CHAVE_TOKEN_YT, tokenDeAcessoDoYoutube);
                    localStorage.setItem(CHAVE_EXPIRACAO_YT, Date.now() + (resposta.expires_in * 1000));
                    
                    setTimeout(() => { 
                        tokenDeAcessoDoYoutube = null; 
                        localStorage.removeItem(CHAVE_TOKEN_YT);
                        localStorage.removeItem(CHAVE_EXPIRACAO_YT);
                    }, (resposta.expires_in - 60) * 1000);
                    resolver(tokenDeAcessoDoYoutube);
                }
            });
        }

        clienteDeTokenDoYoutube.requestAccessToken();
    });
}

function possuiTokenSalvoValido() {
    if (tokenDeAcessoDoYoutube) return true;
    const tokenSalvo = localStorage.getItem(CHAVE_TOKEN_YT);
    const expiracaoSalva = localStorage.getItem(CHAVE_EXPIRACAO_YT);
    if (tokenSalvo && expiracaoSalva && Date.now() < parseInt(expiracaoSalva)) {
        return true;
    }
    return false;
}

async function verificarEstadoDoVideo(idDoVideo, idDoCanal) {
    if (!possuiTokenSalvoValido()) return;
    
    // Pega o token silenciosamente
    const token = tokenDeAcessoDoYoutube || localStorage.getItem(CHAVE_TOKEN_YT);

    try {
        // Verificar curtida
        if (idDoVideo) {
            const resp = await fetch(`https://www.googleapis.com/youtube/v3/videos/getRating?id=${idDoVideo}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (resp.ok) {
                const dados = await resp.json();
                if (dados.items && dados.items[0].rating === 'like') {
                    const btn = document.querySelector(`[data-acao="curtir"][data-video-id="${idDoVideo}"]`);
                    if (btn) {
                        btn.classList.add('curtido');
                        const icone = btn.querySelector('i');
                        if (icone) {
                            icone.classList.remove('fa-regular');
                            icone.classList.add('fa-solid');
                        }
                    }
                }
            }
        }
        
        // Verificar inscrição
        if (idDoCanal) {
            const resp = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&forChannelId=${idDoCanal}&mine=true`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (resp.ok) {
                const dados = await resp.json();
                if (dados.items && dados.items.length > 0) {
                    const btn = document.querySelector(`[data-acao="inscrever"][data-canal-id="${idDoCanal}"]`);
                    if (btn) {
                        btn.textContent = "Inscrito";
                        btn.classList.add("inscrito");
                    }
                }
            }
        }
    } catch (erro) {
        console.error("Erro ao verificar estado:", erro);
    }
}

/**
 * Inscreve de verdade a pessoa logada no canal informado, usando a
 * YouTube Data API (subscriptions.insert). Ao dar certo, o botão muda
 * de "Inscrever-se" (branco) para "Inscrito" (cinza) com uma pequena
 * animação, igual ao YouTube real.
 *
 * @param {string} idDoCanal - ID do canal do YouTube a se inscrever.
 * @param {HTMLElement} [botao] - Botão clicado, para atualizar o visual.
 */
async function inscreverNoCanal(idDoCanal, botao) {
    if (!idDoCanal) {
        mostrarToast("Não foi possível identificar o canal deste vídeo.");
        return;
    }

    if (botao && botao.classList.contains("inscrito")) {
        mostrarToast("Você já está inscrito neste canal.");
        return;
    }

    try {
        const token = await obterTokenDeAcessoDoYoutube();
        const resposta = await fetch("https://www.googleapis.com/youtube/v3/subscriptions?part=snippet", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ snippet: { resourceId: { kind: "youtube#channel", channelId: idDoCanal } } })
        });

        if (resposta.ok) {
            mostrarToast("Inscrito no canal com sucesso!");
            if (botao) {
                botao.textContent = "Inscrito";
                botao.classList.add("inscrito", "animacao-inscrever");
                setTimeout(() => botao.classList.remove("animacao-inscrever"), 300);
            }
        } else {
            const erro = await resposta.json();
            if (erro.error?.errors?.[0]?.reason === "subscriptionDuplicate") {
                mostrarToast("Você já está inscrito neste canal.");
                if (botao) {
                    botao.textContent = "Inscrito";
                    botao.classList.add("inscrito");
                }
            } else {
                mostrarToast("Não foi possível se inscrever agora.");
                console.error("Erro ao se inscrever:", erro);
            }
        }
    } catch (erro) {
        console.error("Erro ao se inscrever:", erro);
        mostrarToast("Login com permissão do YouTube necessário para se inscrever.");
    }
}

/**
 * Dá ou remove "like" de verdade no vídeo informado, usando a YouTube
 * Data API (videos.rate). Clicar de novo em um vídeo já curtido remove
 * a curtida (alterna, como no YouTube real). O ícone faz uma pequena
 * animação de "pulso" a cada clique.
 *
 * @param {string} idDoVideo - ID do vídeo a curtir.
 * @param {HTMLElement} [botao] - Botão clicado, para atualizar o visual.
 */
async function curtirVideo(idDoVideo, botao) {
    const jaEstavaCurtido = botao ? botao.classList.contains("curtido") : false;
    const novaAvaliacao = jaEstavaCurtido ? "none" : "like";

    try {
        const token = await obterTokenDeAcessoDoYoutube();
        const resposta = await fetch(
            `https://www.googleapis.com/youtube/v3/videos/rate?id=${idDoVideo}&rating=${novaAvaliacao}`,
            { method: "POST", headers: { Authorization: `Bearer ${token}` } }
        );

        if (resposta.ok) {
            if (botao) {
                botao.classList.toggle("curtido", !jaEstavaCurtido);
                
                const icone = botao.querySelector('i');
                if (icone) {
                    if (!jaEstavaCurtido) {
                        icone.classList.remove('fa-regular');
                        icone.classList.add('fa-solid');
                    } else {
                        icone.classList.remove('fa-solid');
                        icone.classList.add('fa-regular');
                    }
                }
                
                botao.classList.add("animacao-curtir");
                setTimeout(() => botao.classList.remove("animacao-curtir"), 350);
            }
            mostrarToast(jaEstavaCurtido ? "Curtida removida." : "Você curtiu este vídeo (curtida real na sua conta).");
        } else {
            mostrarToast("Não foi possível curtir agora.");
        }
    } catch (erro) {
        console.error("Erro ao curtir:", erro);
        mostrarToast("Login com permissão do YouTube necessário para curtir.");
    }
}

/**
 * Busca a lista real de canais inscritos da pessoa logada e mostra na
 * área de resultados, cada um com um botão para ver os vídeos
 * recentes daquele canal.
 */
async function abrirInscricoesReais() {
    try {
        const token = await obterTokenDeAcessoDoYoutube();
        const resposta = await fetch(
            "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!resposta.ok) {
            mostrarToast("Não foi possível carregar suas inscrições.");
            return;
        }

        const dados = await resposta.json();
        const areaDeResultados = document.getElementById("areaResultados");
        document.getElementById("chipsCategorias").style.display = "none";
        document.getElementById("areaResultados").classList.remove("lista");

        if (!dados.items.length) {
            areaDeResultados.innerHTML = `<p class="mensagem-vazia">Você ainda não está inscrito em nenhum canal.</p>`;
        } else {
            areaDeResultados.innerHTML = dados.items.map((item) => `
                <div class="card-resultado" data-id-do-canal="${item.snippet.resourceId.channelId}">
                    <div class="card-resultado__miniatura-wrapper">
                        <img class="card-resultado__miniatura" src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}">
                    </div>
                    <div class="card-resultado__corpo">
                        <div class="card-resultado__informacoes">
                            <span class="card-resultado__titulo">${item.snippet.title}</span>
                            <span class="card-resultado__canal">Clique para ver os vídeos recentes</span>
                        </div>
                    </div>
                </div>
            `).join("");
        }

        mostrarView("inicio");
    } catch (erro) {
        console.error("Erro ao buscar inscrições:", erro);
        mostrarToast("Login com permissão do YouTube necessário para ver suas inscrições.");
    }
}

// Clique em um canal inscrito abre os vídeos recentes dele.
document.getElementById("areaResultados").addEventListener("click", (evento) => {
    const cardDeCanal = evento.target.closest("[data-id-do-canal]");
    if (cardDeCanal) {
        buscarPorCanal(cardDeCanal.dataset.idDoCanal);
    }
});

/**
 * Busca os vídeos recentes de um canal específico (usado ao clicar em
 * um canal inscrito) e mostra em formato de lista.
 *
 * @param {string} idDoCanal - ID do canal do YouTube.
 */
async function buscarPorCanal(idDoCanal) {
    try {
        const resposta = await fetch(`${URL_DO_BACKEND}/api/buscar?canalId=${idDoCanal}`);
        if (!resposta.ok) {
            mostrarToast("Não foi possível carregar os vídeos deste canal.");
            return;
        }
        const videos = await resposta.json();
        renderizarResultados(videos, false, "lista");
    } catch (erro) {
        avisarSobreErroDeConexao(erro);
    }
}

// Clique em qualquer lugar fora do menu o fecha.
document.getElementById("avatarDoUsuario").addEventListener("click", (evento) => {
    evento.stopPropagation();
    document.getElementById("containerUsuarioLogado").classList.toggle("aberto");
});

document.getElementById("avatarDoUsuarioFallback").addEventListener("click", (evento) => {
    evento.stopPropagation();
    document.getElementById("containerUsuarioLogado").classList.toggle("aberto");
});

// Clique em qualquer lugar fora do menu o fecha.
document.addEventListener("click", () => {
    document.getElementById("containerUsuarioLogado").classList.remove("aberto");
});

document.getElementById("botaoSair").addEventListener("click", (evento) => {
    evento.stopPropagation();
    aplicarUsuarioDeslogado();
    mostrarToast("Você saiu da sua conta.");
});


/**
 * Exibe uma mensagem curta de feedback no rodapé da tela (toast),
 * adaptado do projeto cloneYou, para dar retorno visual em ações
 * que ainda não têm efeito real (inscrever-se, compartilhar, etc.).
 *
 * @param {string} mensagem - Texto a ser exibido no toast.
 */
let temporizadorDoToast;
function mostrarToast(mensagem) {
    const elementoDoToast = document.getElementById("toast");
    if (!elementoDoToast) return;

    elementoDoToast.textContent = mensagem;
    elementoDoToast.classList.add("is-visible");

    clearTimeout(temporizadorDoToast);
    temporizadorDoToast = setTimeout(() => {
        elementoDoToast.classList.remove("is-visible");
    }, 2600);
}

/**
 * Liga o toast aos botões de ação do vídeo principal (inscrever-se,
 * curtir, compartilhar, baixar) e ao menu dos vídeos recomendados.
 * Usa delegação de eventos porque esses elementos são criados
 * dinamicamente pelo JavaScript.
 */
function configurarFeedbackDeAcoes() {
    document.addEventListener("click", (evento) => {
        const gatilhoDeAcaoReal = evento.target.closest("[data-acao]");
        if (gatilhoDeAcaoReal) {
            const acao = gatilhoDeAcaoReal.dataset.acao;
            if (acao === "inscrever") {
                inscreverNoCanal(gatilhoDeAcaoReal.dataset.canalId, gatilhoDeAcaoReal);
            } else if (acao === "curtir") {
                curtirVideo(gatilhoDeAcaoReal.dataset.videoId, gatilhoDeAcaoReal);
            }
            return;
        }

        const gatilhoDeToast = evento.target.closest("[data-toast]");
        if (gatilhoDeToast) {
            mostrarToast(gatilhoDeToast.dataset.toast);
        }
    });
}

configurarFeedbackDeAcoes();

function inicializarEventosDeComentario(videoId) {
    const input = document.getElementById('comentario-input-box');
    const acoes = document.getElementById('comentario-acoes');
    const btnCancelar = document.getElementById('btn-cancelar-comentario');
    const btnEnviar = document.getElementById('btn-enviar-comentario');

    if (!input || !acoes || !btnCancelar || !btnEnviar) return;

    input.addEventListener('focus', () => {
        acoes.style.display = 'flex';
    });

    input.addEventListener('input', () => {
        if (input.value.trim().length > 0) {
            btnEnviar.disabled = false;
            btnEnviar.style.backgroundColor = '#3ea6ff';
            btnEnviar.style.color = '#000';
            btnEnviar.style.cursor = 'pointer';
        } else {
            btnEnviar.disabled = true;
            btnEnviar.style.backgroundColor = '#272727';
            btnEnviar.style.color = '#717171';
            btnEnviar.style.cursor = 'default';
        }
    });

    btnCancelar.addEventListener('click', () => {
        input.value = '';
        acoes.style.display = 'none';
        btnEnviar.disabled = true;
        btnEnviar.style.backgroundColor = '#272727';
        btnEnviar.style.color = '#717171';
        btnEnviar.style.cursor = 'default';
    });

    btnEnviar.addEventListener('click', () => {
        const texto = input.value.trim();
        if (texto.length > 0) {
            enviarComentarioReal(videoId, texto);
        }
    });
}

function enviarComentarioReal(videoId, texto) {
    const btnEnviar = document.getElementById('btn-enviar-comentario');
    btnEnviar.disabled = true;
    btnEnviar.innerText = 'Autenticando...';

    obterTokenDeAcessoDoYoutube()
        .then(token => {
            btnEnviar.innerText = 'Enviando...';
            return fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    snippet: {
                        videoId: videoId,
                        topLevelComment: {
                            snippet: { textOriginal: texto }
                        }
                    }
                })
            });
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error('Erro ao postar comentario:', data.error);
                let motivo = data.error.message || 'Erro desconhecido';
                if (data.error.errors && data.error.errors.length > 0) {
                    motivo = data.error.errors[0].reason;
                }
                
                if (motivo === 'youtubeSignupRequired') {
                    alert('Sua conta do Google não tem um canal no YouTube! Crie um canal no YouTube.com primeiro para poder comentar.');
                } else if (motivo === 'commentsDisabled') {
                    alert('Os comentários estão desativados para este vídeo.');
                } else {
                    alert('Falha ao enviar comentario. Motivo: ' + motivo);
                }
                btnEnviar.disabled = false;
                btnEnviar.innerText = 'Comentar';
                return;
            }

            const btnCancelar = document.getElementById('btn-cancelar-comentario');
            if (btnCancelar) btnCancelar.click();
            btnEnviar.innerText = 'Comentar';

            const listaDeComentarios = document.getElementById('lista-de-comentarios');
            if (listaDeComentarios) {
                const loginSalvo = localStorage.getItem('usuarioLogadoComGoogle');
                let nomeUsuario = 'Você';
                let fotoUsuario = '';
                if (loginSalvo) {
                    try { 
                        const parsed = JSON.parse(loginSalvo);
                        nomeUsuario = parsed.name || 'Você';
                        fotoUsuario = parsed.picture || '';
                    } catch(e){}
                }

                const novoComentarioHTML = `
                    <div class="comentario-item">
                        ${fotoUsuario ? `<img class="comentario-avatar" src="${fotoUsuario}">` : `<div class="comentario-item__avatar" style="display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-user" style="color:#fff;"></i></div>`}
                        <div class="comentario-item__conteudo">
                            <div class="comentario-item__cabecalho">
                                <span class="comentario-item__autor">@${nomeUsuario}</span>
                                <span class="comentario-item__tempo">agora mesmo</span>
                            </div>
                            <div class="comentario-item__texto">
                                ${texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                            </div>
                            <div class="comentario-item__acoes">
                                <button class="comentario-item__acao"><i class="fa-regular fa-thumbs-up"></i> 0</button>
                                <button class="comentario-item__acao"><i class="fa-regular fa-thumbs-down"></i></button>
                                <span class="btn-responder-comentario" data-comment-id="${data.id}" style="font-weight: 500; cursor: pointer; color: #fff; font-size: 13px; margin-left: 12px;">Responder</span>
                            </div>
                        </div>
                    </div>
                `;
                listaDeComentarios.insertAdjacentHTML('afterbegin', novoComentarioHTML);
            }
        })
        .catch(err => {
            console.error('Erro rede ao postar:', err);
            btnEnviar.disabled = false;
            btnEnviar.innerText = 'Comentar';
        });
}

function iniciarCarregamento() {
    const barra = document.getElementById('barra-progresso');
    if (!barra) return;
    barra.style.opacity = '1';
    barra.style.width = '30%';
    setTimeout(() => { if (barra.style.opacity === '1') barra.style.width = '60%'; }, 500);
}

function finalizarCarregamento() {
    const barra = document.getElementById('barra-progresso');
    if (!barra) return;
    barra.style.width = '100%';
    setTimeout(() => {
        barra.style.opacity = '0';
        setTimeout(() => { barra.style.width = '0%'; }, 300);
    }, 400);
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-responder-comentario')) {
        const parentId = e.target.getAttribute('data-comment-id');
        const commentItem = e.target.closest('.comentario-item');
        
        // Remove caixas antigas se houver
        const antigas = document.querySelectorAll('.caixa-resposta-temp');
        antigas.forEach(a => a.remove());

        const formResposta = document.createElement('div');
        formResposta.className = 'comentario-input-container caixa-resposta-temp';
        formResposta.style.flex = '1';
        formResposta.style.marginTop = '12px';
        formResposta.innerHTML = `
            <input type="text" placeholder="Adicione uma resposta..." class="comentario-input" id="input-resposta-${parentId}">
            <div class="comentario-acoes" style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
                <button class="comentario-btn-cancelar" onclick="this.closest('.caixa-resposta-temp').remove()" style="background: none; border: none; color: #fff; padding: 8px 16px; border-radius: 18px; cursor: pointer; font-weight: 500;">Cancelar</button>
                <button class="comentario-btn-enviar" onclick="enviarRespostaReal('${parentId}', this)" style="background-color: #3ea6ff; color: #000; border: none; padding: 8px 16px; border-radius: 18px; font-weight: 500; cursor: pointer; transition: background-color 0.2s;">Responder</button>
            </div>
        `;
        
        commentItem.querySelector('.comentario-item__conteudo').appendChild(formResposta);
        setTimeout(() => document.getElementById('input-resposta-' + parentId).focus(), 50);
    }
});

function enviarRespostaReal(parentId, btnElement) {
    const input = document.getElementById('input-resposta-' + parentId);
    if (!input) return;
    const texto = input.value.trim();
    if (texto.length === 0) return;

    btnElement.disabled = true;
    btnElement.innerText = 'Autenticando...';
    iniciarCarregamento();

    obterTokenDeAcessoDoYoutube()
        .then(token => {
            btnElement.innerText = 'Enviando...';
            return fetch('https://youtube.googleapis.com/youtube/v3/comments?part=snippet', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    snippet: {
                        parentId: parentId,
                        textOriginal: texto
                    }
                })
            });
        })
        .then(res => res.json())
        .then(data => {
            finalizarCarregamento();
            if (data.error) {
                console.error('Erro ao postar resposta:', data.error);
                let motivo = data.error.message || 'Erro desconhecido';
                if (data.error.errors && data.error.errors.length > 0) {
                    motivo = data.error.errors[0].reason;
                }
                alert('Falha ao enviar resposta. Motivo: ' + motivo);
                btnElement.disabled = false;
                btnElement.innerText = 'Responder';
                return;
            }

            const loginSalvo = localStorage.getItem('usuarioLogadoComGoogle');
            let nomeUsuario = 'Você';
            let fotoUsuario = '';
            if (loginSalvo) {
                try { 
                    const parsed = JSON.parse(loginSalvo);
                    nomeUsuario = parsed.name || 'Você';
                    fotoUsuario = parsed.picture || '';
                } catch(e){}
            }

            const novaRespostaHTML = `
                <div class="comentario-item" style="margin-top: 16px; margin-left: 24px;">
                    ${fotoUsuario ? `<img class="comentario-avatar" style="width:24px;height:24px;" src="${fotoUsuario}">` : `<div class="comentario-item__avatar" style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-user" style="color:#fff;font-size:12px;"></i></div>`}
                    <div class="comentario-item__conteudo">
                        <div class="comentario-item__cabecalho">
                            <span class="comentario-item__autor">@${nomeUsuario}</span>
                            <span class="comentario-item__tempo">agora mesmo</span>
                        </div>
                        <div class="comentario-item__texto">
                            ${texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                        </div>
                    </div>
                </div>
            `;
            
            const container = btnElement.closest('.comentario-item__conteudo');
            btnElement.closest('.caixa-resposta-temp').remove();
            container.insertAdjacentHTML('beforeend', novaRespostaHTML);
        })
        .catch(err => {
            finalizarCarregamento();
            console.error('Erro de rede ao responder:', err);
            btnElement.disabled = false;
            btnElement.innerText = 'Responder';
        });
}

// --- SISTEMA DE ROTAS (HISTORY API) ---
const originalAbrirVideo = abrirVideo;
window.abrirVideo = async function(idDoVideo, fromHistory = false) {
    if (!fromHistory) {
        window.history.pushState({ view: 'assistir', id: idDoVideo }, "", "?v=" + idDoVideo);
    }
    return originalAbrirVideo(idDoVideo);
};

const originalMostrarView = mostrarView;
window.mostrarView = function(nomeDaView, fromHistory = false) {
    if (!fromHistory && nomeDaView === 'inicio') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('v')) {
            window.history.pushState({ view: 'inicio' }, "", window.location.pathname);
        }
    }
    return originalMostrarView(nomeDaView);
};

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view === 'assistir') {
        window.abrirVideo(e.state.id, true);
    } else {
        window.mostrarView('inicio', true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Inicialização da Rota
const initialParams = new URLSearchParams(window.location.search);
if (initialParams.has('v')) {
    window.abrirVideo(initialParams.get('v'), true);
} else {
    buscarPopulares();
}

// --- SISTEMA DE HISTORICO E CANAL ---

function adicionarAoHistorico(video) {
    let historico = JSON.parse(localStorage.getItem('historicoYoutube') || '[]');
    historico = historico.filter(v => v.id !== video.id);
    
    // Normalizar o objeto de vídeo para o formato esperado por montarCardDeResultado
    const videoNormalizado = {
        id: video.id,
        titulo: video.titulo,
        canal: video.canal.nome || video.canal,
        canalId: video.canal.id,
        fotoCanal: video.canal.foto,
        miniatura: video.imagemCapa || video.miniatura,
        duracao: video.duracao || '',
        visualizacoes: video.visualizacoes || '',
        tempoPublicacao: video.tempoPublicacao || ''
    };

    historico.unshift(videoNormalizado);
    if (historico.length > 50) historico.pop();
    localStorage.setItem('historicoYoutube', JSON.stringify(historico));
}

function renderizarHistorico() {
    const grade = document.getElementById('gradeHistorico');
    if (!grade) return;
    
    let historico = JSON.parse(localStorage.getItem('historicoYoutube') || '[]');
    // Limpar histórico corrompido de versões anteriores
    historico = historico.filter(v => typeof v.canal === 'string');
    localStorage.setItem('historicoYoutube', JSON.stringify(historico));

    if (historico.length === 0) {
        grade.innerHTML = '<p style="color:#aaa;">Você ainda não assistiu a nenhum vídeo neste navegador.</p>';
    } else {
        grade.innerHTML = historico.map(montarCardDeResultado).join('');
    }
}

async function carregarCanalDoUsuario() {
    const container = document.getElementById('conteudoCanalVoce');
    if (!container) return;
    container.innerHTML = '<p>Carregando canal...</p>';
    iniciarCarregamento();

    try {
        const token = await obterTokenDeAcessoDoYoutube();
        const res = await fetch('https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        
        if (data.error || !data.items || data.items.length === 0) {
            container.innerHTML = '<p style="color: #aaa;">Você precisa criar um canal no YouTube primeiro para ter uma página "Você".</p>';
        } else {
            const canal = data.items[0];
            const urlImagem = canal.snippet.thumbnails?.high?.url || canal.snippet.thumbnails?.default?.url || '';
            let arrobaNome = canal.snippet.customUrl || canal.snippet.title.replace(/ /g, '');
            if (!arrobaNome.startsWith('@')) arrobaNome = '@' + arrobaNome;

            container.innerHTML = `
                <div style="display:flex; align-items:center; gap: 24px; margin-bottom: 32px;">
                    <img src="${urlImagem}" referrerpolicy="no-referrer" style="width: 128px; height: 128px; border-radius: 50%; background-color: #333;">
                    <div>
                        <h1 style="font-size: 32px; font-weight: 500; margin:0 0 8px 0;">${canal.snippet.title}</h1>
                        <p style="color: #aaa; margin:0;">
                            ${arrobaNome} • 
                            ${canal.statistics.subscriberCount} inscritos • 
                            ${canal.statistics.videoCount} vídeos
                        </p>
                        <p style="color: #ddd; margin-top: 12px; font-size: 14px;">${canal.snippet.description || 'Nenhuma descrição fornecida.'}</p>
                    </div>
                </div>
                <hr style="border-color: #383838; margin-bottom: 24px;">
                <h3 style="font-size: 20px; font-weight: 500;">Vídeos recentes</h3>
                <p style="color:#aaa; font-size: 14px; margin-top:8px;">(Apenas visualização das estatísticas do canal via API oficial)</p>
            `;
        }
    } catch (e) {
        console.error(e);
        container.innerHTML = '<p>Erro ao carregar os dados do canal.</p>';
    }
    finalizarCarregamento();
}

// --- SISTEMA DE TEMA CLARO / ESCURO E MENU ---

document.getElementById('btn-menu-canal').addEventListener('click', () => {
    document.getElementById('containerUsuarioLogado').classList.remove('aberto');
    const btnVoce = document.getElementById('btn-sidebar-voce');
    if (btnVoce) btnVoce.click(); 
});

document.getElementById('btn-menu-tema').addEventListener('click', (e) => {
    e.stopPropagation(); 
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('youtubeTheme', 'dark');
        document.querySelector('#btn-menu-tema span').innerText = 'Aparência: Tema Escuro';
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('youtubeTheme', 'light');
        document.querySelector('#btn-menu-tema span').innerText = 'Aparência: Tema Claro';
    }
});

const themeSalvo = localStorage.getItem('youtubeTheme');
if (themeSalvo === 'light') {
    document.body.setAttribute('data-theme', 'light');
    const spanTema = document.querySelector('#btn-menu-tema span');
    if (spanTema) spanTema.innerText = 'Aparência: Tema Claro';
}

