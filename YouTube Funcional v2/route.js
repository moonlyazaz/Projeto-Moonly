const fs=require('fs');
let js = fs.readFileSync('frontend/script.js', 'utf8');

js = js.replace('// Carrega a Home com vídeos em alta reais, igual à Home de verdade do YouTube.\nbuscarPopulares();', '');

const routerLogic = \
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
\;

js = js + '\n' + routerLogic;
fs.writeFileSync('frontend/script.js', js);
