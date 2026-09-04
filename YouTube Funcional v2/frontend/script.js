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
                <button class="botao-inscrever" type="button" data-acao="inscrever" data-canal-id="${dadosDoVideoPrincipal.canal.id}">Inscrever-se</button>
            </div>

            <div class="acoes-video">
                <button class="acao" type="button" data-acao="curtir" data-video-id="${dadosDoVideoPrincipal.id}">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>${dadosDoVideoPrincipal.curtidas}</span>
                </button>
                <button class="acao" type="button" data-toast="Obrigado pelo feedback.">
                    <i class="fa-solid fa-thumbs-down"></i>
                </button>
                <button class="acao" data-toast="Link copiado para a área de transferência.">
                    <i class="fa-solid fa-share"></i>
                    <span>Compartilhar</span>
                </button>
                <button class="acao" data-toast="O YouTube não permite baixar vídeos por fora do app oficial.">
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
                    class="short-item__iframe"
                    src="https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=1&playsinline=1"
                    title="${video.titulo}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <div class="short-item__info">
                    <p class="short-item__canal">
                        <span class="short-item__avatar">${inicialDoCanal}</span>
                        ${video.canal}
                        <button class="short-item__inscrever" type="button" data-acao="inscrever" data-canal-id="${video.canalId}">Inscrever-se</button>
                    </p>
                    <p class="short-item__titulo">${video.titulo}</p>
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
            } else if (secao === "inscricoes") {
                abrirInscricoesReais();
            }
        });
    });
}

configurarBuscaEClique();

// Carrega a Home com vídeos em alta reais, igual à Home de verdade do YouTube.
buscarPopulares();

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
function aoReceberCredencialDoGoogle(respostaDoGoogle) {
    const dadosDoUsuario = decodificarTokenJwt(respostaDoGoogle.credential);
    aplicarUsuarioLogado(dadosDoUsuario);
    mostrarToast(`Login realizado como ${dadosDoUsuario.given_name || dadosDoUsuario.name}.`);
}

/**
 * Inicializa o Google Identity Services e desenha os botões "Fazer
 * login com o Google" no cabeçalho e na sidebar. Se já existir um
 * login salvo no localStorage (de uma visita anterior), aplica direto
 * o estado logado sem precisar clicar em nada.
 */
function configurarLoginComGoogle() {
    if (GOOGLE_CLIENT_ID.startsWith("COLE_AQUI")) {
        console.warn(
            "[AVISO] Configure GOOGLE_CLIENT_ID no index.html para habilitar o Login com o Google " +
            "(veja o passo a passo no README.md)."
        );
        return;
    }

    if (!window.google || !window.google.accounts) {
        // A biblioteca do Google ainda não carregou; tenta de novo em breve.
        setTimeout(configurarLoginComGoogle, 300);
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: aoReceberCredencialDoGoogle
    });

    // Remove o botão substituto antes de desenhar o botão real do Google.
    document.getElementById("containerLoginGoogle").innerHTML = "";
    document.getElementById("containerLoginGoogleSidebar").innerHTML = "";

    google.accounts.id.renderButton(
        document.getElementById("containerLoginGoogle"),
        { theme: "filled_black", size: "medium", shape: "pill", text: "signin", locale: "pt-BR" }
    );
    google.accounts.id.renderButton(
        document.getElementById("containerLoginGoogleSidebar"),
        { theme: "outline", size: "medium", shape: "pill", text: "signin_with", locale: "pt-BR" }
    );

    const loginSalvo = localStorage.getItem("usuarioLogadoComGoogle");
    if (loginSalvo) {
        aplicarUsuarioLogado(JSON.parse(loginSalvo));
    }
}

configurarLoginComGoogle();

// ===== Ações reais na conta do YouTube (curtir, inscrever, inscrições) =====
// Usam um token OAuth separado do login (que só identifica quem é a
// pessoa). Esse token só é pedido na hora em que a pessoa realmente
// tenta curtir/inscrever, e o Google mostra uma tela de permissão.
const ESCOPOS_DO_YOUTUBE = "https://www.googleapis.com/auth/youtube.force-ssl";
let clienteDeTokenDoYoutube = null;
let tokenDeAcessoDoYoutube = null;

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
                    // O token expira sozinho depois de um tempo; limpa o
                    // cache local para pedir um novo na próxima ação.
                    setTimeout(() => { tokenDeAcessoDoYoutube = null; }, (resposta.expires_in - 60) * 1000);
                    resolver(tokenDeAcessoDoYoutube);
                }
            });
        }

        clienteDeTokenDoYoutube.requestAccessToken();
    });
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