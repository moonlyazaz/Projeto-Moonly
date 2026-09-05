# -*- coding: utf-8 -*-
import re

# ===== FIX INDEX.HTML =====
try:
    with open('frontend/index.html', 'r', encoding='utf-8') as f:
        html = f.read()
except UnicodeDecodeError:
    with open('frontend/index.html', 'r', encoding='latin-1') as f:
        raw = f.read()
    html = raw

# Fix all mojibake (UTF-8 interpreted as latin-1)
mojibake = {
    'InÃ­cio': 'Início',
    'InÃcio': 'Início',
    'InscrÃ§Ãµes': 'Inscrições',
    'InscrÃ¢Ã§Ã£o': 'Inscrição',
    'VocÃª': 'Você',
    'HistÃ³rico': 'Histórico',
    'FaÃ§a': 'Faça',
    'vÃ­deos': 'vídeos',
    'VÃ­deos': 'Vídeos',
    'MÃºsica': 'Música',
    'NÃ£o hÃ¡': 'Não há',
    'nÃ£o estÃ¡ disponÃ­vel': 'não está disponível',
    'denÃºncia': 'denúncia',
    'SeÃ§Ã£o': 'Seção',
    'PortuguÃªs': 'Português',
    'AparÃªncia': 'Aparência',
    'ConfiguraÃ§Ãµes': 'Configurações',
    'exibiÃ§Ã£o': 'exibição',
    'ExibiÃ§Ã£o': 'Exibição',
    'CriaÃ§Ã£o': 'Criação',
    'NotificaÃ§Ãµes': 'Notificações',
    'NotificaÃ§Ã£o': 'Notificação',
    'nenhuma notificaÃ§Ã£o': 'nenhuma notificação',
    'Nenhuma notificaÃ§Ã£o': 'Nenhuma notificação',
    'indisponÃ­vel': 'indisponível',
    'disponÃ­vel': 'disponível',
    'NÃ£o': 'Não',
    'hÃ¡': 'há',
    'MÃ¡s': 'Más',
    'nÃ£o': 'não',
    'AtalhosÂ ': 'Atalhos ',
    'EstÃ¡': 'Está',
    'ComÃ©dia': 'Comédia',
    'NotÃ­cias': 'Notícias',
    'CiÃªncia': 'Ciência',
    'EducaÃ§Ã£o': 'Educação',
    'animaÃ§Ã£o': 'animação',
    'AnimaÃ§Ã£o': 'Animação',
    'conteÃºdo': 'conteúdo',
    'exibiÃ§Ã£o': 'exibição',
    'inscriÃ§Ã£o': 'inscrição',
    'Ã£': 'ã',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ãª': 'ê',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã§': 'ç',
    '\ufeff': '',  # BOM
}
for bad, good in mojibake.items():
    html = html.replace(bad, good)

# Fix broken icons in dropdown menu
html = html.replace('fa-regular fa-id-badge">', 'fa-solid fa-users">')  # Mudar de conta → people
html = html.replace('fa-solid fa-users">', 'fa-solid fa-user-group">')  # better icon
html = html.replace('fa-solid fa-shield-halved">', 'fa-solid fa-lock">')  # Seus dados
html = html.replace('fa-solid fa-earth-americas">', 'fa-solid fa-globe">')  # Local
html = html.replace('fa-solid fa-user-shield">', 'fa-solid fa-user-slash">')  # Modo restrito

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html fixed!")

# ===== FIX SCRIPT.JS =====
with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix mojibake in JS too
for bad, good in mojibake.items():
    js = js.replace(bad, good)

# Fix subscriptions: clear cached token so fresh OAuth popup fires with subscriptions scope
# The issue is `carregarInscricoesSidebar` calls `obterTokenDeAcessoDoYoutube()` which 
# might fail silently if token doesn't have subscriptions scope.
# Add better error handling and show toast with error.
old_error = """    } catch (err) {
        console.error('Erro ao carregar inscrições:', err);
        lista.innerHTML = '<a class="sidebar-item"><span style="color:#aaa;font-size:13px;">Erro ao carregar inscrições.</span></a>';
    }
}"""

new_error = """    } catch (err) {
        console.error('Erro ao carregar inscrições:', err);
        lista.innerHTML = '<a class="sidebar-item" style="flex-direction:column;align-items:flex-start;height:auto;padding:12px 16px;"><span style="color:#aaa;font-size:13px;">Inscrições não carregadas.</span><span style="color:#3ea6ff;font-size:12px;margin-top:4px;cursor:pointer;" onclick="carregarInscricoesSidebar()">Tentar novamente</span></a>';
        mostrarToast('Clique "Tentar novamente" nas Inscrições para autorizar.');
    }
}"""

js = js.replace(old_error, new_error)

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("script.js fixed!")
print("Done!")
