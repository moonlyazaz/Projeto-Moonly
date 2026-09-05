# -*- coding: utf-8 -*-
"""
Fix: match exact YouTube menu icons from screenshot + fix subscriptions error
"""

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# --- ICON REPLACEMENTS to match screenshot ---
replacements = [
    # Mudar de conta → person with switch arrows
    ('fa-solid fa-user-group', 'fa-solid fa-right-left'),
    # Sair → arrow-right-from-bracket already correct
    # YouTube Studio → circle with play (already fa-brands fa-youtube)
    # Compras e assinaturas → dollar circle already there
    # Seus dados → shield-halved (lock is wrong, use shield)
    ('fa-solid fa-lock', 'fa-solid fa-shield-halved'),
    # Aparência → moon already correct
    # Idioma → translate icon
    ('fa-solid fa-language', 'fa-solid fa-language'),  # keep
    # Modo restrito → user with restrictions
    ('fa-solid fa-user-slash', 'fa-solid fa-circle-user'),
    # Local → globe with location pin
    # Keep fa-solid fa-globe - already correct
    # Teclado → keyboard already correct
    # Configurações → gear already correct
    # Ajuda → question circle already correct
    # Enviar feedback → chat already correct
]

for old, new in replacements:
    html = html.replace(f'class="{old}"', f'class="{new}"')

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Icons updated!")

with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix subscriptions: when token exists but doesn't have subscriptions scope,
# the API returns 403. We need to detect this and force re-auth.
old_fetch = """    try {
        const token = await obterTokenDeAcessoDoYoutube();
        const res = await fetch(
            'https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&order=alphabetical',
            { headers: { 'Authorization': 'Bearer ' + token } }
        );
        const data = await res.json();

        if (data.error || !data.items || data.items.length === 0) {
            lista.innerHTML = '<a class="sidebar-item"><span style="color:#aaa;font-size:13px;">Nenhuma inscrição encontrada.</span></a>';
            return;
        }

        todasInscricoes = data.items;
        renderizarInscricoesSidebar(false);"""

new_fetch = """    try {
        // Force new token for subscriptions scope (clear cached token to ensure 
        // user can grant subscriptions permission)
        const token = await obterTokenDeAcessoDoYoutube();
        const res = await fetch(
            'https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&order=alphabetical',
            { headers: { 'Authorization': 'Bearer ' + token } }
        );
        const data = await res.json();

        if (data.error) {
            console.error('API error:', data.error);
            // If 403, token doesn't have subscriptions scope — clear and retry
            if (data.error.code === 403 || data.error.code === 401) {
                tokenDeAcessoDoYoutube = null;
                localStorage.removeItem(CHAVE_TOKEN_YT);
                localStorage.removeItem(CHAVE_EXPIRACAO_YT);
                lista.innerHTML = '<a class="sidebar-item" style="height:auto;padding:12px 16px;"><span style="color:#aaa;font-size:13px;">Autorize o acesso às inscrições:</span><br><button onclick="carregarInscricoesSidebar()" style="margin-top:8px;background:#ff0000;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:13px;">Autorizar</button></a>';
                return;
            }
            lista.innerHTML = '<a class="sidebar-item"><span style="color:#aaa;font-size:13px;">Erro: ' + (data.error.message || 'desconhecido') + '</span></a>';
            return;
        }

        if (!data.items || data.items.length === 0) {
            lista.innerHTML = '<a class="sidebar-item"><span style="color:#aaa;font-size:13px;">Nenhuma inscrição encontrada.</span></a>';
            return;
        }

        todasInscricoes = data.items;
        renderizarInscricoesSidebar(false);"""

js = js.replace(old_fetch, new_fetch)

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Subscriptions error handling improved!")
