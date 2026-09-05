with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace(\"document.getElementById('btn-menu-canal').addEventListener('click', () => {\", \"document.getElementById('btn-menu-canal-link').addEventListener('click', (e) => {\\n    e.preventDefault();\")
js = js.replace(\"document.querySelector('#btn-menu-tema span').innerText = 'Aparência: Tema Escuro';\", \"document.getElementById('texto-menu-tema').innerText = 'Aparência: tema escuro';\")
js = js.replace(\"document.querySelector('#btn-menu-tema span').innerText = 'Aparência: Tema Claro';\", \"document.getElementById('texto-menu-tema').innerText = 'Aparência: tema claro';\")

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
