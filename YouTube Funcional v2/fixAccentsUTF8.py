with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('InÃ­cio', 'Início')
html = html.replace('InscriÃ§Ãµes', 'Inscrições')
html = html.replace('VocÃª', 'Você')
html = html.replace('HistÃ³rico', 'Histórico')
html = html.replace('FaÃ§a', 'Faça')
html = html.replace('vÃ­deos', 'vídeos')
html = html.replace('MÃºsica', 'Música')
html = html.replace('NÃ£o hÃ¡', 'Não há')
html = html.replace('nÃ£o estÃ¡ disponÃ­vel', 'não está disponível')
html = html.replace('denÃºncia', 'denúncia')
html = html.replace('SeÃ§Ã£o', 'Seção')
html = html.replace('PortuguÃªs', 'Português')
html = html.replace('ExibiÃ§Ã£o', 'Exibição')
html = html.replace('AparÃªncia', 'Aparência')
html = html.replace('ConfiguraÃ§Ãµes', 'Configurações')
html = html.replace('exibiÃ§Ã£o', 'exibição')

# Remove the BOM if it exists
html = html.replace('\ufeff', '')

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
