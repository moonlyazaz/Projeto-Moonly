import re
with open('frontend/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(r'#121212', 'var(--bg-primary)', css)
css = re.sub(r'#181818', 'var(--bg-primary)', css)
css = re.sub(r'#212121', 'var(--bg-secondary)', css)
css = re.sub(r'#909090', 'var(--text-secondary)', css)
css = re.sub(r'#606060', 'var(--text-secondary)', css)
css = re.sub(r'#565656', 'var(--border-color)', css)
css = re.sub(r'#333333', 'var(--bg-hover)', css)

with open('frontend/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
