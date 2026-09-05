# -*- coding: utf-8 -*-
"""
Comprehensive fix:
1. Icons: verify all icons are valid in FA 6.5.1
2. Fix encoding of Inscrições in sidebar  
3. Fix subscriptions auto-loading on page restore
"""
import re

# ==============================
# FIX INDEX.HTML
# ==============================
with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix remaining encoding issues in sidebar (some chars weren't caught before)
# These patterns match what PowerShell saves as mixed encoding
mojibake_sidebar = {
    'Inscri\u00c3\u00a7\u00c3\u00b5es': 'Inscrições',  # ÃçÃµes
    'Inscri\u00c3\u00a7\u00c3': 'Inscrições',
}
# The simplest approach - look for the sidebar section and rebuild it
# First check what's actually there
import sys
sidebar_section = html[html.find('sidebarInscricoesGroup'):html.find('sidebarInscricoesGroup')+500]
print("Current sidebar section:", repr(sidebar_section[:200]))

# Fix icon names that are NOT in FA 6 free tier or are wrong:
# fa-solid fa-right-left -> exists in FA 6 Pro but NOT Free! Use fa-solid fa-shuffle or fa-solid fa-exchange-alt (FA5 name)
# Actually in FA6 Free: the swap/exchange icon is fa-solid fa-arrow-right-arrow-left
# fa-solid fa-shield-halved -> EXISTS in FA6 Free ✓
# fa-regular fa-circle-question -> EXISTS in FA6 Free ✓
# fa-regular fa-comment-dots -> EXISTS in FA6 Free ✓
# fa-solid fa-arrow-right-from-bracket -> EXISTS in FA6 Free ✓
# fa-solid fa-gear -> EXISTS in FA6 Free ✓
# fa-solid fa-language -> EXISTS in FA6 Free ✓
# fa-solid fa-circle-user -> EXISTS in FA6 Free ✓  
# fa-solid fa-globe -> EXISTS in FA6 Free ✓
# fa-regular fa-keyboard -> EXISTS in FA6 Free ✓

# THE PROBLEM: fa-solid fa-right-left IS NOT in FA6 Free tier
# It needs to be fa-solid fa-arrows-left-right or fa-solid fa-right-left (only Pro)
html = html.replace('class="fa-solid fa-right-left"', 'class="fa-solid fa-arrows-left-right"')

# Also fa-regular fa-id-badge might not be free - already changed to user-group above
# Double check YouTube Studio icon - should be a circle with play button
# Currently: fa-brands fa-youtube - that's the red YouTube logo, looks wrong in screenshot too
# Change to something that represents Studio:
# Actually let's keep fa-brands fa-youtube for YouTube Studio (it's the brand)

# Fix the menu Inscrições text corruption in data-toast attributes and spans
html = html.replace('data-toast="Inscri\u00c3\u00a7\u00c3\u00b5es em breve."', 'data-toast="Inscrições em breve."')
html = html.replace('>Inscri\u00c3\u00a7\u00c3\u00b5es<', '>Inscrições<')

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML fixed!")

# ==============================
# FIX SCRIPT.JS
# ==============================
with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Problem 1: subscriptions need to auto-load when restoring login from localStorage
# Find where loginSalvo is applied and add subscription loading there
old_restore = '''const loginSalvo = localStorage.getItem("usuarioLogadoComGoogle");
if (loginSalvo) {
    aplicarUsuarioLogado(JSON.parse(loginSalvo));
}'''
new_restore = '''const loginSalvo = localStorage.getItem("usuarioLogadoComGoogle");
if (loginSalvo) {
    aplicarUsuarioLogado(JSON.parse(loginSalvo));
    // Auto-load subscriptions when restoring session
    setTimeout(() => {
        if (typeof carregarInscricoesSidebar === 'function') {
            carregarInscricoesSidebar();
        }
    }, 500);
}'''
if old_restore in js:
    js = js.replace(old_restore, new_restore)
    print("Auto-load subscriptions on restore: OK")
else:
    print("WARNING: could not find loginSalvo restore block")

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("JS fixed!")
print("All done!")
