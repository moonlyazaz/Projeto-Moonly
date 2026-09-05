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
              <video
                  id="main-video-player"
                  class="media-view-box__video"
                  autoplay
                  style="width: 100%; height: 100%; object-fit: contain; background: #000;"
              ></video>

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
                      <button class="media-view-box__btn" id="main-like-btn" title="Gostei" onclick="adicionarGostei('${dadosDoVideoPrincipal.id}', decodeURIComponent('${encodeURIComponent(dadosDoVideoPrincipal.titulo)}'), '${dadosDoVideoPrincipal.imagemCapa}', decodeURIComponent('${encodeURIComponent(dadosDoVideoPrincipal.canal.nome)}'), decodeURIComponent('${encodeURIComponent(dadosDoVideoPrincipal.visualizacoes)}'))"><i class="fa-regular fa-thumbs-up"></i></button>
                      
                    <button class="media-view-box__btn" id="main-download-btn" title="Baixar Video" onclick="abrirModalDownload('${dadosDoVideoPrincipal.id}')"><i class="fa-solid fa-download"></i></button>
                    <button class="media-view-box__btn" id="main-party-btn" title="Watch Party (Sala)" onclick="iniciarWatchParty()"><i class="fa-solid fa-users"></i></button>
                    <button class="media-view-box__btn" id="main-lyrics-btn" title="Letra da Musica" onclick="abrirLetras('${encodeURIComponent(dadosDoVideoPrincipal.titulo)}', '${encodeURIComponent(dadosDoVideoPrincipal.canal.nome)}')"><i class="fa-solid fa-microphone-lines"></i></button>

                      <button class="media-view-box__btn" id="main-watch-later-btn" title="Assistir mais tarde" onclick="adicionarAssistirMaisTarde(null, '${dadosDoVideoPrincipal.id}', decodeURIComponent('${encodeURIComponent(dadosDoVideoPrincipal.titulo)}'), '${dadosDoVideoPrincipal.imagemCapa}', decodeURIComponent('${encodeURIComponent(dadosDoVideoPrincipal.canal.nome)}'), decodeURIComponent('${encodeURIComponent(dadosDoVideoPrincipal.visualizacoes)}'))"><i class="fa-regular fa-clock"></i></button>
                    <button class="media-view-box__btn" id="main-miniplayer-btn" title="Miniplayer" onclick="toggleMiniplayer()"><i class="fa-solid fa-compress"></i></button>
                    <button class="media-view-box__btn" id="main-fullscreen-btn"><i class="fa-solid fa-expand"></i></button>
                </div>
            </div>
        </div>

        <h1 class="video-titulo">${dadosDoVideoPrincipal.titulo}</h1>

        <div class="barra-canal">
            <div class="canal">
                <span
                    class="canal__foto"
                    style="background-image: url(\'${dadosDoVideoPrincipal.canal.foto}\'); cursor:pointer" data-canal-id="${dadosDoVideoPrincipal.canal.id}" onclick="abrirCanal(this.dataset.canalId)"
                ></span>
                <span class="canal__informacoes">
                    <span class="canal__nome" data-canal-id="${dadosDoVideoPrincipal.canal.id}" onclick="abrirCanal(this.dataset.canalId)" style="cursor:pointer">${dadosDoVideoPrincipal.canal.nome}</span>
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
    // Esconde todas
    document.querySelectorAll('.area-view').forEach(v => v.style.display = 'none');
    document.getElementById("areaAssistir").style.display = "none";
    document.getElementById("areaShorts").style.display = "none";
    document.getElementById("areaResultados").parentElement.style.display = "none";

    // Mostra a correta
    if (nomeDaView === 'inicio' || nomeDaView === 'busca' || nomeDaView === 'inscricoes') {
        document.getElementById("areaResultados").parentElement.style.display = "block";
    } else if (nomeDaView === 'assistir') {
        document.getElementById("areaAssistir").style.display = "block";
    } else if (nomeDaView === 'shorts') {
        document.getElementById("areaShorts").style.display = "block";
    } else if (nomeDaView === 'historico') {
        document.getElementById("areaHistorico").style.display = "block";
        if(typeof renderizarHistorico === 'function') renderizarHistorico();
    } else if (nomeDaView === 'canal') {
        document.getElementById('areaCanalVisualizacao').style.display = 'block';
    } else if (nomeDaView === 'voce') {
        document.getElementById("areaVoce").style.display = "block";
        carregarCanalDoUsuario();
    } else if (nomeDaView === 'assistir_mais_tarde') {
        const area = document.getElementById("areaAssistirMaisTarde");
        if(area) {
            area.style.display = "block";
            carregarListaSalva('assistirMaisTarde', 'gradeAssistirMaisTarde');
        }
    } else if (nomeDaView === 'playlists') {
        document.getElementById('areaMinhasPlaylists').style.display = 'block';
        carregarMinhasPlaylists();
    } else if (nomeDaView === 'curtidos') {
        const area = document.getElementById("areaCurtidos");
        if(area) {
            area.style.display = "block";
            carregarListaSalva('videosCurtidos', 'gradeCurtidos');
        }
    }
}
function montarCardDeResultado(video) {
    const inicialDoCanal = video.canal ? video.canal.charAt(0).toUpperCase() : "?";

    return `
        <div class="card-resultado" data-id-do-video="${video.id}">
            <div class="card-resultado__miniatura-wrapper" style="position:relative;">
                <img class="card-resultado__miniatura" src="${video.miniatura}" alt="${video.titulo}" loading="lazy">
                <span class="card-resultado__duracao">${video.duracao}</span>
                <button class="btn-assistir-mais-tarde-overlay" onclick="adicionarAssistirMaisTarde(event, '${video.id}', decodeURIComponent('${encodeURIComponent(video.titulo)}'), '${video.miniatura}', decodeURIComponent('${encodeURIComponent(video.canal)}'), decodeURIComponent('${encodeURIComponent(video.visualizacoes)}'))" title="Assistir mais tarde">
                    <i class="fa-regular fa-clock"></i>
                </button>
            </div>
            <div class="card-resultado__corpo">
                ${video.fotoCanal 
                    ? `<div class="card-resultado__avatar" style="background-image: url('${video.fotoCanal}'); background-size: cover; background-position: center; color: transparent;"></div>`
                    : `<div class="card-resultado__avatar">${inicialDoCanal}</div>`
                }
                <div class="card-resultado__informacoes">
                    <span class="card-resultado__titulo">${video.titulo}</span>
                    <span class="card-resultado__canal" data-canal-id="${video.canalId || ''}" onclick="event.stopPropagation(); if(this.dataset.canalId) abrirCanal(this.dataset.canalId)">${video.canal}</span>
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
        
        // Fase 4: TikTok style scroll & autoplay
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const idx = entry.target.dataset.indice;
                    if (entry.isIntersecting) {
                        indiceDoShortAtual = parseInt(idx);
                        // Tentar dar play
                        const player = playersDeShorts[indiceDoShortAtual];
                        if (player && typeof player.playVideo === 'function') {
                            player.playVideo();
                        }
                    } else {
                        // Pausar
                        const player = playersDeShorts[idx];
                        if (player && typeof player.pauseVideo === 'function') {
                            player.pauseVideo();
                        }
                    }
                });
            }, { threshold: 0.6 });
            
            document.querySelectorAll('.short-item').forEach(item => {
                observer.observe(item);
            });
        }, 1000);

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


window.atualizarStreamPiped = async function(videoId) {
    const video = document.getElementById("main-video-player");
    if (!video) return;
    
    video.src = "";
    video.poster = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
    
    try {
        const res = await fetch("https://pipedapi.kavin.rocks/streams/" + videoId);
        const data = await res.json();
        
        let streamUrl = "";
        if (data.videoStreams && data.videoStreams.length > 0) {
            const comAudio = data.videoStreams.filter(s => s.videoOnly === false && (s.format === 'MPEG-4' || s.format === 'WEBM'));
            if (comAudio.length > 0) {
                streamUrl = comAudio[0].url;
            } else {
                streamUrl = data.videoStreams[0].url;
            }
        }
        
        if (streamUrl) {
            video.src = streamUrl;
            video.play().catch(e => console.log("Autoplay block", e));
        }
    } catch(e) {
        console.error("Erro Piped API:", e);
    }
};

function inicializarPlayerPrincipal(ehAoVivo = false, videoId) {
    if (intervaloDeProgressoPrincipal) clearInterval(intervaloDeProgressoPrincipal);
    
    const videoEl = document.getElementById('main-video-player');
    if (!videoEl) return;
    
    atualizarStreamPiped(videoId);
    
    window.playerPrincipal = {
        playVideo: () => videoEl.play(),
        pauseVideo: () => videoEl.pause(),
        seekTo: (t) => { videoEl.currentTime = t; },
        getCurrentTime: () => videoEl.currentTime,
        destroy: () => { videoEl.pause(); videoEl.src = ""; }
    };
    
    const btnPlay = document.getElementById('main-play-btn');
    const iconePlay = document.getElementById('main-play-icon');
    const btnMute = document.getElementById('main-mute-btn');
    const iconeMute = document.getElementById('main-mute-icon');
    const btnFull = document.getElementById('main-fullscreen-btn');
    const displayTempo = document.getElementById('main-time-display');
    const barra = document.getElementById('main-progress-bar');
    
    videoEl.addEventListener('play', () => {
        if(iconePlay) { iconePlay.classList.remove('fa-play'); iconePlay.classList.add('fa-pause'); }
        if (!window.ignoreNextAction && window.partyRoomId && window.socket) {
            window.socket.emit('player-action', { roomId: window.partyRoomId, action: 'play', time: videoEl.currentTime });
        }
    });
    
    videoEl.addEventListener('pause', () => {
        if(iconePlay) { iconePlay.classList.remove('fa-pause'); iconePlay.classList.add('fa-play'); }
        if (videoEl.ended) {
            if (window.estadoPlaylist && window.estadoPlaylist.currentIndex !== undefined) {
                const prox = window.estadoPlaylist.currentIndex + 1;
                if (prox < window.estadoPlaylist.videos.length) {
                    window.abrirVideoDaPlaylist(window.estadoPlaylist.videos[prox].id, window.estadoPlaylist.id);
                }
            }
        } else {
            if (!window.ignoreNextAction && window.partyRoomId && window.socket) {
                window.socket.emit('player-action', { roomId: window.partyRoomId, action: 'pause', time: videoEl.currentTime });
            }
        }
    });
    
    videoEl.addEventListener('timeupdate', () => {
        if (!ehAoVivo) {
            displayTempo.innerText = formatarTempo(videoEl.currentTime) + " / " + formatarTempo(videoEl.duration);
            if (videoEl.duration && barra) {
                barra.style.width = ((videoEl.currentTime / videoEl.duration) * 100) + "%";
            }
        }
    });
    
    if (btnPlay) btnPlay.onclick = () => { videoEl.paused ? videoEl.play() : videoEl.pause(); };
    if (btnMute) btnMute.onclick = () => { 
        videoEl.muted = !videoEl.muted; 
        if(iconeMute) iconeMute.className = videoEl.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"; 
    };
    if (btnFull) btnFull.onclick = () => { 
        const container = document.getElementById('main-player-container');
        !document.fullscreenElement ? container.requestFullscreen().catch(e => {}) : document.exitFullscreen();
    };
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

document.getElementById('btn-menu-canal-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('containerUsuarioLogado').classList.remove('aberto');
    const btnVoce = document.getElementById('btn-sidebar-voce');
    if (btnVoce) btnVoce.click(); 
});

// --- LOGICA DE PAINEIS DO MENU ---
function abrirPainel(idPainel) {
    document.querySelectorAll('.menu-painel').forEach(p => p.classList.remove('ativo'));
    document.getElementById(idPainel).classList.add('ativo');
}

document.getElementById('btn-menu-tema').addEventListener('click', (e) => {
    e.stopPropagation();
    abrirPainel('painel-tema');
});

document.getElementById('btn-menu-idioma').addEventListener('click', (e) => {
    e.stopPropagation();
    abrirPainel('painel-idioma');
});

document.getElementById('btn-voltar-tema').addEventListener('click', (e) => {
    e.stopPropagation();
    abrirPainel('painel-principal');
});

document.getElementById('btn-voltar-idioma').addEventListener('click', (e) => {
    e.stopPropagation();
    abrirPainel('painel-principal');
});

// Acoes do tema
document.querySelectorAll('.menu-tema-opcao').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tema = btn.getAttribute('data-tema');
        
        // Remove check de todos
        document.querySelectorAll('.menu-tema-opcao .icone-check').forEach(i => i.style.opacity = '0');
        // Adiciona check no clicado
        btn.querySelector('.icone-check').style.opacity = '1';
        
        if (tema === 'light') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('youtubeTheme', 'light');
            document.getElementById('texto-menu-tema').innerText = 'Aparência: tema claro';
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('youtubeTheme', 'dark');
            document.getElementById('texto-menu-tema').innerText = 'Aparência: tema escuro';
        }
    });
});

// Reseta o painel principal ao fechar o menu (document click handler existe e apenas remove classe 'aberto', entao adicionaremos logicamente no que ja existe)

const themeSalvo = localStorage.getItem('youtubeTheme');
if (themeSalvo === 'light') {
    document.body.setAttribute('data-theme', 'light');
    const spanTema = document.getElementById('texto-menu-tema');
    if (spanTema) spanTema.innerText = 'Aparência: tema claro';
    
    // Atualiza ícones de check
    const checkClaro = document.querySelector('#opcao-tema-claro .icone-check');
    const checkEscuro = document.querySelector('#opcao-tema-escuro .icone-check');
    if (checkClaro) checkClaro.style.opacity = '1';
    if (checkEscuro) checkEscuro.style.opacity = '0';
} else {
    const checkEscuro = document.querySelector('#opcao-tema-escuro .icone-check');
    if (checkEscuro) checkEscuro.style.opacity = '1';
}

// ===== INSCRIÇÕES REAIS DA YOUTUBE DATA API =====

const MAX_INSCRICOES_SIDEBAR = 7;
let todasInscricoes = [];
let mostrandoTodas = false;

async function carregarInscricoesSidebar() {
    const lista = document.getElementById('sidebarInscricoesLista');
    if (!lista) return;
    lista.innerHTML = '<a class="sidebar-item"><i class="fa-solid fa-circle-notch fa-spin" style="font-size:16px;margin-right:16px;"></i><span>Carregando...</span></a>';

    try {
        // Force new token for subscriptions scope (clear cached token to ensure 
        // user can grant subscriptions permission)
        const token = await obterTokenDeAcessoDoYoutube();
        const res = await fetch(
            'https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&order=alphabetical',
            { headers: { 'Authorization': 'Bearer ' + token } }
        );
        const data = await res.json();

        if (data.error) {
            console.error('API error:', data.error);
            // If 403, token doesn't have subscriptions scope — clear and retry
            if (data.error.code === 403 || data.error.code === 401) {
                tokenDeAcessoDoYoutube = null;
                localStorage.removeItem(CHAVE_TOKEN_YT);
                localStorage.removeItem(CHAVE_EXPIRACAO_YT);
                lista.innerHTML = '<a class="sidebar-item" style="height:auto;padding:12px 16px;"><span style="color:#aaa;font-size:13px;">Autorize o acesso às inscrições:</span><br><button onclick="carregarInscricoesSidebar()" style="margin-top:8px;background:#ff0000;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:13px;">Autorizar</button></a>';
                return;
            }
            lista.innerHTML = '<a class="sidebar-item"><span style="color:#aaa;font-size:13px;">Erro: ' + (data.error.message || 'desconhecido') + '</span></a>';
            return;
        }

        if (!data.items || data.items.length === 0) {
            lista.innerHTML = '<a class="sidebar-item"><span style="color:#aaa;font-size:13px;">Nenhuma inscrição encontrada.</span></a>';
            return;
        }

        todasInscricoes = data.items;
        renderizarInscricoesSidebar(false);

    } catch (err) {
        console.error('Erro ao carregar inscrições:', err);
        lista.innerHTML = '<a class="sidebar-item" style="flex-direction:column;align-items:flex-start;height:auto;padding:12px 16px;"><span style="color:#aaa;font-size:13px;">Inscrições não carregadas.</span><span style="color:#3ea6ff;font-size:12px;margin-top:4px;cursor:pointer;" onclick="carregarInscricoesSidebar()">Tentar novamente</span></a>';
        mostrarToast('Clique "Tentar novamente" nas Inscrições para autorizar.');
    }
}

function renderizarInscricoesSidebar(mostrarTodas) {
    const lista = document.getElementById('sidebarInscricoesLista');
    const btnMais = document.getElementById('btnMaisInscricoes');
    if (!lista) return;

    const itens = mostrarTodas ? todasInscricoes : todasInscricoes.slice(0, MAX_INSCRICOES_SIDEBAR);

    lista.innerHTML = itens.map(item => {
        const titulo = item.snippet.title;
        const thumb = item.snippet.thumbnails?.default?.url || '';
        const channelId = item.snippet.resourceId?.channelId || '';
        return `
        <a class="sidebar-item" data-secao="busca" data-termo="${titulo}" title="${titulo}" referrerpolicy="no-referrer">
            <img src="${thumb}" class="sidebar-avatar" alt="${titulo}" referrerpolicy="no-referrer" onerror="this.style.display='none'">
            <span>${titulo.length > 18 ? titulo.substring(0, 18) + '...' : titulo}</span>
        </a>`;
    }).join('');

    if (btnMais) {
        if (todasInscricoes.length > MAX_INSCRICOES_SIDEBAR && !mostrarTodas) {
            btnMais.style.display = 'flex';
            btnMais.onclick = (e) => {
                e.stopPropagation();
                renderizarInscricoesSidebar(true);
            };
        } else {
            btnMais.style.display = 'none';
        }
    }
}

// ====== FASE 2: AUTOCOMPLETAR PESQUISA ======
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
let suggestionTimeout;

if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (!query) {
            searchSuggestions.style.display = 'none';
            return;
        }
        
        clearTimeout(suggestionTimeout);
        suggestionTimeout = setTimeout(async () => {
            try {
                const res = await fetch('/api/sugestoes?q=' + encodeURIComponent(query));
                const terms = await res.json();
                
                if (terms && terms.length > 0) {
                    searchSuggestions.innerHTML = terms.map(term => `
                        <div class="search-suggestion-item">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <span>${term}</span>
                        </div>
                    `).join('');
                    
                    // Add click events
                    searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
                        item.addEventListener('click', () => {
                            const selectedTerm = item.querySelector('span').innerText;
                            searchInput.value = selectedTerm;
                            searchSuggestions.style.display = 'none';
                            
                            // Trigger search
                            document.querySelector('.sidebar-item[data-secao="inicio"]').click();
                            buscarVideos(selectedTerm);
                        });
                    });
                    
                    searchSuggestions.style.display = 'block';
                } else {
                    searchSuggestions.style.display = 'none';
                }
            } catch (err) {
                console.error("Erro ao buscar sugestões:", err);
            }
        }, 300); // 300ms debounce
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-input-wrapper')) {
            searchSuggestions.style.display = 'none';
        }
    });
    
    // Show suggestions again on focus if there's text
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() && searchSuggestions.innerHTML) {
            searchSuggestions.style.display = 'block';
        }
    });
}
// ====== FIM FASE 2 ======

// ====== FASE 3: ASSISTIR MAIS TARDE & GOSTEI ======
function adicionarAssistirMaisTarde(e, id, titulo, miniatura, canal, visualizacoes) {
    if (e) e.stopPropagation();
    let lista = JSON.parse(localStorage.getItem('assistirMaisTarde') || '[]');
    if (!lista.find(v => v.id === id)) {
        lista.unshift({id, titulo, miniatura, canal, visualizacoes});
        localStorage.setItem('assistirMaisTarde', JSON.stringify(lista));
        mostrarToast('Adicionado a Assistir mais tarde');
    } else {
        mostrarToast('Vídeo já está na lista');
    }
}

function adicionarGostei(id, titulo, miniatura, canal, visualizacoes) {
    let lista = JSON.parse(localStorage.getItem('videosCurtidos') || '[]');
    if (!lista.find(v => v.id === id)) {
        lista.unshift({id, titulo, miniatura, canal, visualizacoes});
        localStorage.setItem('videosCurtidos', JSON.stringify(lista));
        mostrarToast('Adicionado aos vídeos que gostei');
    } else {
        // Remove if already liked
        lista = lista.filter(v => v.id !== id);
        localStorage.setItem('videosCurtidos', JSON.stringify(lista));
        mostrarToast('Removido dos vídeos que gostei');
    }
}

function carregarListaSalva(chave, containerId) {
    let lista = [];
    try {
        lista = JSON.parse(localStorage.getItem(chave) || '[]');
    } catch(e) {
        console.error("Erro ao ler", chave, e);
        lista = [];
    }
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (lista.length === 0) {
        container.innerHTML = '<p style="color:#aaa;">Nenhum vídeo salvo ainda.</p>';
        return;
    }
    
    container.innerHTML = lista.map(video => `
        <div class="card-resultado" data-id-do-video="${video.id}">
            <div class="card-resultado__miniatura-wrapper">
                <img class="card-resultado__miniatura" src="${video.miniatura}" alt="${video.titulo}">
            </div>
            <div class="card-resultado__corpo">
                <div class="card-resultado__informacoes" style="margin-left: 0;">
                    <span class="card-resultado__titulo">${video.titulo}</span>
                    <span class="card-resultado__canal" data-canal-id="${video.canalId || ''}" onclick="event.stopPropagation(); if(this.dataset.canalId) abrirCanal(this.dataset.canalId)">${video.canal}</span>
                    <span class="card-resultado__dados">${video.visualizacoes || ''}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.card-resultado').forEach(card => {
        card.addEventListener('click', () => {
            const vidId = card.getAttribute('data-id-do-video');
            abrirVideo(vidId);
        });
    });
}
// ====== FIM FASE 3 ======


