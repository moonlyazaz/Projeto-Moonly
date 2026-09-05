with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix common broken things
html = html.replace('Inǟcio', 'Início')
html = html.replace('Inǟcio', 'Início')
html = html.replace('Inscriǟǟes', 'Inscrições')
html = html.replace('Inscriǟǟes', 'Inscrições')
html = html.replace('Vocǟ', 'Você')
html = html.replace('VocǦ', 'Você')
html = html.replace('Vocǟ', 'Você')
html = html.replace('Histǟrico', 'Histórico')
html = html.replace('Histǟrico', 'Histórico')
html = html.replace('Faǟa', 'Faça')
html = html.replace('Faǟa', 'Faça')
html = html.replace('vǟdeos', 'vídeos')
html = html.replace('vǟdeos', 'vídeos')
html = html.replace('Mǟsica', 'Música')
html = html.replace('Mǟsica', 'Música')
html = html.replace('Nǟo hǟ', 'Não há')
html = html.replace('Nǟo hǟ', 'Não há')
html = html.replace('nǟo estǟ disponǟvel', 'não está disponível')
html = html.replace('nǟo estǟ disponǟvel', 'não está disponível')
html = html.replace('denǟncia', 'denúncia')
html = html.replace('denǟncia', 'denúncia')

html = html.replace('Seǜo', 'Seção')
html = html.replace('VocǦ', 'Você')
html = html.replace('Incio', 'Início')

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
