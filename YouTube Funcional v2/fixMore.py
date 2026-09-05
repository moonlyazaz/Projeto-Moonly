import re
with open('frontend/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('border-bottom: 2px solid #fff;', 'border-bottom: 2px solid var(--text-primary);')
css = css.replace('fill: #fff;', 'fill: var(--text-primary);')

with open('frontend/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
