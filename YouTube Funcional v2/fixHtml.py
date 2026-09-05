import re

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('newMenu.html', 'r', encoding='utf-8') as f:
    new_menu = f.read()

# Substitui FontAwesome
html = html.replace('7.3.0/css/all.min.css', '6.4.0/css/all.min.css')

# Substitui o menu inteiro
html = re.sub(r'<div class="usuario-logado__menu">.*?</div\s*>\s*</div\s*>\s*</div\s*>', new_menu + '\n            </div>\n         </div>', html, flags=re.DOTALL)

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
