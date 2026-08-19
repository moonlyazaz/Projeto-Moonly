const videoPrincipal = {
    titulo: "Aprendendo HTML, CSS e JavaScript do zero — Aula completa",
    arquivoVideo: "videos/aula.mp4",
    imagemCapa: "https://picsum.photos/seed/player/1280/720",
    canal: {
        nome: "Canal da Aula",
        foto: "https://picsum.photos/seed/canal/88/88",
        inscritos: "1,2 mi de inscritos"
    },
    visualizacoes: "342 mil visualizações",
    dataPublicacao: "há 3 dias",
    curtidas: "18 mil",
    descricao: "Nesta aula construímos uma cópia da interface do YouTube usando apenas HTML, CSS com flexbox e JavaScript puro. O conteúdo da página é gerado dinamicamente a partir de objetos JavaScript."
};

const videosRecomendados = [
    {
        titulo: "Flexbox na prática: alinhando qualquer layout",
        canal: "Front-end Descomplicado",
        visualizacoes: "120 mil visualizações",
        tempoPublicacao: "há 2 semanas",
        duracao: "14:32",
        miniatura: "https://picsum.photos/seed/video1/336/188"
    },
    {
        titulo: "JavaScript: manipulando o DOM sem frameworks",
        canal: "Código Limpo",
        visualizacoes: "89 mil visualizações",
        tempoPublicacao: "há 1 mês",
        duracao: "22:07",
        miniatura: "https://picsum.photos/seed/video2/336/188"
    },
    {
        titulo: "Como organizar arquivos HTML, CSS e JS em um projeto",
        canal: "Dev na Escola",
        visualizacoes: "45 mil visualizações",
        tempoPublicacao: "há 5 dias",
        duracao: "08:51",
        miniatura: "https://picsum.photos/seed/video3/336/188"
    },
    {
        titulo: "Criando um cabeçalho profissional com CSS",
        canal: "Front-end Descomplicado",
        visualizacoes: "230 mil visualizações",
        tempoPublicacao: "há 3 meses",
        duracao: "11:19",
        miniatura: "https://picsum.photos/seed/video4/336/188"
    },
    {
        titulo: "Array de objetos em JavaScript explicado com exemplos",
        canal: "Código Limpo",
        visualizacoes: "512 mil visualizações",
        tempoPublicacao: "há 6 meses",
        duracao: "18:45",
        miniatura: "https://picsum.photos/seed/video5/336/188"
    },
    {
        titulo: "Boas práticas de nomes de variáveis e funções",
        canal: "Dev na Escola",
        visualizacoes: "77 mil visualizações",
        tempoPublicacao: "há 1 semana",
        duracao: "09:03",
        miniatura: "https://picsum.photos/seed/video6/336/188"
    },
    {
        titulo: "Template literals: montando HTML direto no JavaScript",
        canal: "Canal da Aula",
        visualizacoes: "63 mil visualizações",
        tempoPublicacao: "há 4 dias",
        duracao: "12:28",
        miniatura: "https://picsum.photos/seed/video7/336/188"
    },
    {
        titulo: "Projeto completo: clonando interfaces famosas",
        canal: "Canal da Aula",
        visualizacoes: "1,1 mi de visualizações",
        tempoPublicacao: "há 2 meses",
        duracao: "1:02:14",
        miniatura: "https://picsum.photos/seed/video8/336/188"
    }
];

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
            <video
                class="player__video"
                src="${dadosDoVideoPrincipal.arquivoVideo}"
                poster="${dadosDoVideoPrincipal.imagemCapa}"
                controls
            ></video>
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
                <button class="botao-inscrever">Inscrever-se</button>
            </div>

            <div class="acoes-video">
                <button class="acao">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>${dadosDoVideoPrincipal.curtidas}</span>
                    <span class="acao__separador"></span>
                    <i class="fa-solid fa-thumbs-down"></i>
                </button>
                <button class="acao">
                    <i class="fa-solid fa-share"></i>
                    <span>Compartilhar</span>
                </button>
                <button class="acao">
                    <i class="fa-solid fa-download"></i>
                    <span>Fazer download</span>
                </button>
                <button class="acao">
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
        <div class="video-recomendado">
            <div
                class="video-recomendado__miniatura"
                style="background-image: url('${dadosDoVideoRecomendado.miniatura}')"
            >
                <span class="video-recomendado__duracao">${dadosDoVideoRecomendado.duracao}</span>
            </div>
            <div class="video-recomendado__informacoes">
                <span class="video-recomendado__titulo">${dadosDoVideoRecomendado.titulo}</span>
                <span class="video-recomendado__canal">${dadosDoVideoRecomendado.canal}</span>
                <span class="video-recomendado__dados">
                    <span>${dadosDoVideoRecomendado.visualizacoes}</span>
                    <span>•</span>
                    <span>${dadosDoVideoRecomendado.tempoPublicacao}</span>
                </span>
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

renderizarMenuLateral();
renderizarVideoPrincipal(videoPrincipal);
renderizarVideosRecomendados(videosRecomendados);