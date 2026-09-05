const fs = require('fs');
let js = fs.readFileSync('frontend/script.js', 'utf8');

// 1. Injetar avatar no login
js = js.replace(
    'localStorage.setItem(\\'usuarioLogadoComGoogle\\', JSON.stringify(dadosDoUsuario));',
    'localStorage.setItem(\\'usuarioLogadoComGoogle\\', JSON.stringify(dadosDoUsuario));\n        const iconeVoce = document.getElementById(\\'icone-sidebar-voce\\');\n        if (iconeVoce) iconeVoce.outerHTML = \\\<img src="\" class="sidebar-avatar" id="icone-sidebar-voce">\\\;'
);

// 2. Historico logic in abrirVideo
js = js.replace(
    'verificarEstadoDoVideo(dadosDoVideo.id, dadosDoVideo.canal.id);',
    'verificarEstadoDoVideo(dadosDoVideo.id, dadosDoVideo.canal.id);\n        adicionarAoHistorico(dadosDoVideo);'
);

const newLogic = \

// --- SISTEMA DE HISTORICO E CANAL ---

function adicionarAoHistorico(video) {
    let historico = JSON.parse(localStorage.getItem('historicoYoutube') || '[]');
    historico = historico.filter(v => v.id !== video.id);
    historico.unshift(video);
    if (historico.length > 50) historico.pop();
    localStorage.setItem('historicoYoutube', JSON.stringify(historico));
}

function renderizarHistorico() {
    const grade = document.getElementById('gradeHistorico');
    if (!grade) return;
    const historico = JSON.parse(localStorage.getItem('historicoYoutube') || '[]');
    if (historico.length === 0) {
        grade.innerHTML = '<p style="color:#aaa;">Você ainda não tem vídeos no histórico.</p>';
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
            container.innerHTML = '<p>Você precisa criar um canal no YouTube primeiro.</p>';
        } else {
            const canal = data.items[0];
            container.innerHTML = \\\\\
                <div style="display:flex; align-items:center; gap: 24px; margin-bottom: 32px;">
                    <img src="\" style="width: 128px; height: 128px; border-radius: 50%;">
                    <div>
                        <h1 style="font-size: 32px; font-weight: 500; margin:0 0 8px 0;">\</h1>
                        <p style="color: #aaa; margin:0;">
                            @\ • 
                            \ inscritos • 
                            \ vídeos
                        </p>
                        <p style="color: #ddd; margin-top: 12px; font-size: 14px;">\</p>
                    </div>
                </div>
                <hr style="border-color: #383838; margin-bottom: 24px;">
                <h3>Vídeos recentes</h3>
                <p style="color:#aaa; font-size: 14px; margin-top:8px;">Apenas visualização das estatísticas do canal via API.</p>
            \\\\\;
        }
    } catch (e) {
        console.error(e);
        container.innerHTML = '<p>Erro ao carregar os dados do canal.</p>';
    }
    finalizarCarregamento();
}
\;

js = js + '\n' + newLogic;

// 3. Update mostrarView router
js = js.replace(
    'document.getElementById("areaAssistir").style.display = nomeDaView === "assistir" ? "flex" : "none";',
    'document.getElementById("areaAssistir").style.display = nomeDaView === "assistir" ? "flex" : "none";\n    const h = document.getElementById("areaHistorico"); if(h) h.style.display = nomeDaView === "historico" ? "block" : "none";\n    const v = document.getElementById("areaVoce"); if(v) v.style.display = nomeDaView === "voce" ? "block" : "none";'
);

fs.writeFileSync('frontend/script.js', js);