// ==================== SISTEMA DE ROTEAMENTO (Fase 5) ====================
// Monkey patch das funcões originais para injetar rotas URL

const originalAbrirVideoRouter = window.abrirVideo || abrirVideo;
window.abrirVideo = async function(idDoVideo, fromHistory = false) {
    if (!fromHistory) {
        window.history.pushState({ view: 'assistir', id: idDoVideo }, "", "?watch=" + idDoVideo);
    }
    return originalAbrirVideoRouter(idDoVideo);
};
// Garantir que a chamadas internas também usem o hook global (se possível, mas como script já carregou, funções globais podem ser chamadas diretamente. No JavaScript, a reatribuição de var global sem const altera a func)
abrirVideo = window.abrirVideo;

const originalMostrarViewRouter = window.mostrarView || mostrarView;
window.mostrarView = function(nomeDaView, fromHistory = false) {
    if (!fromHistory) {
        if (nomeDaView === 'inicio') {
            if (window.history.state && window.history.state.view === 'busca') {
                // Mantem a URL de busca
            } else {
                window.history.pushState({ view: 'inicio' }, "", window.location.pathname);
            }
        } else if (nomeDaView === 'shorts') {
            window.history.pushState({ view: 'shorts' }, "", "?shorts=true");
        } else if (['historico', 'voce', 'assistir_mais_tarde', 'curtidos', 'playlists'].includes(nomeDaView)) {
            window.history.pushState({ view: nomeDaView }, "", "?view=" + nomeDaView);
        }
    }
    return originalMostrarViewRouter(nomeDaView);
};
mostrarView = window.mostrarView;

