import re

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('newInsc.html', 'r', encoding='utf-8') as f:
    new_insc = f.read()

# Substituir a secao "Inscrições" simples do menu superior?
# In YouTube sidebar, "Inscrições" is in the top section too. BUT when logged in, a whole new section appears.
# So let's insert it right above sidebarVoceGroup
html = html.replace('<nav class=\"sidebar-secao\" id=\"sidebarVoceGroup\"', new_insc + '\n            <nav class=\"sidebar-secao\" id=\"sidebarVoceGroup\"')

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
