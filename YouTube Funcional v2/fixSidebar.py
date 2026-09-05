import re

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('newSidebar.html', 'r', encoding='utf-8') as f:
    new_sidebar = f.read()

# Substituir
html = re.sub(r'<nav class="sidebar-secao">\s*<a[^>]*data-secao="inicio".*?<hr class="sidebar-divisor">.*?</div>\s*</div>', new_sidebar, html, flags=re.DOTALL)

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