const originalBuscarVideosRouter = window.buscarVideos || buscarVideos;
window.buscarVideos = async function(termoDeBusca, filtroDeDuracao = "", fromHistory = false) {
    if (!fromHistory && filtroDeDuracao !== "short") {
        window.history.pushState({ view: 'busca', termo: termoDeBusca }, "", "?search=" + encodeURIComponent(termoDeBusca));
    }
    return originalBuscarVideosRouter(termoDeBusca, filtroDeDuracao);
};
buscarVideos = window.buscarVideos;

// Ouvinte do botăo voltar/avancar do navegador
window.addEventListener('popstate', (e) => {
    const state = e.state;
    if (state) {
        if (state.view === 'assistir') {
            window.abrirVideo(state.id, true);
        } else if (state.view === 'busca') {
            window.buscarVideos(state.termo, "", true);
        } else if (state.view === 'canal') {
            window.abrirCanal(state.id, true);
        } else if (state.view === 'shorts') {
            window.buscarVideos("shorts", "short", true);
            window.mostrarView("shorts", true);
        } else if (state.view === 'inicio') {
            document.querySelector('.sidebar-item[data-secao="inicio"]').click();
            window.mostrarView('inicio', true);
        } else {
            window.mostrarView(state.view, true);
        }
    } else {
        // Se năo houver estado salvo (pressionou Voltar pro inicio inicial)
        carregarEstadoInicialDaUrl(true);
    }
});

