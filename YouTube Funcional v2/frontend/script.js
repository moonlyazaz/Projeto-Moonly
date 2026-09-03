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

    elementoDaAreaDoPlayer.innerHTML = `
        <div class="player">
            <iframe
                class="player__video"
                src="${dadosDoVideoPrincipal.embedUrl}"
                title="${dadosDoVideoPrincipal.titulo}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
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
                <button class="botao-inscrever" data-toast="Inscrito no canal!">Inscrever-se</button>
            </div>

            <div class="acoes-video">
                <button class="acao" data-toast="Você curtiu este vídeo.">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>${dadosDoVideoPrincipal.curtidas}</span>
                    <span class="acao__separador"></span>
                    <i class="fa-solid fa-thumbs-down"></i>
                </button>
                <button class="acao" data-toast="Link copiado para a área de transferência.">
                    <i class="fa-solid fa-share"></i>
                    <span>Compartilhar</span>
                </button>
                <button class="acao" data-toast="Download iniciado.">
                    <i class="fa-solid fa-download"></i>
                    <span>Fazer download</span>
                </button>
                <button class="acao" data-toast="Mais opções em breve.">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
        </div>

        <div class="descricao">
            <div class="descricao__estatisticas">
                <span>${dadosDoVideoPrincipal.visualizacoes}</span>
                <span>${dadosDoVideoPrincipal.dataPublicacao}</span>
            </div>
            <p class="descricao__texto">${dadosDoVideoPrincipal.descricao}</p>
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
                <div class="card-resultado__avatar">${inicialDoCanal}</div>
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
 * com autoplay e loop, usando o mesmo iframe embed do YouTube.
 *
 * @param {Object} video - Objeto de vídeo retornado por /api/buscar.
 */
function montarShort(video) {
    return `
        <div class="short-item">
            <div class="short-item__player-wrapper">
                <iframe
                    class="short-item__iframe"
                    src="https://www.youtube.com/embed/${video.id}?loop=1&playlist=${video.id}&controls=1"
                    title="${video.titulo}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <div class="short-item__info">
                    <p class="short-item__titulo">${video.titulo}</p>
                    <p class="short-item__canal">${video.canal}</p>
                </div>
            </div>
        </div>
    `;
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
        areaDeShorts.innerHTML = `<div class="shorts-lista">${videos.map(montarShort).join("")}</div>`;
    }

    mostrarView("shorts");
}

/**
 * Busca no backend os detalhes de um vídeo específico e o exibe na
 * view de "assistir" (player principal + recomendados).
 *
 * @param {string} idDoVideo - ID do vídeo no YouTube (ex: "dQw4w9WgXcQ").
 */
async function abrirVideo(idDoVideo) {
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
    try {
        const parametroDeDuracao = filtroDeDuracao ? `&duracao=${filtroDeDuracao}` : "";
        const resposta = await fetch(
            `${URL_DO_BACKEND}/api/buscar?q=${encodeURIComponent(termoDeBusca)}${parametroDeDuracao}`
        );

        if (!resposta.ok) {
            mostrarToast("Não foi possível buscar vídeos agora.");
            return;
        }
        const videosEncontrados = await resposta.json();

        if (filtroDeDuracao === "short") {
            renderizarShorts(videosEncontrados);
        } else {
            renderizarResultados(videosEncontrados, false, "lista");
        }
    } catch (erro) {
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
    try {
        const parametroDeCategoria = idDaCategoria ? `?categoria=${idDaCategoria}` : "";
        const resposta = await fetch(`${URL_DO_BACKEND}/api/populares${parametroDeCategoria}`);

        if (!resposta.ok) {
            mostrarToast("Não foi possível carregar os vídeos em alta agora.");
            return;
        }
        const videosEncontrados = await resposta.json();
        renderizarResultados(videosEncontrados, true, "grid");
    } catch (erro) {
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
            }
        });
    });
}

configurarBuscaEClique();

// Carrega a Home com vídeos em alta reais, igual à Home de verdade do YouTube.
buscarPopulares();


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
        const gatilhoDeToast = evento.target.closest("[data-toast]");
        if (gatilhoDeToast) {
            mostrarToast(gatilhoDeToast.dataset.toast);
        }
    });
}

configurarFeedbackDeAcoes();