with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# First, replace the old theme click handler
js = js.replace(\"document.getElementById('btn-menu-tema').addEventListener('click', (e) => {\\n    e.stopPropagation(); \\n    const isLight = document.body.getAttribute('data-theme') === 'light';\\n    if (isLight) {\\n        document.body.removeAttribute('data-theme');\\n        localStorage.setItem('youtubeTheme', 'dark');\\n        document.getElementById('texto-menu-tema').innerText = 'Aparência: tema escuro';\\n    } else {\\n        document.body.setAttribute('data-theme', 'light');\\n        localStorage.setItem('youtubeTheme', 'light');\\n        document.getElementById('texto-menu-tema').innerText = 'Aparência: tema claro';\\n    }\\n});\", '')

new_js = '''
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

// Reseta o painel principal ao fechar o menu
document.addEventListener('click', () => {
    abrirPainel('painel-principal');
});
'''

js += new_js

# Ensure active checkmark is visible on load
js = js.replace(\"const spanTema = document.getElementById('texto-menu-tema');\\n    if (spanTema) spanTema.innerText = 'Aparência: tema claro';\", \"const spanTema = document.getElementById('texto-menu-tema');\\n    if (spanTema) spanTema.innerText = 'Aparência: tema claro';\\n    const opClaro = document.querySelector('#opcao-tema-claro .icone-check');\\n    if (opClaro) opClaro.style.opacity = '1';\")

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