function carregarEstadoInicialDaUrl(fromHistory = false) {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('party')) {
        setTimeout(() => {
            window.conectarWatchParty(params.get('party'));
        }, 1000);
    }

    if (params.has('watch')) {
        window.abrirVideo(params.get("watch"), fromHistory, params.get("list"));
    } else if (params.has('v')) { // Compatibilidade com links antigos / yt normal
        window.abrirVideo(params.get('v'), fromHistory);
    } else if (params.has('search')) {
        const t = params.get('search');
        document.getElementById("search-input").value = t;
        window.buscarVideos(t, "", fromHistory);
    } else if (params.has('shorts')) {
        document.querySelector('.sidebar-item[data-secao="shorts"]').click();
    } else if (params.has('channel')) {
        window.abrirCanal(params.get('channel'), fromHistory);
    } else if (params.has('view')) {
        const v = params.get('view');
        // Simular clique na sidebar para manter UI sincronizada
        const item = document.querySelector(`.sidebar-item[data-secao="${v}"]`);
        if (item) item.click();
        else window.mostrarView(v, fromHistory);
    } else {
        buscarPopulares();
    }
}

// Inicializacao da Rota (Atrasa 50ms para garantir que tudo no DOM/login foi carregado)
setTimeout(() => {
    carregarEstadoInicialDaUrl();
}, 50);


