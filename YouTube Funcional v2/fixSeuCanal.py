# -*- coding: utf-8 -*-
"""Fix Seu canal icon and sidebar spacing"""

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Wrong icon - the 2-person group SVG ended up on "Seu canal"
# Replace with single person/account icon
wrong_seu_canal = '''<a class="sidebar-item" data-secao="voce">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="flex-shrink:0;margin-right:16px;"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                        <span>Seu canal</span>
                    </a>'''

# Single person icon (account circle style - what YouTube uses for "Your channel")
correct_seu_canal = '''<a class="sidebar-item" data-secao="voce">
                        <i class="fa-regular fa-id-badge"></i>
                        <span>Seu canal</span>
                    </a>'''

if wrong_seu_canal in html:
    html = html.replace(wrong_seu_canal, correct_seu_canal)
    print("Fixed Seu canal icon!")
else:
    # Try finding it with any whitespace variation
    import re
    count = html.count('data-secao="voce"')
    print(f"Found {count} occurrences of data-secao='voce'")
    # Just do the SVG replacement inline
    html = re.sub(
        r'(<a class="sidebar-item" data-secao="voce">)\s*<svg[^>]*>.*?</svg>\s*(<span>Seu canal</span>)',
        r'\1\n                        <i class="fa-regular fa-id-badge"></i>\n                        \2',
        html,
        flags=re.DOTALL
    )
    print("Fixed with regex!")

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done!")
