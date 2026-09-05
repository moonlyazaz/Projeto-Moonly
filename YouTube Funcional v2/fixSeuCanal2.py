# -*- coding: utf-8 -*-
"""Replace fa-regular fa-id-badge with proper SVG for Seu canal"""

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the fa-regular fa-id-badge (may not exist in FA6 free)
html = html.replace(
    '<i class="fa-regular fa-id-badge"></i>\n                        <span>Seu canal</span>',
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>\n                        <span>Seu canal</span>'
)

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done!")