// ==================== PESQUISA POR VOZ ====================
function configurarPesquisaPorVoz() {
    const btnMic = document.querySelector('.microphone');
    const inputBusca = document.getElementById('search-input');
    if (!btnMic || !inputBusca) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return; // Navegador năo suporta

    // Remove the data-toast so it doesn't conflict
    btnMic.removeAttribute('data-toast');

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let estaOuvindo = false;

    btnMic.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (estaOuvindo) {
            recognition.stop();
            return;
        }

        try {
            recognition.start();
            estaOuvindo = true;
            btnMic.classList.add('mic-ouvindo');
            mostrarToast("Ouvindo... Fale agora");
        } catch (err) {
            console.error(err);
        }
    });

    recognition.addEventListener('result', (e) => {
        const transcricao = e.results[0][0].transcript;
        inputBusca.value = transcricao;
        mostrarToast(`Você disse: "${transcricao}"`);
        
        // Simular envio de busca
        document.querySelector('.sidebar-item[data-secao="inicio"]').click();
        buscarVideos(transcricao);
    });

    recognition.addEventListener('end', () => {
        estaOuvindo = false;
        btnMic.classList.remove('mic-ouvindo');
    });

    recognition.addEventListener('error', (e) => {
        estaOuvindo = false;
        btnMic.classList.remove('mic-ouvindo');
        if (e.error !== 'aborted') {
            mostrarToast("Erro na gravação. Tente novamente.");
        }
    });
}
// Inicializar
setTimeout(configurarPesquisaPorVoz, 500);


// ==================== VISUALIZACAO DE CANAL ====================
window.abrirCanal = async function(idDoCanal, fromHistory = false) {
    if (!fromHistory) {
        window.history.pushState({ view: 'canal', id: idDoCanal }, "", "?channel=" + idDoCanal);
    }
    
    iniciarCarregamento();
    mostrarView("canal");
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    const banner = document.getElementById("canal-banner-visualizacao");
    const avatar = document.getElementById("canal-avatar-visualizacao");
    const nome = document.getElementById("canal-nome-visualizacao");
    const stats = document.getElementById("canal-estatisticas-visualizacao");
    const desc = document.getElementById("canal-descricao-visualizacao");
    const btn = document.getElementById("canal-botao-inscrever");
    const grade = document.getElementById("gradeCanalVisualizacao");
    
    banner.style.backgroundImage = "none";
    avatar.src = "";
    nome.textContent = "Carregando...";
    stats.textContent = "";
    desc.textContent = "";
    btn.dataset.canalId = idDoCanal;
    btn.textContent = "Inscrever-se";
    btn.classList.remove("inscrito");
    grade.innerHTML = "";
    
    try {
        const res = await fetch(`${URL_DO_BACKEND}/api/canal/${idDoCanal}`);
        if (!res.ok) throw new Error("Canal năo encontrado");
        const canal = await res.json();
        
        if (canal.banner) banner.style.backgroundImage = `url('${canal.banner}')`;
        avatar.src = canal.foto;
        nome.textContent = canal.nome;
        stats.textContent = `${canal.inscritos} inscritos • ${canal.videos} vídeos`;
        desc.textContent = canal.descricao;
        
        // Verificar inscricao
        verificarEstadoDoVideo(null, idDoCanal);
        
        const resVid = await fetch(`${URL_DO_BACKEND}/api/canal/${idDoCanal}/videos`);
        const videos = await resVid.json();
        grade.innerHTML = videos.map(montarCardDeResultado).join("");
        
    } catch (e) {
        console.error(e);
        nome.textContent = "Erro ao carregar o canal.";
    }
    finalizarCarregamento();
};



