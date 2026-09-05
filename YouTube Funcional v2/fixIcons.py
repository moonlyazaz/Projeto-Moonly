import re

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update FA version
html = html.replace('6.4.0/css/all.min.css', '6.5.1/css/all.min.css')
html = html.replace('7.3.0/css/all.min.css', '6.5.1/css/all.min.css')

# Fix broken icons
html = html.replace('fa-solid fa-users\"', 'fa-regular fa-id-badge\"')
html = html.replace('fa-solid fa-sign-out-alt', 'fa-solid fa-arrow-right-from-bracket')
html = html.replace('fa-solid fa-shield-alt', 'fa-solid fa-shield-halved')
html = html.replace('fa-solid fa-language', 'fa-solid fa-language') # This one is standard, but maybe fa-font
html = html.replace('fa-solid fa-user-lock', 'fa-solid fa-user-shield')
html = html.replace('fa-solid fa-globe', 'fa-solid fa-earth-americas')
html = html.replace('fa-solid fa-cog', 'fa-solid fa-gear')

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
