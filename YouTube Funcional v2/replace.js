const fs=require('fs');
let js = fs.readFileSync('frontend/script.js', 'utf8');

js = js.replace('async function abrirVideo(idDoVideo) {\n    try {', 'async function abrirVideo(idDoVideo) {\n    iniciarCarregamento();\n    try {');
js = js.replace('        inicializarPlayerPrincipal();\n        inicializarEventosDeComentario(dadosDoVideo.id);', '        inicializarPlayerPrincipal();\n        inicializarEventosDeComentario(dadosDoVideo.id);\n        finalizarCarregamento();');

js = js.replace('async function buscarVideos(termoDeBusca, filtroDeDuracao = "") {\n    try {', 'async function buscarVideos(termoDeBusca, filtroDeDuracao = "") {\n    iniciarCarregamento();\n    try {');
js = js.replace('        if (!resposta.ok) {\n            mostrarToast("Não foi possível buscar vídeos agora.");', '        if (!resposta.ok) {\n            finalizarCarregamento();\n            mostrarToast("Não foi possível buscar vídeos agora.");');
js = js.replace('        }\n\n    } catch (erro) {\n        console.error("Erro na busca de vídeos:", erro);', '        }\n        finalizarCarregamento();\n\n    } catch (erro) {\n        finalizarCarregamento();\n        console.error("Erro na busca de vídeos:", erro);');

js = js.replace('async function carregarVideosPopulares(idDaCategoria = "") {\n    try {', 'async function carregarVideosPopulares(idDaCategoria = "") {\n    iniciarCarregamento();\n    try {');
js = js.replace('        if (!resposta.ok) {\n            mostrarToast("Não foi possível carregar os vídeos no momento.");', '        if (!resposta.ok) {\n            finalizarCarregamento();\n            mostrarToast("Não foi possível carregar os vídeos no momento.");');
js = js.replace('        renderizarResultados(dados);\n        mostrarView("inicio");\n    } catch (erro) {', '        renderizarResultados(dados);\n        mostrarView("inicio");\n        finalizarCarregamento();\n    } catch (erro) {');
js = js.replace('        console.error("Erro ao carregar populares:", erro);\n        mostrarToast("Falha de conexão com a API.");\n    }\n}', '        finalizarCarregamento();\n        console.error("Erro ao carregar populares:", erro);\n        mostrarToast("Falha de conexão com a API.");\n    }\n}');

fs.writeFileSync('frontend/script.js', js);