// ==================== MINIPLAYER ====================
window.estadoMiniplayer = false;

window.toggleMiniplayer = function() {
    const box = document.querySelector('.media-view-box');
    if (!box) return;

    if (!window.estadoMiniplayer) {
        // Ativar miniplayer
        window.estadoMiniplayer = true;
        box.classList.add('miniplayer-ativo');
        
        // Mover para o body para năo ser escondido pelo display:none do areaAssistir
        document.body.appendChild(box);
        
        // Voltar para a home ou manter a view atual? 
        // O padrăo do YouTube é voltar pra de onde veio, vamos apenas ir para o Início
        document.querySelector('.sidebar-item[data-secao="inicio"]').click();
        
    } else {
        // Desativar miniplayer e voltar a assistir
        window.estadoMiniplayer = false;
        box.classList.remove('miniplayer-ativo');
        
        // Devolver para o areaPlayer
        const areaPlayer = document.getElementById('areaPlayer');
        if (areaPlayer) {
            areaPlayer.insertBefore(box, areaPlayer.firstChild); // Insere antes do titulo
        }
        
        // Voltar para a tela de assistir pegando o ID atual
        // Como saber o ID? O iframe tem a URL. Mas podemos usar o History.
        // Ou simplesmente:
        const videoIdMatch = box.querySelector('iframe').src.match(/embed\/([^?]+)/);
        if (videoIdMatch) {
            abrirVideo(videoIdMatch[1]);
        }
    }
};

// Se abrir um vídeo novo e o miniplayer estiver ativo, tem que restaurar o box pro lugar certo
const originalAbrirVideoMini = window.abrirVideo;
window.abrirVideo = async function(idDoVideo, fromHistory = false) {
    if (window.estadoMiniplayer) {
        window.estadoMiniplayer = false;
        const box = document.querySelector('.media-view-box');
        if (box) {
            box.classList.remove('miniplayer-ativo');
            const areaPlayer = document.getElementById('areaPlayer');
            if (areaPlayer) areaPlayer.insertBefore(box, areaPlayer.firstChild);
        }
    }
    return originalAbrirVideoMini(idDoVideo, fromHistory);
};


// ==================== PLAYLIST ====================
window.estadoPlaylist = null; // { id, videos: [], currentIndex }

