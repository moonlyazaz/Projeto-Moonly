with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_js = '''

// --- SISTEMA DE TEMA CLARO / ESCURO E MENU ---

document.getElementById('btn-menu-canal').addEventListener('click', () => {
    document.getElementById('containerUsuarioLogado').classList.remove('aberto');
    const btnVoce = document.getElementById('btn-sidebar-voce');
    if (btnVoce) btnVoce.click(); // reaproveita a lógica do sidebar
});

document.getElementById('btn-menu-tema').addEventListener('click', (e) => {
    e.stopPropagation(); // Não fecha o menu
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
'''
js += new_js

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
