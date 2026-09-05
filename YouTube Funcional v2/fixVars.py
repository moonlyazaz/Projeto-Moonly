import re
with open('frontend/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix the broken light theme variable
css = css.replace('--text-secondary: var(--text-secondary);', '--text-secondary: #606060;')

with open('frontend/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