window.carregarPlaylistNoPainel = async function(idDaPlaylist, idDoVideoAtual) {
    const recomendacoes = document.getElementById("recomendacoes");
    if (!recomendacoes) return;

    try {
        if (!window.estadoPlaylist || window.estadoPlaylist.id !== idDaPlaylist) {
            recomendacoes.innerHTML = '<div style="padding:20px; color:#aaa;">Carregando playlist...</div>';
            const res = await fetch(`${URL_DO_BACKEND}/api/playlist/${idDaPlaylist}`);
            if (res.ok) {
                const dados = await res.json();
                window.estadoPlaylist = {
                    id: dados.id,
                    titulo: dados.titulo,
                    canal: dados.canal,
                    videos: dados.videos
                };
            }
        }

        if (window.estadoPlaylist && window.estadoPlaylist.videos.length > 0) {
            const p = window.estadoPlaylist;
            let index = p.videos.findIndex(v => v.id === idDoVideoAtual);
            if (index === -1) index = 0;
            p.currentIndex = index;

            // Render UI
            let html = `
                <div class="playlist-painel" style="background:#212121; border-radius:12px; border:1px solid #3d3d3d; margin-bottom: 24px; overflow:hidden;">
                    <div style="padding:16px; border-bottom:1px solid #3d3d3d;">
                        <h3 style="font-size:18px; font-weight:bold; margin-bottom:4px;">${p.titulo}</h3>
                        <p style="font-size:13px; color:#aaa;">${p.canal} - ${index + 1} / ${p.videos.length}</p>
                    </div>
                    <div class="playlist-painel-lista" style="max-height: 400px; overflow-y:auto; padding:8px 0;">
            `;

            p.videos.forEach((vid, i) => {
                const ativo = (i === index) ? 'background: rgba(255,255,255,0.1);' : '';
                html += `
                    <div class="playlist-item" style="display:flex; gap:12px; padding:8px 16px; cursor:pointer; align-items:center; ${ativo}" onclick="abrirVideoDaPlaylist('${vid.id}', '${p.id}')">
                        <span style="font-size:12px; color:#aaa; min-width:12px;">${i === index ? '▶' : i + 1}</span>
                        <img src="${vid.miniatura}" style="width:100px; height:56px; border-radius:8px; object-fit:cover;">
                        <div style="display:flex; flex-direction:column; overflow:hidden;">
                            <span style="font-size:14px; font-weight:500; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${vid.titulo}</span>
                            <span style="font-size:12px; color:#aaa;">${vid.canal}</span>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>`;
            
            // Coloca a playlist no topo e as recomendacoes normais embaixo (mas não vamos recarregar recomendacoes aqui senao apaga)
            // Na verdade, o `abrirVideo` original desenha recomendacoes e apaga tudo. 
            // Precisamos que a playlist apareça no topo das recomendações!
            const painelExistente = recomendacoes.querySelector('.playlist-painel');
            if (painelExistente) painelExistente.remove();
            recomendacoes.insertAdjacentHTML('afterbegin', html);
        }
    } catch (e) {
        console.error("Erro na playlist:", e);
    }
};

window.abrirVideoDaPlaylist = function(idVideo, idPlaylist) {
    // Muda a rota e abre o video
    window.history.pushState({ view: 'assistir', id: idVideo, list: idPlaylist }, "", `?watch=${idVideo}&list=${idPlaylist}`);
    abrirVideo(idVideo, true, idPlaylist);
};

// Precisamos injetar suporte a playlist no final de `originalAbrirVideo` ou logo apos `renderizarRecomendacoes`
// Como năo podemos alterar facilmente `abrirVideo` original, vamos criar um hook pós-carregamento.
const superOriginalAbrirVideo = window.abrirVideo;
window.abrirVideo = async function(idDoVideo, fromHistory = false, playlistId = null) {
    if (!fromHistory) {
        let url = "?watch=" + idDoVideo;
        if (playlistId) url += "&list=" + playlistId;
        window.history.pushState({ view: 'assistir', id: idDoVideo, list: playlistId }, "", url);
    } else {
        // Tentar extrair da URL
        const params = new URLSearchParams(window.location.search);
        if (!playlistId && params.has('list')) playlistId = params.get('list');
    }
    
    // Call the rest of the chain (which might include miniplayer logic)
    await superOriginalAbrirVideo(idDoVideo, true); 
    
    // After it loads video and recommendations, we inject playlist
    if (playlistId) {
        carregarPlaylistNoPainel(playlistId, idDoVideo);
    } else {
        window.estadoPlaylist = null;
    }
};


// ==================== MINHAS PLAYLISTS REAIS ====================
window.carregarMinhasPlaylists = async function() {
    const grade = document.getElementById("gradeMinhasPlaylists");
    if (!grade) return;
    
    grade.innerHTML = '<p style="color:#aaa;">Carregando suas playlists oficiais do YouTube...</p>';
    
    try {
        const token = await obterTokenDeAcessoDoYoutube();
        const resposta = await fetch("https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=20", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const dados = await resposta.json();
        
        if (dados.items && dados.items.length > 0) {
            let html = "";
            dados.items.forEach(pl => {
                const img = pl.snippet.thumbnails.high ? pl.snippet.thumbnails.high.url : (pl.snippet.thumbnails.default ? pl.snippet.thumbnails.default.url : '');
                html += `
                    <div class="card-resultado" onclick="abrirVideoDaPlaylist(null, '${pl.id}')" style="cursor:pointer">
                        <div class="card-resultado__miniatura-wrapper">
                            <img class="card-resultado__miniatura" src="${img}" alt="${pl.snippet.title}">
                            <div style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.8); padding:4px 8px; border-radius:4px; font-size:12px;">
                                <i class="fa-solid fa-list"></i> ${pl.contentDetails.itemCount} vídeos
                            </div>
                        </div>
                        <div class="card-resultado__corpo">
                            <div class="card-resultado__informacoes" style="margin-left: 0;">
                                <span class="card-resultado__titulo">${pl.snippet.title}</span>
                                <span class="card-resultado__canal">${pl.snippet.channelTitle}</span>
                                <span class="card-resultado__dados">Sua playlist real do YouTube</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            grade.innerHTML = html;
        } else {
            grade.innerHTML = '<p style="color:#aaa;">Nenhuma playlist encontrada na sua conta.</p>';
        }
    } catch (erro) {
        console.error(erro);
        grade.innerHTML = '<p style="color:#aaa;">Precisa de permissăo do YouTube para ver suas playlists.</p>';
    }
};

const originalAbrirVideoDaPlaylist = window.abrirVideoDaPlaylist;
window.abrirVideoDaPlaylist = async function(idVideo, idPlaylist) {
    if (!idVideo) {
        iniciarCarregamento();
        try {
            const res = await fetch(`${URL_DO_BACKEND}/api/playlist/${idPlaylist}`);
            const dados = await res.json();
            if (dados.videos && dados.videos.length > 0) {
                idVideo = dados.videos[0].id;
            } else {
                mostrarToast("Playlist vazia.");
                finalizarCarregamento();
                return;
            }
        } catch (e) {
            mostrarToast("Erro ao carregar playlist.");
            finalizarCarregamento();
            return;
        }
        finalizarCarregamento();
    }
    
    // Call original
    originalAbrirVideoDaPlaylist(idVideo, idPlaylist);
};



// ==================== DOWNLOAD ====================
window.abrirModalDownload = function(videoId) {
    const p = prompt("Digite 'mp3' para Audio ou 'mp4' para Video:");
    if (p === 'mp3' || p === 'mp4') {
        mostrarToast("Iniciando download... Pode demorar alguns instantes.");
        window.open(`${URL_DO_BACKEND}/api/download?id=${videoId}&format=${p}`, '_blank');
    }
};

// ==================== WATCH PARTY (SOCKET.IO) ====================
window.socket = null;
window.isPartyHost = false;
window.partyRoomId = null;

// Evitar loop de eventos (ex: recebe pause, e emite pause de novo)
window.ignoreNextAction = false;

window.iniciarWatchParty = function() {
    if (window.partyRoomId) {
        mostrarToast("Você já está em uma sala: " + window.partyRoomId);
        return;
    }
    const salaId = Math.random().toString(36).substring(2, 8).toUpperCase();
    conectarWatchParty(salaId);
    
    // Atualiza a URL para o amigo poder entrar
    const params = new URLSearchParams(window.location.search);
    params.set('party', salaId);
    window.history.pushState(history.state, "", "?" + params.toString());
    
    mostrarToast("Sala criada! Copie a URL e mande pro seu amigo. Sala: " + salaId);
    
    // Mostra indicador visual na tela
    mostrarIndicadorParty(salaId);
};

window.conectarWatchParty = function(salaId) {
    if (typeof io === 'undefined') {
        mostrarToast("Servidor Socket.IO năo disponivel.");
        return;
    }
    
    window.socket = io(URL_DO_BACKEND);
    window.partyRoomId = salaId;
    
    window.socket.emit('join-room', salaId);
    
    window.socket.on('user-joined', (id) => {
        mostrarToast("Um amigo entrou na Watch Party!");
    });
    
    window.socket.on('sync-action', (data) => {
        if (!playerPrincipal) return;
        
        window.ignoreNextAction = true;
        
        if (data.action === 'pause') {
            playerPrincipal.pauseVideo();
        } else if (data.action === 'play') {
            playerPrincipal.seekTo(data.time, true);
            playerPrincipal.playVideo();
        } else if (data.action === 'seek') {
            playerPrincipal.seekTo(data.time, true);
        }
        
        setTimeout(() => { window.ignoreNextAction = false; }, 1000);
    });
    mostrarIndicadorParty(salaId);
};

function mostrarIndicadorParty(salaId) {
    const indic = document.createElement('div');
    indic.style = "position:fixed; top:80px; right:20px; background:#e52d27; color:#fff; padding:8px 16px; border-radius:20px; z-index:9999; font-weight:bold;";
    indic.innerText = "🔥 Watch Party: " + salaId;
    document.body.appendChild(indic);
}

// ==================== LETRAS DE MÚSICA ====================
window.abrirLetras = async function(tituloEncode, canalEncode) {
    const titulo = decodeURIComponent(tituloEncode);
    const canal = decodeURIComponent(canalEncode);
    
    const recomendacoes = document.getElementById("recomendacoes");
    if (!recomendacoes) return;
    
    recomendacoes.innerHTML = '<div style="padding:20px; color:#fff;">Buscando letra...</div>';
    
    // Limpar o titulo (Tirar coisas como "Official Video", "Lyric", etc)
    const tituloLimpo = titulo.replace(/\(.*?\)|\[.*?\]/g, '').split('-')[1] || titulo.replace(/\(.*?\)|\[.*?\]/g, '');
    const artistaReal = titulo.split('-')[0] ? titulo.split('-')[0].trim() : canal;
    
    try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artistaReal)}/${encodeURIComponent(tituloLimpo.trim())}`);
        const dados = await res.json();
        
        if (dados.lyrics) {
            recomendacoes.innerHTML = `
                <div style="background:#212121; padding:24px; border-radius:12px; color:#fff; border:1px solid #3d3d3d; font-family:sans-serif;">
                    <h3 style="margin-bottom:16px; font-size:20px;">Letra</h3>
                    <div style="white-space:pre-wrap; font-size:16px; line-height:1.6; color:#aaa; max-height:600px; overflow-y:auto;">${dados.lyrics}</div>
                </div>
            `;
        } else {
            recomendacoes.innerHTML = '<div style="padding:20px; color:#aaa;">Letra não encontrada na base pública.</div>';
        }
    } catch(e) {
        recomendacoes.innerHTML = '<div style="padding:20px; color:#aaa;">Erro ao buscar letra.</div>';
    }
};

// ==================== EASTER EGG (SNAKE) ====================
window.secretBuffer = "";
document.addEventListener("keydown", (e) => {
    // Ignorar se estiver digitando em input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    window.secretBuffer += e.key.toLowerCase();
    if (window.secretBuffer.length > 5) {
        window.secretBuffer = window.secretBuffer.slice(1);
    }
    
    if (window.secretBuffer === "jogar") {
        iniciarJogoCobrinha();
        window.secretBuffer = "";
    }
});

function iniciarJogoCobrinha() {
    const box = document.querySelector('.media-view-box');
    if (!box) return;
    
    if (playerPrincipal) playerPrincipal.pauseVideo();
    
    let canvas = document.getElementById('snake-canvas');
    if (canvas) canvas.remove();
    
    canvas = document.createElement('canvas');
    canvas.id = 'snake-canvas';
    canvas.width = box.clientWidth;
    canvas.height = box.clientHeight;
    canvas.style = "position:absolute; top:0; left:0; z-index:999; background:rgba(0,0,0,0.8); backdrop-filter:blur(5px);";
    box.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const boxSize = 20;
    let snake = [];
    snake[0] = { x: 9 * boxSize, y: 10 * boxSize };
    
    let food = {
        x: Math.floor(Math.random() * (canvas.width/boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height/boxSize)) * boxSize
    };
    
    let d;
    document.addEventListener("keydown", direction);
    function direction(event) {
        let key = event.keyCode;
        if( key == 37 && d != "RIGHT"){ d = "LEFT"; }
        else if(key == 38 && d != "DOWN"){ d = "UP"; }
        else if(key == 39 && d != "LEFT"){ d = "RIGHT"; }
        else if(key == 40 && d != "UP"){ d = "DOWN"; }
    }
    
    const game = setInterval(draw, 100);
    
    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("🐍 USE AS SETAS PARA JOGAR", 20, 30);
        
        for( let i = 0; i < snake.length ; i++){
            ctx.fillStyle = ( i == 0 ) ? "#4CAF50" : "white";
            ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
        }
        
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, boxSize, boxSize);
        
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        if( d == "LEFT") snakeX -= boxSize;
        if( d == "UP") snakeY -= boxSize;
        if( d == "RIGHT") snakeX += boxSize;
        if( d == "DOWN") snakeY += boxSize;
        
        if(snakeX == food.x && snakeY == food.y){
            food = {
                x: Math.floor(Math.random() * (canvas.width/boxSize)) * boxSize,
                y: Math.floor(Math.random() * (canvas.height/boxSize)) * boxSize
            };
        } else {
            snake.pop();
        }
        
        let newHead = { x: snakeX, y: snakeY };
        
        if(snakeX < 0 || snakeX > canvas.width || snakeY < 0 || snakeY > canvas.height){
            clearInterval(game);
            canvas.remove();
            if(playerPrincipal) playerPrincipal.playVideo();
            mostrarToast("Fim de Jogo!");
        }
        snake.unshift(newHead);
    }
}
