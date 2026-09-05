with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    'Ã¡': 'á',
    'Ã¢': 'â',
    'Ã£': 'ã',
    'Ã©': 'é',
    'Ãª': 'ê',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ã´': 'ô',
    'Ãµ': 'õ',
    'Ãº': 'ú',
    'Ã§': 'ç',
    'Ã ': 'à',
    'Ã\\xad': 'í', # Sometimes \xad is soft hyphen
}
for bad, good in replacements.items():
    html = html.replace(bad, good)

# Fix remaining broken characters manually if any
html = html.replace('Criaçã£o', 'Criação') # Just in case

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
