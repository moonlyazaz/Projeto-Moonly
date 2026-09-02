const secoesDoMenuLateral = [
    {
        titulo: "",
        itens: [
            {
                nome: "Início",
                icone: "fa-solid fa-house",
                ativo: true
            },
            {
                nome: "Shorts",
                icone: "fa-solid fa-clapperboard",
                ativo: false
            },
            {
                nome: "Inscrições",
                icone: "fa-solid fa-square-rss",
                ativo: false
            }
        ]
    },
    {
        titulo: "Você",
        itens: [
            {
                nome: "Seu canal",
                icone: "fa-solid fa-user",
                ativo: false
            },
            {
                nome: "Histórico",
                icone: "fa-solid fa-clock-rotate-left",
                ativo: false
            },
            {
                nome: "Playlists",
                icone: "fa-solid fa-list",
                ativo: false
            },
            {
                nome: "Seus vídeos",
                icone: "fa-solid fa-video",
                ativo: false
            },
            {
                nome: "Assistir mais tarde",
                icone: "fa-solid fa-clock",
                ativo: false
            },
            {
                nome: "Vídeos curtidos",
                icone: "fa-solid fa-thumbs-up",
                ativo: false
            }
        ]
    },
    {
        titulo: "Explorar",
        itens: [
            {
                nome: "Em alta",
                icone: "fa-solid fa-fire",
                ativo: false
            },
            {
                nome: "Música",
                icone: "fa-solid fa-music",
                ativo: false
            },
            {
                nome: "Filmes",
                icone: "fa-solid fa-film",
                ativo: false
            },
            {
                nome: "Ao vivo",
                icone: "fa-solid fa-tower-broadcast",
                ativo: false
            },
            {
                nome: "Jogos",
                icone: "fa-solid fa-gamepad",
                ativo: false
            },
            {
                nome: "Notícias",
                icone: "fa-solid fa-newspaper",
                ativo: false
            },
            {
                nome: "Esportes",
                icone: "fa-solid fa-trophy",
                ativo: false
            }
        ]
    }
];

/**
 * Monta o HTML de um único item do menu lateral esquerdo.
 *
 * Dados esperados (exemplo):
 * {
 *     "nome": "Início",
 *     "icone": "fa-solid fa-house",
 *     "ativo": true
 * }
 *
 * @param {Object} itemDoMenu - Item com nome, classe do ícone e se está selecionado.
 * @returns {string} HTML do item pronto para ser inserido na página.
 */
function montarItemDoMenuLateral(itemDoMenu) {
    const classeDeItemAtivo = itemDoMenu.ativo ? "menu-item menu-item--ativo" : "menu-item";

    return `
        <a href="#" class="${classeDeItemAtivo}">
            <span class="menu-item__icone">
                <i class="${itemDoMenu.icone}"></i>
            </span>
            <span class="menu-item__nome">${itemDoMenu.nome}</span>
        </a>
    `;
}

/**
 * Monta o HTML de uma seção do menu lateral, com seu título e seus itens.
 *
 * Dados esperados (exemplo):
 * {
 *     "titulo": "Explorar",
 *     "itens": [
 *         {
 *             "nome": "Em alta",
 *             "icone": "fa-solid fa-fire",
 *             "ativo": false
 *         }
 *     ]
 * }
 *
 * @param {Object} secaoDoMenu - Seção contendo o título e a lista de itens.
 * @returns {string} HTML da seção completa.
 */
function montarSecaoDoMenuLateral(secaoDoMenu) {
    let htmlDosItens = "";

    for (const itemDoMenu of secaoDoMenu.itens) {
        htmlDosItens = htmlDosItens + montarItemDoMenuLateral(itemDoMenu);
    }

    const htmlDoTitulo = secaoDoMenu.titulo === ""
        ? ""
        : `<span class="menu-secao__titulo">${secaoDoMenu.titulo}</span>`;

    return `
        <div class="menu-secao">
            ${htmlDoTitulo}
            ${htmlDosItens}
        </div>
    `;
}

/**
 * Percorre todas as seções do menu lateral e escreve o resultado dentro do elemento
 * de id "menuLateral" do index.html.
 */
function renderizarMenuLateral() {
    const elementoDoMenuLateral = document.getElementById("menuLateral");

    if (!elementoDoMenuLateral) {
        return;
    }

    let htmlDoMenuLateral = "";

    for (const secaoDoMenu of secoesDoMenuLateral) {
        htmlDoMenuLateral = htmlDoMenuLateral + montarSecaoDoMenuLateral(secaoDoMenu);
    }

    elementoDoMenuLateral.innerHTML = htmlDoMenuLateral;
}

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
 * Busca no backend os detalhes de um vídeo específico e o exibe como
 * vídeo principal da página.
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (erro) {
        avisarSobreErroDeConexao(erro);
    }
}

/**
 * Busca no backend uma lista de vídeos reais pelo termo digitado e
 * renderiza como vídeos recomendados. Também abre o primeiro resultado
 * como vídeo principal, imitando o comportamento de uma busca real.
 *
 * @param {string} termoDeBusca - Texto digitado na barra de pesquisa ou
 *   termo interno usado pela navegação da sidebar (ex: "javascript").
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

        if (!videosEncontrados.length) {
            mostrarToast("Nenhum vídeo encontrado para essa busca.");
            return;
        }

        renderizarVideosRecomendados(videosEncontrados);
        await abrirVideo(videosEncontrados[0].id);
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
 * clique em qualquer card de vídeo recomendado para abri-lo, e a
 * navegação da sidebar (Início, Shorts, Música, Filmes e os demais
 * itens, que mostram um toast explicativo por dependerem de login).
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

    document.getElementById("recomendacoes").addEventListener("click", (evento) => {
        // Ignora o clique se foi no botão de menu (⋮), que já tem sua própria ação.
        if (evento.target.closest(".video-recomendado__menu")) return;

        const card = evento.target.closest("[data-id-do-video]");
        if (card) {
            abrirVideo(card.dataset.idDoVideo);
        }
    });

    document.querySelectorAll(".sidebar-item[data-secao]").forEach((item) => {
        item.addEventListener("click", (evento) => {
            evento.preventDefault();
            marcarItemAtivoNaSidebar(item);

            const secao = item.dataset.secao;

            if (secao === "inicio") {
                document.getElementById("search-input").value = "";
                buscarVideos("javascript");
            } else if (secao === "shorts") {
                buscarVideos("shorts", "short");
            } else if (secao === "busca") {
                buscarVideos(item.dataset.termo);
            }
        });
    });
}

configurarBuscaEClique();

// Busca inicial só para popular a página com conteúdo real assim que abre.
// Troque "javascript" pelo termo que fizer mais sentido para sua aula.
buscarVideos("javascript");

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